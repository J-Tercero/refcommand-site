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
  const teamRow = (team) => `<div class="score-team${team.winner ? ' is-winner' : ''}"><span class="team-monogram" aria-hidden="true">${monogram(team.name)}</span><span class="team-name"><span class="seed-badge">#${team.seed}</span>${team.name}</span><span class="team-record">${team.record}</span><strong class="team-score">${team.score}</strong></div>`;

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
