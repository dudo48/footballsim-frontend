import Cup from '@/shared/interfaces/cup.interface';
import { Box, Checkbox, Heading, Select, Stack, Text } from '@chakra-ui/react';

interface Props {
  simulation: Cup;
}

function Options({ simulation }: Props) {
  return (
    <Box p={2} borderWidth={1} borderColor={'footballsim.500'} rounded={'md'}>
      <Heading size={'md'}>Chosen Options</Heading>
      <Stack p={4}>
        <>
          <Text>Number of seeds</Text>
          <Select isReadOnly value={simulation.seeds}>
            <option value={simulation.seeds}>{simulation.seeds}</option>
          </Select>
        </>
        <Checkbox isReadOnly isChecked={simulation.allowExtraTime} isDisabled={!simulation.isKnockout}>
          Extra-time
        </Checkbox>
      </Stack>
    </Box>
  );
}

export default Options;
