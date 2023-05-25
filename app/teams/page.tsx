'use client';
import { Heading } from '@chakra-ui/react';
import CreateTeamForm from './form';
import { useTeams } from '@/services/team-service';

function Page() {
  const { teams, mutate } = useTeams();
  console.log(teams);

  return (
    <>
      <Heading textAlign={'center'} mb={'6'}>
        Teams
      </Heading>
      <CreateTeamForm mutateTeams={(result) => mutate(teams.concat(result))} />
    </>
  );
}

export default Page;
