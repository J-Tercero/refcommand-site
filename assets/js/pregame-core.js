(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PregameCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const storageKey = (slug, area) => `refcommand:pregame:${slug}:${area}`;
  const scoreQuiz = (questions, answers) => questions.reduce((score, question) => score + (answers[question.id] === question.answer ? 1 : 0), 0);
  const canComplete = (acknowledged, crewMember) => acknowledged && Boolean(crewMember);
  return { storageKey, scoreQuiz, canComplete };
}));
