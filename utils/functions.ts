/* eslint-disable @typescript-eslint/no-explicit-any */
import Round from '@/shared/interfaces/round.interface';
import { sorts } from '@/shared/misc/sorting';
import { Dispatch, SetStateAction } from 'react';

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

// table function
export function updateSorting(
  value: (a: any, b: any) => number,
  sort: (a: any, b: any) => number,
  setSort: Dispatch<SetStateAction<(a: any, b: any) => number>>,
  isDesc: boolean,
  setIsDesc: Record<string, () => void>
) {
  if (value === sort) {
    if (!isDesc) {
      setSort(() => sorts.lastAdded);
      return;
    }
    setIsDesc.off();
  } else {
    setSort(() => value);
    setIsDesc.on();
  }
}

export function getSortingDecoration(
  sort: (a: any, b: any) => number,
  isDesc: boolean,
  value?: (a: any, b: any) => number
) {
  if (sort !== value) {
    return 'none';
  }
  return isDesc ? 'underline' : 'overline';
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
