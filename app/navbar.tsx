'use client';

import { Flex } from '@chakra-ui/react';
import NavBarItem from './navbaritem';
import { BsPeople, BsQuestionCircle, BsTabletLandscape } from 'react-icons/bs';

function NavBar() {
  return (
    <Flex>
      <NavBarItem leftIcon={<BsQuestionCircle />} href="/">
        About
      </NavBarItem>
      <NavBarItem leftIcon={<BsPeople />} href="/teams">
        Teams
      </NavBarItem>
      <NavBarItem leftIcon={<BsTabletLandscape />} href="/matches">
        Matches
      </NavBarItem>
    </Flex>
  );
}

export default NavBar;
