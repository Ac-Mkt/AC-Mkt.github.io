// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ac-mkt.github.io',
	integrations: [sitemap()],
	// Self-hosted Hanken Grotesk (see <Font> in src/components/BaseHead.astro)
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Hanken Grotesk',
			cssVariable: '--font-hanken',
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['sans-serif'],
		},
	],
});
