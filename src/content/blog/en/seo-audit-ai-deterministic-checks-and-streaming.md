---
title: "SEO Audit AI: why I put a deterministic engine in front of the LLM"
description: "An on-page SEO auditor that scores with code first, then streams an AI consultant's report. Plus a provider-agnostic AI adapter and bilingual output."
date: 2026-06-08
tags: ["Vue", "Node", "AI", "side-project"]
---

[SEO Audit AI](https://github.com/mikegabyte/seo-audit-ai) takes a URL and gives you two things: an instant scored checklist of on-page SEO issues, and an AI consultant's report that streams in live underneath it. The interesting design decision was deciding what the AI should *not* do.

## Two phases on purpose

The temptation with anything LLM-shaped is to hand the whole job to the model: "here's a page, tell me what's wrong with its SEO." That works in a demo and disappoints in production — it's slow, it costs a token call every time, and the same page can score differently on two runs.

So the app does the boring half deterministically. The server fetches the page, extracts the on-page data with cheerio, and runs **13 fixed checks** — title length, meta description, single H1, heading structure, image alt coverage, canonical, lang attribute, mobile viewport, Open Graph, HTTPS, content length, indexability — into a weighted score. This part is instant, repeatable, and free. If the AI is down, you still get a useful audit.

Then the AI does the half a checklist *can't*: judgment. It reads the extracted data plus the check results and writes a consultant-style report — a verdict, the 3–5 highest-impact fixes ordered by impact, and **concrete rewritten titles and meta descriptions based on the page's actual content**. That's the part worth paying a token call for.

## Streaming the report

The report streams token-by-token over Server-Sent Events. The server consumes the model's stream and forwards text deltas; the client renders them as Markdown as they arrive. It's a small thing but it changes how the tool *feels* — instead of a spinner and then a wall of text, you watch a consultant think out loud.

## A provider-agnostic AI adapter

I didn't want to be locked to one model vendor (or one bill). The AI layer is one `streamAnalysis()` function behind an env switch:

```
AI_PROVIDER = gemini | groq | openrouter | mistral | anthropic
```

Every provider except Anthropic speaks the OpenAI-compatible chat API, so they share a single code path with a different `baseURL`. Anthropic gets its own branch because it uses a different SDK. Adding a provider is one entry in a map. During development I ran it on Gemini's free tier; switching to Claude later is two lines in `.env`.

There's also a `MOCK_AI=1` mode that streams a simulated report built from the deterministic check results — so the entire streaming UX can be developed and demoed without an API key or spending a cent.

## Bilingual end to end

The UI has an EN/VI toggle, and the language flows all the way through: the 13 check labels are localized server-side, and the AI gets a different system prompt per language so the report comes back in the selected language — *regardless of what language the audited page is in*. Auditing an English page with the UI in Vietnamese gives you a Vietnamese report.

## The boring-but-important bits

- **SSRF guard** on the fetch: only http/https, private and loopback hosts blocked, a hard timeout, HTML-only. A tool that fetches arbitrary user-supplied URLs is an SSRF vector if you don't lock it down.
- **Retry with backoff** on transient provider errors (429/503), with a friendly localized message and a retry button instead of a raw `503 status code` leaking to the user.
- A short **cache** so the AI call reuses the page the audit already fetched.

## Why this one is in my portfolio

It's small, but it shows the thing I actually believe about building with LLMs: the model is a component, not the architecture. Put deterministic code where you need correctness and repeatability, use the model where you need judgment, and design the seam between them on purpose.

Stack: Vue 3, TypeScript, Tailwind on the front; Express, cheerio, and the AI provider adapter on the back.
