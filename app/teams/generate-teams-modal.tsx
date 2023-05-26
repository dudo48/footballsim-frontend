import FormSlider from '@/components/form/form-slider';
import FormTextarea from '@/components/form/form-textarea';
import Team from '@/interfaces/team.interface';
import { useTeamActions, useTeams } from '@/services/team-service';
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
import generateTeams from './teams-generator';

interface FormProps {
  onClose: () => void;
}

type Props = FormProps & {
  isOpen: boolean;
};

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

function GenerateTeamsForm({ onClose }: FormProps) {
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

  const { teams: existingTeams, mutate } = useTeams();
  const { createTeams } = useTeamActions();
  const toast = useToast();

  async function onSubmit(data: FormData) {
    const teams: Team[] = generateTeams({
      ...data,
      names: data.names.split(/\n+/),
    });
    const result = await createTeams(teams);
    if (!result.error) {
      onClose();
      toast({ status: 'success', description: 'Teams created successfully.' });
      mutate(existingTeams.concat(result));
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
