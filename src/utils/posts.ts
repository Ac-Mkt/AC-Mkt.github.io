import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Published (non-draft) posts, newest first
export async function getPosts() {
	return (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export const postUrl = (post: Post) => `/blog/${post.id}/`;

// "SEO basics" -> "seo-basics", used in ?topics=
export const topicSlug = (category: string) =>
	category
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
