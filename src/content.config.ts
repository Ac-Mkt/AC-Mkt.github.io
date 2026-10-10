import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Markdown files in src/content/blog/
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.string(),
			tags: z.array(z.string()).optional(),
			// Cover image (a file in src/assets) and its alt text
			image: image(),
			imageAlt: z.string(),
			// Photo credit shown under the cover image
			imageCredit: z.string().optional(),
			imageCreditUrl: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.md' }),
	// A case with a Markdown body gets its own page (/case-studies/<slug>/); one without
	// is listed as a plain, non-clickable row. See src/utils/cases.ts.
	schema: z.object({
		title: z.string(),
		description: z.string(),
		type: z.enum(['professional', 'course', 'personal']),
		order: z.number().default(99),
		draft: z.boolean().default(false),
		// Headline number shown on the right of the row
		metric: z.object({ value: z.string(), label: z.string() }).optional(),
		// Shown instead of a metric while the work isn't finished
		status: z
			.object({ label: z.string(), tone: z.enum(['progress', 'ongoing']), note: z.string() })
			.optional(),
		pubDate: z.coerce.date(),
		tools: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, caseStudies };