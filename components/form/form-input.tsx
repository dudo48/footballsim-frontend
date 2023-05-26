import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = InputProps & {
  fieldHandler: { [key: string]: unknown };
  label: string;
  helper?: string;
  error?: FieldError;
};

function FormInput({ label, helper, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <Input {...fieldHandler} {...props} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormInput;
