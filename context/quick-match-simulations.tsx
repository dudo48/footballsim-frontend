import Match from '@/interfaces/match.interface';
import { PropsWithChildren, createContext, useState } from 'react';

export const QuickMatchSimulations = createContext<{
  matches: Match[];
  setMatches: (value: Match[]) => void;
}>({ matches: [], setMatches: () => null });

export function QuickMatchSimulationsProvider({ children }: PropsWithChildren) {
  const [matches, setMatches] = useState<Match[]>([]);
  return (
    <QuickMatchSimulations.Provider value={{ matches, setMatches }}>
      {children}
    </QuickMatchSimulations.Provider>
  );
}
