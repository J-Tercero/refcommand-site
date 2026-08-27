(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.refCommandPregames = data;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return [{
    slug: 'centennial-at-clovis-east-2026-08-27',
    snapshot: {
      matchup: 'Clovis East vs. Centennial-Bakersfield',
      level: 'JV Football',
      date: 'Thursday, August 27, 2026',
      kickoff: '4:00 PM',
      venue: 'Clovis East High School',
      arrival: 'Fully dressed and on the field no later than 3:30 PM',
      uniform: 'Standard high-school officiating uniform using the new/current referee shirt and pants.'
    },
    crew: [
      { name: 'Justin Tercero', position: 'Referee', responsibilities: ['Set the tone for professional sideline management.', 'Support flank officials when sideline issues require escalation.', 'Maintain crew-wide consistency.'] },
      { name: 'Gaege Mort', position: 'Umpire', responsibilities: ['Be aware of bench-side activity when transitioning between plays.', 'Communicate unusual sideline or substitution issues to the referee and flank officials.'] },
      { name: 'Mike Yavasile', position: 'Down Judge', responsibilities: ['Primary responsibility for managing the sideline on the assigned side.', 'Establish expectations with the head coach before kickoff.', 'Address restricted-area encroachment early and consistently.'] },
      { name: 'Kylon Miller', position: 'Line Judge', responsibilities: ['Manage the sideline on the opposite side with the same expectations as the Down Judge.', 'Establish expectations with the head coach before kickoff.', 'Communicate developing problems to the referee.'] },
      { name: 'Imri Doyle', position: 'Back Judge', responsibilities: ['Maintain awareness of sideline conduct downfield.', 'Assist the flank officials when conduct or positioning affects officiating coverage.'] }
    ],
    focus: {
      title: 'Sideline Management and Control',
      introduction: 'Sideline management improves game safety by keeping game officials, players, coaches, substitutes, attendants, and other team personnel clear of active officiating and playing areas.',
      benefits: ['Gives officials a clear and safe working area.', 'Reduces unnecessary contact between officials and team personnel.', 'Promotes professionalism and good sportsmanship.', 'Prevents unnecessary delays and confrontations.', 'Allows flank officials to maintain proper positioning and mechanics.']
    },
    restrictedArea: {
      summary: 'The restricted area is the area immediately outside the sideline designated for officials to work. It is distinct from the team box.',
      liveBall: ['The restricted area must remain clear.', 'Coaches, substitutes, attendants, and other team personnel may not occupy the restricted area.', 'Officials must have unobstructed access to this area while officiating the play.'],
      deadBall: 'When the ball is dead, authorized team personnel may enter the restricted area only as permitted by NFHS rules and normal sideline procedures.',
      expectation: 'Flank officials should address violations early and consistently rather than allowing sideline encroachment to become progressively worse during the game.'
    },
    coachBriefing: ['The restricted area must remain clear while the ball is live.', 'Coaches and team personnel should remain behind the restricted-area boundary during live-ball action.', 'The crew will address sideline encroachment early.', 'Keeping the sideline clear protects both officials and team personnel and helps prevent unnecessary penalties later in the game.'],
    rules: [
      { citation: 'NFHS Rule 1-2-3g', topic: 'Team Box / Restricted Area', summary: 'Defines the team box and the restricted area along the sideline.' },
      { citation: 'NFHS Rule 9-8-1k', topic: 'Sideline Interference / Restricted Area Conduct', summary: 'Addresses prohibited conduct involving team personnel and the restricted area.' }
    ],
    notes: ['Arrive ready to work: fully dressed and on the field by 3:30 PM.', 'Down Judge and Line Judge: complete the coach briefing before kickoff.', 'Address encroachment preventively, early, and consistently.', 'Communicate developing sideline concerns across the crew before they escalate.']
  }];
}));
