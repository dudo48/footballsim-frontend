import {
  getTotalGoals,
  isDraw,
  isLoss,
  isWin,
} from '@/shared/functions/match.functions';
import Match from '@/shared/interfaces/match.interface';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import MatchesStatisticsRow from './matches-statistics-row';

interface Props {
  matches: Match[];
  markSmaller?: boolean;
}

function MatchesStatisticsTable({ matches, markSmaller }: Props) {
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

  const data = [
    { label: 'Matches', home: matches.length, away: matches.length },
    {
      label: 'Average Match Goals',
      home: +(goals / matches.length).toFixed(2),
      away: +(goals / matches.length).toFixed(2),
    },
    { label: 'Wins', home: wins.length, away: losses.length },
    {
      label: 'Win Percentage',
      home: +((wins.length / matches.length) * 100).toFixed(3),
      away: +((losses.length / matches.length) * 100).toFixed(3),
      isPercentage: true,
    },
    { label: 'Draws', home: draws.length, away: draws.length },
    {
      label: 'Draw Percentage',
      home: +((draws.length / matches.length) * 100).toFixed(3),
      away: +((draws.length / matches.length) * 100).toFixed(3),
      isPercentage: true,
    },
    {
      label: 'Average Team Goals',
      home: +(homeGoals / matches.length).toFixed(2),
      away: +(awayGoals / matches.length).toFixed(2),
    },
  ];

  return (
    <TableContainer>
      <Table>
        <TableCaption placement={'top'}>Statistics</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign={'center'}>HOME</Th>
            <Th textAlign={'center'}></Th>
            <Th textAlign={'center'}>AWAY</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d) => (
            <MatchesStatisticsRow
              key={d.label}
              data={d}
              markSmaller={markSmaller}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesStatisticsTable;
