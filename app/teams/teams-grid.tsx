import TeamCard from '@/components/cards/team-card';
import Team from '@/shared/interfaces/team.interface';
import { sorts } from '@/shared/misc/sorting';
import { Center, SimpleGrid, Stack, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from '../../components/misc/select-sorting';

interface Props {
  deletable?: boolean;
  teams: Team[];
}

function TeamsGrid({ teams, deletable }: Props) {
  const [sort, setSort] = useState(
    () => sorts.lastAdded as (a: Team, b: Team) => number
  );
  const [isDesc, setIsDesc] = useBoolean(true);
  const sortedTeams = [...teams].sort(sort);
  if (isDesc) sortedTeams.reverse();

  return (
    <Stack>
      <SelectSorting
        sorts={{ lastAdded: sorts.lastAdded, ...sorts.team }}
        sort={sort}
        setSort={setSort}
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
