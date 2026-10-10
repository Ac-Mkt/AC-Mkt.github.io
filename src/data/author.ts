// The author: one source for the visible byline, author box and the Person schema
import portrait from '../assets/ana-carolina-gomes-color.jpg';
import { CERTIFICATIONS, SKILL_AREAS } from './skills';

export const AUTHOR = {
	name: 'Ana Carolina Gomes',
	jobTitle: 'SEO & GEO Specialist',
	location: 'Belo Horizonte, Brazil',
	address: { addressLocality: 'Belo Horizonte', addressRegion: 'MG', addressCountry: 'BR' },
	shortBio:
		'Almost four years in SEO across content, on-page and off-page, mostly in international, high-competition markets, with a focus on link building and Digital PR.',
	photo: portrait,
	aboutUrl: '/about/',
	caseStudiesUrl: '/case-studies/',
	linkedinUrl: 'https://www.linkedin.com/in/anacpsg',
	// From the Skills page data
	knowsAbout: [...new Set(SKILL_AREAS.flatMap((area) => [area.title, ...area.items]))],
	credentials: CERTIFICATIONS,
};

// Schema ids (relative; SchemaGraph makes them absolute with Astro.site)
export const PERSON_ID = '/about/#person';
export const WEBSITE_ID = '/#website';
export const BLOG_ID = '/blog/#blog';
