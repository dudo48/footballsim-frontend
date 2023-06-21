'use client';
import { MatchSimulationsProvider } from '@/context/match-simulations';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <MatchSimulationsProvider>{children}</MatchSimulationsProvider>;
}

export default Layout;
