import TeamCard from '@/components/cards/team-card';
import SelectTeamsModal from '@/components/misc/select-teams-modal';
import Team from '@/interfaces/team.interface';
import { Box, Text, useDisclosure } from '@chakra-ui/react';

interface Props {
  title: string;
  selectedTeam?: Team;
  teams: Team[];
  setSelectedTeam: (value: Team) => void;
}

function SelectTeamCard({
  title,
  teams,
  selectedTeam,
  setSelectedTeam,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box textAlign={'center'} cursor={'pointer'} onClick={() => onOpen()}>
        <Text fontSize={'lg'}>{title}</Text>
        <TeamCard team={selectedTeam} />
      </Box>
      <SelectTeamsModal
        teams={teams}
        count={1}
        isOpen={isOpen}
        onClose={onClose}
        setFinalSelectedTeams={(value: Team[]) => setSelectedTeam(value[0])}
      />
    </>
  );
}

export default SelectTeamCard;
