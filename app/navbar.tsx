'use client';

import { Flex } from '@chakra-ui/react';
import { BsPeople, BsPlayBtn, BsQuestionCircle } from 'react-icons/bs';
import NavBarItem from './navbaritem';

function NavBar() {
  return (
    <Flex>
      <NavBarItem href="/teams">Teams</NavBarItem>
      <NavBarItem href="/quick-match">Quick Match</NavBarItem>
      <NavBarItem href="/">About</NavBarItem>
    </Flex>
  );
}

export default NavBar;
