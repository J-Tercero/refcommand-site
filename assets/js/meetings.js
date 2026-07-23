(() => {
  const meetings = window.refCommandMeetings || [];
  const isMeetingDetail = /\/meetings\/[^/]+(?:\/index\.html)?\/?$/.test(location.pathname);
  const root = isMeetingDetail ? '../../' : '../';
  const esc = (value) => String(value).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
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
  const section = s => {
    const list = items => `<ul class="briefing-list">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    let body='';
    if (s.type === 'need' || s.type === 'list') body=list(s.items);
    if (s.type === 'dates') body=`<div class="date-notes">${s.items.map(([when,text])=>`<div><b>${esc(when)}</b><span>${esc(text)}</span></div>`).join('')}</div>`;
    if (s.type === 'cards') body=`<div class="briefing-cards">${s.items.map(([title,text])=>`<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>`;
    if (s.type === 'discussion') body=`<div class="briefing-discussion"><p>${esc(s.text)}</p></div>`;
    if (s.type === 'fees') body=`<div class="fees-wrap"><p class="meeting-label">Meeting discussion — approximate</p><table><tbody>${s.items.map(([x,y])=>`<tr><th scope="row">${esc(x)}</th><td>${esc(y)}</td></tr>`).join('')}</tbody></table></div>`;
    return `<section class="briefing-section${s.featured ? ' briefing-section--featured' : ''}">${badge(s.label)}<h2>${esc(s.title)}</h2>${body}${s.note ? `<aside class="briefing-note">${s.noteLabel ? `<b>${esc(s.noteLabel)}</b>` : ''}<p>${esc(s.note)}</p></aside>` : ''}</section>`;
  };
  const detail = document.querySelector('[data-meeting-detail]');
  if (detail) {
    const m = meetings.find(x => x.id === detail.dataset.meetingDetail);
    if (!m) return;
    detail.innerHTML = `<section class="briefing-head"><div class="shell"><a href="${root}meetings/" class="briefing-back">← Back to Meeting Briefings</a><p>${esc(m.association)}</p><h1>${esc(m.title)}</h1><time datetime="2026-07-20">${esc(m.date)}</time><div class="briefing-meta"><div class="meeting-chips">${m.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>${stats(m)}</div></div></section><article class="briefing-content shell">${m.sections.map(section).join('')}<section class="source-card"><p class="meeting-label">Original meeting source</p><h2>Continue with the source</h2><div><button disabled>Listen to recording <small>Coming soon</small></button><button disabled>View transcript <small>Coming soon</small></button></div><p>This briefing summarizes information discussed during the meeting. Official NFHS rules, CIF policy, section directives, and current CSOA communication supersede informal meeting discussion.</p></section></article>`;
  }
})();
