import Round from '@/shared/interfaces/round.interface';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
} from '@chakra-ui/react';
import { clamp } from 'lodash';
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
  roundNameFunction: (round: Round) => string;
}

function RoundsSlider({
  roundIndex,
  setRoundIndex,
  rounds,
  roundNameFunction,
}: Props) {
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
          {rounds.map((round, i) =>
            i !== roundIndex ? (
              <SliderMark key={round.id} value={i}>
                <Stack>
                  <SliderThumb
                    bg={'footballsim.200'}
                    filter={i > roundIndex ? 'grayscale(100%)' : undefined}
                  />
                </Stack>
              </SliderMark>
            ) : undefined
          )}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={5} />
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
              onClick={() =>
                setRoundIndex(clamp(roundIndex - 1, 0, rounds.length - 1))
              }
              fontSize={24}
              color={'footballsim.50'}
            />
          </Flex>
          <Heading size={'md'}>{roundNameFunction(rounds[roundIndex])}</Heading>
          <Flex>
            <IconButton
              variant={'ghost'}
              aria-label="next-round"
              icon={<BsChevronRight />}
              onClick={() =>
                setRoundIndex(clamp(roundIndex + 1, 0, rounds.length - 1))
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
