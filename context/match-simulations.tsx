import Match from '@/shared/interfaces/match.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const MatchSimulations = createContext<{
  isLoaded: boolean;
  simulations: Match[];
  setSimulations: (value: Match[]) => void;
}>({ isLoaded: false, simulations: [], setSimulations: () => null });

export function MatchSimulationsProvider({ children }: PropsWithChildren) {
  const [simulations, setSimulations] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const stringified = sessionStorage.getItem('matches');
    setSimulations(stringified ? JSON.parse(stringified) : []);
    setIsLoaded(true);
  }, []);

  return (
    <MatchSimulations.Provider
      value={{ simulations, isLoaded, setSimulations }}
    >
      {children}
    </MatchSimulations.Provider>
  );
}
