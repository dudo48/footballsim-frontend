'use client';

import { Flex } from '@chakra-ui/react';
import { BsPeople, BsPlayBtn, BsQuestionCircle } from 'react-icons/bs';
import NavBarItem from './navbaritem';

function NavBar() {
  return (
    <Flex>
      <NavBarItem leftIcon={<BsQuestionCircle />} href="/">
        About
      </NavBarItem>
      <NavBarItem leftIcon={<BsPeople />} href="/teams">
        Teams
      </NavBarItem>
      <NavBarItem leftIcon={<BsPlayBtn />} href="/simulations">
        Simulations
      </NavBarItem>
    </Flex>
  );
}

export default NavBar;
