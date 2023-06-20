import Match from '@/shared/interfaces/match.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const MatchSimulations = createContext<{
  isLoaded: boolean;
  matches: Match[];
  setMatches: (value: Match[]) => void;
}>({ isLoaded: false, matches: [], setMatches: () => null });

export function MatchSimulationsProvider({ children }: PropsWithChildren) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const simulationMatches = JSON.parse(
      sessionStorage.getItem('matches') || '[]'
    );
    setMatches(simulationMatches);
    setIsLoaded(true);
  }, []);

  return (
    <MatchSimulations.Provider value={{ matches, isLoaded, setMatches }}>
      {children}
    </MatchSimulations.Provider>
  );
}
