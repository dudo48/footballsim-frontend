import Team from '@/shared/interfaces/team.interface';
import { Box, useDisclosure } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import TeamsSelectorModal from './teams-selector-modal';

interface Props {
  teams: Team[];
  setSelectedTeam: (value: Team) => void;
}

function TeamsSelector({
  teams,
  setSelectedTeam,
  children,
}: PropsWithChildren<Props>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box textAlign={'center'} cursor={'pointer'} onClick={() => onOpen()}>
        {children}
      </Box>
      <TeamsSelectorModal
        teams={teams}
        count={1}
        isOpen={isOpen}
        onClose={onClose}
        setFinalSelectedTeams={(value: Team[]) => setSelectedTeam(value[0])}
      />
    </>
  );
}

export default TeamsSelector;
