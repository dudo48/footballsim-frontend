'use client';
import FormCheckbox from '@/components/form/form-checkbox';
import FormSelect from '@/components/form/form-select';
import Team from '@/interfaces/team.interface';
import { useTeams } from '@/services/teams-service';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SelectTeamCard from './select-team-card';

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
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      n: 1,
      onNeutralGround: true,
    },
  });

  const toast = useToast();
  const path = usePathname();
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const [homeTeam, setHomeTeam] = useState<Team>();
  const [awayTeam, setAwayTeam] = useState<Team>();

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

  useEffect(() => {
    if (errors.homeTeam || errors.awayTeam) {
      toast({
        status: 'error',
        description: 'Please select the two opponent teams',
      });
    }
  }, [errors, toast]);

  function onSubmit(data: FormData) {
    const params = { ...data, homeTeam: homeTeam?.id, awayTeam: awayTeam?.id };
    router.push(
      `${path}/result?${Object.entries(params)
        .map((p) => `${p[0]}=${p[1]}`)
        .join('&')}`
    );
  }

  return (
    <Skeleton isLoaded={!isLoading} w={'full'}>
      <Stack spacing={4}>
        <Heading size={'lg'}>Quick Match</Heading>
        <Center justifyContent={'space-between'}>
          <SelectTeamCard
            title="Home Team"
            selectedTeam={homeTeam}
            setSelectedTeam={setHomeTeam}
            teams={teams}
          />
          <Box textAlign={'center'}>
            <Heading size={'lg'}>VS</Heading>
            <Text>Click on a team card to choose a team</Text>
          </Box>
          <SelectTeamCard
            title="Away Team"
            selectedTeam={awayTeam}
            setSelectedTeam={setAwayTeam}
            teams={teams}
          />
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <FormSelect
              options={[1, 5, 10, 20, 30, 50, 100, 200, 500, 1000]}
              label={'Number of simulations'}
              fieldHandler={register('n')}
              error={errors.onNeutralGround}
            />
            <FormCheckbox
              label={'Play on neutral ground'}
              helper={
                'If checked, the home team will not have the bonus of the home advantage'
              }
              fieldHandler={register('onNeutralGround')}
              error={errors.onNeutralGround}
            />
            <Center>
              <Button
                isLoading={isSubmitting || isSubmitSuccessful}
                type="submit"
              >
                Simulate
              </Button>
            </Center>
          </Stack>
        </form>
      </Stack>
    </Skeleton>
  );
}

export default Page;
