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
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = SliderProps &
  NumberInputProps & {
    fieldHandler: { [key: string]: unknown };
    label: string;
    helper?: string;
    error?: FieldError;
  };

function FormSlider({ label, helper, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      <Flex gap={4}>
        <Slider focusThumbOnChange={false} {...fieldHandler} {...props}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <NumberInput w={32} {...fieldHandler} {...props}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormSlider;
