// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikegabyte.com',
  // Old URLs: English used to live under /en/ before it became the default locale
  redirects: {
    '/en': '/',
    '/en/about': '/about',
    '/en/projects': '/projects',
    '/en/blog': '/blog',
    '/en/blog/[...slug]': '/blog/[...slug]',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', vi: 'vi' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});