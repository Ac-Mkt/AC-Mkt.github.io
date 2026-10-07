// Generates /llms.txt: a plain-text summary of the site for AI assistants and answer engines.
// It updates itself whenever case studies or blog posts are published.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	const base = (site ?? new URL('https://ac-mkt.github.io')).href.replace(/\/$/, '');

	const cases = (await getCollection('caseStudies', ({ data }) => data.status === 'published')).sort(
		(a, b) => a.data.order - b.data.order,
	);
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const lines = [
		'# Ana Carolina Gomes (ACmkt)',
		'',
		'> Portfolio of Ana Carolina Gomes, an SEO and Digital PR specialist based in Belo Horizonte, Brazil. She works on link acquisition, media partnerships, on-page SEO, Generative Engine Optimization (GEO) and AI-assisted SEO workflows built with Claude Code and Python.',
		'',
		'Key facts:',
		'- Secures 250 to 300 high-authority backlinks per quarter across international markets',
		'- Reduced the average cost per link by 25% through outreach and negotiation',
		'- Manages relationships with 20+ media and affiliate partners',
		'- Certifications: GenAI for SEO (IBM, 2026), Mastering Digital PR (Semrush, 2025), Content Optimization Masterclass (Surfer, 2025)',
		'- Languages: Portuguese (native), English (C1), Spanish (A1)',
		'',
		'## Pages',
		'',
		`- [About](${base}/about/): background, experience, education and languages`,
		`- [Case studies](${base}/case-studies/): professional work, course projects and personal builds`,
		`- [Skills](${base}/skills/): off-page SEO, Digital PR, SEO and GEO, AI and automation, tools and certifications`,
		`- [Contact](${base}/contact/): email and LinkedIn`,
	];

	if (cases.length > 0) {
		lines.push('', '## Case studies', '');
		for (const entry of cases) {
			lines.push(`- [${entry.data.title}](${base}/case-studies/${entry.id}/): ${entry.data.description}`);
		}
	}

	if (posts.length > 0) {
		lines.push('', '## Blog', '');
		for (const post of posts) {
			lines.push(`- [${post.data.title}](${base}/blog/${post.id}/): ${post.data.description}`);
		}
	}

	lines.push('', '## Optional', '', '- [LinkedIn](https://www.linkedin.com/in/anacpsg)', '');

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
