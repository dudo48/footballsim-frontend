import Round from '@/shared/interfaces/round.interface';
import {
  Box,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';

interface Props {
  roundIndex: number;
  setRoundIndex: (value: number) => void;
  rounds: Round[];
  alwaysShowMarksLabel?: boolean;
  roundNameFunction: (round: Round) => string;
}

function RoundsSlider({
  roundIndex,
  setRoundIndex,
  rounds,
  roundNameFunction,
}: Props) {
  console.log(roundIndex);
  return (
    <Box p={4} borderWidth={1} borderColor={'footballsim.500'} rounded={'md'}>
      <Stack>
        <Slider
          min={0}
          step={1}
          max={rounds.length - 1}
          value={roundIndex}
          onChange={(value) => setRoundIndex(value)}
        >
          {rounds.map((round, i) => (
            <SliderMark key={round.id} value={i}>
              <SliderThumb
                bg={'footballsim.200'}
                filter={i > roundIndex ? 'grayscale(100%)' : undefined}
              />
            </SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb p={2} />
        </Slider>
        <Flex justify={'space-between'} align={'center'}>
          <Flex>
            <IconButton
              variant={'ghost'}
              aria-label="first-round"
              icon={<BsChevronBarLeft />}
              onClick={() => setRoundIndex(0)}
              fontSize={32}
              color={'footballsim.50'}
            />
            <IconButton
              variant={'ghost'}
              aria-label="previous-round"
              icon={<BsChevronLeft />}
              onClick={() => setRoundIndex(Math.max(roundIndex - 1, 0))}
              fontSize={24}
              color={'footballsim.50'}
            />
          </Flex>
          <Text>{roundNameFunction(rounds[roundIndex])}</Text>
          <Flex>
            <IconButton
              variant={'ghost'}
              aria-label="next-round"
              icon={<BsChevronRight />}
              onClick={() =>
                setRoundIndex(Math.min(roundIndex + 1, rounds.length - 1))
              }
              fontSize={24}
              color={'footballsim.50'}
            />
            <IconButton
              variant={'ghost'}
              aria-label="last-round"
              icon={<BsChevronBarRight />}
              onClick={() => setRoundIndex(rounds.length - 1)}
              fontSize={32}
              color={'footballsim.50'}
            />
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}

export default RoundsSlider;
