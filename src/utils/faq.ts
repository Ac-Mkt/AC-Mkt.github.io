// Reads the questions and answers from a post's "## FAQ" section (### question, then the answer),
// so the FAQPage schema always matches what the reader sees.

export interface FaqItem {
	question: string;
	answer: string;
}

const plain = (markdown: string) =>
	markdown
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> link text
		.replace(/[*_`]/g, '') // emphasis and code marks
		.replace(/\s+/g, ' ')
		.trim();

export function extractFaq(markdown = ''): FaqItem[] {
	const section = markdown.match(/^##\s+(?:FAQ|Frequently asked questions)\s*$([\s\S]*?)(?=^##\s|$(?![\s\S]))/im);
	if (!section) return [];

	return section[1]
		.split(/^###\s+/m)
		.slice(1)
		.map((block) => {
			const [question, ...answer] = block.split('\n');
			return { question: plain(question), answer: plain(answer.join('\n')) };
		})
		.filter((item) => item.question && item.answer);
}
