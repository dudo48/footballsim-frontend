import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = SelectProps & {
  fieldHandler: { [key: string]: unknown };
  label: string;
  helper?: string;
  error?: FieldError;
  options: string[] | number[];
};

function FormSelect({
  label,
  helper,
  error,
  fieldHandler,
  options,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <Select variant={'solid'} {...fieldHandler} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormSelect;
