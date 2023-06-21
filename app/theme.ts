import {
  NumberInput,
  RangeSlider,
  Slider,
  Table,
  TableContainer,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const colors = {
  footballsim: {
    '50': '#dae9f6',
    '100': '#c9deed',
    '200': '#4994c5',
    '300': '#3278a4',
    '400': '#286080',
    '500': '#1f465c',
    '600': '#112a3b',
    '700': '#102737',
    '800': '#0f222e',
    '900': '#11202d',
    '950': '#0a121a',
  },
};

const styles = {
  global: {
    body: {
      bg: 'footballsim.900',
      color: 'footballsim.50',
    },
  },
};

Slider.defaultProps = {
  min: 0.1,
  max: 10,
  step: 0.1,
};

RangeSlider.defaultProps = {
  min: 0.1,
  max: 10,
  step: 0.1,
};

NumberInput.defaultProps = {
  allowMouseWheel: true,
  min: 0.1,
  step: 0.1,
};

TableContainer.defaultProps = {
  bg: 'footballsim.600',
};

Table.defaultProps = {
  variant: 'striped',
};

const theme = extendTheme(
  {
    colors,
    styles,
  },
  withDefaultColorScheme({ colorScheme: 'footballsim' })
);

export default theme;
