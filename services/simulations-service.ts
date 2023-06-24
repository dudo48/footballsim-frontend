import Cup from '@/shared/interfaces/cup.interface';
import Match from '@/shared/interfaces/match.interface';
import { postRequest } from './requests';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/simulate`;

export function useSimulations() {
  return {
    simulateMatch: (match: Match, n: number) =>
      postRequest(`${baseUrl}/match`, match, { n: `${n}` }),
    simulateCup: (cup: Cup, n: number) =>
      postRequest(`${baseUrl}/cup`, cup, { n: `${n}` }),
  };
}
