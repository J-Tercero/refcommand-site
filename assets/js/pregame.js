(function () {
  const app = document.querySelector('[data-pregame-app]');
  if (!app) return;
  const slug = document.body.dataset.pregameSlug;
  const game = (window.refCommandPregames || []).find((item) => item.slug === slug);
  const escape = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const list = (items) => `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;

  if (!game) {
    document.title = 'Pregame not found | RefCommand';
    app.innerHTML = '<section class="section"><div class="shell empty-state"><p class="eyebrow">404 · Pregame not found</p><h1>That pregame is not available.</h1><p>Check the shared address. No other game has been loaded.</p></div></section>';
    return;
  }

  const s = game.snapshot;
  document.title = `${s.matchup} | Weekly Pregame`;
  app.innerHTML = `<article class="pregame-page">
    <header class="pregame-hero"><div class="shell"><p class="pregame-label">Weekly pregame · Crew briefing</p><h1>${escape(s.matchup)}</h1><p>${escape(s.level)} · ${escape(s.date)}</p><nav class="pregame-jump" aria-label="Pregame shortcuts"><a href="#game-information">Game information</a><a href="#pregame-focus">Pregame focus</a><a href="#crew-responsibilities">Crew responsibilities</a></nav></div></header>
    <div class="shell pregame-content">
      <section class="pregame-group" id="game-information"><p class="pregame-group-number">01</p><h2>Game Information</h2>
        <section class="boarding-pass" aria-labelledby="snapshot-title"><div class="boarding-pass__top"><div><p class="pregame-label">Game snapshot</p><h3 id="snapshot-title">${escape(s.matchup)}</h3><p>${escape(s.level)}</p></div><div class="kickoff"><span>Kickoff</span><strong>${escape(s.kickoff)}</strong></div></div><div class="venue"><div><span>Site</span><strong>${escape(s.venue)}</strong></div></div><dl class="snapshot-grid"><div><dt>Date</dt><dd>${escape(s.date)}</dd></div><div><dt>Level</dt><dd>${escape(s.level)}</dd></div><div><dt>Kickoff</dt><dd>${escape(s.kickoff)}</dd></div></dl></section>
        <section class="pregame-card" id="site-information"><p class="pregame-label">Site information</p><h3>${escape(s.venue)}</h3><p>Game site: ${escape(s.venue)}.</p></section>
        <section class="pregame-card"><p class="pregame-label">Assigned officials</p><h3>Crew</h3><div class="snapshot-roster"><ul>${game.crew.map((member) => `<li><span>${escape(member.position)}</span><strong>${escape(member.name)}</strong></li>`).join('')}</ul></div></section>
        <section class="pregame-card arrival-card"><p class="pregame-label">Arrival / Uniform</p><h3>Ready by 3:30 PM</h3><p class="arrival-callout">${escape(s.arrival)}.</p><h4>Uniform</h4><p>${escape(s.uniform)}</p></section>
      </section>
      <section class="pregame-group" id="pregame-focus"><p class="pregame-group-number">02</p><h2>Pregame Focus</h2>
        <section class="pregame-card referee-message"><p class="pregame-label">Primary crew emphasis</p><h3>${escape(game.focus.title)}</h3><blockquote>${escape(game.focus.introduction)}</blockquote></section>
        <section class="pregame-card focus-card"><h3>Good Sideline Control</h3>${list(game.focus.benefits)}</section>
        <section class="pregame-card focus-card restricted-area"><p class="pregame-label">Restricted area ≠ team box</p><h3>Restricted Area</h3><p>${escape(game.restrictedArea.summary)}</p><h4>During a live ball</h4>${list(game.restrictedArea.liveBall)}<h4>When the ball is dead</h4><p>${escape(game.restrictedArea.deadBall)}</p><div class="ruling"><strong>Crew expectation</strong><p>${escape(game.restrictedArea.expectation)}</p></div></section>
        <section class="pregame-card focus-card"><p class="pregame-label">Down Judge + Line Judge</p><h3>Coach Briefing</h3><p>Briefly remind your respective head coach before the game:</p>${list(game.coachBriefing)}<p class="crew-reminder">This is a crew reminder, not a scripted speech. Be clear, brief, and professional.</p></section>
      </section>
      <section class="pregame-group" id="crew-responsibilities"><p class="pregame-group-number">03</p><h2>Crew Responsibilities</h2><p class="section-intro">A quick game-day refresher for consistent sideline management.</p><div class="crew-grid">${game.crew.map((member) => `<article class="crew-card"><header><div><span>${escape(member.position)}</span><h4>${escape(member.name)}</h4></div><b aria-hidden="true">${escape(member.position.split(' ').map((word) => word[0]).join(''))}</b></header>${list(member.responsibilities)}</article>`).join('')}</div></section>
      <section class="pregame-group" id="rule-references"><p class="pregame-group-number">04</p><h2>NFHS Rule References</h2><div class="training-grid">${game.rules.map((rule) => `<section class="pregame-card rule-reference"><p class="pregame-label">${escape(rule.citation)}</p><h3>${escape(rule.topic)}</h3><p>${escape(rule.summary)}</p></section>`).join('')}</div><p class="rule-note">Concise crew summaries only. Consult the current authorized NFHS Football Rules publication for official language and complete application.</p></section>
      <section class="pregame-group recap-group" id="game-day-notes"><p class="pregame-group-number">05</p><h2>Game-Day Notes</h2><section class="recap-card"><p class="pregame-label">Final crew review</p><h3>Sidelines: clear, safe, consistent</h3><ol class="numbered-notes">${game.notes.map((note) => `<li>${escape(note)}</li>`).join('')}</ol></section></section>
    </div>
  </article>`;
}());
