import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			heroImageAlt: z.string().optional(),
			heroImageCredit: z.string().optional(),
			heroImageCreditUrl: z.string().optional(),
			// Shown in "Latest notes" on the homepage
			category: z.string().optional(),
			// Thumbnail graphic in "Latest notes": an original inline SVG, not a photo
			thumb: z.enum(['chart', 'link', 'sparkle']).optional(),
		}),
});

const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		result: z.string(),
		type: z.string(),
		pubDate: z.coerce.date(),
		order: z.number().default(99),
		tools: z.array(z.string()).default([]),
		status: z.enum(['published', 'in-progress']).default('published'),
	}),
});

export const collections = { blog, caseStudies };