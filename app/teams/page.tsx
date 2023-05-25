'use client';
import FormModal from '@/components/form-modal';
import { useTeams } from '@/services/team-service';
import { Button, ButtonGroup, Heading, useDisclosure } from '@chakra-ui/react';
import { BsGear, BsPlusLg } from 'react-icons/bs';
import CreateTeamForm from './create-team-form';

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
      <ButtonGroup colorScheme="cyan" variant={'outline'}>
        <Button leftIcon={<BsPlusLg />} onClick={createTeamOnOpen}>
          Create a Team
        </Button>
        <Button leftIcon={<BsGear />}>Random Teams Generator</Button>
      </ButtonGroup>
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
