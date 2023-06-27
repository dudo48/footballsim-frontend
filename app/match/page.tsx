'use client';
import TeamCard from '@/components/cards/team-card';
import FormCheckbox from '@/components/form/form-checkbox';
import FormSelect from '@/components/form/form-select';
import { MatchSimulations } from '@/context/match-simulations';
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
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import * as yup from 'yup';
import TeamsSelector from '../../components/selectors/teams-selector';

const schema = yup
  .object({
    teams: yup.array().required(),
    n: yup
      .number()
      .positive('Please select an integer greater than 0.')
      .typeError('Please select an integer greater than 0.')
      .required('Please select an integer greater than 0'),
    onNeutralGround: yup
      .bool()
      .typeError('Please make a choice.')
      .required('Please make a choice.'),
    isKnockout: yup
      .bool()
      .typeError('Please make a choice.')
      .required('Please make a choice.'),
    allowExtraTime: yup
      .bool()
      .typeError('Please make a choice.')
      .required('Please make a choice.'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Page() {
  const { simulations } = useContext(MatchSimulations);
  const match = simulations.length ? simulations[0] : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    values: {
      teams: match ? [match.homeTeam, match.awayTeam] : [],
      n: simulations.length || 10,
      onNeutralGround: match ? match.onNeutralGround : true,
      isKnockout: match ? match.isKnockout : false,
      allowExtraTime: match ? match.allowExtraTime : true,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const { simulateMatch } = useSimulations();
  const { setSimulations } = useContext(MatchSimulations);
  const { isOpen, onClose, onOpen } = useDisclosure();

  async function onSubmit(data: FormData) {
    const { n, teams, ...options } = data;

    const match = {
      homeTeam: teams[0] as Team,
      awayTeam: teams[1] as Team,
      ...options,
    };

    const result = await simulateMatch(match, n);
    if (!result.error) {
      setSimulations(result);
      router.push(`${path}/result`);
    } else {
      toast({ status: 'error', description: 'Failed to simulate match.' });
    }
  }

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Heading size={'lg'}>Match</Heading>
        <Flex
          align={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={4}
        >
          <Stack>
            <Heading textAlign={'center'} size={'md'}>
              Home Team
            </Heading>
            <TeamCard
              team={watch('teams').length ? watch('teams')[0] : undefined}
            />
          </Stack>
          <Button
            variant={'outline'}
            colorScheme={'cyan'}
            leftIcon={<BsPlusLg />}
            onClick={onOpen}
          >
            Select Teams
          </Button>
          <Stack>
            <Heading textAlign={'center'} size={'md'}>
              Away Team
            </Heading>
            <TeamCard
              team={watch('teams').length > 1 ? watch('teams')[1] : undefined}
            />
          </Stack>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Box
              p={2}
              borderWidth={1}
              borderColor={'footballsim.500'}
              rounded={'md'}
            >
              <Heading size={'md'}>Options</Heading>
              <Stack p={4}>
                <FormSelect
                  options={[1, 5, 10, 20, 30, 50, 100, 200, 500, 1000]}
                  label={'Number of simulations'}
                  fieldHandler={register('n')}
                  error={errors.n}
                />
                <FormCheckbox
                  label={'Play on neutral ground'}
                  helper={
                    'If checked, the home team will not have the bonus of the home advantage.'
                  }
                  fieldHandler={register('onNeutralGround')}
                  error={errors.onNeutralGround}
                />
                <FormCheckbox
                  label={'Knockout'}
                  helper={
                    'If checked, then in case of a draw extra-time will be played (optionally), then penalty shootout.'
                  }
                  fieldHandler={register('isKnockout')}
                  error={errors.isKnockout}
                />
                <FormCheckbox
                  label={'Allow extra-time'}
                  fieldHandler={register('allowExtraTime')}
                  error={errors.allowExtraTime}
                  isDisabled={!watch('isKnockout')}
                />
              </Stack>
              <Center>
                <Button
                  isDisabled={watch('teams').length !== 2}
                  isLoading={isSubmitting || isSubmitSuccessful}
                  type="submit"
                >
                  Simulate
                </Button>
              </Center>
            </Box>
          </Stack>
        </form>
      </Stack>
      <TeamsSelector
        count={2}
        setSelectedTeams={(teams) => setValue('teams', teams)}
        teams={teams}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Skeleton>
  );
}

export default Page;
