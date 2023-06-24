import Cup from '@/shared/interfaces/cup.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const CupSimulations = createContext<{
  isLoaded: boolean;
  simulations: Cup[];
  setSimulations: (value: Cup[]) => void;
}>({ isLoaded: false, simulations: [], setSimulations: () => null });

export function CupSimulationsProvider({ children }: PropsWithChildren) {
  const [simulations, setSimulations] = useState<Cup[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const stringified = sessionStorage.getItem('cups');
    setSimulations(stringified ? JSON.parse(stringified) : []);
    setIsLoaded(true);
  }, []);

  return (
    <CupSimulations.Provider value={{ simulations, isLoaded, setSimulations }}>
      {children}
    </CupSimulations.Provider>
  );
}
