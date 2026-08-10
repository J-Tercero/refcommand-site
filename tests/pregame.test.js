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

test('quiz scores answers and completion cannot be premature', () => {
  const correct = Object.fromEntries(game.quiz.map((question) => [question.id, question.answer]));
  assert.equal(scoreQuiz(game.quiz, correct), 5);
  correct.q1 = 99;
  assert.equal(scoreQuiz(game.quiz, correct), 4);
  const everyBox = game.acknowledgments.map((_, index) => index);
  assert.equal(canComplete(game.acknowledgments, everyBox, false), false);
  assert.equal(canComplete(game.acknowledgments, everyBox.slice(1), true), false);
  assert.equal(canComplete(game.acknowledgments, everyBox, true), true);
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
