import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = TextareaProps & {
  fieldHandler: { [key: string]: unknown };
  label: string;
  helper?: string;
  error?: FieldError;
};

function FormTextarea({ label, helper, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <Textarea {...fieldHandler} {...props} h={32} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormTextarea;
