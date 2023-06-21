'use client';
import MatchesTable from '@/components/tables/matches-table';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulation } from '@/context/cup-simulations';
import { teamSorts } from '@/utils/sorting';
import { Heading, Skeleton, Stack } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

function Page() {
  const { cup, isLoaded } = useContext(CupSimulation);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!cup && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [cup, path, router, isLoaded]);

  const sortedTeams = cup?.teams.sort(teamSorts.strength) || [];

  return (
    <Skeleton isLoaded={!!cup && isLoaded} w={'full'}>
      <Stack spacing={4}>
        <Stack maxW={'xl'} shadow={'xl'}>
          <Heading size={'md'}>Teams</Heading>
          <TeamsTable teams={sortedTeams} />
        </Stack>
        <Stack spacing={8}>
          {cup?.result?.rounds.map((round) => (
            <Stack key={round.id} maxW={'3xl'} shadow={'xl'}>
              <Heading size={'md'}>Round {round.id}</Heading>
              <MatchesTable markWinner markLoser matches={round.matches} />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Skeleton>
  );
}

export default Page;
