import Match from '@/interfaces/match.interface';
import { isDraw, isLoss, isWin } from '@/utils/functions';
import {
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

interface Props {
  matches: Match[];
}

function MatchesStatistics({ matches }: Props) {
  const wins = matches.filter((m) => isWin(m.result));
  const draws = matches.filter((m) => isDraw(m.result));
  const losses = matches.filter((m) => isLoss(m.result));

  return (
    <Container textAlign={'center'} bg={'footballsim.600'} shadow={'xl'} p={2}>
      <Stack>
        <Heading size={'lg'}>Statistics</Heading>
        <Divider borderColor={'footballsim.950'} />
        <Flex>
          <Stat>
            <StatLabel>Total Matches</StatLabel>
            <StatNumber>{matches.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Home Wins</StatLabel>
            <StatNumber>{wins.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Draws</StatLabel>
            <StatNumber>{draws.length}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Away Wins</StatLabel>
            <StatNumber>{losses.length}</StatNumber>
          </Stat>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel>Home Win Percentage</StatLabel>
            <StatNumber>
              {((wins.length / matches.length) * 100).toFixed(1)}%
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Draw Percentage</StatLabel>
            <StatNumber>
              {((draws.length / matches.length) * 100).toFixed(1)}%
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Away Win Percentage</StatLabel>
            <StatNumber>
              {((losses.length / matches.length) * 100).toFixed(1)}%
            </StatNumber>
          </Stat>
        </Flex>
      </Stack>
    </Container>
  );
}

export default MatchesStatistics;
