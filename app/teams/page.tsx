'use client';
import { useTeams } from '@/services/team-service';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsGear, BsPlusLg } from 'react-icons/bs';
import CreateTeamModal from './create-team-modal';
import GenerateTeamsModal from './generate-teams-modal';
import TeamsGrid from './teams-grid';

function Page() {
  const { teams, isLoading } = useTeams();
  const sortedTeams = [...teams].reverse();

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
      <Skeleton isLoaded={!isLoading} minH={'100vh'}>
        <Flex align={'center'} justify={'space-between'} mb={4}>
          <Heading>Teams ({teams.length})</Heading>
          <ButtonGroup colorScheme="cyan" variant={'outline'}>
            <Button leftIcon={<BsPlusLg />} onClick={createTeamOnOpen}>
              Create a Team
            </Button>
            <Button leftIcon={<BsGear />} onClick={generateTeamsOnOpen}>
              Random Teams Generator
            </Button>
          </ButtonGroup>
        </Flex>
        <CreateTeamModal
          onClose={createTeamOnClose}
          isOpen={createTeamIsOpen}
        />
        <GenerateTeamsModal
          onClose={generateTeamsOnClose}
          isOpen={generateTeamsIsOpen}
        />
        <TeamsGrid teams={sortedTeams} />
      </Skeleton>
    </>
  );
}

export default Page;
