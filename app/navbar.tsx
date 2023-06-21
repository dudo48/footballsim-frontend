'use client';

import { Flex, Heading } from '@chakra-ui/react';
import NavBarItem from './navbaritem';

function NavBar() {
  return (
    <Flex overflowX={'auto'}>
      <Heading mr={8} whiteSpace={'nowrap'}>
        ⚽ Footballsim
      </Heading>
      <NavBarItem href="/teams">Teams</NavBarItem>
      <NavBarItem href="/match">Match</NavBarItem>
      <NavBarItem href="/cup">Cup</NavBarItem>
      <NavBarItem href="/">About</NavBarItem>
    </Flex>
  );
}

export default NavBar;
