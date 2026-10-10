// Helpers for the JSON-LD graph printed by SchemaGraph.astro
import { getImage } from 'astro:assets';
import { AUTHOR, BLOG_ID, EDUCATION, EXPERIENCE, LANGUAGES, PERSON_ID, WEBSITE_ID } from '../data/author';

const FALLBACK_SITE = new URL('https://ac-mkt.github.io');

// Absolute URL for a site path ("/about/#person" -> "https://ac-mkt.github.io/about/#person")
export const absolute = (site: URL | undefined, path: string) => new URL(path, site ?? FALLBACK_SITE).href;

export const ids = (site: URL | undefined) => ({
	person: absolute(site, PERSON_ID),
	website: absolute(site, WEBSITE_ID),
	blog: absolute(site, BLOG_ID),
});

// BreadcrumbList from [name, path] pairs, e.g. [['Home', '/'], ['Skills', '/skills/']]
export const breadcrumb = (site: URL | undefined, items: [string, string][]) => ({
	'@type': 'BreadcrumbList',
	itemListElement: items.map(([name, path], i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name,
		item: absolute(site, path),
	})),
});

// The page itself (WebPage, ContactPage, CollectionPage...), about the author
export const pageNode = (
	site: URL | undefined,
	{ path, name, description, type = 'WebPage', extra = {} }: {
		path: string;
		name: string;
		description: string;
		type?: string;
		extra?: Record<string, unknown>;
	},
) => {
	const url = absolute(site, path);
	return {
		'@type': type,
		'@id': `${url}#webpage`,
		url,
		name,
		description,
		inLanguage: 'en',
		isPartOf: { '@id': ids(site).website },
		about: { '@id': ids(site).person },
		...extra,
	};
};

// The full Person entity (printed on the About page)
export async function personNode(site: URL | undefined) {
	const photo = await getImage({ src: AUTHOR.photo, width: 800, height: 800, format: 'jpg' });
	const current = EXPERIENCE.find((job) => job.dates.endsWith('Present'));
	return {
		'@type': 'Person',
		'@id': ids(site).person,
		name: AUTHOR.name,
		url: absolute(site, AUTHOR.aboutUrl),
		image: absolute(site, photo.src),
		jobTitle: AUTHOR.jobTitle,
		description: AUTHOR.shortBio,
		address: { '@type': 'PostalAddress', ...AUTHOR.address },
		// Facts shown on the About page
		...(current ? { worksFor: { '@type': 'Organization', name: current.company } } : {}),
		alumniOf: { '@type': 'CollegeOrUniversity', name: EDUCATION.school },
		knowsLanguage: LANGUAGES.map((language) => language.name),
		knowsAbout: AUTHOR.knowsAbout,
		hasCredential: AUTHOR.credentials.map((cert) => ({
			'@type': 'EducationalOccupationalCredential',
			name: cert.name,
			...(cert.url ? { url: cert.url } : {}),
			recognizedBy: { '@type': 'Organization', name: cert.issuer },
		})),
		sameAs: [AUTHOR.linkedinUrl],
	};
}

// Short author reference used by posts
export const authorRef = (site: URL | undefined) => ({
	'@id': ids(site).person,
	'@type': 'Person',
	name: AUTHOR.name,
	url: absolute(site, AUTHOR.aboutUrl),
});
