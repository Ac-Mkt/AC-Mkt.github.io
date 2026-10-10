// Generates /llms.txt: a plain-text summary of the site for AI assistants and answer engines.
// It updates itself whenever case studies or blog posts are published.
import type { APIRoute } from 'astro';
import { getCaseStudies, hasPage } from '../utils/cases';
import { getPosts } from '../utils/posts';

export const GET: APIRoute = async ({ site }) => {
	const base = (site ?? new URL('https://ac-mkt.github.io')).href.replace(/\/$/, '');

	const cases = (await getCaseStudies()).filter(hasPage);
	const posts = await getPosts();

	const lines = [
		'# Ana Carolina Gomes (ACmkt)',
		'',
		'> Portfolio of Ana Carolina Gomes, an SEO specialist based in Belo Horizonte, Brazil. She works across content, on-page and off-page SEO, Digital PR, brand visibility in AI search (GEO) and AI-assisted SEO workflows built with Claude Code and Python.',
		'',
		'Key facts:',
		'- Working in SEO since 2023: content and on-page SEO, then off-page SEO and Digital PR across international markets',
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
		`- [Skills](${base}/skills/): SEO and GEO, authority and Digital PR, AI and automation, tools and certifications`,
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
