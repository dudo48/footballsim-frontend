import {
  Flex,
  FormControl,
  FormErrorMessage,
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
    error?: FieldError;
  };

function FormSlider({ label, error, fieldHandler, ...props }: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Flex gap={4}>
        <Slider focusThumbOnChange={false} {...fieldHandler} {...props}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <NumberInput w={32} {...fieldHandler} {...props}>
          <NumberInputField placeholder="1.00" />
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
