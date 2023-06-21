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
  const { matches, isLoaded } = useContext(MatchSimulations);
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
        <Flex justifyContent={'space-between'}>
          <Box textAlign={'center'}>
            <Heading size={'md'}>Home Team</Heading>
            <TeamCard team={homeTeam} />
          </Box>
          <Center>
            <MatchesStatistics matches={matches} />
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
          <Box textAlign={'center'}>
            <Heading size={'md'}>Away Team</Heading>
            <TeamCard team={awayTeam} />
          </Box>
        </Flex>
        <Center>
          <Flex gap={4} alignItems={'flex-start'}>
            <Container maxW={'4xl'} shadow={'xl'}>
              <MatchesTable showMatchId showResultTag matches={matches} />
            </Container>
          </Flex>
        </Center>
      </Stack>
    </Skeleton>
  );
}

export default Page;
