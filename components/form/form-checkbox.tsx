import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = CheckboxProps & {
  fieldHandler: { [key: string]: unknown };
  label: string;
  helper?: string;
  error?: FieldError;
};

function FormCheckbox({ label, helper, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <Checkbox {...fieldHandler} {...props}>
        {label}
      </Checkbox>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormCheckbox;
