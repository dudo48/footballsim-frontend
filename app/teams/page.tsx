'use client';
import { Heading } from '@chakra-ui/react';
import CreateTeamForm from './form';

function Page() {
  return (
    <>
      <Heading textAlign={'center'} mb={'6'}>
        Teams
      </Heading>
      <CreateTeamForm />
    </>
  );
}

export default Page;
