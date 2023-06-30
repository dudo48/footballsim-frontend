import { CupSimulations } from '@/context/cup-simulations';
import { useSimulations } from '@/services/simulations-service';
import Cup from '@/shared/interfaces/cup.interface';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';

interface Props {
  cup: Cup;
  showResultOnHover: boolean;
  setShowResultOnHover: Record<string, () => void>;
}

function Options({ showResultOnHover, setShowResultOnHover, cup }: Props) {
  const { setSimulations } = useContext(CupSimulations);
  const [isReSimulating, setIsReSimulating] = useState(false);
  const { simulateCup } = useSimulations();
  const toast = useToast();

  async function reSimulate() {
    setIsReSimulating(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result: _, ...request } = cup;
    const result = await simulateCup(request);
    if (!result.error) {
      setSimulations(result);
    } else {
      toast({ status: 'error', description: 'Failed to re-simulate.' });
    }
    setIsReSimulating(false);
  }

  return (
    <Box
      flex={1}
      p={2}
      borderWidth={1}
      borderColor={'footballsim.500'}
      rounded={'md'}
    >
      <Stack p={4}>
        <Flex align={'center'} justify={'space-between'}>
          <Heading size={'md'}>Options</Heading>
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
        </Flex>
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
