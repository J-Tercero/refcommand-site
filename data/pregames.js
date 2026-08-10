(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.refCommandPregames = data;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return [{
    slug: 'central-at-clovis-west-2026-09-18',
    snapshot: {
      matchup: 'Central Grizzlies at Clovis West Golden Eagles', level: 'Varsity · Tri-River Athletic Conference',
      date: 'Friday, September 18, 2026', kickoff: '7:30 PM', venue: 'Veterans Memorial Stadium',
      address: '1560 N Minnewawa Ave, Clovis, CA 93619', arrival: '5:30 PM',
      meeting: '5:45 PM · North parking lot, crew vehicles', parking: 'Enter from N Minnewawa; use the officials’ row behind the north gate.',
      uniform: '2¼-inch stripes, black pants, long black socks', weather: 'Clear · 82°F at kickoff · light northwest wind',
      evaluator: 'Denise Alvarez · CSOA observer', contact: 'Alex Morgan, Referee · (559) 555-0142'
    },
    refereeMessage: 'This week, our priority is calm communication and strong dead-ball officiating. Be decisive, help the crew when appropriate, and never create a second problem while addressing the first one.',
    gameInformation: [
      { label: 'Timing', text: 'Standard varsity timing. The stadium clock operator is Maria Santos; meet her at 6:55 PM.' },
      { label: 'Game context', text: 'Senior Night introductions may delay the coin toss by five minutes. This is a rivalry game with a large expected crowd.' },
      { label: 'Field & teams', text: 'Home team uses the west sideline. Chain crew reports to the Down Judge at 6:50 PM; two ball persons per team.' },
      { label: 'Equipment', text: 'The visitor has asked about gray undershirts. Confirm legality during the head-coach conference; no exception has been granted.' }
    ],
    crew: [
      { name: 'Alex Morgan', position: 'Referee', emphasis: ['Keep penalty announcements brief and deliberate.', 'Own the reset after emotionally charged dead balls.'], duty: 'Confirm Senior Night timeline with game management.', more: 'Before every enforcement, get a complete report, repeat the result to the calling official, then face the press box.' },
      { name: 'Jordan Lee', position: 'Umpire', emphasis: ['Find illegal action at the point of attack, not the ball.', 'Use preventive words with interior linemen.'], more: 'On pass plays, step up only after the passer and blocking action allow; maintain a useful window for short completions.' },
      { name: 'Cameron Ruiz', position: 'Down Judge', emphasis: ['Set a firm restricted-area expectation early.', 'Confirm the line-to-gain before every new series.'], duty: 'Meet and brief the chain crew at 6:50 PM.' },
      { name: 'Taylor Brooks', position: 'Line Judge', emphasis: ['Hold the line on close forward-progress spots.', 'Stay patient on reverse mechanics and cross-field help.'], more: 'When the runner is threatened near the sideline, move with the play and keep separation from team personnel.' },
      { name: 'Riley Chen', position: 'Back Judge', emphasis: ['Own the play clock and visible five-second count.', 'Keep cushions on deep receivers before finding the ball.'], duty: 'Verify stadium play-clock operation before warmups end.' },
      { name: 'Morgan Davis', position: 'Field Judge', emphasis: ['Stay square on goal-line approaches.', 'Continue dead-ball coverage after the score.'], more: 'On deep sideline catches, rule only what you see and communicate catch status before discussing the spot.' },
      { name: 'Casey Patel', position: 'Side Judge', emphasis: ['Match receivers through initial contact.', 'Be strong on the runner’s location when forward progress stops.'], duty: 'Observe the visiting sideline equipment check.' }
    ],
    rulesFocus: {
      title: 'Dead-ball fouls after a scoring play', explanation: 'A score does not erase action that happens after the ball becomes dead. Separate the result of the play from later conduct, identify each foul, and communicate enforcement options clearly.',
      why: 'A rivalry atmosphere can turn routine celebration into confrontation; calm recognition prevents one act from producing another.',
      situations: ['After a touchdown, A12 taunts B4 before the try.', 'After the try ends, B4 shoves A12 and A12 retaliates.'],
      ruling: 'The touchdown stands. Classify and record each dead-ball foul, enforce in the order and manner required, and disqualify only when the act meets that standard.',
      enforcement: 'Confirm ball status, foul type, offender, and succeeding spot before announcing. Do not combine unrelated dead-ball acts into a live-ball ruling.',
      citation: 'NFHS Football Rules 2-16, 8-2, 9-5 and 10-4 (verify against the current authorized publication).',
      more: 'Crew process: the nearest official stops escalation while another records numbers. The calling official reports color, number, act, ball status, and whether the conduct may be flagrant.', authorizedExcerpt: null
    },
    mechanicsFocus: {
      title: 'Dead-ball triangle and cross-field awareness', execution: 'The covering official stays with the spot while adjacent officials close to observe players, then widen only when the threat is over.',
      positions: ['All seven officials; wings and deep officials are principally involved'],
      mistakes: ['Turning immediately toward the next spot', 'All officials watching the same confrontation', 'Long-distance shouting instead of concise signals'],
      communication: 'Use names and short phrases: “I have the spot,” “You have the bench,” and “Number 12 recorded.”',
      more: 'Do not rush into players without an exit path. Arrive visibly, use voice first, and keep another official available to observe and record.'
    },
    playSituation: {
      title: 'After the touchdown', situation: 'A22 scores near the visiting sideline. As the ball becomes dead, B6 bumps A22, who turns and spikes the ball at B6’s feet. Two substitutes step onto the field and begin shouting.',
      prompt: 'What do you have, and what does each position do next?', ruling: 'The touchdown counts. Judge A22’s act under the conduct rules and separately address any subsequent dead-ball action. Record participants before administering penalties.',
      explanation: 'Ball status, sequence, and individual acts matter. The crew must prevent escalation without inventing offsetting action merely because both teams are involved.',
      observations: ['Covering wing: hold the goal-line ruling and identify A22.', 'Deep official: observe B6 and approaching substitutes.', 'Referee/Umpire: create separation, collect reports, and administer in sequence.']
    },
    quiz: [
      { id: 'q1', category: 'Rules', prompt: 'A player taunts an opponent after crossing the goal line. Does the touchdown count?', choices: ['Yes; treat the later act separately', 'No; the score is canceled', 'Only if the opponent does not respond'], answer: 0, explanation: 'The score is completed before the dead-ball conduct. Record and enforce the later foul under the applicable rule.' },
      { id: 'q2', category: 'Rules', prompt: 'What should the reporting official give the referee first?', choices: ['A long explanation of the play', 'Color, number, foul, ball status, and result', 'The coach’s likely reaction'], answer: 1, explanation: 'A concise factual report gives the referee what is needed to confirm enforcement.' },
      { id: 'q3', category: 'Rules', prompt: 'Two opponents commit separate dead-ball acts. What is essential?', choices: ['Ignore the first act', 'Call only the retaliation', 'Record the sequence and each offender'], answer: 2, explanation: 'Sequence and individual responsibility are necessary for accurate administration.' },
      { id: 'q4', category: 'Mechanics', prompt: 'After a score near a sideline, the covering official should first:', choices: ['Run directly to midfield', 'Hold the ruling and observe nearby players', 'Watch the scoreboard'], answer: 1, explanation: 'The covering official preserves the ruling while the crew forms dead-ball coverage around the players.' },
      { id: 'q5', category: 'Game management', prompt: 'A coach is loudly demanding an immediate explanation while the crew is separating players. Best response?', choices: ['Debate the coach immediately', 'Ignore the incident to speak with the coach', 'Finish player control, then give a concise explanation'], answer: 2, explanation: 'Safety and accurate information come first; communicate with the coach once the crew has control.' }
    ],
    acknowledgment: 'I acknowledge that I received this pregame.',
    recap: ['Confirm all officials and equipment are present.', 'Review game modifications and Senior Night timing.', 'Address submitted or received questions.', 'Rules reminder: separate the score from later dead-ball conduct.', 'Mechanics reminder: hold the spot and build a dead-ball triangle.', 'Communication: names, short phrases, complete foul reports.', 'Review the unusual play situation and escalation coverage.', 'Coin toss: captains ready at 7:24 PM.', 'Leave the field together immediately after required duties.', 'Take final questions.']
  }];
}));
