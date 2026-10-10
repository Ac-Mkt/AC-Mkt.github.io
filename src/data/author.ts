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
	cvUrl: '/Ana-Carolina-Gomes-CV.pdf',
	// From the Skills page data
	knowsAbout: [...new Set(SKILL_AREAS.flatMap((area) => [area.title, ...area.items]))],
	credentials: CERTIFICATIONS,
};

// About page facts (desktop sidebar and mobile sections both read these)
export const EXPERIENCE = [
	{ role: 'SEO Off-Page Specialist', company: 'Odds Scanner Group', dates: 'Jul 2024 – Present' },
	{ role: 'Junior Off-Page Specialist', company: 'Odds Scanner Group', dates: 'Sep 2023 – Jul 2024' },
	{ role: 'SEO Intern', company: 'GShield', dates: 'Feb 2023 – Sep 2023' },
	{ role: 'Marketing Intern', company: 'BrunSker Tecnologia', dates: 'Sep 2022 – Nov 2022' },
];

export const EDUCATION = {
	degree: 'Higher Education Degree (CST) in Marketing',
	school: 'Universidade Estácio de Sá',
	dates: '2022 – 2024',
};

export const LANGUAGES = [
	{ name: 'Portuguese', level: 'native' },
	{ name: 'English', level: 'C1' },
	{ name: 'Spanish', level: 'A1' },
];

// Schema ids (relative; SchemaGraph makes them absolute with Astro.site)
export const PERSON_ID = '/about/#person';
export const WEBSITE_ID = '/#website';
export const BLOG_ID = '/blog/#blog';
