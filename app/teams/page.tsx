'use client';
import { useTeams } from '@/services/team-service';
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
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
      <Skeleton isLoaded={!isLoading} w={'full'}>
        <Flex align={'center'} justify={'space-between'} mb={4}>
          <Heading>Teams ({teams.length})</Heading>
          <Stack direction={['column', null, 'row']}>
            <Button
              colorScheme="cyan"
              variant={'outline'}
              leftIcon={<BsPlusLg />}
              onClick={createTeamOnOpen}
            >
              Create a Team
            </Button>
            <Button
              colorScheme="cyan"
              variant={'outline'}
              leftIcon={<BsGear />}
              onClick={generateTeamsOnOpen}
            >
              Generate Random Teams
            </Button>
          </Stack>
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
