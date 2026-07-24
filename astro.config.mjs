// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// `site` feeds canonical URLs, Open Graph tags, and the generated sitemap.
// Served at the domain root (a GitHub user site), so no `base` path is needed.
export default defineConfig({
  site: 'https://holocos.github.io',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
