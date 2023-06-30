'use client';
import TeamCard from '@/components/cards/team-card';
import MatchesTable from '@/components/tables/matches-table';
import ResultIncidenceTable from '@/components/tables/result-incidence-table';
import { MatchSimulations } from '@/context/match-simulations';
import { Box, Flex, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import MatchesStatisticsTable from '../../../components/tables/matches-statistics-table';
import Options from './options';

function Page() {
  const { simulations, isLoaded } = useContext(MatchSimulations);
  const homeTeam = simulations.length ? simulations[0].homeTeam : undefined;
  const awayTeam = simulations.length ? simulations[0].awayTeam : undefined;
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations.length, path, router, isLoaded]);

  return (
    <Skeleton isLoaded={!!simulations.length && isLoaded} w={'full'}>
      <Stack spacing={4}>
        <Flex
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          align={'center'}
          gap={4}
        >
          <Box>
            <Heading textAlign={'center'} size={'md'}>
              Home Team
            </Heading>
            <TeamCard team={homeTeam} />
          </Box>
          {simulations.length && <Options simulation={simulations[0]} />}
          <Box>
            <Heading textAlign={'center'} size={'md'}>
              Away Team
            </Heading>
            <TeamCard team={awayTeam} />
          </Box>
        </Flex>
        <Flex flexWrap={'wrap-reverse'} gap={2} shadow={'xl'}>
          <Box flex={2}>
            <MatchesTable
              showMatchesOrder
              showResultTag
              matches={simulations}
            />
          </Box>
          <Stack>
            <MatchesStatisticsTable matches={simulations} markSmaller />
            <ResultIncidenceTable markLoser matches={simulations} />
          </Stack>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
