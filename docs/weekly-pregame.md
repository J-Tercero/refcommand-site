# Weekly pregame developer note

Weekly content lives in `data/pregames.js`. Each record is the complete source for one briefing; presentation and interactions live in `assets/js/pregame.js` and must not contain weekly rules, mechanics, crew, or quiz copy.

## Create the next pregame

1. Copy the sample object in `data/pregames.js` and give it a unique, URL-safe `slug`.
2. Change its snapshot, referee message, game notes, crew, focuses, optional situation, five quiz questions, acknowledgments, and recap items. Keep each quiz question ID unique inside the record.
3. Copy `pregame/central-at-clovis-west-2026-09-18/index.html` to `pregame/<new-slug>/index.html`.
4. Change the copied page’s `data-pregame-slug`, title, and description. The slug must exactly match the data record. Its shareable route is `/pregame/<new-slug>/`.
5. Optionally add the new briefing to `pages/pregame.html`, then run the tests and open the direct route at phone and desktop widths.

Unknown or missing slugs do not fall back to the sample. Static hosts should use `pregame/404.html` (or their normal 404 response) for nonexistent directories.

## Optional fields

Snapshot address, evaluator, contact, weather, parking, uniform, and meeting values may be omitted. Crew `duty` and `more`, rules/mechanics `more`, and the entire `playSituation` may also be omitted. An empty or omitted `gameInformation` array displays the explicit no-modifications message. Omitted optional values do not render empty fact rows.

## Local state and future APIs

Quiz answers, acknowledgment checks, completion timestamp, question draft, and recap checks use `localStorage` keys shaped as `refcommand:pregame:<slug>:<area>`. State is device/browser-specific, is not authenticated, and is not reported to a referee. The pure helpers in `assets/js/pregame-core.js` keep quiz scoring and completion eligibility separate from rendering.

A future completion API can be called after the eligibility check in the `[data-complete]` handler in `assets/js/pregame.js`. A future question endpoint can replace the clipboard handler without changing the field or local draft behavior. Both integrations must provide real authentication, failure states, and explicit reporting language before the interface claims submission.
