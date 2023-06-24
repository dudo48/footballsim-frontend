'use client';
import FormSlider from '@/components/form/form-slider';
import MatchesTable from '@/components/tables/matches-table';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulations } from '@/context/cup-simulations';
import { getCupRoundName } from '@/utils/functions';
import {
  Flex,
  Heading,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { differenceBy, flatten } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Options from './options';

function Page() {
  const { control, watch } = useForm({
    defaultValues: {
      simulationNumber: 1,
    },
  });

  const { simulations, isLoaded } = useContext(CupSimulations);
  const path = usePathname();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations, path, router, isLoaded]);

  const remainingTeams = simulations.length
    ? flatten(
        simulations[watch('simulationNumber') - 1].result?.rounds[
          tabIndex
        ].matches.map((m) => [m.homeTeam, m.awayTeam])
      )
    : [];

  return (
    <Skeleton isLoaded={!!simulations.length && isLoaded} w={'full'}>
      <Stack spacing={4}>
        {simulations.length && <Options simulation={simulations[0]} />}
        {simulations.length > 1 && (
          <Controller
            control={control}
            name={'simulationNumber'}
            render={({ field }) => (
              <FormSlider
                fieldHandler={field}
                label="Simulation #"
                min={1}
                max={simulations.length}
                step={1}
              />
            )}
          />
        )}
        <Flex gap={2}>
          <Stack flex={1} maxW={'xl'} shadow={'xl'}>
            <Heading size={'md'}>Teams</Heading>
            <TeamsTable
              teams={simulations.length ? simulations[0].teams : []}
              showTeamNumber
              showStrengthStats
              allowSorting
              deemphasizedTeams={differenceBy(
                simulations.length
                  ? differenceBy(
                      simulations[0].teams,
                      remainingTeams,
                      (t) => t.id
                    )
                  : []
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
                  simulations[watch('simulationNumber') - 1].result?.rounds.map(
                    (round) => (
                      <Tab key={round.id}>{getCupRoundName(round)}</Tab>
                    )
                  )}
              </TabList>
              <TabPanels>
                {simulations.length &&
                  simulations[watch('simulationNumber') - 1].result?.rounds.map(
                    (round) => (
                      <TabPanel key={round.id}>
                        <MatchesTable
                          matches={round.matches}
                          showMatchId
                          showTeamsStrength
                          markLoser
                        />
                      </TabPanel>
                    )
                  )}
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
