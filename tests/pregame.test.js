const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pregames = require('../data/pregames.js');

const root = path.join(__dirname, '..');
const game = pregames[0];
const source = fs.readFileSync(path.join(root, 'assets/js/pregame.js'), 'utf8');

test('actual game has a valid direct route and complete snapshot', () => {
  const route = path.join(root, 'pregame', game.slug, 'index.html');
  assert.ok(fs.existsSync(route));
  assert.match(fs.readFileSync(route, 'utf8'), new RegExp(`data-pregame-slug="${game.slug}"`));
  assert.equal(game.snapshot.matchup, 'Clovis East vs. Centennial-Bakersfield');
  assert.equal(game.snapshot.date, 'Thursday, August 27, 2026');
  assert.equal(game.snapshot.kickoff, '4:00 PM');
  assert.equal(game.snapshot.venue, 'Clovis East High School');
});

test('five-person crew and sideline responsibilities are present', () => {
  assert.equal(game.crew.length, 5);
  assert.deepEqual(game.crew.map(({ position }) => position), ['Referee', 'Umpire', 'Down Judge', 'Line Judge', 'Back Judge']);
  assert.ok(game.crew.every(({ name, responsibilities }) => name && responsibilities.length >= 2));
  assert.match(game.focus.title, /Sideline Management/i);
  assert.equal(game.coachBriefing.length, 4);
});

test('briefing is read-only with no review tracking controls', () => {
  for (const forbidden of ['<form', '<button', '<input', '<textarea', '<select', 'localStorage', 'data-quiz', 'acknowledgment']) {
    assert.doesNotMatch(source, new RegExp(forbidden, 'i'));
  }
  assert.match(source, /Restricted Area/);
  assert.match(source, /Coach Briefing/);
  assert.match(source, /Crew Responsibilities/);
  assert.match(source, /Game-Day Notes/);
});

test('NFHS references are concise summaries rather than fabricated quotations', () => {
  assert.deepEqual(game.rules.map(({ citation }) => citation), ['NFHS Rule 1-2-3g', 'NFHS Rule 9-8-1k']);
  assert.ok(game.rules.every(({ summary }) => summary && !summary.includes('“') && !summary.includes('"')));
  assert.match(source, /Consult the current authorized NFHS Football Rules publication/);
});

test('webmaster page links to the current briefing rather than demo data', () => {
  const webmaster = fs.readFileSync(path.join(root, 'pages/webmaster.html'), 'utf8');
  assert.match(webmaster, new RegExp(`href="../pregame/${game.slug}/"`));
  assert.doesNotMatch(webmaster, /Central at Clovis West/);
  assert.doesNotMatch(JSON.stringify(pregames), /Alex Morgan|Veterans Memorial|weather|evaluator/i);
});

test('mobile overflow and print rules are present', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert.match(css, /@media\(max-width:430px\)/);
  assert.match(css, /overflow-wrap:anywhere/);
  assert.match(css, /@media print/);
});
