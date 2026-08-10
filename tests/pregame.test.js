const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pregames = require('../data/pregames.js');
const { storageKey, scoreQuiz, canComplete } = require('../assets/js/pregame-core.js');

const root = path.join(__dirname, '..');
const game = pregames[0];

test('valid direct route and required structured content exist', () => {
  const route = path.join(root, 'pregame', game.slug, 'index.html');
  assert.ok(fs.existsSync(route));
  assert.match(fs.readFileSync(route, 'utf8'), new RegExp(`data-pregame-slug="${game.slug}"`));
  assert.ok(game.snapshot.matchup && game.snapshot.date && game.snapshot.kickoff && game.snapshot.venue);
  assert.equal(game.crew.length, 7);
  assert.ok(game.rulesFocus.title && game.mechanicsFocus.title);
});

test('homepage links to a webmaster page that links to the sample template', () => {
  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const webmaster = fs.readFileSync(path.join(root, 'pages/webmaster.html'), 'utf8');
  assert.match(homepage, /href="pages\/webmaster\.html"/);
  assert.match(webmaster, new RegExp(`href="../pregame/${game.slug}/"`));
});

test('missing and unknown routes have an explicit not-found state', () => {
  for (const file of ['pregame/index.html', 'pregame/404.html']) assert.match(fs.readFileSync(path.join(root, file), 'utf8'), /not (?:found|available)|required/i);
  assert.equal(pregames.find((item) => item.slug === 'unknown-game'), undefined);
});

test('optional fields are conditionally rendered and optional situation is guarded', () => {
  const source = fs.readFileSync(path.join(root, 'assets/js/pregame.js'), 'utf8');
  assert.match(source, /facts = .*\.filter/);
  assert.match(source, /game\.playSituation \?/);
  assert.match(source, /No special game modifications have been reported/);
});

test('quiz scores answers and acknowledgment requires receipt and a crew member', () => {
  const correct = Object.fromEntries(game.quiz.map((question) => [question.id, question.answer]));
  assert.equal(scoreQuiz(game.quiz, correct), 5);
  correct.q1 = 99;
  assert.equal(scoreQuiz(game.quiz, correct), 4);
  assert.equal(canComplete(false, 'Referee — Alex Morgan'), false);
  assert.equal(canComplete(true, ''), false);
  assert.equal(canComplete(true, 'Referee — Alex Morgan'), true);
});

test('pregame header has no navigation and shortcuts target site information and acknowledgment', () => {
  const page = fs.readFileSync(path.join(root, 'pregame', game.slug, 'index.html'), 'utf8');
  const source = fs.readFileSync(path.join(root, 'assets/js/pregame.js'), 'utf8');
  assert.doesNotMatch(page, /<nav|nav-toggle/);
  assert.match(source, /href="#site-information">Site information/);
  assert.match(source, /href="#crew-acknowledgment">Crew acknowledgment/);
  assert.match(source, /data-acknowledged/);
  assert.match(source, /data-crew-member/);
});

test('local storage keys are unique by pregame and area', () => {
  assert.notEqual(storageKey(game.slug, 'quiz'), storageKey('next-game', 'quiz'));
  assert.notEqual(storageKey(game.slug, 'quiz'), storageKey(game.slug, 'recap'));
});

test('question draft and clipboard fallback are wired', () => {
  const source = fs.readFileSync(path.join(root, 'assets/js/pregame.js'), 'utf8');
  assert.match(source, /get\('question'/);
  assert.match(source, /navigator\.clipboard\.writeText/);
  assert.match(source, /execCommand\('copy'\)/);
});

test('mobile overflow and print rules are present', () => {
  const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert.match(css, /@media\(max-width:430px\)/);
  assert.match(css, /overflow-wrap:anywhere/);
  assert.match(css, /@media print/);
});
