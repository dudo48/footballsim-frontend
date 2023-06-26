import Match from '@/shared/interfaces/match.interface';
import { Box, Checkbox, Heading, Stack } from '@chakra-ui/react';

interface Props {
  simulation: Match;
}

function Options({ simulation }: Props) {
  return (
    <Box p={2} borderWidth={1} borderColor={'footballsim.500'} rounded={'md'}>
      <Heading size={'md'}>Chosen Options</Heading>
      <Stack p={4}>
        <Checkbox isReadOnly isChecked={simulation.onNeutralGround}>
          On neutral ground
        </Checkbox>
        <Checkbox isReadOnly isChecked={simulation.isKnockout}>
          Knockout
        </Checkbox>
        <Checkbox
          isReadOnly
          isChecked={simulation.allowExtraTime}
          isDisabled={!simulation.isKnockout}
        >
          Extra-time
        </Checkbox>
      </Stack>
    </Box>
  );
}

export default Options;
