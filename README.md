# mikegabyte — Portfolio

Personal portfolio. Astro 6 + Tailwind 4, static output, dark theme, amber accent.

## Concept

- **Frontpage** — clean & direct: positioning, featured projects, mini journey strip, contact
- **/about ("the tour")** — career story told as a guided tour (ex-tour-guide voice), no explicit years so it never conflicts with the CV
- **/projects** — all projects from `src/data/projects.ts`
- **/blog** — placeholder, ready for build logs
- **/cv.pdf** — CV download (copy the latest `LeMinhY_CV_2026.pdf` here when it changes)

## i18n

Two locales: `en` (default, served at `/`) and `vi` (served at `/vi/`).

- All UI strings + page content live in `src/i18n/translations.ts`; project descriptions are localized in `src/data/projects.ts`
- Pages are thin wrappers (`src/pages/**`) around shared components in `src/components/pages/` — edit content once, both locales pick it up
- **Language detection:** on first visit, an inline script checks `navigator.languages`; Vietnamese browsers get redirected to `/vi/`. An explicit choice via the `en / vi` switcher in the nav is stored in `localStorage` and always wins. `hreflang` alternates are emitted on every page for SEO.
- For true region-based detection (IP, not browser language), enable the nginx GeoIP2 module on the VPS and redirect `/ → /vi/` when `$geoip2_data_country_code = VN` and the request has no `pref-lang` cookie — optional, browser-language detection covers the practical cases.

## Dev

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
```

## Deploy to VPS

Static files only — any web server works:

```bash
npm run build
rsync -avz --delete dist/ user@your-vps:/var/www/portfolio/
```

Nginx config on the VPS:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio;
    index index.html;
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
}
```

Then `certbot --nginx -d yourdomain.com` for HTTPS.

## TODO

- [ ] Buy domain → update `server_name` + add `site:` in `astro.config.mjs` (for correct OG/sitemap URLs)
- [ ] Real GitHub link in `src/layouts/Layout.astro` footer (currently points to github.com)
- [ ] Add SEO Audit AI repo link to `src/data/projects.ts` when it ships
- [ ] First blog post = SEO Audit AI build log
