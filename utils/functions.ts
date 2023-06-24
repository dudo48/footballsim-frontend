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
