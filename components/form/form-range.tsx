import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { FocusEventHandler } from 'react';
import { FieldError } from 'react-hook-form';

type Props = RangeSliderProps &
  NumberInputProps & {
    fieldHandler: {
      name: string;
      value: { low: number; high: number };
      onBlur: FocusEventHandler<HTMLInputElement>;
      onChange: (value: { low: number; high: number }) => void;
    };
    label: string;
    helper?: string;
    error?: { low?: FieldError; high?: FieldError };
  };

function FormRange({ label, helper, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <Flex gap={4}>
        <NumberInput
          w={32}
          {...props}
          name={`${fieldHandler.name}.low`}
          value={fieldHandler.value.low}
          onBlur={fieldHandler.onBlur}
          onChange={(value) =>
            fieldHandler.onChange({
              ...fieldHandler.value,
              low: Number(value),
            })
          }
          max={fieldHandler.value.high}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <RangeSlider
          value={[fieldHandler.value.low, fieldHandler.value.high]}
          onChange={(value) =>
            fieldHandler.onChange({ low: value[0], high: value[1] })
          }
          {...props}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <NumberInput
          w={32}
          {...props}
          name={`${fieldHandler.name}.high`}
          value={fieldHandler.value.high}
          onBlur={fieldHandler.onBlur}
          onChange={(value) =>
            fieldHandler.onChange({
              ...fieldHandler.value,
              high: Number(value),
            })
          }
          min={fieldHandler.value.low}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <FormErrorMessage>{error?.low?.message}</FormErrorMessage>
      <FormErrorMessage>{error?.high?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormRange;
