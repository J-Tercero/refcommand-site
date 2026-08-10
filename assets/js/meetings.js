(() => {
  const meetings = window.refCommandMeetings || [];
  const isMeetingDetail = /\/meetings\/[^/]+(?:\/index\.html)?\/?$/.test(location.pathname);
  const isMeetingSubpage = /\/meetings\/[^/]+\/[^/]+$/.test(location.pathname);
  const root = isMeetingDetail || isMeetingSubpage ? '../../' : '../';
  const esc = (value) => String(value).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const arbiterUrl = 'https://www.arbitersports.com/sign-in';
  const cifRegistrationUrl = 'https://app.arbitersports.com/registration/official?org=9529&role=3';
  const csoaZoomUrl = 'https://us02web.zoom.us/j/5910609594?omn=84491354745';
  const externalLink = (text, href) => `<a class="briefing-external-link${href === csoaZoomUrl ? ' briefing-zoom-link' : ''}" href="${href}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>`;
  const linkReferences = (text, { zoomLimit = Infinity } = {}) => {
    let zoomLinks = 0;
    return esc(text).replace(/\bArbiter\b|\bZoom(?:\s+(?:meeting|meetings|link|sessions?))?\b/gi, match => {
      if (/^Arbiter$/i.test(match)) return externalLink(match, arbiterUrl);
      if (zoomLinks++ < zoomLimit) return externalLink(match, csoaZoomUrl);
      return match;
    });
  };

  const actionChecklist = (m) => {
    const items = m.actionItems || [];
    if (!items.length) return '<p class="briefing-summary__empty">No action items were recorded for this meeting.</p>';
    const storageKey = `meeting-${esc(m.id)}-action-items`;
    return `<ul class="action-checklist" data-action-checklist data-storage-key="${storageKey}">${items.map((item, index) => {
      const inputId = `action-item-${esc(m.id)}-${index}`;
      return `<li class="action-checklist__item"><input class="action-checklist__checkbox" type="checkbox" id="${inputId}" data-action-index="${index}"><label class="action-checklist__label" for="${inputId}">${linkReferences(item)}</label></li>`;
    }).join('')}</ul>`;
  };
  const badge = (label) => label ? `<p class="meeting-label">${esc(label)}</p>` : '';
  const stats = (m) => `<ul class="meeting-stats"><li>${m.topicCount} Topics</li>${m.actionItemCount ? `<li>${m.actionItemCount} Action Items</li>` : ''}<li>${m.duration}</li></ul>`;
  const date = m => `<div class="meeting-date"><b>${m.month}</b><strong>${m.day}</strong><span>${m.year}</span></div>`;
  const action = m => m.briefingPath ? `<a class="meeting-button" href="${root}meetings/${m.briefingPath}">View briefing <span aria-hidden="true">→</span></a>` : '';
  const card = m => `<article class="meeting-card${m.isFeatured ? ' meeting-card--featured' : ''}">${m.isFeatured ? '<span class="meeting-new">New</span>' : ''}${date(m)}<div class="meeting-card__body"><p class="meeting-association">${esc(m.association)}</p><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p>${stats(m)}${m.isFeatured ? `<div class="meeting-chips">${m.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>` : ''}</div>${action(m)}</article>`;
  const landing = document.querySelector('[data-meetings-landing]');
  if (landing) {
    const featured = meetings.find(m => m.isFeatured); const archive = meetings.filter(m => !m.isFeatured);
    landing.innerHTML = `<section class="meetings-intro"><div class="shell meetings-intro__grid"><div><h1>Meeting briefings</h1><p>CSOA meeting recaps, rule updates, and important information for officials.</p></div><aside class="next-meeting"><p>Next meeting</p><strong>August 17, 2026</strong><span>6:30 PM – 8:00 PM</span><button type="button" disabled title="Calendar integration coming soon">Add to calendar</button></aside></div></section><section class="meetings-hero"><div class="shell"><div><span aria-hidden="true">▣</span><div><h2>Stay informed. Stay prepared.</h2><p>Review the latest meeting briefings to stay up to date on rule changes, mechanics, policy updates, and association announcements.</p></div></div></div></section><section class="meetings-main"><div class="shell meetings-layout"><div><header class="meeting-list-heading"><h2>2026 season</h2></header><div class="meeting-list">${[featured,...archive].map(card).join('')}</div></div><aside class="meetings-sidebar"><section><h2>In this meeting</h2><ul>${['2026 Rule Changes','Equipment & Uniforms','Points of Emphasis','Sideline Management','Pop-Up Kicks & Aiding the Runner','Ejections & Disqualifications','CIF & Arbiter Updates','And More...'].map(x=>`<li>${x}</li>`).join('')}</ul></section><section class="meeting-filter"><h2>Filter meetings</h2><label>Meeting<select disabled><option>All Meetings</option></select></label><label>Topic<select disabled><option>All Topics</option></select></label></section></aside></div></section>`;
  }
  const sectionId = title => ({
    'Need to know':'need-to-know','Important dates':'important-dates','2026 rule changes':'rule-changes','Official jurisdiction & postgame':'postgame-jurisdiction','Disqualified players':'disqualifications','Personal foul / flagrant / unsportsmanlike':'personal-flagrant-uns','Punching / stripping the ball':'punching-ball','Aiding the runner':'aiding-runner','Control the sideline':'sideline-management','Pop-up kicks':'pop-up-kicks','Equipment & uniforms':'equipment','Arbiter & CIF':'cif-arbiter','New officials: get reps':'new-officials','Game fees':'game-fees','Association / school coverage':'association-coverage'
  }[title] || title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''));
  const needIcons = ['◷','◉','▤','◌','▱','♩'];
  const needLabels = ['Monday meetings','Zoom meetings','CIF registration','Rules test','Arbiter profile','Uniforms, scrimmages & Thursdays'];
  const sectionSummaries = {
    'Need to know':'Meeting schedule, Zoom link, uniforms, scrimmages, and other admin notes.',
    'Important dates':'Key dates, preseason activity, and assignment reminders.',
    '2026 rule changes':'Play cards on belts, head slap prohibition, and other rule changes.',
    'Official jurisdiction & postgame':'Postgame jurisdiction, conduct, and reporting responsibilities.',
    'Disqualified players':'Disqualified players, postgame jurisdiction, reporting procedures, and documentation.',
    'Personal foul / flagrant / unsportsmanlike':'How the meeting distinguished personal, flagrant, and unsportsmanlike fouls.',
    'Punching / stripping the ball':'Guidance on legal attempts to dislodge the football and illegal contact.',
    'Aiding the runner':'Recognizing illegal assistance to a runner.',
    'Control the sideline':'Preventive communication, warnings, and sideline enforcement.',
    'Pop-up kicks':'Safety emphasis and immediate dead-ball procedure.',
    'Equipment & uniforms':'Required equipment, uniforms, and player-worn devices.',
    'Arbiter & CIF':'CIF requirements, fees, eligibility, and Arbiter best practices.',
    'New officials: get reps':'Scrimmage opportunities and practical development advice.',
    'Game fees':'Approximate compensation discussed for each game level.',
    'Association / school coverage':'School coverage, regional opportunities, and alignment information.'
  };
  const noteIcons = ['▤','▦','♧','▧','⚑','⚖','◉','↗','▥','◒','▣','▦','★','¤','◎'];

  const normalizeRuleCard = (item) => Array.isArray(item)
    ? { title: item[0], summary: item[1] }
    : item;
  const cardDetails = (item, sectionIdValue, index) => {
    const card = normalizeRuleCard(item);
    const details = [card.ruleReference, card.plainEnglish, card.meetingTakeaway, card.sourceUrl].some(value => value);
    const detailsId = `${sectionIdValue}-rule-details-${index}`;
    const source = card.sourceUrl ? `<div class="rule-detail__group"><h5>Official source</h5><p><a class="briefing-external-link" href="${esc(card.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(card.sourceLabel || card.sourceUrl)}</a></p></div>` : '';
    return `<article class="${details ? 'rule-card' : ''}"><h3>${linkReferences(card.title)}</h3><p>${linkReferences(card.summary)}</p>${details ? `<div id="${detailsId}" class="rule-detail" hidden><h4>Rule details</h4><div class="rule-detail__group"><h5>Rule reference</h5><p>${linkReferences(card.ruleReference || 'Reference pending verification')}</p></div>${card.plainEnglish ? `<div class="rule-detail__group"><h5>What it means</h5><p>${linkReferences(card.plainEnglish)}</p></div>` : ''}${card.meetingTakeaway ? `<div class="rule-detail__group"><h5>From the CSOA meeting</h5><p>${linkReferences(card.meetingTakeaway)}</p></div>` : ''}${source}</div><button class="rule-card__toggle" type="button" aria-expanded="false" aria-controls="${detailsId}" data-rule-detail-toggle><span>More</span> <span aria-hidden="true">↓</span></button>` : ''}</article>`;
  };
  const section = (s, index) => {
    const list = items => `<ul class="briefing-list">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    let body='';
    if (s.type === 'need') body=`<div class="need-rows">${s.items.map((x,i)=>`<div class="need-row"><span aria-hidden="true">${needIcons[i]}</span><div><b>${needLabels[i] === 'CIF registration' ? externalLink(needLabels[i], cifRegistrationUrl) : linkReferences(needLabels[i])}</b><p>${linkReferences(x)}</p></div></div>`).join('')}</div>`;
    if (s.type === 'list') body=list(s.items);
    if (s.type === 'dates') body=`<div class="date-notes">${s.items.map(([when,text])=>`<div><b>${esc(when)}</b><span>${esc(text)}</span></div>`).join('')}</div>`;
    if (s.type === 'cards') body=`<div class="briefing-cards">${s.items.map((item, itemIndex)=>cardDetails(item, sectionId(s.title), itemIndex)).join('')}</div>`;
    if (s.type === 'discussion') body=`<div class="briefing-discussion"><p>${esc(s.text)}</p></div>`;
    if (s.type === 'fees') body=`<div class="fees-wrap"><p class="meeting-label">Meeting discussion — approximate</p><table><thead><tr><th>Level</th><th>Approx. fee</th></tr></thead><tbody>${s.items.map(([x,y])=>`<tr><th scope="row">${esc(x)}</th><td>${esc(y)}</td></tr>`).join('')}</tbody></table></div>`;
    const modifier = s.title === 'Personal foul / flagrant / unsportsmanlike' ? ' briefing-section--comparison' : s.title === 'Equipment & uniforms' ? ' briefing-section--equipment' : '';
    const id = sectionId(s.title);
    return `<section id="${id}" class="briefing-section${s.featured ? ' briefing-section--featured' : ''}${modifier}"><button class="briefing-section__toggle" type="button" aria-expanded="false" aria-controls="${id}-content"><span class="briefing-section__number">${String(index + 1).padStart(2, '0')}</span><span class="briefing-section__icon" aria-hidden="true">${noteIcons[index % noteIcons.length]}</span><span class="briefing-section__summary"><b>${esc(s.title)}</b><span>${esc(sectionSummaries[s.title] || 'Meeting notes and officiating guidance.')}</span></span><span class="briefing-section__chevron" aria-hidden="true">›</span></button><div id="${id}-content" class="briefing-section__content">${badge(s.label)}<h2>${linkReferences(s.title)}</h2>${body}${s.note ? `<aside class="briefing-note">${s.noteLabel ? `<b>${esc(s.noteLabel)}</b>` : ''}<p>${linkReferences(s.note)}</p></aside>` : ''}</div></section>`;
  };
  const detail = document.querySelector('[data-meeting-detail]');
  if (detail) {
    const m = meetings.find(x => x.id === detail.dataset.meetingDetail);
    if (!m) return;
    const orderedSections = m.sections || [];
    const navigation = orderedSections.map((s, index) => ({ id: sectionId(s.title), label: s.navTitle || s.title, index }));
    const summaries = m.dates || [];
    const quickBriefPath = 'quick-brief.html';
    const summaryCards = `<section class="briefing-summary" aria-label="Meeting highlights">
      <article class="briefing-summary__card"><span class="briefing-summary__icon" aria-hidden="true">◖</span><div><h2>Quick brief</h2><p>${esc(m.quickBrief || m.description)}</p></div><a href="${quickBriefPath}">Read Quick Brief <span aria-hidden="true">→</span></a></article>
      <article id="action-items" class="briefing-summary__card briefing-summary__card--action-items"><span class="briefing-summary__icon" aria-hidden="true">✓</span><div><h2>Action items</h2>${actionChecklist(m)}</div></article>
      <article id="dates-deadlines" class="briefing-summary__card"><span class="briefing-summary__icon" aria-hidden="true">▣</span><div><h2>Dates &amp; deadlines</h2><dl>${summaries.map(([when, text]) => `<div><dt>${esc(when)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl></div><a href="#important-dates" data-expand-section="important-dates">View all dates <span aria-hidden="true">→</span></a></article>
    </section>`;
    const navLinks = navigation.map(({id,label,index}) => /\bArbiter\b/i.test(label) ? `<li><a class="briefing-external-link" href="${arbiterUrl}" target="_blank" rel="noopener noreferrer"><b>${String(index + 1).padStart(2, '0')}</b><span>${esc(label)}</span></a></li>` : `<li><a href="#${id}"><b>${String(index + 1).padStart(2, '0')}</b><span>${esc(label)}</span></a></li>`).join('');
    detail.innerHTML = `<section class="briefing-head"><div class="shell"><a href="${root}meetings/" class="briefing-back">← Back to Meeting Briefings</a><article class="briefing-hero"><p>${esc(m.association)}</p><h1><span class="briefing-hero__title-desktop">${esc(m.briefTitle || m.title)}</span><span class="briefing-hero__title-mobile">${esc(m.briefTitle || m.title)}</span></h1><div class="briefing-hero__meta"><span>▣ ${esc(m.date)}</span><i>•</i><span>◷ ${esc(m.time || '6:30 – 8:00 PM')}</span><i>•</i><span>◷ ${esc(m.duration)}</span></div><div class="briefing-hero__bottom"><ul class="meeting-stats"><li><b>${esc(m.topicCount)}</b><span>Topics</span></li><li><b>${esc(m.actionItemCount)}</b><span>Action items</span></li><li><b>${esc(m.duration.replace(/\D/g, ''))}</b><span>Minutes</span></li><li><b>${esc(m.season)}</b><span>Season</span></li></ul><div class="meeting-chips">${m.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div></article></div></section><div class="briefing-mobile-nav shell"><label>In this briefing<select>${navigation.map(({id,label})=>`<option value="#${id}">${esc(label)}</option>`).join('')}</select></label></div><div class="briefing-layout shell"><main class="briefing-main">${summaryCards}<article id="meeting-notes" class="briefing-notes"><header><h2>Meeting notes</h2><a href="#meeting-notes">View all topics <span aria-hidden="true">→</span></a></header>${orderedSections.map((s, index) => section(s, index)).join('')}</article></main><aside class="briefing-sidebar"><nav aria-label="In this briefing"><p>In this briefing</p><ol>${navLinks}</ol></nav></aside></div>`;

    detail.querySelectorAll('[data-rule-detail-toggle]').forEach((toggle) => {
      const panel = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!panel) return;
      toggle.addEventListener('click', () => {
        const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(shouldOpen));
        panel.hidden = !shouldOpen;
        toggle.innerHTML = `<span>${shouldOpen ? 'Less' : 'More'}</span> <span aria-hidden="true">${shouldOpen ? '↑' : '↓'}</span>`;
      });
    });
    detail.querySelectorAll('[data-action-checklist]').forEach((list) => {
      const storageKey = list.dataset.storageKey;
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (error) { saved = {}; }
      list.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = Boolean(saved[checkbox.dataset.actionIndex]);
        checkbox.addEventListener('change', () => {
          saved[checkbox.dataset.actionIndex] = checkbox.checked;
          try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (error) { /* localStorage may be unavailable. */ }
        });
      });
    });
    detail.querySelector('.briefing-mobile-nav select').addEventListener('change', event => { location.hash = event.target.value; });
    const setSectionOpen = (section, shouldOpen) => {
      const toggle = section.querySelector('.briefing-section__toggle');
      section.classList.toggle('is-open', shouldOpen);
      toggle.setAttribute('aria-expanded', String(shouldOpen));
    };
    const openSection = (section) => {
      if (section.classList.contains('is-open')) return;
      detail.querySelectorAll('.briefing-section.is-open').forEach(open => setSectionOpen(open, false));
      setSectionOpen(section, true);
    };
    detail.querySelectorAll('.briefing-section__toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const current = toggle.closest('.briefing-section');
        const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
        if (willOpen) openSection(current); else setSectionOpen(current, false);
      });
    });
    detail.querySelectorAll('[data-expand-section]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const section = detail.querySelector(`#${link.dataset.expandSection}`);
        if (!section) return;
        event.preventDefault();
        openSection(section);
        window.history.pushState(null, '', `#${section.id}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    const quickAccess = document.createElement('section');
    quickAccess.className = 'briefing-quick-access shell';
    quickAccess.setAttribute('aria-label', 'Quick access');
    quickAccess.innerHTML = `<a href="${quickBriefPath}"><span class="briefing-quick-access__icon" aria-hidden="true">◖</span><span><b>Quick brief</b><small>${esc(m.quickBrief || m.description)}</small></span><i aria-hidden="true">›</i></a><a href="#action-items"><span class="briefing-quick-access__icon" aria-hidden="true">✓</span><span><b>Action items</b><small>${m.actionItemCount} important items officials need to complete or be aware of.</small></span><i aria-hidden="true">›</i></a><a href="#dates-deadlines"><span class="briefing-quick-access__icon" aria-hidden="true">▣</span><span><b>Dates &amp; deadlines</b><small>Key dates discussed at the meeting.</small></span><i aria-hidden="true">›</i></a>`;
    detail.querySelector('.briefing-head').after(quickAccess);
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'meeting-bottom-nav'; bottomNav.setAttribute('aria-label', 'Mobile navigation');
    bottomNav.innerHTML = `<a href="${root}index.html"><span aria-hidden="true">⌂</span>Home</a><a href="${root}pages/scores.html"><span aria-hidden="true">▣</span>Scores</a><a href="${root}pages/rankings.html"><span aria-hidden="true">♜</span>Standings</a><a class="is-active" href="${root}meetings/" aria-current="page"><span aria-hidden="true">▤</span>Meetings</a><a href="#main-content"><span aria-hidden="true">•••</span>More</a>`;
    document.body.append(bottomNav);
  }

  const quickBriefDetail = document.querySelector('[data-meeting-quick-brief]');
  if (quickBriefDetail) {
    const m = meetings.find(x => x.id === quickBriefDetail.dataset.meetingQuickBrief);
    const quickBrief = m && m.quickBriefArticle;
    if (!quickBrief) return;
    const meetingPath = 'index.html';
    quickBriefDetail.innerHTML = `<div class="quick-brief-page__inner"><a class="quick-brief-page__back" href="${meetingPath}">← Back to Preseason Meeting</a><article class="quick-brief-article quick-brief-article--standalone" aria-labelledby="quick-brief-headline"><header class="quick-brief-article__header"><p class="meeting-label">Quick brief</p><h1 id="quick-brief-headline">${esc(quickBrief.headline)}</h1><p class="quick-brief-article__deck">${esc(quickBrief.deck)}</p><p class="quick-brief-article__meta">${esc(m.association)} <span aria-hidden="true">•</span> ${esc(m.date)} <span aria-hidden="true">•</span> A fast preseason recap for officials who missed the meeting.</p></header>${quickBrief.sections.map(section => `<section class="quick-brief-article__section"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((paragraph, index) => `<p>${linkReferences(paragraph, { zoomLimit: index === 0 ? 1 : 0 })}</p>`).join('')}</section>`).join('')}<footer class="quick-brief-article__footer"><a href="${meetingPath}">← Back to Preseason Meeting</a></footer></article></div>`;
  }
})();
