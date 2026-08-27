# Weekly pregame developer note

Weekly content lives in `data/pregames.js`. Each record is the complete source for one briefing; the read-only presentation lives in `assets/js/pregame.js` and must not contain game-specific rules, mechanics, or crew copy.

## Create the next pregame

1. Copy the current object in `data/pregames.js` and give it a unique, URL-safe `slug`.
2. Replace the snapshot, crew, weekly focus, restricted-area or other focus details, coach briefing, rules references, and game-day notes. Do not add facts that were not supplied.
3. Copy `pregame/centennial-at-clovis-east-2026-08-27/index.html` to `pregame/<new-slug>/index.html`.
4. Change the copied page’s `data-pregame-slug`, title, and description. The slug must exactly match the data record. Its shareable route is `/pregame/<new-slug>/`.
5. Update the briefing link in `pages/webmaster.html`, then run the tests and open the direct route at phone and desktop widths.

Unknown or missing slugs do not fall back to another game. Static hosts should use `pregame/404.html` (or their normal 404 response) for nonexistent directories.

## Read-only contract

The Weekly Pregame is a crew reference, not a review-tracking workflow. Do not add quizzes, knowledge checks, acknowledgments, forms, checkboxes, confirmation controls, required responses, or completion tracking. It has no local or remote state and does not report crew activity.

## Rules content

Use concise, original rule summaries and cite the applicable rule numbers. Do not reproduce or fabricate NFHS rulebook quotations. Direct readers to the current authorized publication for official language and complete application.
