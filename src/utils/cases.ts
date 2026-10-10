import { getCollection, type CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'caseStudies'>;

export const CASE_TYPES = {
	professional: 'Professional',
	course: 'Course',
	personal: 'Personal',
} as const;

// Label used on a case study's own page
export const CASE_TYPE_LONG = {
	professional: 'Professional work',
	course: 'Course project',
	personal: 'Personal project',
} as const;

// A case study gets its own page only when it has a written body
export const hasPage = (entry: CaseStudy) => Boolean(entry.body?.trim());

export const caseUrl = (entry: CaseStudy) => `/case-studies/${entry.id}/`;

// Published (non-draft) case studies in display order
export async function getCaseStudies() {
	return (await getCollection('caseStudies', ({ data }) => !data.draft)).sort(
		(a, b) => a.data.order - b.data.order,
	);
}
