import Match from '@/interfaces/match.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const QuickMatchSimulations = createContext<{
  isLoaded: boolean;
  matches: Match[];
  setMatches: (value: Match[]) => void;
}>({ isLoaded: false, matches: [], setMatches: () => null });

export function QuickMatchSimulationsProvider({ children }: PropsWithChildren) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const simulationMatches = JSON.parse(
      sessionStorage.getItem('simulationMatches') || '[]'
    );
    setMatches(simulationMatches);
    setIsLoaded(true);
  }, []);

  return (
    <QuickMatchSimulations.Provider value={{ matches, isLoaded, setMatches }}>
      {children}
    </QuickMatchSimulations.Provider>
  );
}
