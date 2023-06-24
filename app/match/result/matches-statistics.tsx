import Match from '@/shared/interfaces/match.interface';
import {
  getTotalGoals,
  isDraw,
  isLoss,
  isWin,
} from '@/shared/functions/result.functions';
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

  const goals = matches
    .map((m) => getTotalGoals(m.result).home + getTotalGoals(m.result).away)
    .reduce((a, b) => a + b, 0);
  const homeGoals = matches
    .map((m) => getTotalGoals(m.result).home)
    .reduce((a, b) => a + b, 0);
  const awayGoals = matches
    .map((m) => getTotalGoals(m.result).away)
    .reduce((a, b) => a + b, 0);

  return (
    <Container textAlign={'center'} bg={'footballsim.600'} shadow={'xl'} p={2}>
      <Stack>
        <Heading size={'md'}>Statistics</Heading>
        <Stack>
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
          <Divider borderColor={'footballsim.950'} />
          <Flex>
            <Stat>
              <StatLabel>Home Win %</StatLabel>
              <StatNumber>
                {((wins.length / matches.length) * 100).toFixed(1)}%
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Draw %</StatLabel>
              <StatNumber>
                {((draws.length / matches.length) * 100).toFixed(1)}%
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Away Win %</StatLabel>
              <StatNumber>
                {((losses.length / matches.length) * 100).toFixed(1)}%
              </StatNumber>
            </Stat>
          </Flex>
          <Divider borderColor={'footballsim.950'} />
          <Flex>
            <Stat>
              <StatLabel>Avg. Goals</StatLabel>
              <StatNumber>{(goals / matches.length).toFixed(2)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Avg. Home Goals</StatLabel>
              <StatNumber>{(homeGoals / matches.length).toFixed(2)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Avg. Away Goals</StatLabel>
              <StatNumber>{(awayGoals / matches.length).toFixed(2)}</StatNumber>
            </Stat>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
}

export default MatchesStatistics;
