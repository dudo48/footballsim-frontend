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
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

function Page() {
  const { control, watch } = useForm({
    defaultValues: {
      simulationNumber: 1,
    },
  });

  const { simulations, isLoaded } = useContext(CupSimulations);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!simulations.length && isLoaded) {
      const pathArray = path.split('/');
      pathArray.pop();
      const newPath = pathArray.join('/');
      router.replace(newPath);
    }
  }, [simulations, path, router, isLoaded]);

  return (
    <Skeleton isLoaded={!!simulations.length && isLoaded} w={'full'}>
      <Stack spacing={4}>
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
          <Stack flexGrow={1} maxW={'xl'} shadow={'xl'}>
            <Heading size={'md'}>Teams</Heading>
            <TeamsTable
              teams={
                simulations.length
                  ? simulations[watch('simulationNumber') - 1].teams
                  : []
              }
              showTeamNumber
              showStrengthStats
              allowSorting
            />
          </Stack>
          <Stack flexGrow={1}>
            <Tabs shadow={'xl'}>
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
                          markWinner
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
