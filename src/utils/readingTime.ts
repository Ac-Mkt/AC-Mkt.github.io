// Word count, reading time and ISO 8601 duration for a Markdown body, at ~220 words per minute

const WORDS_PER_MINUTE = 220;

export function wordCount(markdown = ''): number {
	const text = markdown
		.replace(/```[\s\S]*?```/g, ' ') // code blocks
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
		.replace(/\]\([^)]*\)/g, ']') // keep link text, drop URLs
		.replace(/<[^>]+>/g, ' ') // HTML tags
		.replace(/[#>*_`|[\]-]/g, ' '); // Markdown syntax
	return text.split(/\s+/).filter(Boolean).length;
}

// Minutes, rounded up, at least 1
export function readingTime(markdown = ''): number {
	return Math.max(1, Math.ceil(wordCount(markdown) / WORDS_PER_MINUTE));
}

// e.g. "PT9M", for schema.org timeRequired
export function readingDuration(markdown = ''): string {
	return `PT${readingTime(markdown)}M`;
}
