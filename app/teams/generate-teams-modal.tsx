import FormSelect from '@/components/form/form-select';
import FormSlider from '@/components/form/form-slider';
import { useTeamActions, useTeams } from '@/services/teams-service';
import {
  Button,
  Center,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
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
    number: yup
      .number()
      .positive('Please select a valid number greater than 0.')
      .typeError('Please select a valid number greater than 0.')
      .required('Please select a valid number greater than 0'),
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

function GenerateTeamsForm({ onClose }: FormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      number: 10,
      strength: 1,
      alpha: 5,
    },
  });

  const { teams: existingTeams, mutate } = useTeams();
  const { createTeams, getRandomTeams } = useTeamActions();
  const toast = useToast();

  async function onSubmit(data: FormData) {
    const teams = await getRandomTeams(data.number, data.strength, data.alpha);
    const result = await createTeams(teams);
    if (!result.error) {
      onClose();
      toast({ status: 'success', description: 'Teams created successfully.' });
      mutate(existingTeams.concat(result));
    } else {
      toast({ status: 'error', description: 'Failed to create teams.' });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormSelect
          variant={'solid'}
          bg={'gray.600'}
          options={[1, 5, 10, 20, 30, 50, 100]}
          label={'Number of teams'}
          fieldHandler={register('number')}
          error={errors.number}
        />
        <Text>
          Each team&apos;s attack and defense will be generated using a{' '}
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
              label="Weight"
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
              helper="The higher the more the teams will be closer to the weight of strength."
              fieldHandler={field}
              error={errors.alpha}
              min={1}
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

function GenerateTeamsModal(props: Props) {
  return (
    <Modal size={'3xl'} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate Random Teams</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GenerateTeamsForm onClose={props.onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GenerateTeamsModal;
