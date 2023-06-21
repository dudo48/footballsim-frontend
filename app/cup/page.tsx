'use client';
import FormSelect from '@/components/form/form-select';
import TeamsSelector from '@/components/selectors/teams-selector';
import TeamsTable from '@/components/tables/teams-table';
import { MatchSimulations } from '@/context/match-simulations';
import { useMatchesSimulations } from '@/services/simulations-service';
import { useTeams } from '@/services/teams-service';
import Team from '@/shared/interfaces/team.interface';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import * as yup from 'yup';

const schema = yup
  .object({
    selectedTeams: yup.array<Team[]>().required(),
    numberOfTeams: yup
      .number()
      .positive('Please select an integer greater than 0.')
      .typeError('Please select an integer greater than 0.')
      .required('Please select an integer greater than 0'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedTeams: [],
      numberOfTeams: 16,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const { simulateMatch } = useMatchesSimulations();
  const { setMatches } = useContext(MatchSimulations);

  useEffect(() => {
    register('selectedTeams');
  }, [register]);

  useEffect(() => {
    setValue('selectedTeams', selectedTeams);
  }, [selectedTeams, setValue]);

  useEffect(() => {
    if (watch('numberOfTeams') !== selectedTeams.length) {
      setSelectedTeams([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('numberOfTeams')]);

  useEffect(() => {
    if (errors.selectedTeams) {
      toast({
        status: 'error',
        description: 'Please select two opponent teams',
      });
    }
  }, [errors, toast]);

  async function onSubmit(data: FormData) {
    console.log(data);
    // const { n, homeTeam, awayTeam, ...options } = data;
    // const match = {
    //   homeTeam: homeTeam as Team,
    //   awayTeam: awayTeam as Team,
    //   ...options,
    // };
    // const result = await simulateMatch(match, n);
    // if (!result.error) {
    //   // setMatches(result);
    //   sessionStorage.setItem('matches', JSON.stringify(result));
    //   setMatches(result);
    //   router.push(`${path}/result`);
    // } else {
    //   toast({ status: 'error', description: 'Failed to simulate match.' });
    // }
  }

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Heading size={'lg'}>Cup</Heading>
        <Flex gap={2} direction={[null, 'column', 'row']}>
          <Box flex={2}>
            <TeamsTable showTeamNumber allowSorting teams={selectedTeams} />
          </Box>
          <Box flex={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Box
                  p={2}
                  borderWidth={1}
                  borderColor={'footballsim.500'}
                  rounded={'md'}
                >
                  <Flex align={'center'} justify={'space-between'}>
                    <Heading size={'md'}>Options</Heading>
                    <TeamsSelector
                      count={watch('numberOfTeams')}
                      teams={teams}
                      setSelectedTeams={setSelectedTeams}
                    >
                      <Button
                        variant={'outline'}
                        colorScheme={'cyan'}
                        leftIcon={<BsPlusLg />}
                      >
                        Select Teams
                      </Button>
                    </TeamsSelector>
                  </Flex>
                  <Stack p={4}>
                    <FormSelect
                      options={[2, 4, 8, 16, 32, 64, 128]}
                      label={'Number of teams'}
                      fieldHandler={register('numberOfTeams')}
                      error={errors.numberOfTeams}
                    />
                  </Stack>
                  <Center>
                    <Button
                      isLoading={isSubmitting || isSubmitSuccessful}
                      type="submit"
                      isDisabled={selectedTeams.length < 2}
                    >
                      Simulate
                    </Button>
                  </Center>
                </Box>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Stack>
    </Skeleton>
  );
}

export default Page;
