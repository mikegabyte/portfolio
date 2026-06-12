---
title: "Building a PMS SaaS, Part 1: from a dead client project to an owned product"
description: "A friend asked me to build a property management system, we couldn't make the deal work, and they stayed on their existing tools. Here's why I'm taking the code and turning it into a product I own 100%."
date: 2026-06-11
tags: ["SaaS", "MERN", "product"]
series: "Building a PMS SaaS"
seriesPart: 1
---

This is the first post in a series I'm writing as I turn a shelved client project into a real, independent SaaS product. I'm writing it partly to think clearly, partly so the build is documented in public, and partly because the honest version of "how a product gets started" is more useful than the polished version.

## The context

A while back, a friend who runs a handful of short-stay rentals asked me to build them a custom web app to manage their business — bookings, rooms, guests, the money. They were juggling a channel manager and a few other paid services, and wanted something that fit how *they* actually worked.

I built a proof of concept. A real one: a MERN-stack property management system with a booking calendar, a guest database, an auto-generated income/expense ledger, granular permissions, and a two-way sync with the channel manager they were already using. It worked.

## The bid that didn't close

And then it didn't go anywhere.

We talked it through and couldn't land on terms that made sense for both of us. Building and maintaining custom software is a real, ongoing cost, and for their size, continuing to pay for off-the-shelf services was the rational call. So they stayed on what they had, and I stopped touching the project.

That's not a failure story, even though it has the shape of one. A bid not closing is just information. What I had at the end of it was a finished, working PMS that solved a real problem — and no one using it.

## The realization

The thing that changed my mind about shelving it was noticing three facts sitting next to each other:

1. **The code was solid.** Not a prototype held together with tape — a clean, fully-typed MERN app with a real feature set. Most people trying to start a product like this would spend three months getting to where this already was.
2. **The market pays.** My friend — and the whole segment of small Airbnb/homestay operators they're part of — is *already paying every month* for tools to do exactly this. I didn't need to run a survey to validate willingness-to-pay; the invoices already exist.
3. **Custom-for-one is a trap; product-for-many is leverage.** Building bespoke software for a single business is a job. Building it once and selling it to many is a product. Same code, completely different economics — and this time I'd own all of it.

So the decision: take the POC and rebuild it into a multi-tenant SaaS that I own 100%. If it ships and it's genuinely cheaper than what my friend pays now, they're very likely my first customer. But this time I'm not building *for* them — I'm building a product, and they're a customer.

## What "owning it" actually means

The first thing I did was get clear on the boring stuff, because this is exactly where solo builders get burned:

- **The IP is clean.** The POC was something I built to demo; nothing was paid for and there's no agreement transferring ownership. The code is mine. (If you're ever in a similar spot: confirm this *before* you build a business on top of it, not after.)
- **The client's real data comes out.** Before any of this becomes a product, the dev database full of a real business's listings and a hundred real guests' personal information gets exported, archived offline, and replaced with synthetic demo data. You do not build a commercial product on top of someone else's customers' PII.

## The road ahead

The gap between "working single-tenant app" and "SaaS people pay for" is mostly three things, and I'll write a post about each as I build them:

- **Multi-tenancy** — turning one app for one business into one app safely serving many, where tenant A can never see tenant B's data. This is the heavy lift.
- **Escaping the channel-manager dependency** — the POC was built around one specific channel manager's API. A real product can't force every customer to subscribe to that. The plan is a three-tier strategy: serve direct-booking operators first (no integration needed at all), then add free iCal sync for Airbnb/Booking.com calendars, and keep the original integration as an optional connector for power users.
- **The SaaS shell** — billing (the Vietnamese way: QR transfer + bank reconciliation, not Stripe-first), plans and limits, onboarding, and deploying something I'm willing to put other businesses' data on.

There's also the part I'm least comfortable with and have to be honest about: I'm a developer, not a salesperson, and the idea of cold-pitching people makes me want to hide. So the go-to-market plan is deliberately built around *not* doing that — desk research instead of surveys, inbound content instead of outreach, and product-led self-serve instead of sales calls. More on that later too.

Next post: making the codebase safe to build on — the security holes I found in my own POC the moment I looked at it as a product instead of a demo.

*This series documents a real product being built in real time. No client names, no real guest data — just the engineering and the decisions.*
