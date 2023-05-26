import FormInput from '@/components/form/form-input';
import FormSlider from '@/components/form/form-slider';
import { useTeamActions, useTeams } from '@/services/team-service';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormProps {
  onClose: () => void;
}

type Props = FormProps & {
  isOpen: boolean;
};

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(3, 'Please enter a name with a length of at least 3 characters.')
      .typeError('Please enter a name with a length of at least 3 characters.')
      .required('Please enter a name with a length of at least 3 characters.'),
    attack: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
    defense: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
    homeAdvantage: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
    color: yup
      .string()
      .typeError('Please select a color.')
      .required('Please select a color'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function CreateTeamForm({ onClose }: FormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      attack: 1,
      defense: 1,
      homeAdvantage: 1.2,
      color: '#ffffff',
    },
  });

  const { teams, mutate } = useTeams();
  const { createTeam } = useTeamActions();
  const toast = useToast();

  async function onSubmit(data: FormData) {
    const result = await createTeam(data);
    if (!result.error) {
      toast({ status: 'success', description: 'Team created successfully.' });
      mutate(teams.concat(result));
      onClose();
    } else {
      toast({ status: 'error', description: 'Failed to create team.' });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormInput
          label="Team name"
          placeholder="Zamalek, Al Ahly, etc..."
          fieldHandler={register('name')}
          error={errors?.name}
        />
        <FormInput
          label="Team color"
          fieldHandler={register('color')}
          type="color"
          error={errors?.color}
        />
        <Controller
          control={control}
          name={'attack'}
          render={({ field }) => (
            <FormSlider
              label="Attack strength"
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
              label="Defense strength"
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
              label="Home advantage"
              helper="The strength multiplier of the team when playing on home ground."
              fieldHandler={field}
              error={errors.homeAdvantage}
              min={1}
              max={2}
              step={0.1}
            />
          )}
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

function CreateTeamModal({ ...props }: Props) {
  return (
    <Modal size={'xl'} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateTeamForm onClose={props.onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateTeamModal;
