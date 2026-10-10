// Generates /llms.txt: a plain-text summary of the site for AI assistants and answer engines.
// Built from the same data as the pages (author, skills, case studies, posts), so it stays current.
import type { APIRoute } from 'astro';
import { AUTHOR, EDUCATION, EXPERIENCE, LANGUAGES } from '../data/author';
import { CERTIFICATIONS, SKILL_AREAS } from '../data/skills';
import { caseUrl, getCaseStudies, hasPage } from '../utils/cases';
import { getPosts, postUrl } from '../utils/posts';

export const GET: APIRoute = async ({ site }) => {
	const base = (site ?? new URL('https://ac-mkt.github.io')).href.replace(/\/$/, '');
	const current = EXPERIENCE.find((job) => job.dates.endsWith('Present'));

	const cases = (await getCaseStudies()).filter(hasPage);
	const posts = await getPosts();

	const lines = [
		`# ${AUTHOR.name} (ACmkt)`,
		'',
		`> ${AUTHOR.name} is an ${AUTHOR.jobTitle} based in ${AUTHOR.location}. ${AUTHOR.shortBio}`,
		'',
		'Key facts:',
		...(current ? [`- Current role: ${current.role} at ${current.company} (${current.dates})`] : []),
		'- Secures 250 to 300 high-authority links per quarter across international markets',
		'- Reduced the average cost per link by 25% through outreach and negotiation',
		'- Manages relationships with 20+ media and affiliate partners',
		`- Skill areas: ${SKILL_AREAS.map((area) => area.title).join(', ')}`,
		`- Certifications: ${CERTIFICATIONS.map((c) => `${c.name} (${c.issuer}, ${c.year})`).join('; ')}`,
		`- Education: ${EDUCATION.degree}, ${EDUCATION.school} (${EDUCATION.dates})`,
		`- Languages: ${LANGUAGES.map((l) => `${l.name} (${l.level})`).join(', ')}`,
		'',
		'## Pages',
		'',
		`- [About](${base}/about/): background, experience, education and languages`,
		`- [Case studies](${base}/case-studies/): professional work, course projects and personal builds`,
		`- [Skills](${base}/skills/): skill areas, tools and certifications`,
		`- [Blog](${base}/blog/): practical guides to SEO, GEO and link building`,
		`- [Contact](${base}/contact/): email and LinkedIn`,
	];

	if (cases.length > 0) {
		lines.push('', '## Case studies', '');
		for (const entry of cases) {
			lines.push(`- [${entry.data.title}](${base}${caseUrl(entry)}): ${entry.data.description}`);
		}
	}

	if (posts.length > 0) {
		lines.push('', '## Blog', '');
		for (const post of posts) {
			lines.push(`- [${post.data.title}](${base}${postUrl(post)}): ${post.data.description}`);
		}
	}

	lines.push('', '## Optional', '', `- [LinkedIn](${AUTHOR.linkedinUrl})`, `- Email: ${AUTHOR.email}`, '');

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
