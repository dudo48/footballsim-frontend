import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const colors = {
  footballsim: {
    '50': '#f2f5f8',
    '100': '#d3d8e4',
    '200': '#a7b2c8',
    '300': '#8c9cb5',
    '400': '#5f7191',
    '500': '#404a5e',
    '600': '#2b3646',
    '700': '#212b3b',
    '800': '#111a27',
    '900': '#0a111e',
    '950': '#020612',
  },
};

const theme = extendTheme(
  {
    colors,
  },
  withDefaultColorScheme({ colorScheme: 'footballsim' })
);

export default theme;
