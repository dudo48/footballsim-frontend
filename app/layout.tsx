'use client';
import { Box, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import './globals.css';
import NavBar from './navbar';
import Providers from './providers';

export const metadata = {
  title: 'Footballsim',
  description: 'Generated by create next app',
};

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Flex direction={'column'} p={2} gap={2} minH={'100vh'}>
            <Box rounded={'md'} bg={'footballsim.700'}>
              <NavBar />
            </Box>
            <Box
              rounded={'md'}
              bg={'footballsim.700'}
              p={4}
              flex={'1 1 0'}
              display={'flex'}
            >
              {children}
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}

export default Layout;
