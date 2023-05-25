import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = InputProps & {
  fieldHandler: { [key: string]: unknown };
  label: string;
  error?: FieldError;
};

function FormInput({ label, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input {...fieldHandler} {...props} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormInput;
