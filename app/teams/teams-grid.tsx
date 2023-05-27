import TeamCard from '@/components/cards/team-card';
import Team from '@/interfaces/team.interface';
import { Center, SimpleGrid } from '@chakra-ui/react';

interface Props {
  teams: Team[];
}

function TeamsGrid({ teams }: Props) {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
      {teams.map((team) => (
        <Center key={team.id}>
          <TeamCard team={team} displayActions={true} />
        </Center>
      ))}
    </SimpleGrid>
  );
}

export default TeamsGrid;
