import Cup from '@/shared/interfaces/cup.interface';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const CupSimulation = createContext<{
  isLoaded: boolean;
  cup?: Cup;
  setCup: (value: Cup) => void;
}>({ isLoaded: false, cup: undefined, setCup: () => null });

export function CupSimulationProvider({ children }: PropsWithChildren) {
  const [cup, setCup] = useState<Cup>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const sessionCup = sessionStorage.getItem('cup');
    const cup = sessionCup ? JSON.parse(sessionCup) : undefined;
    setCup(cup);
    setIsLoaded(true);
  }, []);

  return (
    <CupSimulation.Provider value={{ cup, isLoaded, setCup }}>
      {children}
    </CupSimulation.Provider>
  );
}
