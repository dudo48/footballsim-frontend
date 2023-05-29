'use client';
import { useTeams } from '@/services/team-service';
import { sortingMethod } from '@/utils/sorting';
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsGear, BsPlusLg } from 'react-icons/bs';
import CreateTeamModal from './create-team-modal';
import GenerateTeamsModal from './generate-teams-modal';
import SortTeams from './sort-teams';
import TeamsGrid from './teams-grid';

function Page() {
  const { teams, isLoading } = useTeams();
  const [sortingOption, setSortingOption] = useState('lastAdded');
  const [isDescending, setIsDescending] = useState(true);

  const sortedTeams = [...teams].sort(sortingMethod[sortingOption]);
  if (isDescending) sortedTeams.reverse();

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
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Flex align={'center'} justify={'space-between'}>
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
        <SortTeams
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
          isDescending={isDescending}
          setIsDescending={setIsDescending}
        />
        <TeamsGrid teams={sortedTeams} />
        <CreateTeamModal
          onClose={createTeamOnClose}
          isOpen={createTeamIsOpen}
        />
        <GenerateTeamsModal
          onClose={generateTeamsOnClose}
          isOpen={generateTeamsIsOpen}
        />
      </Stack>
    </Skeleton>
  );
}

export default Page;
