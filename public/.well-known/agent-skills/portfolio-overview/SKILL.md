---
name: portfolio-overview
description: Discover and read Mikegabyte's portfolio — pages, projects, blog posts, and CV — and learn the in-browser tools an agent can call on this site.
---

# Mikegabyte Portfolio — Agent Overview

This is the personal portfolio of **Mikegabyte**, a frontend developer (Vue, React,
TypeScript, WordPress) building web tools for marketing and content. The site is
bilingual: Vietnamese is the default, English lives under `/en/`.

## Reading the site

- **Markdown overview:** `https://mikegabyte.com/llms.txt` — a compact map of pages,
  projects, and blog posts. Start here.
- **Sitemap:** `https://mikegabyte.com/sitemap-index.xml`
- **Link headers:** every page advertises `rel="describedby"` (→ `llms.txt`) and
  `rel="sitemap"` via RFC 8288 `Link` response headers.

## Key pages

- Home: `https://mikegabyte.com/`
- Projects: `https://mikegabyte.com/projects`
- About / The Tour: `https://mikegabyte.com/about`
- Blog: `https://mikegabyte.com/blog`
- CV (PDF): `https://mikegabyte.com/cv.pdf`

## In-browser tools (WebMCP)

When the page is open in a WebMCP-capable browser, the site registers tools via
`navigator.modelContext.registerTool()`:

- `list_projects` — projects with description, stack, status, and link.
- `list_blog_posts` — blog posts with title, URL, and date.
- `get_cv` — URL of the CV PDF.
- `navigate` — open `home` | `projects` | `about` | `blog`.

## Content usage

Usage preferences are declared in `https://mikegabyte.com/robots.txt` via
`Content-Signal` (`ai-train`, `search`, `ai-input`).
