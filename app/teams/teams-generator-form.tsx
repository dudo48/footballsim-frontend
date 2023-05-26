import FormSlider from '@/components/form-slider';
import FormTextarea from '@/components/form-textarea';
import Team from '@/interfaces/team.interface';
import { useTeamActions } from '@/services/team-service';
import { Button, Center, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { colord } from 'colord';
import random from 'random';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    names: yup
      .string()
      .trim()
      .test(
        'is-min-length-3',
        'Please enter all names with a length of at least 3 characters.',
        (value?: string) => value?.split(/\n+/).every((n) => n.length >= 3)
      )
      .typeError(
        'Please enter all names with a length of at least 3 characters.'
      )
      .required(
        'Please enter all names with a length of at least 3 characters.'
      ),
    strength: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
    alpha: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface Props {
  mutateTeams: (result: Team) => void;
}

function GenerateTeamForm({ mutateTeams }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      names: '',
      strength: 1,
      alpha: 4,
    },
  });

  const { createTeams } = useTeamActions();
  const toast = useToast();

  function generateTeams(data: Omit<FormData, 'names'> & { names: string[] }) {
    const getRandom = random.pareto(data.alpha);

    const n = 10;
    // multiply by two so that the mean is 1 not 0.5
    const getNoise = () => random.bates(n)() * 2;

    const teams = data.names.map((name) => {
      // attack and defense are related
      const attack = +(getRandom() * data.strength).toFixed(1);
      const defense = +(attack * getNoise()).toFixed(1);

      return {
        name,
        attack,
        defense,
        homeAdvantage: 1.2,
        color: colord(
          `hsl(
          ${random.int(0, 255)},
          ${random.int(80, 100)}%,
          ${random.int(0, 100)}%
          )`
        ).toHex(),
      };
    });

    return teams;
  }

  async function onSubmit(data: FormData) {
    const teams = generateTeams({ ...data, names: data.names.split(/\n+/) });
    const result = await createTeams(teams);
    if (!result.error) {
      toast({ status: 'success', description: 'Teams created successfully.' });
      mutateTeams(result);
    } else {
      toast({ status: 'error', description: 'Failed to create teams.' });
    }
    console.log(teams);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormTextarea
          label="Teams names"
          helper="Separated by a new line. This specifies the number of generated teams."
          placeholder="Zamalek, Al Ahly, etc..."
          fieldHandler={register('names')}
          error={errors.names}
        />
        <Text>
          Teams&apos; strength will be generated using a{' '}
          <Link
            isExternal={true}
            href="https://en.m.wikipedia.org/wiki/Pareto_distribution"
            color={'footballsim.200'}
          >
            Pareto distribution
          </Link>
          .
        </Text>
        <Controller
          control={control}
          name={'strength'}
          render={({ field }) => (
            <FormSlider
              label="Minimum strength"
              fieldHandler={field}
              error={errors.strength}
            />
          )}
        />
        <Controller
          control={control}
          name={'alpha'}
          render={({ field }) => (
            <FormSlider
              label="Alpha"
              helper="The higher the more that the teams will be closer to the minimum strength"
              fieldHandler={field}
              error={errors.strength}
            />
          )}
        />

        <Text fontSize={'sm'}>
          Note: colors will be automatically generated and home advantage will
          take a default value.
        </Text>
        <Center>
          <Button isLoading={isSubmitting} type="submit">
            Generate
          </Button>
        </Center>
      </Stack>
    </form>
  );
}

export default GenerateTeamForm;
