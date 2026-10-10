// Skills page data, also used for the Person schema in BaseHead.astro (knowsAbout, hasCredential)

export interface SkillArea {
	title: string;
	description: string;
	items: string[];
}

export interface Certification {
	name: string;
	issuer: string;
	year: string;
	// Certificate verification link. Rows without a URL show as plain text (no "View certificate").
	url?: string;
}

export const SKILL_AREAS: SkillArea[] = [
	{
		title: 'SEO and GEO',
		description: 'Making content easy to find, understand and cite, for search engines and AI answers.',
		items: [
			'On-page SEO',
			'Keyword research and search intent',
			'Schema markup (JSON-LD)',
			'Generative Engine Optimization (GEO)',
			'Answer Engine Optimization (AEO)',
			'Google AI Overviews',
		],
	},
	{
		title: 'Authority and Digital PR',
		description: 'Building brand authority through links, media coverage and long-term partnerships.',
		items: [
			'Link building',
			'Digital PR',
			'Outreach',
			'Partner negotiation',
			'Competitive backlink analysis',
			'Content briefs',
		],
	},
	{
		title: 'AI and automation',
		description: 'Building workflows that make SEO operations faster, more consistent and safer.',
		items: ['Claude Code', 'Python (openpyxl)', 'Prompt engineering', 'ChatGPT', 'Gemini', 'Perplexity'],
	},
	{
		title: 'Tools and analytics',
		description: 'The platforms I use day to day for research, tracking and reporting.',
		items: ['Ahrefs', 'Semrush', 'Google Search Console', 'Google Analytics', 'Excel'],
	},
];

export const LEARNING: SkillArea = {
	title: 'Currently learning',
	description: 'Where I am investing my study time right now.',
	items: ['Technical SEO', 'SQL', 'BigQuery', 'Looker Studio'],
};

export const CERTIFICATIONS_INTRO = {
	title: 'Certifications',
	description: 'Courses completed, with links to verify them.',
};

export const CERTIFICATIONS: Certification[] = [
	// TODO: add the certificate verification URLs
	{ name: 'GenAI for SEO: A Hands-On Playbook', issuer: 'IBM', year: '2026', url: undefined },
	{ name: 'Mastering Digital PR with Brian Dean', issuer: 'Semrush', year: '2025', url: undefined },
	{ name: 'Content Optimization Masterclass', issuer: 'Surfer', year: '2025', url: undefined },
];
