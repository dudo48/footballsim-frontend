'use client';
import MatchesTable from '@/components/tables/matches-table';
import RankingsTable from '@/components/tables/rankings-table';
import { CupSimulations } from '@/context/cup-simulations';
import { useSimulations } from '@/services/simulations-service';
import Cup from '@/shared/interfaces/cup.interface';
import { getCupRoundName } from '@/utils/functions';
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { differenceBy, flatten } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';
import Options from './options';

function Page() {
  const { simulations, setSimulations, isLoaded } = useContext(CupSimulations);
  const [isReSimulating, setisReSimulating] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { simulateCup } = useSimulations();
  const toast = useToast();
  const cup = simulations.length ? simulations[0] : undefined;

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations, path, router, isLoaded]);

  async function reSimulate() {
    setisReSimulating(true);
    const result = await simulateCup(cup as Cup);
    if (!result.error) {
      setSimulations(result);
    } else {
      toast({ status: 'error', description: 'Failed to re-simulate.' });
    }
    setisReSimulating(false);
  }

  const standings = cup
    ? cup.result.allStandings[tabIndex + 1]
    : { roundId: 0, table: [] };

  const remainingTeams = cup
    ? flatten(
        cup.result?.rounds[tabIndex].matches.map((m) => [
          m.homeTeam,
          m.awayTeam,
        ])
      )
    : [];

  return (
    <Skeleton isLoaded={cup && isLoaded} w={'full'}>
      <Stack spacing={4}>
        {cup && <Options simulation={cup} />}
        <Button
          variant={'outline'}
          colorScheme={'cyan'}
          leftIcon={<BsArrowClockwise />}
          title="With same options"
          onClick={reSimulate}
          isLoading={isReSimulating}
        >
          Re-simulate
        </Button>
        <Flex gap={2}>
          <Stack flex={1} shadow={'xl'}>
            <Heading size={'md'}>Standings</Heading>
            <RankingsTable
              standings={standings}
              deemphasizedTeams={differenceBy(
                cup ? differenceBy(cup.teams, remainingTeams, (t) => t.id) : []
              )}
            />
          </Stack>
          <Stack flex={1}>
            <Tabs
              index={tabIndex}
              onChange={(i) => setTabIndex(i)}
              shadow={'xl'}
            >
              <TabList>
                {simulations.length &&
                  cup?.result?.rounds.map((round) => (
                    <Tab key={round.id}>{getCupRoundName(round)}</Tab>
                  ))}
              </TabList>
              <TabPanels>
                {simulations.length &&
                  cup?.result?.rounds.map((round) => (
                    <TabPanel key={round.id}>
                      <MatchesTable
                        matches={round.matches}
                        showMatchId
                        showTeamsStrength
                        markLoser
                      />
                    </TabPanel>
                  ))}
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
