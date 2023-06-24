import TeamCard from '@/components/cards/team-card';
import { teamSorts } from '@/shared/misc/sorting';
import { Box, Center, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from '../misc/select-sorting';
import Team from '@/shared/interfaces/team.interface';

interface Props {
  teams: Team[];
  selectedTeams: Team[];
  setSelectedTeams: (value: Team[]) => void;
}

function TeamsSelectorGrid({ teams, selectedTeams, setSelectedTeams }: Props) {
  const [sorting, setSorting] = useState('lastAdded');
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
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {sortedTeams.map((team) => (
          <Center key={team.id}>
            <Box cursor={'pointer'} onClick={() => selectTeam(team)}>
              <TeamCard
                team={team}
                isHighlighted={selectedTeams.some((t) => team.id === t.id)}
              />
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default TeamsSelectorGrid;
