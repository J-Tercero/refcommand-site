# RefCommand

RefCommand is a practical command center for high school football officials, crews, referees, and local officiating associations. It is being built to make pregame preparation, rules study, local football context, and useful references easier to reach on game day.

## Current status

The public 2026-season foundation is live as a static site. The homepage and destination pages establish the product structure, but interactive pregame tools, quizzes, curated references, news, scores, and rankings are intentionally not populated yet. RefCommand does not invent live, editorial, or rules content.

## Run locally

Open `index.html` directly in a modern browser, or serve the repository with any static file server. No dependencies, build process, or environment variables are required.

## Structure

```text
assets/       Shared CSS, JavaScript, and local images
data/         Reserved structured content for future quizzes and resources
docs/         Product, roadmap, and design documentation
pages/        Public destination pages
.github/      Contribution and pull-request templates
index.html    Public homepage
```

## GitHub Pages deployment

Publish this repository from the branch and folder that contain `index.html` (normally the repository root). All paths are relative, so the site works at a GitHub Pages project URL and when opened locally.

## Contributing

1. Create a focused branch.
2. Keep the site dependency-free and use relative paths.
3. Check desktop and mobile layouts, links, and keyboard navigation.
4. Open a pull request using the provided template.

## Current limitations

This release has no backend, accounts, live data feed, database, API integration, or publishing workflow. Consult official governing-body materials for authoritative rules guidance. RefCommand is independent and not affiliated with, endorsed by, or sponsored by NFHS.
