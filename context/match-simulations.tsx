import Match from '@/shared/interfaces/match.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const MatchSimulations = createContext<{
  isLoaded: boolean;
  simulations: Required<Match>[];
  setSimulations: (value: Required<Match>[]) => void;
}>({ isLoaded: false, simulations: [], setSimulations: () => null });

export function MatchSimulationsProvider({ children }: PropsWithChildren) {
  const [simulations, setState] = useState<Required<Match>[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  function setSimulations(sims: Required<Match>[]) {
    sessionStorage.setItem('match', JSON.stringify(sims));
    setState(sims);
  }

  useEffect(() => {
    const stringified = sessionStorage.getItem('match');
    setState(stringified ? JSON.parse(stringified) : []);
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
