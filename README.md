# ACmkt: Ana Carolina Gomes, SEO & Digital PR

Source code of my portfolio, live at **[ac-mkt.github.io](https://ac-mkt.github.io)**.

I'm an SEO and Digital PR specialist based in Belo Horizonte, Brazil, working on link acquisition, media partnerships and AI-assisted SEO workflows. The site holds my case studies, skills, blog and CV.

## Built with

- [Astro](https://astro.build) (static site, no client-side framework)
- Markdown content collections for case studies and blog posts
- Self-hosted Hanken Grotesk font through Astro's font API
- GitHub Actions + GitHub Pages for deploys

## SEO and GEO built in

- Canonical URLs, Open Graph and Twitter card tags on every page
- JSON-LD schema: `WebSite`, `Person`, `WebPage`, `ProfilePage`, `BlogPosting`, `Article` and `BreadcrumbList`, linked by `@id`
- XML sitemap, RSS feed and a `robots.txt` that welcomes AI search crawlers
- Auto-generated [`/llms.txt`](https://ac-mkt.github.io/llms.txt) summarizing the site for AI assistants
- Table of contents, author box and dated bylines on blog posts

## Project structure

```text
public/                  Static files: CV, favicon, default social image, robots.txt
src/
├── components/          BaseHead (meta + schema), Header, Footer, CaseList
├── content/
│   ├── blog/            Blog posts (Markdown)
│   └── case-studies/    Case studies (Markdown)
├── layouts/BlogPost.astro
├── pages/               One file per route, plus rss.xml and llms.txt
├── styles/global.css    Palette, typography and shared styles
├── consts.ts            Site title, description and certifications
└── content.config.ts    Frontmatter schemas
```

## Adding content

**Case study:** add a Markdown file to `src/content/case-studies/`:

```yaml
---
title: 'Case study title'
description: 'One-sentence summary.'
result: 'Headline result'
type: 'Professional work' # or 'Course project', 'Personal project'
pubDate: 2026-10-07
order: 1 # lower numbers appear first; the first three are featured on Home
tools: ['Ahrefs', 'Python']
status: 'published' # 'in-progress' lists it without a page
---
```

**Blog post:** add a Markdown file to `src/content/blog/` with `title`, `description` and `pubDate`. Optional: `updatedDate`, `heroImage` (a file in `src/assets/`), `heroImageAlt`, `heroImageCredit` and `heroImageCreditUrl`.

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies (Node 22.12 or newer) |
| `npm run dev`     | Start the dev server at `localhost:4321`   |
| `npm run build`   | Build the site to `./dist/`                |
| `npm run preview` | Preview the build locally                  |

Every push to `main` builds and deploys the site to GitHub Pages.

## Contact

[LinkedIn](https://www.linkedin.com/in/anacpsg) · [contato.carolpss@gmail.com](mailto:contato.carolpss@gmail.com)

Based on Astro's blog starter, itself based on [Bear Blog](https://github.com/HermanMartinus/bearblog/).
