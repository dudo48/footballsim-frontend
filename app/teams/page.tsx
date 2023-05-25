'use client';
import { useTeams } from '@/services/team-service';
import { Button, HStack, Heading, useDisclosure } from '@chakra-ui/react';
import CreateTeamForm from './create-team-form';
import FormModal from '@/components/form-modal';

function Page() {
  const { teams, mutate } = useTeams();
  const {
    isOpen: createTeamIsOpen,
    onOpen: createTeamOnOpen,
    onClose: createTeamOnClose,
  } = useDisclosure();

  return (
    <>
      <Heading textAlign={'center'} mb={'6'}>
        Teams
      </Heading>
      <HStack>
        <Button onClick={createTeamOnOpen}>Create a Team</Button>
        <Button>Quick Teams Generator</Button>
      </HStack>
      <FormModal
        title="Create a Team"
        onClose={createTeamOnClose}
        isOpen={createTeamIsOpen}
      >
        <CreateTeamForm
          mutateTeams={(result) => mutate(teams.concat(result))}
        />
      </FormModal>
    </>
  );
}

export default Page;
