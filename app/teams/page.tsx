'use client';
import { useTeams } from '@/services/team-service';
import { teamSorts } from '@/utils/sorting';
import {
  Button,
  ButtonGroup,
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
  const [sorting, setSorting] = useState('lastAdded');
  const [isDescending, setIsDescending] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
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
          <Heading size={'lg'}>Teams ({teams.length})</Heading>
          <ButtonGroup colorScheme={'cyan'} variant={'outline'}>
            <Stack direction={['column', null, 'row']}>
              <Button leftIcon={<BsPlusLg />} onClick={createTeamOnOpen}>
                Create a Team
              </Button>
              <Button leftIcon={<BsGear />} onClick={generateTeamsOnOpen}>
                Generate Random Teams
              </Button>
            </Stack>
          </ButtonGroup>
        </Flex>
        <SortTeams
          sorting={sorting}
          setSorting={setSorting}
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
