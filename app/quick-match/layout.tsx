'use client';
import { QuickMatchSimulationsProvider } from '@/context/quick-match-simulations';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <QuickMatchSimulationsProvider>{children}</QuickMatchSimulationsProvider>
  );
}

export default Layout;
