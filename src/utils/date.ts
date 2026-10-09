// Formats a content date ("2026-10-07" in frontmatter) like "7 Oct 2026".
// Frontmatter dates are parsed as UTC midnight, so format in UTC too; otherwise a build
// machine west of Greenwich would show the previous day.
export function formatDate(date: Date, month: 'short' | 'long' = 'short'): string {
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month,
		year: 'numeric',
		timeZone: 'UTC',
	});
}

// "2026-10-07", for <time datetime>
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
