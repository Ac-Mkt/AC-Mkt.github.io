// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ac-mkt.github.io',
	integrations: [mdx(), sitemap()],
	fonts: [
				{
			provider: fontProviders.google(),
			name: 'Schibsted Grotesk',
			cssVariable: '--font-schibsted',
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['sans-serif'],
		},
	],
});
