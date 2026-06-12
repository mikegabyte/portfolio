---
title: "Building a PMS SaaS, Part 2: the security holes in my own POC"
description: "The moment you look at a demo as a product, the bugs change shape. Here are the seven security issues I found auditing my own code — including one that let anyone register as admin."
date: 2026-06-12
tags: ["SaaS", "security", "Node"]
series: "Building a PMS SaaS"
seriesPart: 2
---

In [Part 1](/en/blog/building-a-pms-saas-part-1-the-decision) I decided to turn a shelved client POC into a product I own. The first real engineering step wasn't a feature — it was reading my own code as an attacker would, because a POC for one trusted business and a SaaS holding many businesses' data are not the same program.

I found seven things. Two of them were bad. Here's the honest list.

## 1. Anyone could register as admin

The registration endpoint accepted a `permissions` array from the request body and saved it straight onto the new user:

```ts
const { email, password, firstName, lastName, permissions } = req.body;
const user = new User({ email, password, firstName, lastName, permissions });
```

So `POST /api/auth/register` with `"permissions": ["admin"]` created an admin. Full takeover, from the public signup form. In a single-tenant app you trust everyone who has a login; in a product, registration is the front door for strangers. New accounts now start with `permissions: []` and an admin grants access later.

## 2. An entire resource had no auth at all

The properties routes were mounted with no middleware:

```ts
router.get('/', getProperties);
router.post('/', createProperty);
// ...no authMiddleware, no permission check
```

Anyone on the internet could read, create, edit, and delete properties. The rooms and bookings routes were correctly protected — properties just got missed, and in a demo where you only ever hit it through the authed UI, you never notice. Now it has `authMiddleware` plus `properties:*` permission checks like everything else. The transactions routes had auth but were missing the permission layer — same fix.

## 3. The JWT secret had a hardcoded fallback — that was actually being used

```ts
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
```

Two problems. One, the fallback is a publicly-known string that can forge any token. Two — and this is the subtle one — controllers read `JWT_SECRET` at module load time, which happened *before* `dotenv.config()` ran in the server entry point. So even with a real secret in `.env`, the weak fallback could silently be the one in use.

The fix was a single `config.ts` that loads env first and **refuses to start** if `JWT_SECRET` is missing — fail fast and loud, never fall back to something insecure:

```ts
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`FATAL: missing required env var ${name}`);
  return v;
}
export const JWT_SECRET = required('JWT_SECRET');
```

## 4. A public, unauthenticated webhook

The channel-manager webhook accepted any POST and triggered a sync. Anyone who knew the URL could spam syncs and flood the log table. It now requires a secret token in the URL (`?token=...`), compared in constant time, and the endpoint stays disabled (503) until the secret is configured — fail closed, not open.

## 5. The same admin password in every deployment

The seed logic created `admin@example.com` / `password123` on first run. Fine for local dev, a disaster if it ships. Now the credentials come from env, and if no password is set, a random one is generated and printed exactly once.

## 6. No brute-force protection

The login endpoint would happily accept unlimited guesses. Added a rate limit (20 attempts per 15 minutes) on the credential endpoints — and *only* those, so a dashboard polling the user's profile never gets throttled.

## 7. A duplicated permission condition hiding a real gap

While reading the permission middleware I found a copy-paste bug — `bookings:all` checked twice in one OR chain, while the actual missing case (a room editor needs to *read* properties, because the room form has a property dropdown) wasn't handled. Fixed the logic and added the cross-resource grant.

## Then I wrote tests so they can't come back

A fix you can't prove stays fixed will regress. I split the Express app out from the server bootstrap so it could be mounted in tests, and wrote 26 integration tests (Vitest + supertest) against a real MongoDB in an isolated database. The security ones are regression guards — there's a test that registers with `"permissions": ["admin"]` and asserts the saved user has `[]`. If anyone ever reintroduces that bug, the suite goes red.

## The lesson

None of these were exotic. They're the boring, well-known classes — missing authz, weak secrets, no rate limiting. They survived precisely *because* the app worked perfectly as a demo. The bugs only became visible when the threat model changed from "my friend uses this" to "strangers on the internet use this." That shift in perspective was the actual work; the patches were easy once I was looking for the right thing.

Next part: multi-tenancy — the real heavy lift, where one app learns to serve many businesses without ever leaking one's data to another.
