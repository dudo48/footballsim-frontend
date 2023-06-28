'use client';
import FormCheckbox from '@/components/form/form-checkbox';
import FormSelect from '@/components/form/form-select';
import TeamsSelector from '@/components/selectors/teams-selector';
import TeamsTable from '@/components/tables/teams-table';
import { CupSimulations } from '@/context/cup-simulations';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import * as yup from 'yup';

const schema = yup
  .object({
    numberOfTeams: yup
      .number()
      .positive('Please select an integer greater than 0.')
      .typeError('Please select an integer greater than 0.')
      .required('Please select an integer greater than 0'),
    teams: yup.array().required(),
    seeds: yup
      .number()
      .positive('Please select an integer greater than 0.')
      .typeError('Please select an integer greater than 0.')
      .required('Please select an integer greater than 0'),
    allowExtraTime: yup
      .bool()
      .typeError('Please make a choice.')
      .required('Please make a choice.'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Page() {
  const { simulations, setSimulations } = useContext(CupSimulations);
  const cup = simulations.length ? simulations[0] : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    values: {
      teams: cup?.teams || [],
      numberOfTeams: cup?.teams.length || 16,
      seeds: cup?.seeds || 4,
      allowExtraTime: cup ? cup.allowExtraTime : true,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const { simulateCup } = useSimulations();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (watch('numberOfTeams') !== watch('teams').length) {
      setValue('teams', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('numberOfTeams')]);

  async function onSubmit(data: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { numberOfTeams, ...cup } = data;
    const result = await simulateCup(cup);
    if (!result.error) {
      setSimulations(result);
      router.push(`${path}/result`);
    } else {
      toast({ status: 'error', description: 'Failed to simulate cup.' });
    }
  }

  const teamsCountOptions = [2, 4, 8, 16, 32, 64, 128];
  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Heading size={'lg'}>Cup</Heading>
        <Flex gap={2} direction={[null, 'column', 'row']}>
          <Box flex={2}>
            <TeamsTable showTeamsStrengthRank teams={watch('teams')} />
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

                    <Button
                      variant={'outline'}
                      colorScheme={'cyan'}
                      leftIcon={<BsPlusLg />}
                      onClick={onOpen}
                    >
                      Select Teams
                    </Button>
                  </Flex>
                  <Stack p={4}>
                    <FormSelect
                      options={teamsCountOptions}
                      label={'Number of teams'}
                      fieldHandler={register('numberOfTeams')}
                      error={errors.numberOfTeams}
                    />
                    <FormSelect
                      options={[1, ...teamsCountOptions].filter(
                        (n) => n <= watch('numberOfTeams')
                      )}
                      label={'Number of seeding pots'}
                      fieldHandler={register('seeds')}
                      error={errors.seeds}
                    />
                    <FormCheckbox
                      label={'Allow extra-time'}
                      fieldHandler={register('allowExtraTime')}
                      error={errors.allowExtraTime}
                    />
                  </Stack>
                  <Center>
                    <Button
                      isLoading={isSubmitting || isSubmitSuccessful}
                      type="submit"
                      isDisabled={watch('teams').length < 2}
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
      <TeamsSelector
        count={watch('numberOfTeams')}
        teams={teams}
        setSelectedTeams={(teams: Team[]) => setValue('teams', teams)}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Skeleton>
  );
}

export default Page;
