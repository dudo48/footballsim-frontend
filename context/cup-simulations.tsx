import Cup from '@/shared/interfaces/cup.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const CupSimulations = createContext<{
  isLoaded: boolean;
  simulations: Required<Cup>[];
  setSimulations: (value: Required<Cup>[]) => void;
}>({ isLoaded: false, simulations: [], setSimulations: () => null });

export function CupSimulationsProvider({ children }: PropsWithChildren) {
  const [simulations, setState] = useState<Required<Cup>[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  function setSimulations(sims: Required<Cup>[]) {
    sessionStorage.setItem('cup', JSON.stringify(sims));
    setState(sims);
  }

  useEffect(() => {
    const stringified = sessionStorage.getItem('cup');
    setState(stringified ? JSON.parse(stringified) : []);
    setIsLoaded(true);
  }, []);

  return (
    <CupSimulations.Provider value={{ simulations, isLoaded, setSimulations }}>
      {children}
    </CupSimulations.Provider>
  );
}
