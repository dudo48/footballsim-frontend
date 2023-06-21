'use client';
import { CupSimulationProvider } from '@/context/cup-simulations';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <CupSimulationProvider>{children}</CupSimulationProvider>;
}

export default Layout;
