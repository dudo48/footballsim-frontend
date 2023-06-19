import Match from '@/interfaces/match.interface';
import { postRequest } from './requests';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/simulate`;

export function useMatchesSimulations() {
  return {
    simulateMatch: (match: Match, n: number) =>
      postRequest(`${baseUrl}/match`, match, { n: `${n}` }),
  };
}
