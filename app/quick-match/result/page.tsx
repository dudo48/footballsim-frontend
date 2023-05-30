'use client';
import TeamCard from '@/components/cards/team-card';
import MatchesTable from '@/components/tables/matches-table';
import { useMatchesSimulations } from '@/services/simulations-service';
import { useTeam } from '@/services/teams-service';
import {
  Box,
  Center,
  Container,
  Hide,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MatchesStatistics from './matches-statistics';

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const params = useSearchParams();
  const { simulateQuickMatch } = useMatchesSimulations();

  const homeTeamId = params.get('homeTeam')
    ? +(params.get('homeTeam') as string)
    : null;
  const awayTeamId = params.get('awayTeam')
    ? +(params.get('awayTeam') as string)
    : null;
  const onNeutralGround = params.get('onNeutralGround') === 'true';
  const n = +(params.get('n') || 1);

  const { team: homeTeam, isLoading: isHomeLoading } = useTeam(homeTeamId);
  const { team: awayTeam, isLoading: isAwayLoading } = useTeam(awayTeamId);

  useEffect(() => {
    if (!homeTeamId || !awayTeamId) return;
    const match = {
      homeTeam: homeTeamId,
      awayTeam: awayTeamId,
      onNeutralGround,
    };

    async function getResults() {
      if (!homeTeam || !awayTeam) return;
      setResults(await simulateQuickMatch(match, n));
    }

    if (!results.length) getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awayTeam, homeTeam]);

  useEffect(() => {
    if (results.length) {
      setIsLoading(false);
    }
  }, [results]);

  const matches = results.map((result, id) => ({
    id,
    homeTeam,
    awayTeam,
    onNeutralGround,
    result,
  }));

  return (
    <Skeleton
      isLoaded={!isLoading && !isHomeLoading && !isAwayLoading}
      w={'full'}
    >
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
          <Container bg={'footballsim.600'} maxW={'2xl'} shadow={'xl'}>
            <MatchesTable
              markWinner
              markLoser
              showMatchNumber
              matches={matches}
            />
          </Container>
        </Center>
      </Stack>
    </Skeleton>
  );
}

export default Page;
