'use client';
import TeamCard from '@/components/cards/team-card';
import MatchesTable from '@/components/tables/matches-table';
import { MatchSimulations } from '@/context/match-simulations';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Hide,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import MatchesResultsFrequencies from './matches-results-frequencies';
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
          <Hide below={'md'}>
            <Box textAlign={'center'}>
              <Text fontSize={'lg'}>Home Team</Text>
              <TeamCard team={homeTeam} />
            </Box>
          </Hide>
          <Stack>
            <MatchesStatistics matches={matches} />
            <Accordion allowToggle>
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
            </Accordion>
          </Stack>
          <Hide below={'md'}>
            <Box textAlign={'center'}>
              <Text fontSize={'lg'}>Away Team</Text>
              <TeamCard team={awayTeam} />
            </Box>
          </Hide>
        </Flex>
        <Center>
          <Flex gap={4} alignItems={'flex-start'}>
            <Container maxW={'3xl'} shadow={'xl'}>
              <MatchesTable showMatchId showResultTag matches={matches} />
            </Container>
          </Flex>
        </Center>
      </Stack>
    </Skeleton>
  );
}

export default Page;
