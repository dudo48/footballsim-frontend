import { CupSimulations } from '@/context/cup-simulations';
import { useSimulations } from '@/services/simulations-service';
import Cup from '@/shared/interfaces/cup.interface';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';

interface Props {
  simulation: Cup;
  showResultOnHover: boolean;
  setShowResultOnHover: Record<string, () => void>;
}

function Options({
  showResultOnHover,
  setShowResultOnHover,
  simulation,
}: Props) {
  const { setSimulations } = useContext(CupSimulations);
  const [isReSimulating, setisReSimulating] = useState(false);
  const { simulateCup } = useSimulations();
  const toast = useToast();

  async function reSimulate() {
    setisReSimulating(true);
    const result = await simulateCup(simulation);
    if (!result.error) {
      setSimulations(result);
    } else {
      toast({ status: 'error', description: 'Failed to re-simulate.' });
    }
    setisReSimulating(false);
  }

  return (
    <Box
      flex={1}
      p={2}
      borderWidth={1}
      borderColor={'footballsim.500'}
      rounded={'md'}
    >
      <Heading size={'md'}>Options</Heading>
      <Stack p={4}>
        <Button
          variant={'outline'}
          colorScheme={'cyan'}
          leftIcon={<BsArrowClockwise />}
          title="With same options"
          onClick={reSimulate}
          isLoading={isReSimulating}
        >
          Re-simulate
        </Button>
        <Checkbox
          isChecked={showResultOnHover}
          onChange={setShowResultOnHover.toggle}
        >
          Show match result on mouse hover (for entertainment)
        </Checkbox>
      </Stack>
    </Box>
  );
}

export default Options;
