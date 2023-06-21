'use client';
import FormSelect from '@/components/form/form-select';
import TeamsSelector from '@/components/selectors/teams-selector';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulation } from '@/context/cup-simulations';
import { useSimulations } from '@/services/simulations-service';
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
    teams: yup.array().required(),
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
      teams: [],
      numberOfTeams: 16,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const { simulateCup } = useSimulations();
  const { setCup } = useContext(CupSimulation);

  useEffect(() => {
    register('teams');
  }, [register]);

  useEffect(() => {
    setValue('teams', selectedTeams);
  }, [selectedTeams, setValue]);

  useEffect(() => {
    if (watch('numberOfTeams') !== selectedTeams.length) {
      setSelectedTeams([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('numberOfTeams')]);

  async function onSubmit(data: FormData) {
    const { teams } = data;
    const cup = { teams };
    const result = await simulateCup(cup);
    if (!result.error) {
      sessionStorage.setItem('cup', JSON.stringify(result));
      setCup(result);
      router.push(`${path}/result`);
    } else {
      toast({ status: 'error', description: 'Failed to simulate cup.' });
    }
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
