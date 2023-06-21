import Team from '@/shared/interfaces/team.interface';
import { Box, useDisclosure } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import TeamsSelectorModal from './teams-selector-modal';

interface Props {
  teams: Team[];
  setSelectedTeams: (value: Team[]) => void;
  count?: number;
}

function TeamsSelector({
  teams,
  setSelectedTeams,
  count,
  children,
}: PropsWithChildren<Props>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w={'max-content'}
        h={'max-content'}
        cursor={'pointer'}
        onClick={() => onOpen()}
      >
        {children}
      </Box>
      <TeamsSelectorModal
        teams={teams}
        count={count && Math.floor(count) > 0 ? Math.floor(count) : 1}
        isOpen={isOpen}
        onClose={onClose}
        setFinalSelectedTeams={(value: Team[]) => setSelectedTeams(value)}
      />
    </>
  );
}

export default TeamsSelector;
