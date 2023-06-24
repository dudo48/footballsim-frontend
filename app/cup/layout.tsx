'use client';
import { CupSimulationsProvider } from '@/context/cup-simulations';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <CupSimulationsProvider>{children}</CupSimulationsProvider>;
}

export default Layout;
