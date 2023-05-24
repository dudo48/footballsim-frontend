'use client';

import { Flex } from '@chakra-ui/react';
import NavBarItem from './navbaritem';

function NavBar() {
  return (
    <Flex>
      <NavBarItem href="/teams">Teams</NavBarItem>
      <NavBarItem href="/matches">Matches</NavBarItem>
    </Flex>
  );
}

export default NavBar;
