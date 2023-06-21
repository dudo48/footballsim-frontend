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
  Heading,
  Skeleton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TeamsSelector from '../../components/selectors/teams-selector';

const schema = yup
  .object({
    homeTeam: yup.object().required(),
    awayTeam: yup.object().required(),
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      n: 10,
      onNeutralGround: true,
      isKnockout: false,
      allowExtraTime: true,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const [homeTeam, setHomeTeam] = useState<Team>();
  const [awayTeam, setAwayTeam] = useState<Team>();
  const { simulateMatch } = useSimulations();
  const { setMatches } = useContext(MatchSimulations);

  useEffect(() => {
    register('homeTeam');
    register('awayTeam');
  }, [register]);

  useEffect(() => {
    setValue('homeTeam', homeTeam as Team);
  }, [homeTeam, setValue]);

  useEffect(() => {
    setValue('awayTeam', awayTeam as Team);
  }, [awayTeam, setValue]);

  async function onSubmit(data: FormData) {
    const { n, homeTeam, awayTeam, ...options } = data;

    const match = {
      homeTeam: homeTeam as Team,
      awayTeam: awayTeam as Team,
      ...options,
    };

    const result = await simulateMatch(match, n);
    if (!result.error) {
      sessionStorage.setItem('matches', JSON.stringify(result));
      setMatches(result);
      router.push(`${path}/result`);
    } else {
      toast({ status: 'error', description: 'Failed to simulate match.' });
    }
  }

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Heading size={'lg'}>Match</Heading>
        <Center justifyContent={'space-between'}>
          <TeamsSelector
            setSelectedTeams={(t) => setHomeTeam(t[0])}
            teams={teams}
          >
            <Heading textAlign={'center'} size={'md'}>
              Home Team
            </Heading>
            <TeamCard team={homeTeam} />
          </TeamsSelector>
          <Box textAlign={'center'}>
            <Heading size={'lg'}>VS</Heading>
            <Text>Click on a team card to choose a team</Text>
          </Box>
          <TeamsSelector
            setSelectedTeams={(t) => setAwayTeam(t[0])}
            teams={teams}
          >
            <Heading textAlign={'center'} size={'md'}>
              Away Team
            </Heading>
            <TeamCard team={awayTeam} />
          </TeamsSelector>
        </Center>
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
                  isDisabled={!homeTeam || !awayTeam}
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
    </Skeleton>
  );
}

export default Page;
