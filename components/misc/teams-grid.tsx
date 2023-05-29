import TeamCard from '@/components/cards/team-card';
import Team from '@/interfaces/team.interface';
import { teamSorts } from '@/utils/sorting';
import { Center, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from './select-sorting';

interface Props {
  teams: Team[];
}

function TeamsGrid({ teams }: Props) {
  const [sorting, setSorting] = useState(Object.entries(teamSorts)[0][0]);
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

  return (
    <>
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
            <TeamCard team={team} deletable={true} />
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
}

export default TeamsGrid;
