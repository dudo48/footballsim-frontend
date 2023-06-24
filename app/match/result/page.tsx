'use client';
import TeamCard from '@/components/cards/team-card';
import MatchesTable from '@/components/tables/matches-table';
import { MatchSimulations } from '@/context/match-simulations';
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import MatchesStatistics from './matches-statistics';

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
        <Flex justifyContent={'space-between'}>
          <Box>
            <Heading textAlign={'center'} size={'md'}>
              Home Team
            </Heading>
            <TeamCard team={homeTeam} />
          </Box>
          <Center>
            <MatchesStatistics matches={simulations} />
            {/* <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Heading flex={1} textAlign={'left'} size={'md'}>
                      Results Frequencies
                    </Heading>
                    <Heading size={'md'}>
                      <AccordionIcon />
                    </Heading>
                  </AccordionButton>
                  <AccordionPanel>
                    <MatchesResultsFrequencies matches={matches} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion> */}
          </Center>
          <Box>
            <Heading textAlign={'center'} size={'md'}>
              Away Team
            </Heading>
            <TeamCard team={awayTeam} />
          </Box>
        </Flex>
        <Center>
          <Container size={'md'} shadow={'xl'}>
            <MatchesTable showMatchId showResultTag matches={simulations} />
          </Container>
        </Center>
      </Stack>
    </Skeleton>
  );
}

export default Page;
