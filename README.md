# ACmkt: Ana Carolina Gomes, SEO & GEO

Source code of my portfolio, live at **[ac-mkt.github.io](https://ac-mkt.github.io)**.

I'm an SEO & GEO specialist based in Belo Horizonte, Brazil, working across content, on-page and off-page SEO, with a focus on link building and Digital PR. The site holds my case studies, skills, blog and CV.

## Built with

- [Astro](https://astro.build) (static site, no client-side framework)
- Markdown content collections for case studies and blog posts
- Self-hosted Hanken Grotesk font through Astro's font API
- GitHub Actions + GitHub Pages for deploys

## SEO and GEO built in

- Canonical URLs, Open Graph and Twitter card tags on every page
- One JSON-LD graph per page, linked by `@id`: `WebSite` everywhere; `ProfilePage` + `Person` (with `knowsAbout`, `hasCredential`, `worksFor`) on About; `BlogPosting`, `FAQPage` (read from the post's FAQ section) and `Blog` on the blog; `Article` and `CollectionPage` on case studies; `ContactPage`, `WebPage` and `BreadcrumbList` elsewhere
- XML sitemap, RSS feed and a `robots.txt` that welcomes AI search crawlers
- Auto-generated [`/llms.txt`](https://ac-mkt.github.io/llms.txt) summarizing the site for AI assistants
- Bylines, author box, word count and reading time on every post, from one author file

## Project structure

```text
public/                    CV, favicons, default social image, robots.txt
src/
├── assets/                Images processed by Astro (portrait, post covers)
├── components/
│   ├── BaseHead.astro     <head>: meta tags, social cards, font, JSON-LD
│   ├── SchemaGraph.astro  The page's JSON-LD graph
│   ├── Header.astro       Sticky header (+ MobileNav.astro, the floating menu on phones)
│   ├── Footer.astro
│   └── Collapsible.astro  Native <details> section used on phones (About, Skills)
├── content/
│   ├── blog/              Blog posts (Markdown)
│   └── case-studies/      Case studies (Markdown)
├── data/
│   ├── author.ts          Name, bio, links, experience, education, languages
│   └── skills.ts          Skill areas, "currently learning" and certifications
├── layouts/BlogPost.astro
├── pages/                 One file per route, plus 404, rss.xml and llms.txt
├── styles/global.css      Design tokens, base type, buttons and shared page styles
├── utils/                 Dates, reading time, posts, case studies, FAQ, schema helpers
├── consts.ts              Site title, description and navigation
└── content.config.ts      Frontmatter schemas
```

## Adding content

**Blog post:** add a Markdown file to `src/content/blog/`:

```yaml
---
title: 'Post title'
description: 'One or two sentences.'
pubDate: 2026-10-07
category: 'SEO basics' # becomes a topic filter on /blog/
image: '../../assets/my-cover.jpg' # a file in src/assets/
imageAlt: 'What the image shows'
# Optional: updatedDate, tags: ['...'], imageCredit, imageCreditUrl, draft: true
---
```

A `## FAQ` section with `### Question` headings is turned into `FAQPage` schema automatically.

**Case study:** add a Markdown file to `src/content/case-studies/`. Write a body to give it its own page; leave it empty to list it as a plain row.

```yaml
---
title: 'Case study title'
description: 'One-sentence summary.'
type: 'professional' # or 'course', 'personal'
order: 1 # lower numbers appear first
metric: { value: '250+', label: 'links per quarter' } # or:
# status: { label: 'In progress', tone: 'progress', note: 'Full write-up soon' }
pubDate: 2026-10-07
tools: ['Ahrefs', 'Python']
---
```

**Skills, experience, certifications:** edit `src/data/skills.ts` and `src/data/author.ts`. The pages, the schema and `llms.txt` all read from these files.

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
