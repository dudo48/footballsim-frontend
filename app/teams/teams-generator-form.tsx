import FormRange from '@/components/form-range';
import FormTextarea from '@/components/form-textarea';
import Team from '@/interfaces/team.interface';
import { useTeamActions } from '@/services/team-service';
import { Button, Center, Stack, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import random from 'random';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    names: yup
      .string()
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
    attack: yup.object({
      low: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
      high: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
    }),
    defense: yup.object({
      low: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
      high: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
    }),
    homeAdvantage: yup.object({
      low: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
      high: yup
        .number()
        .positive('Please select a valid number greater than 0.')
        .typeError('Please select a valid number greater than 0.')
        .required('Please select a valid number greater than 0'),
    }),
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
      attack: { low: 5, high: 12 },
      defense: { low: 5, high: 12 },
      homeAdvantage: { low: 1, high: 1.5 },
    },
  });

  const { createTeams } = useTeamActions();
  const toast = useToast();

  function generateTeams(data: Omit<FormData, 'names'> & { names: string[] }) {
    const getAttack = random.logNormal(Math.log(10), 0.5);
    const getDefense = random.logNormal(Math.log(10), 0.5);

    const teams = data.names.map((name) => ({
      name,
      attack: getAttack(),
      defense: getDefense(),
      homeAdvantage: +random
        .float(data.homeAdvantage.low, data.homeAdvantage.high)
        .toFixed(1),
      color: `#${random.int(0, 16777215).toString(16)}`,
    }));

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
          label="Teams Names"
          helper="Separated by a new line. This specifies the number of generated teams."
          placeholder="Zamalek, Al Ahly, etc..."
          fieldHandler={register('names')}
          error={errors.names}
        />
        <Controller
          control={control}
          name={'attack'}
          render={({ field }) => (
            <FormRange
              label="Attack Strength Range"
              helper="The range which the teams' attack will be within."
              fieldHandler={field}
              error={errors.attack}
            />
          )}
        />
        <Controller
          control={control}
          name={'defense'}
          render={({ field }) => (
            <FormRange
              label="Defense Strength Range"
              helper="The range which the teams' defense will be within."
              fieldHandler={field}
              error={errors.defense}
            />
          )}
        />
        <Controller
          control={control}
          name={'homeAdvantage'}
          render={({ field }) => (
            <FormRange
              label="Home Advantage Range"
              helper="The range which the teams' home advantage will be within."
              fieldHandler={field}
              error={errors.homeAdvantage}
              min={1}
              max={2}
              step={0.1}
            />
          )}
        />

        <Text fontSize={'sm'}>
          Note: colors will be automatically generated.
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
