import TeamCard from '@/components/cards/team-card';
import Team from '@/shared/interfaces/team.interface';
import { teamSorts } from '@/utils/sorting';
import { Center, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from '../../components/misc/select-sorting';

interface Props {
  deletable?: boolean;
  teams: Team[];
}

function TeamsGrid({ teams, deletable }: Props) {
  const [sorting, setSorting] = useState('lastAdded');
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

  return (
    <Stack>
      <SelectSorting
        sorts={teamSorts}
        sorting={sorting}
        setSorting={setSorting}
        isDesc={isDesc}
        setIsDesc={setIsDesc}
      />
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {sortedTeams.map((team) => (
          <Center key={team.id}>
            <TeamCard team={team} deletable={deletable} />
          </Center>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default TeamsGrid;
