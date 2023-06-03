'use client';
import TeamCard from '@/components/cards/team-card';
import MatchesTable from '@/components/tables/matches-table';
import { QuickMatchSimulations } from '@/context/quick-match-simulations';
import {
  Box,
  Center,
  Container,
  Hide,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import MatchesStatistics from './matches-statistics';

function Page() {
  const { matches, isLoaded } = useContext(QuickMatchSimulations);
  const homeTeam = matches.length ? matches[0].homeTeam : undefined;
  const awayTeam = matches.length ? matches[0].awayTeam : undefined;
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!matches.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [matches.length, path, router, isLoaded]);

  return (
    <Skeleton isLoaded={!!matches.length && isLoaded} w={'full'}>
      <Stack spacing={4}>
        <Center justifyContent={'space-between'}>
          <Hide below={'md'}>
            <Box textAlign={'center'}>
              <Text fontSize={'lg'}>Home Team</Text>
              <TeamCard team={homeTeam} />
            </Box>
          </Hide>
          <MatchesStatistics matches={matches} />
          <Hide below={'md'}>
            <Box textAlign={'center'}>
              <Text fontSize={'lg'}>Away Team</Text>
              <TeamCard team={awayTeam} />
            </Box>
          </Hide>
        </Center>
        <Center>
          <Container bg={'footballsim.600'} maxW={'3xl'} shadow={'xl'}>
            <MatchesTable showMatchNumber showResultTag matches={matches} />
          </Container>
        </Center>
      </Stack>
    </Skeleton>
  );
}

export default Page;
