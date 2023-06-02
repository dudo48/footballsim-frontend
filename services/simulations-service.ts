import Match from '@/interfaces/match.interface';
import { postRequest } from './requests';

const baseUrl = `${process.env.backendUrl}/simulations`;

export function useMatchesSimulations() {
  return {
    simulateQuickMatch: (match: Match, n: number) =>
      postRequest(`${baseUrl}/matches`, match, { n: `${n}` }),
  };
}
