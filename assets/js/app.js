// Shared sport-media shell: one header treatment and compact score strip on every public route.
const path = window.location.pathname;
const root = path.includes('/meetings/2026-07-20/') ? '../../' : (path.includes('/pages/') || path.includes('/meetings/') ? '../' : '');
const header = document.querySelector('.site-header');
if (header) {
  const nav = header.querySelector('.site-nav');
  const current = path.includes('/meetings/') ? 'meetings' : (path.split('/').pop() || 'index.html');
  const links = [
    ['Home', `${root}index.html`, 'index.html'], ['Scores', `${root}pages/scores.html`.replace('pages/pages/', 'pages/'), 'scores.html'],
    ['Standings', `${root}pages/rankings.html`.replace('pages/pages/', 'pages/'), 'rankings.html'], ['News', `${root}pages/news.html`.replace('pages/pages/', 'pages/'), 'news.html'],
    ['Rules', `${root}pages/rules.html`.replace('pages/pages/', 'pages/'), 'rules.html'], ['Meetings', `${root}meetings/`, 'meetings'], ['Quizzes', `${root}pages/quizzes.html`.replace('pages/pages/', 'pages/'), 'quizzes.html']
  ];
  nav.innerHTML = links.map(([label, href, file]) => `<a href="${href}"${(current === file || (file === 'meetings' && current === 'meetings')) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const strip = document.createElement('section');
  strip.className = 'global-score-strip'; strip.setAttribute('aria-label', 'Live scores');
  strip.innerHTML = `<div class="global-score-strip__inner"><span class="global-score-strip__live">Live Scores</span><div class="global-score-strip__games"><span class="global-score-strip__game"><span>7:34</span><span class="global-score-strip__status">Q3</span><b>Central HS 21</b><b>Westview 14</b></span><span class="global-score-strip__game"><b>Riverside 17</b><b>Northfield 10</b><span class="global-score-strip__status">Q4</span></span><span class="global-score-strip__game"><b>Lakeside 28</b><b>Hillcrest 7</b><span class="global-score-strip__status">Final</span></span></div><a class="global-score-strip__all" href="${root}pages/scores.html">View all scores ›</a></div>`;
  header.after(strip);
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// This source-shaped model can be replaced by RefCommand articles, local feeds, alerts, or video data.
const featuredStories = [
  { id: 'week-one-enforcement', category: 'Rules Focus', title: 'Five NFHS enforcement situations every referee should master before Week 1.', summary: "The rare enforcement situations aren't difficult if you recognize them early. Review intentional grounding, post-scrimmage kick enforcement, momentum, illegal participation and double fouls before opening night.", image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1800&q=85', link: 'pages/rules.html', videoLink: '', date: 'August 11, 2026', author: 'RefCommand Rules Desk' },
  { id: 'rivalry-pregame', category: 'Pregame', title: 'Crew pregame checklist for rivalry week.', summary: 'A complete pregame structure covering clock management, communication, goal line mechanics and special situations. Walk onto the field with every assignment settled.', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1800&q=85', link: 'pages/pregame.html', videoLink: '', date: 'August 14, 2026', author: 'RefCommand Crew Desk' },
  { id: 'targeting-film', category: 'Video Breakdown', title: 'Was this targeting?', summary: "Frame-by-frame rules analysis of one of last week's most controversial plays. See how the indicators build from approach through contact.", image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1800&q=85', link: 'pages/rules.html', videoLink: '#', date: 'August 16, 2026', author: 'RefCommand Film Room' },
  { id: 'sportsmanship-emphasis', category: 'Points of Emphasis', title: 'Officials should expect increased focus on sportsmanship this season.', summary: 'The best crews set the standard early, communicate clearly and respond consistently when the temperature rises.', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1800&q=85', link: 'pages/news.html', videoLink: '', date: 'August 18, 2026', author: 'RefCommand Editorial' },
  { id: 'central-opening-week', category: 'Local News', title: 'Central Section crews preparing for opening week assignments.', summary: 'Assignments are taking shape as crews focus their final preparation on communication, travel and Friday-night readiness.', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1800&q=85', link: 'pages/news.html', videoLink: '', date: 'August 20, 2026', author: 'Central Section Desk' }
];

const featuredCarousel = document.querySelector('[data-featured-carousel]');

if (featuredCarousel) {
  const slides = featuredCarousel.querySelector('[data-featured-slides]');
  const dots = featuredCarousel.querySelector('[data-featured-dots]');
  const count = featuredCarousel.querySelector('[data-featured-count]');
  const previous = featuredCarousel.querySelector('[data-featured-prev]');
  const next = featuredCarousel.querySelector('[data-featured-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let rotation;

  const storyMarkup = (story, index) => `<article class="featured-slide${index === 0 ? ' is-active' : ''}" data-featured-slide aria-hidden="${index === 0 ? 'false' : 'true'}"><img class="featured-slide__image" src="${story.image}" alt=""${index === 0 ? '' : ' loading="lazy"'}><div class="featured-slide__content"><p class="featured-slide__meta"><span class="featured-slide__tag">${story.category}</span><span>${story.date}</span><span>${story.author}</span></p><h1>${story.title}</h1><p class="featured-slide__summary">${story.summary}</p><div class="featured-slide__actions"><a class="featured-slide__button featured-slide__button--primary" href="${story.link}">Read Article <span aria-hidden="true">→</span></a>${story.videoLink ? `<a class="featured-slide__button" href="${story.videoLink}">Watch Video <span aria-hidden="true">↗</span></a>` : ''}</div></div></article>`;
  slides.innerHTML = featuredStories.map(storyMarkup).join('');
  dots.innerHTML = featuredStories.map((story, index) => `<button class="featured-carousel__dot${index === 0 ? ' is-active' : ''}" type="button" data-featured-dot="${index}" aria-label="Show ${story.category}: ${story.title}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('');

  const showStory = (index) => {
    activeIndex = (index + featuredStories.length) % featuredStories.length;
    slides.querySelectorAll('[data-featured-slide]').forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.querySelectorAll('[data-featured-dot]').forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(featuredStories.length).padStart(2, '0')}`;
  };
  const stopRotation = () => window.clearInterval(rotation);
  const startRotation = () => {
    stopRotation();
    if (!reducedMotion.matches) rotation = window.setInterval(() => showStory(activeIndex + 1), 8000);
  };

  previous.addEventListener('click', () => { showStory(activeIndex - 1); startRotation(); });
  next.addEventListener('click', () => { showStory(activeIndex + 1); startRotation(); });
  dots.addEventListener('click', (event) => {
    const dot = event.target.closest('[data-featured-dot]');
    if (dot) { showStory(Number(dot.dataset.featuredDot)); startRotation(); }
  });
  featuredCarousel.addEventListener('mouseenter', stopRotation);
  featuredCarousel.addEventListener('mouseleave', startRotation);
  featuredCarousel.addEventListener('focusin', stopRotation);
  featuredCarousel.addEventListener('focusout', (event) => { if (!featuredCarousel.contains(event.relatedTarget)) startRotation(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopRotation(); else startRotation(); });
  reducedMotion.addEventListener('change', startRotation);
  showStory(0);
  startRotation();
}

// Future server-side RSS or scraped sources should normalize articles into this shape before rendering.
const mockNewsStories = [
  { id: 'central-realignment', category: 'Central Section', headline: 'Central Section football realignment reshapes the 2026 league landscape', source: 'RefCommand Desk', publishedLabel: '18 min ago', readTime: '5 min read', image: 'assets/images/news/central-section.svg', featured: true, summary: 'A first look at the league changes crews and teams will navigate this fall.', url: '#' },
  { id: 'preseason-rankings', category: 'Rankings', headline: 'Early preseason rankings place Central East and Clovis among the section’s top teams', source: 'Valley Football Report', publishedLabel: '42 min ago', readTime: '4 min read', image: 'assets/images/news/rankings.svg', featured: false, url: '#' },
  { id: 'officials-rules', category: 'Officiating', headline: 'Officials prepare for key 2026 rules changes before opening week', source: 'RefCommand', publishedLabel: '1 hr ago', readTime: '6 min read', image: 'assets/images/news/officiating.svg', featured: false, url: '#' },
  { id: 'central-valley-recruiting', category: 'Recruiting', headline: 'Central Valley prospects drawing attention ahead of senior seasons', source: 'California Prep Wire', publishedLabel: '2 hr ago', readTime: '3 min read', image: 'assets/images/news/recruiting.svg', featured: false, url: '#' },
  { id: 'championship-rivalries', category: 'Game Report', headline: 'Last season’s championship finishes set the stage for new rivalries', source: 'Section Sports Network', publishedLabel: '3 hr ago', readTime: '4 min read', image: 'assets/images/news/game-report.svg', featured: false, url: '#' },
  { id: 'enforcement-review', category: 'Rules', headline: 'Five enforcement situations every crew should review before kickoff', source: 'RefCommand Rules Desk', publishedLabel: '4 hr ago', readTime: '7 min read', image: 'assets/images/news/rules.svg', featured: false, url: '#' },
  { id: 'cif-guidance', category: 'State News', headline: 'CIF updates guidance for the upcoming high school football season', source: 'California Football News', publishedLabel: '5 hr ago', readTime: '5 min read', image: 'assets/images/news/state-news.svg', featured: false, url: '#' }
];

const newsFeed = document.querySelector('[data-news-feed]');

function renderNewsFeed(stories) {
  if (!newsFeed) return;
  newsFeed.innerHTML = stories.map((story) => `<article class="news-story${story.featured ? ' news-story--featured' : ''}"><a class="news-story__link" href="${story.url}" aria-label="Read: ${story.headline}"><img class="news-story__image" src="${story.image}" alt="${story.category} football placeholder" loading="lazy"><div class="news-story__content"><p class="news-story__category">${story.featured ? '<span class="news-story__featured">Featured</span>' : ''}${story.category}</p><h3>${story.headline}</h3>${story.summary ? `<p class="news-story__summary">${story.summary}</p>` : ''}<p class="news-story__meta">${story.source} <span aria-hidden="true">•</span> ${story.publishedLabel} <span aria-hidden="true">•</span> ${story.readTime}</p></div><span class="news-story__arrow" aria-hidden="true">→</span></a></article>`).join('');
}

renderNewsFeed(mockNewsStories);

newsFeed?.addEventListener('click', (event) => {
  if (event.target.closest('.news-story__link')?.getAttribute('href') === '#') event.preventDefault();
});

// Shared mock league data is kept in standings-data.js so it can later be replaced by a maintained source.
const rankingGroups = window.refCommandStandingsData || [];
const rankingGroupsContainer = document.querySelector('[data-ranking-groups]');

if (rankingGroupsContainer) {
  rankingGroupsContainer.innerHTML = rankingGroups.map((group) => `<section class="ranking-group"><h3><a href="pages/rankings.html?league=${group.id}">${group.name}</a></h3><ol>${group.teams.slice(0, 5).map((team, index) => `<li><span class="ranking-team"><b>${index + 1}</b><span class="ranking-abbreviation" aria-hidden="true">${team.initials}</span><span class="ranking-name">${team.name}</span></span><span class="ranking-record">${team.overallRecord}</span></li>`).join('')}</ol></section>`).join('');
}

const standingsApp = document.querySelector('[data-standings-app]');
if (standingsApp && rankingGroups.length) {
  const tabs = standingsApp.querySelector('[data-league-tabs]');
  const select = standingsApp.querySelector('[data-league-select]');
  const content = standingsApp.querySelector('[data-league-content]');
  const views = [{ id: 'league', label: 'League Standings' }, { id: 'overall', label: 'Overall Records' }, { id: 'division', label: 'Division Rankings' }];
  const params = new URLSearchParams(window.location.search);
  let leagueId = rankingGroups.some((league) => league.id === params.get('league')) ? params.get('league') : rankingGroups[0].id;
  let viewId = views.some((view) => view.id === params.get('view')) ? params.get('view') : 'league';
  const recordWins = (record) => Number(record.split('-')[0]);

  function setUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('league', leagueId);
    url.searchParams.set('view', viewId);
    window.history.pushState({ leagueId, viewId }, '', url);
  }
  function render() {
    const league = rankingGroups.find((item) => item.id === leagueId);
    tabs.innerHTML = rankingGroups.map((item) => `<button class="league-tab${item.id === leagueId ? ' is-active' : ''}" type="button" role="tab" aria-selected="${item.id === leagueId}" data-league-id="${item.id}">${item.name}</button>`).join('');
    select.innerHTML = rankingGroups.map((item) => `<option value="${item.id}"${item.id === leagueId ? ' selected' : ''}>${item.name}</option>`).join('');
    const teams = [...league.teams].sort((a, b) => viewId === 'overall' ? recordWins(b.overallRecord) - recordWins(a.overallRecord) || Number(b.winPct) - Number(a.winPct) : viewId === 'division' ? a.divisionRank - b.divisionRank : recordWins(b.leagueRecord) - recordWins(a.leagueRecord) || Number(b.winPct) - Number(a.winPct));
    const headers = viewId === 'overall' ? '<th scope="col">Overall</th><th scope="col">Win %</th><th scope="col">League</th>' : viewId === 'division' ? '<th scope="col">Division</th><th scope="col">Div. rank</th><th scope="col">Section rank</th>' : '<th scope="col">League</th><th scope="col">Overall</th><th scope="col">Win %</th><th scope="col">PF</th><th scope="col">PA</th><th scope="col">Streak</th><th scope="col">Division</th><th scope="col">Div. rank</th><th scope="col">Section rank</th>';
    const cells = (team) => viewId === 'overall' ? `<td><strong>${team.overallRecord}</strong></td><td>${team.winPct}</td><td>${team.leagueRecord}</td>` : viewId === 'division' ? `<td>${team.division}</td><td>#${team.divisionRank}</td><td>#${team.sectionRank}</td>` : `<td><strong>${team.leagueRecord}</strong></td><td>${team.overallRecord}</td><td>${team.winPct}</td><td>${team.pointsFor}</td><td>${team.pointsAgainst}</td><td>${team.streak}</td><td>${team.division}</td><td>#${team.divisionRank}</td><td>#${team.sectionRank}</td>`;
    content.innerHTML = `<section class="league-identity" aria-live="polite"><div><p class="eyebrow">${league.affiliation}</p><h2>${league.name}</h2><p class="league-season">2026 Football Standings <span>•</span> ${league.teams.length} teams</p></div><div class="league-status"><span class="mock-badge">Mock Data · Preseason Preview</span><small>Last updated: ${league.updated}</small></div></section><div class="standings-views" role="tablist" aria-label="Standings view">${views.map((view) => `<button type="button" role="tab" aria-selected="${view.id === viewId}" class="standings-view${view.id === viewId ? ' is-active' : ''}" data-view-id="${view.id}">${view.label}</button>`).join('')}</div>${viewId === 'overall' ? '<p class="standings-note">Ordered by mock overall record within this selected league—not an official Central Section ranking.</p>' : ''}${viewId === 'division' ? '<p class="standings-note">Division placements and rankings are placeholders until a verified source is connected.</p>' : ''}<div class="standings-table-wrap" tabindex="0" aria-label="Scrollable standings table"><table class="standings-table"><caption class="sr-only">${league.name} ${viewId} standings, mock data</caption><thead><tr><th scope="col">Rank</th><th scope="col">School</th>${headers}<th scope="col"><span class="sr-only">Team details</span></th></tr></thead><tbody>${teams.map((team, index) => `<tr${index === 0 ? ' class="is-leader"' : ''}><td data-label="Rank"><span class="table-rank">${index + 1}</span></td><th scope="row" data-label="School"><span class="team-cell"><span class="team-mark" aria-hidden="true">${team.initials}</span><span>${team.name}</span></span></th>${cells(team)}<td data-label=""><button type="button" class="view-team" aria-label="View ${team.name} team details (coming soon)">View Team <span aria-hidden="true">→</span></button></td></tr>`).join('')}</tbody></table></div><p class="standings-disclaimer">All records, points, ranks, and division placements on this page are fictional mock data for a preseason product preview.</p>`;
  }
  function chooseLeague(id, update = true) { leagueId = id; if (update) setUrl(); render(); }
  function chooseView(id, update = true) { viewId = id; if (update) setUrl(); render(); }
  tabs.addEventListener('click', (event) => { const button = event.target.closest('[data-league-id]'); if (button) chooseLeague(button.dataset.leagueId); });
  select.addEventListener('change', () => chooseLeague(select.value));
  content.addEventListener('click', (event) => { const button = event.target.closest('[data-view-id]'); if (button) chooseView(button.dataset.viewId); });
  window.addEventListener('popstate', () => { const state = new URLSearchParams(window.location.search); leagueId = rankingGroups.some((league) => league.id === state.get('league')) ? state.get('league') : rankingGroups[0].id; viewId = views.some((view) => view.id === state.get('view')) ? state.get('view') : 'league'; render(); });
  render();
}

// Editable prototype data for the 2025 CIF Central Section championship finals.
const championshipGames = [
  { date: 'NOV 21', status: 'FINAL', division: 'CIF-CS D-I-AA', home: { seed: 1, name: 'Central East', record: '12-1', score: 70, winner: true }, away: { seed: 2, name: 'Clovis', record: '10-3', score: 35, winner: false }, champion: 'Central East' },
  { date: 'NOV 21', status: 'FINAL', division: 'CIF-CS D-I-A', home: { seed: 1, name: 'Bakersfield Christian', record: '11-2', score: 38, winner: true }, away: { seed: 3, name: 'Liberty', record: '8-5', score: 16, winner: false }, champion: 'Bakersfield Christian' },
  { date: 'NOV 28', status: 'FINAL', division: 'CIF-CS D-II', home: { seed: 4, name: 'Arroyo Grande', record: '11-3', score: 23, winner: true }, away: { seed: 2, name: 'Bakersfield', record: '10-4', score: 20, winner: false }, champion: 'Arroyo Grande' },
  { date: 'NOV 28', status: 'FINAL', division: 'CIF-CS D-III', home: { seed: 5, name: 'Kennedy', record: '11-3', score: 49, winner: true }, away: { seed: 6, name: 'Independence', record: '9-5', score: 13, winner: false }, champion: 'Kennedy' },
  { date: 'NOV 28', status: 'FINAL', division: 'CIF-CS D-IV', home: { seed: 2, name: 'Immanuel', record: '12-2', score: 48, winner: true }, away: { seed: 1, name: 'Templeton', record: '12-2', score: 7, winner: false }, champion: 'Immanuel' },
  { date: 'NOV 28', status: 'FINAL', division: 'CIF-CS D-V', home: { seed: 4, name: 'Bishop Union', record: '12-2', score: 69, winner: true }, away: { seed: 2, name: 'Woodlake', record: '11-3', score: 21, winner: false }, champion: 'Bishop Union' },
  { date: 'NOV 28', status: 'FINAL', division: 'CIF-CS D-VI', home: { seed: 1, name: 'Minarets', record: '12-2', score: 21, winner: true }, away: { seed: 2, name: 'Orosi', record: '11-3', score: 14, winner: false }, champion: 'Minarets' },
  { date: 'NOV 21', status: 'FINAL', division: 'CIF-CS 8-PLAYER', home: { seed: 1, name: 'Fresno Christian', record: '12-0', score: 78, winner: true }, away: { seed: 2, name: 'Immanuel Christian', record: '10-2', score: 14, winner: false }, champion: 'Fresno Christian' }
];

const tickerViewport = document.querySelector('.score-ticker-viewport');
const tickerTrack = document.querySelector('.score-ticker-track');
const previousScoreButton = document.querySelector('.score-ticker-prev');
const nextScoreButton = document.querySelector('.score-ticker-next');

if (tickerViewport && tickerTrack && previousScoreButton && nextScoreButton) {
  const monogram = (name) => name.split(' ').map((word) => word[0]).join('').slice(0, 2);
  const teamRow = (team) => `<div class="score-team${team.winner ? ' is-winner' : ''}"><span class="team-monogram" aria-hidden="true">${monogram(team.name)}</span><span class="seed-badge">#${team.seed}</span><span class="team-details"><strong class="team-name">${team.name}</strong><span class="team-record">${team.record}</span></span><strong class="team-score">${team.score}</strong></div>`;

  // Render the score cards from the data above so results remain easy to update.
  tickerTrack.innerHTML = championshipGames.map((game) => `<article class="score-card"><header class="score-card-header"><span>${game.status} • ${game.date}</span><span>${game.division}</span></header>${teamRow(game.home)}${teamRow(game.away)}<footer class="score-card-footer">Champion · ${game.champion}</footer></article>`).join('');

  const updateTickerState = () => {
    const maxScroll = tickerViewport.scrollWidth - tickerViewport.clientWidth;
    const atStart = tickerViewport.scrollLeft <= 1;
    const atEnd = tickerViewport.scrollLeft >= maxScroll - 1;
    previousScoreButton.disabled = atStart;
    nextScoreButton.disabled = atEnd || maxScroll <= 1;
    tickerViewport.classList.toggle('has-left-overflow', !atStart);
    tickerViewport.classList.toggle('has-right-overflow', !atEnd && maxScroll > 1);
  };
  const scrollByCards = (direction) => {
    const cardWidth = tickerTrack.querySelector('.score-card').getBoundingClientRect().width;
    const cardCount = window.matchMedia('(max-width: 699px)').matches ? 1 : 2;
    tickerViewport.scrollBy({ left: direction * cardWidth * cardCount, behavior: 'smooth' });
  };

  // Native scroll, buttons, keyboard controls, and mouse dragging keep the ticker user-controlled.
  previousScoreButton.addEventListener('click', () => scrollByCards(-1));
  nextScoreButton.addEventListener('click', () => scrollByCards(1));
  tickerViewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCards(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  tickerViewport.addEventListener('wheel', (event) => {
    if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    tickerViewport.scrollBy({ left: event.deltaY, behavior: 'auto' });
  }, { passive: false });
  let dragStart = 0;
  let dragScrollStart = 0;
  tickerViewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    dragStart = event.clientX;
    dragScrollStart = tickerViewport.scrollLeft;
    tickerViewport.classList.add('is-dragging');
    tickerViewport.setPointerCapture(event.pointerId);
  });
  tickerViewport.addEventListener('pointermove', (event) => {
    if (tickerViewport.classList.contains('is-dragging')) tickerViewport.scrollLeft = dragScrollStart - (event.clientX - dragStart);
  });
  const endDrag = () => tickerViewport.classList.remove('is-dragging');
  tickerViewport.addEventListener('pointerup', endDrag);
  tickerViewport.addEventListener('pointercancel', endDrag);
  tickerViewport.addEventListener('scroll', updateTickerState, { passive: true });
  window.addEventListener('resize', updateTickerState);
  updateTickerState();
}

// Local-only quiz hub prototype data and interactions. Replace with reviewed quiz service data when available.
const quizzesApp = document.querySelector('[data-quizzes-app]');
if (quizzesApp) {
  const topicData = [
    { name: 'Definitions', questions: 24, completed: 24, accuracy: 83 },
    { name: 'The Game, Field and Equipment', questions: 31, completed: 14, accuracy: 79 },
    { name: 'Players, Substitutes and Equipment', questions: 28, completed: 8, accuracy: 75 },
    { name: 'Periods, Time Factors and Substitutions', questions: 36, completed: 19, accuracy: 72 },
    { name: 'Kicking the Ball and Fair Catch', questions: 34, completed: 34, accuracy: 86 },
    { name: 'Passing the Ball', questions: 38, completed: 20, accuracy: 74 },
    { name: 'Scoring Plays and Touchbacks', questions: 29, completed: 29, accuracy: 89 },
    { name: 'Player Conduct', questions: 26, completed: 11, accuracy: 77 },
    { name: 'Penalty Enforcement', questions: 42, completed: 26, accuracy: 68 },
    { name: 'Officials and Mechanics', questions: 33, completed: 0, accuracy: 0 }
  ];
  const topicGrid = quizzesApp.querySelector('[data-topic-grid]');
  const toast = quizzesApp.querySelector('[data-quiz-toast]');
  let activeTopicFilter = 'all';

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 4500);
  }

  function matchesTopicFilter(topic) {
    if (activeTopicFilter === 'progress') return topic.completed > 0 && topic.completed < topic.questions;
    if (activeTopicFilter === 'needs-work') return topic.accuracy > 0 && topic.accuracy < 75;
    if (activeTopicFilter === 'completed') return topic.completed === topic.questions;
    return true;
  }

  function renderTopics() {
    const topics = topicData.filter(matchesTopicFilter);
    topicGrid.innerHTML = topics.map((topic) => {
      const progress = Math.round((topic.completed / topic.questions) * 100);
      const action = topic.completed ? 'Continue Practice' : 'Practice';
      return `<article class="topic-card"><div><h3>${topic.name}</h3><div class="topic-card__meta"><span>${topic.questions} questions</span><span>${topic.completed} completed</span></div></div><div><div class="progress-track" aria-label="${progress}% complete"><span style="width:${progress}%"></span></div><div class="topic-card__meta"><span>${progress}% complete</span><span>${topic.accuracy ? `${topic.accuracy}% accuracy` : 'Not started'}</span></div></div><button type="button" data-topic-launch="${topic.name}">${action}</button></article>`;
    }).join('') || '<p class="quiz-toast">No topics match this filter yet. Try another view.</p>';
  }

  quizzesApp.querySelectorAll('[data-topic-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeTopicFilter = button.dataset.topicFilter;
      quizzesApp.querySelectorAll('[data-topic-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
      renderTopics();
    });
  });
  quizzesApp.addEventListener('click', (event) => {
    const launch = event.target.closest('[data-quiz-launch], [data-topic-launch]');
    if (launch) showToast(`${launch.dataset.quizLaunch || launch.dataset.topicLaunch} is queued for the quiz experience coming next.`);
  });
  renderTopics();

  const scenarioForm = quizzesApp.querySelector('[data-scenario-form]');
  const scenarioResult = quizzesApp.querySelector('[data-scenario-result]');
  scenarioForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = scenarioForm.querySelector('input[name="ruling"]:checked');
    if (!selected) {
      scenarioResult.hidden = false;
      scenarioResult.innerHTML = '<strong>Select a ruling first.</strong> Choose the call you would make, then check your ruling.';
      return;
    }
    scenarioForm.querySelectorAll('label').forEach((label) => {
      const input = label.querySelector('input');
      label.classList.toggle('is-correct', input.value === 'b');
      label.classList.toggle('is-incorrect', input.checked && input.value !== 'b');
    });
    const correct = selected.value === 'b';
    scenarioResult.hidden = false;
    scenarioResult.innerHTML = `<strong>${correct ? 'Correct call.' : 'Review the enforcement.'}</strong> Intentional grounding applies. The penalty is enforced from the spot of the pass, with loss of down. <b>NFHS 7-5-2d</b> · <a href="rules.html">View Full Explanation</a>`;
  });
}
