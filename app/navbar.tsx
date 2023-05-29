'use client';

import { Flex, Heading } from '@chakra-ui/react';
import NavBarItem from './navbaritem';

function NavBar() {
  return (
    <Flex>
      <Heading mr={8}>⚽ Footballsim</Heading>
      <NavBarItem href="/teams">Teams</NavBarItem>
      <NavBarItem href="/quick-match">Quick Match</NavBarItem>
      <NavBarItem href="/">About</NavBarItem>
    </Flex>
  );
}

export default NavBar;
