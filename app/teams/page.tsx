'use client';
import FormModal from '@/components/form-modal';
import { useTeams } from '@/services/team-service';
import { Button, ButtonGroup, Heading, useDisclosure } from '@chakra-ui/react';
import { BsGear, BsPlusLg } from 'react-icons/bs';
import CreateTeamForm from './create-team-form';
import GenerateTeamForm from './teams-generator-form';

function Page() {
  const { teams, mutate } = useTeams();
  const {
    isOpen: createTeamIsOpen,
    onOpen: createTeamOnOpen,
    onClose: createTeamOnClose,
  } = useDisclosure();

  const {
    isOpen: generateTeamsIsOpen,
    onOpen: generateTeamsOnOpen,
    onClose: generateTeamsOnClose,
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
        <Button leftIcon={<BsGear />} onClick={generateTeamsOnOpen}>
          Random Teams Generator
        </Button>
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
      <FormModal
        title="Random Teams Generator"
        onClose={generateTeamsOnClose}
        isOpen={generateTeamsIsOpen}
      >
        <GenerateTeamForm
          mutateTeams={(result) => mutate(teams.concat(result))}
        />
      </FormModal>
    </>
  );
}

export default Page;
