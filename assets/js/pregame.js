(function () {
  const app = document.querySelector('[data-pregame-app]');
  if (!app) return;
  const slug = document.body.dataset.pregameSlug;
  const game = (window.refCommandPregames || []).find((item) => item.slug === slug);
  const { storageKey, scoreQuiz, canComplete } = window.PregameCore;
  const escape = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const get = (area, fallback) => { try { return JSON.parse(localStorage.getItem(storageKey(slug, area))) ?? fallback; } catch (_) { return fallback; } };
  const set = (area, value) => { try { localStorage.setItem(storageKey(slug, area), JSON.stringify(value)); } catch (_) {} };
  const detail = (text) => text ? `<details class="pregame-more"><summary>More</summary><p>${escape(text)}</p></details>` : '';
  if (!game) {
    document.title = 'Pregame not found | RefCommand';
    app.innerHTML = '<section class="section"><div class="shell empty-state"><p class="eyebrow">404 · Pregame not found</p><h1>That pregame is not available.</h1><p>Check the shared address. No other game has been loaded.</p></div></section>';
    return;
  }
  const s = game.snapshot;
  const facts = [['Date', s.date], ['Kickoff', s.kickoff], ['Crew arrival', s.arrival], ['Pregame', s.meeting], ['Parking', s.parking], ['Uniform', s.uniform], ['Weather', s.weather], ['Evaluator / observer', s.evaluator], ['Important contact', s.contact]].filter(([, value]) => value);
  const info = game.gameInformation?.length ? game.gameInformation.map((item) => `<li><strong>${escape(item.label)}</strong><span>${escape(item.text)}</span></li>`).join('') : '<li><span>No special game modifications have been reported.</span></li>';
  app.innerHTML = `<article class="pregame-page">
    <header class="pregame-hero"><div class="shell"><p class="pregame-label">Weekly pregame · 8–12 minute review</p><h1>${escape(s.matchup)}</h1><p>${escape(s.level)}</p><nav class="pregame-jump" aria-label="Pregame shortcuts"><a href="#game-information">Game information</a><a href="#site-information">Site information</a><a href="#crew-acknowledgment">Crew acknowledgment</a></nav></div></header>
    <div class="shell pregame-content"><section class="pregame-group" id="game-information"><p class="pregame-group-number">01</p><h2>Game Information</h2>
      <section class="boarding-pass" aria-labelledby="snapshot-title"><div class="boarding-pass__top"><div><p class="pregame-label">Game snapshot</p><h3 id="snapshot-title">${escape(s.matchup)}</h3><p>${escape(s.level)}</p></div><div class="kickoff"><span>Kickoff</span><strong>${escape(s.kickoff)}</strong></div></div>
      <div class="venue"><div><span>Venue</span><strong>${escape(s.venue)}</strong>${s.address ? `<p>${escape(s.address)}</p>` : ''}</div>${s.address ? `<a class="pregame-button pregame-button--light" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}">Open directions</a>` : ''}</div><dl class="snapshot-grid">${facts.map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl><div class="snapshot-roster"><h4>Crew roster</h4><ul>${game.crew.map((member) => `<li><span>${escape(member.position)}</span><strong>${escape(member.name)}</strong></li>`).join('')}</ul></div></section>
      <section class="pregame-card referee-message"><p class="pregame-label">Referee’s message</p><h3>Set the tone</h3><blockquote>${escape(game.refereeMessage)}</blockquote></section>
      <section class="pregame-card" id="site-information"><p class="pregame-label">School, assigner & association notes</p><h3>Site information</h3><ul class="brief-items">${info}</ul></section></section>
    <section class="pregame-group" id="crew-preparation"><p class="pregame-group-number">02</p><h2>Crew Preparation</h2><section><p class="pregame-label">Weekly individual priorities</p><h3>Position Points of Emphasis</h3><div class="crew-grid">${game.crew.map((member) => `<article class="crew-card"><header><div><span>${escape(member.position)}</span><h4>${escape(member.name)}</h4></div><b aria-hidden="true">${escape(member.position.split(' ').map((word) => word[0]).join(''))}</b></header><ul>${member.emphasis.map((point) => `<li>${escape(point)}</li>`).join('')}</ul>${member.duty ? `<p class="crew-duty"><strong>Game duty:</strong> ${escape(member.duty)}</p>` : ''}${detail(member.more)}</article>`).join('')}</div></section>
      <section class="pregame-card question-card"><p class="pregame-label">Before game day</p><h3>Questions for the Referee</h3><label for="pregame-question">Draft an optional question</label><textarea id="pregame-question" rows="4" placeholder="Type a question to copy into a text or email…"></textarea><div class="inline-action"><button class="pregame-button" type="button" data-copy-question>Copy Question</button><span role="status" data-copy-status>Your draft stays on this device.</span></div></section></section>
    <section class="pregame-group" id="weekly-training"><p class="pregame-group-number">03</p><h2>Weekly Training</h2>
      <div class="training-grid"><section class="pregame-card focus-card"><p class="pregame-label">Rules focus of the week</p><h3>${escape(game.rulesFocus.title)}</h3><p>${escape(game.rulesFocus.explanation)}</p><h4>Why it matters</h4><p>${escape(game.rulesFocus.why)}</p><h4>Game situations</h4><ul>${game.rulesFocus.situations.map((item) => `<li>${escape(item)}</li>`).join('')}</ul><div class="ruling"><strong>Correct ruling</strong><p>${escape(game.rulesFocus.ruling)}</p></div><h4>Enforcement summary</h4><p>${escape(game.rulesFocus.enforcement)}</p><p class="citation"><strong>Reference:</strong> ${escape(game.rulesFocus.citation)}</p>${detail(game.rulesFocus.more)}</section>
      <section class="pregame-card focus-card"><p class="pregame-label">Mechanics focus of the week</p><h3>${escape(game.mechanicsFocus.title)}</h3><h4>Good execution</h4><p>${escape(game.mechanicsFocus.execution)}</p><h4>Principally involved</h4><p>${escape(game.mechanicsFocus.positions.join(', '))}</p><h4>Common mistakes</h4><ul>${game.mechanicsFocus.mistakes.map((item) => `<li>${escape(item)}</li>`).join('')}</ul><h4>Required communication</h4><p>${escape(game.mechanicsFocus.communication)}</p>${detail(game.mechanicsFocus.more)}</section></div>
      ${game.playSituation ? `<section class="pregame-card situation"><p class="pregame-label">Film or play situation · Written play</p><h3>${escape(game.playSituation.title)}</h3><p>${escape(game.playSituation.situation)}</p><p class="situation-prompt">${escape(game.playSituation.prompt)}</p><details><summary>Reveal ruling</summary><div class="answer-panel"><h4>Correct ruling</h4><p>${escape(game.playSituation.ruling)}</p><h4>Explanation</h4><p>${escape(game.playSituation.explanation)}</p><h4>Position observations</h4><ul>${game.playSituation.observations.map((item) => `<li>${escape(item)}</li>`).join('')}</ul></div></details></section>` : ''}
      <section class="pregame-card quiz" data-quiz><p class="pregame-label">Five questions · Saved on this device</p><h3>Short Knowledge Check</h3><div data-quiz-questions></div><div class="quiz-summary" data-quiz-summary aria-live="polite"></div></section>
      <section class="pregame-card acknowledgment" id="crew-acknowledgment" data-ack><p class="pregame-label">Final review</p><h3>Crew Acknowledgment</h3><form data-ack-form><label class="check-row"><input type="checkbox" data-acknowledged><span>${escape(game.acknowledgment)}</span></label><label class="ack-select" for="crew-member">Position and name</label><select id="crew-member" data-crew-member><option value="">Select your position and name</option>${game.crew.map((member) => `<option value="${escape(member.position)} — ${escape(member.name)}">${escape(member.position)} — ${escape(member.name)}</option>`).join('')}</select><p class="completion-help" data-completion-help role="status"></p><button class="pregame-button" type="submit" data-complete>Submit Acknowledgment</button></form><div class="completion-confirmation" data-completion-confirmation hidden></div></section></section>
    <section class="pregame-group recap-group" id="game-day-recap"><p class="pregame-group-number">04</p><h2>Game-Day Recap</h2><section class="recap-card"><p class="pregame-label">Approximately 10 minutes · Locally saved</p><h3>Referee Game-Day Checklist</h3><p>Use this short parking-lot recap with the full crew.</p><div data-recap-list></div></section></section></div></article>`;

  const answers = get('quiz', {});
  const quizComplete = () => game.quiz.every((question) => Object.hasOwn(answers, question.id));
  const renderQuiz = () => {
    app.querySelector('[data-quiz-questions]').innerHTML = game.quiz.map((question, index) => { const selected = answers[question.id]; const answered = selected !== undefined; return `<fieldset class="quiz-question ${answered ? (selected === question.answer ? 'is-correct' : 'is-incorrect') : 'is-unanswered'}"><legend><span>${escape(question.category)} · ${index + 1} of ${game.quiz.length}</span>${escape(question.prompt)}</legend>${question.choices.map((choice, choiceIndex) => `<label><input type="radio" name="${escape(question.id)}" value="${choiceIndex}" ${selected === choiceIndex ? 'checked' : ''} ${answered ? 'disabled' : ''}><span>${escape(choice)}</span></label>`).join('')}<button type="button" class="pregame-button pregame-button--small" data-submit-answer="${escape(question.id)}" ${answered ? 'hidden' : ''}>Check answer</button>${answered ? `<p class="quiz-feedback" role="status"><strong>${selected === question.answer ? 'Correct.' : 'Not quite.'}</strong> ${escape(question.explanation)}</p>` : ''}</fieldset>`; }).join('');
    const score = scoreQuiz(game.quiz, answers); const summary = app.querySelector('[data-quiz-summary]');
    summary.innerHTML = quizComplete() ? `<strong>Final score: ${score} / ${game.quiz.length}</strong><span>${score === game.quiz.length ? 'Ready for game day.' : 'Review the missed explanations or retry the check.'}</span><button type="button" class="pregame-button pregame-button--light" data-retry-quiz>Retry knowledge check</button>` : `<span>${Object.keys(answers).length} of ${game.quiz.length} answered · unanswered questions remain clearly marked.</span>`;
    updateCompletion();
  };
  app.addEventListener('click', (event) => {
    const submit = event.target.closest('[data-submit-answer]');
    if (submit) { const field = submit.closest('fieldset'); const selected = field.querySelector('input:checked'); if (!selected) { field.classList.add('needs-answer'); return; } answers[submit.dataset.submitAnswer] = Number(selected.value); set('quiz', answers); renderQuiz(); }
    if (event.target.closest('[data-retry-quiz]')) { Object.keys(answers).forEach((key) => delete answers[key]); set('quiz', answers); renderQuiz(); }
  });
  const acknowledgment = get('acknowledgment', { acknowledged: false, crewMember: '', completedAt: null });
  const ackForm = app.querySelector('[data-ack-form]');
  const acknowledgedInput = app.querySelector('[data-acknowledged]');
  const crewMemberSelect = app.querySelector('[data-crew-member]');
  acknowledgedInput.checked = acknowledgment.acknowledged;
  crewMemberSelect.value = acknowledgment.crewMember;
  function updateCompletion() {
    const ready = canComplete(acknowledgedInput.checked, crewMemberSelect.value);
    app.querySelector('[data-complete]').disabled = !ready;
    app.querySelector('[data-completion-help]').textContent = ready ? 'Ready to submit your acknowledgment on this device.' : `${acknowledgedInput.checked ? '' : 'Check the receipt acknowledgment. '}${crewMemberSelect.value ? '' : 'Select your position and name.'}`;
    const panel = app.querySelector('[data-completion-confirmation]');
    panel.hidden = !acknowledgment.completedAt;
    if (acknowledgment.completedAt) panel.innerHTML = `<strong>Acknowledgment saved on this device</strong><span>${escape(acknowledgment.crewMember)} · ${escape(new Date(acknowledgment.completedAt).toLocaleString())}. This was not reported to the referee.</span>`;
  }
  ackForm.addEventListener('change', () => {
    acknowledgment.acknowledged = acknowledgedInput.checked;
    acknowledgment.crewMember = crewMemberSelect.value;
    acknowledgment.completedAt = null;
    set('acknowledgment', acknowledgment);
    updateCompletion();
  });
  ackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!canComplete(acknowledgedInput.checked, crewMemberSelect.value)) return;
    acknowledgment.acknowledged = true;
    acknowledgment.crewMember = crewMemberSelect.value;
    acknowledgment.completedAt = new Date().toISOString();
    set('acknowledgment', acknowledgment);
    updateCompletion();
  });
  const question = app.querySelector('#pregame-question'); question.value = get('question', ''); question.addEventListener('input', () => set('question', question.value));
  app.querySelector('[data-copy-question]').addEventListener('click', async () => { const status = app.querySelector('[data-copy-status]'); if (!question.value.trim()) { status.textContent = 'Type a question before copying.'; return; } try { await navigator.clipboard.writeText(question.value); status.textContent = 'Question copied. Paste it into a text or email.'; } catch (_) { question.select(); document.execCommand('copy'); status.textContent = 'Question copied. Paste it into a text or email.'; } });
  const recap = get('recap', []); const recapList = app.querySelector('[data-recap-list]'); recapList.innerHTML = game.recap.map((label, index) => `<label class="check-row"><input type="checkbox" value="${index}" ${recap.includes(index) ? 'checked' : ''}><span><b>${String(index + 1).padStart(2, '0')}</b>${escape(label)}</span></label>`).join(''); recapList.addEventListener('change', () => set('recap', [...recapList.querySelectorAll('input:checked')].map((input) => Number(input.value))));
  renderQuiz();
}());
