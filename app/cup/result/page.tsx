'use client';
import CupRankingsTable from '@/components/tables/cup-rankings-table';
import MatchesTable from '@/components/tables/matches-table';
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
import RoundsSlider from '../../../components/misc/rounds-slider';
import Options from './options';
import SetOptions from './set-options';

function Page() {
  const { simulations, isLoaded } = useContext(CupSimulations);
  const path = usePathname();
  const router = useRouter();
  const [roundIndex, setRoundIndex] = useState(0);
  const [showResultOnHover, setShowResultOnHover] = useBoolean(false);

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations, path, router, isLoaded]);

  const cup = simulations.length ? simulations[0] : undefined;
  const roundsViewed = cup
    ? cup.result.rounds.filter((round) => round.id <= roundIndex + 1)
    : [];
  const table = cup ? cup.result.allStandings[roundIndex + 1].table : [];

  const remainingTeams = flatten(
    cup
      ? cup.result.rounds[roundIndex].matches.map((m) => [
          m.homeTeam,
          m.awayTeam,
        ])
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
        {cup && (
          <RoundsSlider
            roundIndex={roundIndex}
            setRoundIndex={setRoundIndex}
            rounds={cup.result.rounds}
            roundNameFunction={getCupRoundName}
          />
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
                  <CupRankingsTable
                    standingsTable={table}
                    rounds={roundsViewed}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
          {cup && (
            <Stack flex={1}>
              <MatchesTable
                matches={cup.result.rounds[roundIndex].matches}
                showMatchesOrder
                markLoser
                showTeamsStrength
                showResultOnHover={showResultOnHover}
              />
            </Stack>
          )}
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
