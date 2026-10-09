// Estimated reading time in minutes for a Markdown body, at ~220 words per minute
export function readingTime(markdown = '', wordsPerMinute = 220): number {
	const text = markdown
		.replace(/```[\s\S]*?```/g, ' ') // code blocks
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
		.replace(/\]\([^)]*\)/g, ']') // keep link text, drop URLs
		.replace(/<[^>]+>/g, ' ') // HTML tags
		.replace(/[#>*_`|[\]-]/g, ' '); // Markdown syntax
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}
