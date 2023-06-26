import Round from '@/shared/interfaces/round.interface';

export function getCupRoundName(round: Round) {
  switch (round.matches.length) {
    case 1:
      return 'Final';
    case 2:
      return 'Semi Finals';
    case 4:
      return 'Quarter Finals';
    default:
      return `Round of ${round.matches.length * 2}`;
  }
}

export function getCupRoundNameShort(round: Round) {
  switch (round.matches.length) {
    case 1:
      return 'F';
    case 2:
      return 'SF';
    case 4:
      return 'QF';
    default:
      return `R${round.matches.length * 2}`;
  }
}

// returns a name for the performance of a team in a cup
// export function getCupPositionName(cup: Required<Cup>, team: Team) {
//   const round = getRoundEliminatedAt(cup, team);
//   if (!round) return 'Winner';
//   switch (round.matches.length) {
//     case 1:
//       return 'Runner-up';
//     default:
//       return getCupRoundName(round);
//   }
// }
