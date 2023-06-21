'use client';
import TeamsGrid from '@/app/teams/teams-grid';
import { useTeamActions, useTeams } from '@/services/teams-service';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BsGear, BsPlusLg, BsTrash } from 'react-icons/bs';
import CreateTeamModal from './create-team-modal';
import GenerateTeamsModal from './generate-teams-modal';

function Page() {
  const { teams, isLoading } = useTeams();
  const { deleteAllTeams } = useTeamActions();
  const toast = useToast();
  const { mutate } = useTeams();

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

  async function deleteAll() {
    const result = await deleteAllTeams();
    if (!result.error) {
      toast({
        status: 'success',
        description: `All teams are deleted`,
        duration: 2000,
      });
      mutate([]);
    } else {
      toast({
        status: 'error',
        description: `Failed to delete teams.`,
      });
    }
  }

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
              <Button
                colorScheme={'red'}
                leftIcon={<BsTrash />}
                onClick={deleteAll}
              >
                Delete All
              </Button>
            </Stack>
          </ButtonGroup>
        </Flex>
        <TeamsGrid teams={teams} deletable={true} />
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
