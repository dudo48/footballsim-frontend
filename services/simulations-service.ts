import QuickMatch from '@/interfaces/quick-match.interface';
import { postRequest } from './requests';

const baseUrl = `${process.env.backendUrl}/simulations`;

export function useMatchesSimulations() {
  return {
    simulateQuickMatch: (match: QuickMatch, n: number) =>
      postRequest(`${baseUrl}/matches/quick`, match, { n: `${n}` }),
  };
}
