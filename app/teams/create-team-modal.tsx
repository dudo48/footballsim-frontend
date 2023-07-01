import FormInput from '@/components/form/form-input';
import FormSlider from '@/components/form/form-slider';
import { useTeamActions, useTeams } from '@/services/teams-service';
import {
  Box,
  Button,
  Center,
  Flex,
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
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
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
        <Flex gap={2}>
          <Box flex={4}>
            <FormInput
              label="Name"
              placeholder="Zamalek, Al Ahly, etc..."
              fieldHandler={register('name')}
              error={errors?.name}
            />
          </Box>
          <Box flex={1}>
            <FormInput
              label="Color"
              fieldHandler={register('color')}
              type="color"
              error={errors?.color}
            />
          </Box>
        </Flex>
        <Controller
          control={control}
          name={'attack'}
          render={({ field }) => (
            <FormSlider
              label="Attack"
              fieldHandler={field}
              error={errors.attack}
              onChange={(value) => {
                field.onChange(value);
                if (!dirtyFields.defense) setValue('defense', +value);
              }}
            />
          )}
        />
        <Controller
          control={control}
          name={'defense'}
          render={({ field }) => (
            <FormSlider
              label="Defense"
              fieldHandler={field}
              error={errors.defense}
              onChange={(value) => {
                field.onChange(value);
                if (!dirtyFields.attack) setValue('attack', +value);
              }}
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
              max={2}
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
