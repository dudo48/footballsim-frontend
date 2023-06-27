'use client';
import MatchesTable from '@/components/tables/matches-table';
import RankingsTable from '@/components/tables/rankings-table';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulations } from '@/context/cup-simulations';
import { getCupRoundName } from '@/utils/functions';
import {
  Flex,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBoolean,
} from '@chakra-ui/react';
import { differenceBy, flatten } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Options from './options';
import SetOptions from './set-options';

function Page() {
  const { simulations, isLoaded } = useContext(CupSimulations);
  const path = usePathname();
  const router = useRouter();
  const [roundTab, setTabIndex] = useState(0);
  const cup = simulations.length ? simulations[0] : undefined;
  const [showResultOnHover, setShowResultOnHover] = useBoolean(true);

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations, path, router, isLoaded]);

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
        {cup && (
          <Flex gap={2}>
            <SetOptions simulation={cup} />
            <Options
              showResultOnHover={showResultOnHover}
              setShowResultOnHover={setShowResultOnHover}
              simulation={cup}
            />
          </Flex>
        )}
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
                showResultOnHover={showResultOnHover}
              />
            </Tabs>
          </Stack>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
