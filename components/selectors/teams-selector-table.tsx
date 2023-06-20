import Team from '@/interfaces/team.interface';
import { teamSorts } from '@/utils/sorting';
import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from '../misc/select-sorting';
import TeamsTable from '../tables/teams-table';

interface Props {
  teams: Team[];
  selectedTeams: Team[];
  setSelectedTeams: (value: Team[]) => void;
}

function TeamsSelectorTable({ teams, selectedTeams, setSelectedTeams }: Props) {
  const [sorting, setSorting] = useState(Object.entries(teamSorts)[0][0]);
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

  function selectTeam(team: Team) {
    if (selectedTeams.some((t) => team.id === t.id)) {
      setSelectedTeams(selectedTeams.filter((t) => t.id !== team.id));
    } else {
      setSelectedTeams(selectedTeams.concat(team));
    }
  }

  return (
    <Stack>
      <SelectSorting
        sorts={teamSorts}
        sorting={sorting}
        setSorting={setSorting}
        isDesc={isDesc}
        setIsDesc={setIsDesc}
      />
      <TeamsTable
        selectTeam={selectTeam}
        selectedTeams={selectedTeams}
        teams={sortedTeams}
      />
    </Stack>
  );
}

export default TeamsSelectorTable;
