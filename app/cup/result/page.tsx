'use client';
import MatchesTable from '@/components/tables/matches-table';
import RankingsTable from '@/components/tables/rankings-table';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulations } from '@/context/cup-simulations';
import { useSimulations } from '@/services/simulations-service';
import Cup from '@/shared/interfaces/cup.interface';
import { getCupRoundName } from '@/utils/functions';
import {
  Button,
  Flex,
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
  const [roundTab, setTabIndex] = useState(0);
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
    ? cup.result.allStandings[roundTab + 1]
    : { roundId: 0, table: [] };

  const remainingTeams = flatten(
    cup
      ? cup.result.rounds[roundTab].matches.map((m) => [m.homeTeam, m.awayTeam])
      : []
  );

  const eliminatedTeams = differenceBy(
    cup ? differenceBy(cup.teams, remainingTeams, (t) => t.id) : []
  );

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
        <Flex gap={2} flexWrap={'wrap-reverse'}>
          <Stack flex={1}>
            <Tabs isFitted w={'full'} shadow={'xl'}>
              <TabList>
                <Tab>Teams</Tab>
                <Tab>Standings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TeamsTable
                    teams={cup ? cup.teams : []}
                    deemphasizedTeams={eliminatedTeams}
                    showTeamsStrengthRank
                  />
                </TabPanel>
                <TabPanel>
                  <RankingsTable
                    standings={standings}
                    deemphasizedTeams={eliminatedTeams}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
          <Stack flex={1}>
            <Tabs
              index={roundTab}
              onChange={(i) => setTabIndex(i)}
              shadow={'xl'}
              isFitted
            >
              <TabList>
                {simulations.length &&
                  cup?.result?.rounds.map((round) => (
                    <Tab key={round.id}>{getCupRoundName(round)}</Tab>
                  ))}
              </TabList>
              <MatchesTable
                matches={cup?.result.rounds[roundTab].matches || []}
                showMatchesOrder
                markLoser
                showTeamsStrength
              />
            </Tabs>
          </Stack>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
