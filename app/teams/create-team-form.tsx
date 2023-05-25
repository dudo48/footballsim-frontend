import FormInput from '@/components/form-input';
import { useTeamActions } from '@/services/team-service';
import { Button, Center, Stack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Team from '@/interfaces/team.interface';
import FormSlider from '@/components/form-slider';

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Please enter a name with a length of at least 3 characters.')
      .typeError('Please enter a name with a length of at least 3 characters.')
      .required('Please enter a name with a length of at least 3 characters.'),
    attack: yup
      .number()
      .positive('Please enter a valid number greater than 0.')
      .typeError('Please enter a valid number greater than 0.')
      .required('Please enter a valid number greater than 0'),
    defense: yup
      .number()
      .positive('Please enter a valid number greater than 0.')
      .typeError('Please enter a valid number greater than 0.')
      .required('Please enter a valid number greater than 0'),
    homeAdvantage: yup
      .number()
      .positive('Please enter a valid number greater than 0.')
      .typeError('Please enter a valid number greater than 0.')
      .required('Please enter a valid number greater than 0'),
    color: yup
      .string()
      .typeError('Please select a color.')
      .required('Please select a color'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface Props {
  mutateTeams: (result: Team) => void;
}

function CreateTeamForm({ mutateTeams }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      attack: 1.0,
      defense: 1.0,
      homeAdvantage: 1.2,
      color: '#ffffff',
    },
  });

  const { createTeam } = useTeamActions();
  const toast = useToast();

  async function onSubmit(data: FormData) {
    const result = await createTeam(data);
    if (!result.error) {
      resetField('name');
      toast({ status: 'success', description: 'Team created successfully.' });
      mutateTeams(result);
    } else {
      toast({ status: 'error', description: 'Failed to create team.' });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormInput
          label="Team Name"
          placeholder="Zamalek, Al Ahly, etc..."
          fieldHandler={register('name')}
          error={errors?.name}
        />
        <Controller
          control={control}
          name={'attack'}
          render={({ field }) => (
            <FormSlider
              label="Attack Strength"
              fieldHandler={field}
              error={errors.attack}
            />
          )}
        />
        <Controller
          control={control}
          name={'defense'}
          render={({ field }) => (
            <FormSlider
              label="Defense Strength"
              fieldHandler={field}
              error={errors.defense}
            />
          )}
        />
        <Controller
          control={control}
          name={'homeAdvantage'}
          render={({ field }) => (
            <FormSlider
              label="Home Advantage"
              helper="The strength multiplier of the team when playing on home ground"
              fieldHandler={field}
              error={errors.homeAdvantage}
              min={1}
              max={2}
            />
          )}
        />
        <FormInput
          label="Team Color"
          fieldHandler={register('color')}
          type="color"
          error={errors?.color}
        />
        <Center>
          <Button isLoading={isSubmitting} type="submit">
            Create
          </Button>
        </Center>
      </Stack>
    </form>
  );
}

export default CreateTeamForm;