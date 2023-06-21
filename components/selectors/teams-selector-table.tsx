import Team from '@/shared/interfaces/team.interface';
import { Stack } from '@chakra-ui/react';
import TeamsTable from '../tables/teams-table';

interface Props {
  teams: Team[];
  selectedTeams: Team[];
  setSelectedTeams: (value: Team[]) => void;
}

function TeamsSelectorTable({ teams, selectedTeams, setSelectedTeams }: Props) {
  function selectTeam(team: Team) {
    if (selectedTeams.some((t) => team.id === t.id)) {
      setSelectedTeams(selectedTeams.filter((t) => t.id !== team.id));
    } else {
      setSelectedTeams(selectedTeams.concat(team));
    }
  }

  return (
    <Stack>
      <TeamsTable
        selectTeam={selectTeam}
        selectedTeams={selectedTeams}
        teams={teams}
        allowSorting
      />
    </Stack>
  );
}

export default TeamsSelectorTable;
