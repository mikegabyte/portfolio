// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikegabyte.com',
  // Old URLs: Vietnamese used to live under /vi/ before it became the default locale
  redirects: {
    '/vi': '/',
    '/vi/about': '/about',
    '/vi/projects': '/projects',
    '/vi/blog': '/blog',
    '/vi/blog/[...slug]': '/blog/[...slug]',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'vi',
        locales: { en: 'en', vi: 'vi' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});