'use client';
import TeamsGrid from '@/components/misc/teams-grid';
import { useTeams } from '@/services/team-service';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { BsGear, BsPlusLg } from 'react-icons/bs';
import CreateTeamModal from './create-team-modal';
import GenerateTeamsModal from './generate-teams-modal';

function Page() {
  const { teams, isLoading } = useTeams();

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
        <TeamsGrid teams={teams} />
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
