// Helpers for the JSON-LD graph printed by SchemaGraph.astro
import { getImage } from 'astro:assets';
import { AUTHOR, BLOG_ID, PERSON_ID, WEBSITE_ID } from '../data/author';

const FALLBACK_SITE = new URL('https://ac-mkt.github.io');

// Absolute URL for a site path ("/about/#person" -> "https://ac-mkt.github.io/about/#person")
export const absolute = (site: URL | undefined, path: string) => new URL(path, site ?? FALLBACK_SITE).href;

export const ids = (site: URL | undefined) => ({
	person: absolute(site, PERSON_ID),
	website: absolute(site, WEBSITE_ID),
	blog: absolute(site, BLOG_ID),
});

// The full Person entity (printed on the About page)
export async function personNode(site: URL | undefined) {
	const photo = await getImage({ src: AUTHOR.photo, width: 800, height: 800, format: 'jpg' });
	return {
		'@type': 'Person',
		'@id': ids(site).person,
		name: AUTHOR.name,
		url: absolute(site, AUTHOR.aboutUrl),
		image: absolute(site, photo.src),
		jobTitle: AUTHOR.jobTitle,
		description: AUTHOR.shortBio,
		address: { '@type': 'PostalAddress', ...AUTHOR.address },
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
