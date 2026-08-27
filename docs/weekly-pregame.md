# Weekly pregame developer note

Weekly content lives in `data/pregames.js`. Each record is the complete source for one briefing; the read-only presentation lives in `assets/js/pregame.js` and must not contain game-specific rules, mechanics, or crew copy.

## Create the next pregame

1. Copy the preserved Central at Clovis West template object in `data/pregames.js` and give it a unique, URL-safe `slug`, or use its structure as a reference when building a read-only briefing.
2. Replace the snapshot, crew, weekly focus, restricted-area or other focus details, coach briefing, rules references, and game-day notes. Do not add facts that were not supplied.
3. Copy `pregame/central-at-clovis-west-2026-09-18/index.html` for the full interactive template or `pregame/centennial-at-clovis-east-2026-08-27/index.html` for a read-only briefing. Keep the corresponding renderer script used by the copied page.
4. Change the copied page’s `data-pregame-slug`, title, and description. The slug must exactly match the data record. Its shareable route is `/pregame/<new-slug>/`.
5. Update the briefing link in `pages/webmaster.html`, then run the tests and open the direct route at phone and desktop widths.

Unknown or missing slugs do not fall back to another game. Static hosts should use `pregame/404.html` (or their normal 404 response) for nonexistent directories.

## Preserved template and active game

The Central at Clovis West route is the preserved, full-featured sample template for building future game pages. It uses `assets/js/pregame-template.js` and retains the original quiz, acknowledgment, question draft, and recap interactions.

The Clovis East vs. Centennial-Bakersfield route is the active read-only crew reference. It uses `assets/js/pregame.js` and has no quizzes, knowledge checks, acknowledgments, forms, checkboxes, confirmation controls, required responses, completion tracking, or reporting.

## Rules content

Use concise, original rule summaries and cite the applicable rule numbers. Do not reproduce or fabricate NFHS rulebook quotations. Direct readers to the current authorized publication for official language and complete application.
