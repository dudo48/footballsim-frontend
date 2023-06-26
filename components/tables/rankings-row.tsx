import { getGoalsDiff } from '@/shared/functions/ranking.functions';
import Ranking from '@/shared/interfaces/ranking.interface';
import { Box, Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

// might not want to display all ranking data on table
export type PartialRanking = Pick<Ranking, 'position' | 'team'> &
  Partial<Ranking>;

interface Props {
  ranking: PartialRanking;
  isDeemphasized?: boolean;
}

function RankingRow({ ranking, isDeemphasized }: Props) {
  const deemphasizedOpacity = 0.25;
  const row = [];
  if (ranking.matchesPlayed !== undefined) row.push(ranking.matchesPlayed);
  if (ranking.wins !== undefined) row.push(ranking.wins);
  if (ranking.draws !== undefined) row.push(ranking.draws);
  if (ranking.losses !== undefined) row.push(ranking.losses);
  if (ranking.goalsFor !== undefined) row.push(ranking.goalsFor);
  if (ranking.goalsAgainst !== undefined) row.push(ranking.goalsAgainst);
  if (ranking.goalsFor !== undefined && ranking.goalsAgainst !== undefined)
    row.push(getGoalsDiff(ranking));
  if (ranking.points !== undefined) row.push(ranking.points);

  return (
    <Tr>
      <Td
        color={'footballsim.200'}
        fontStyle={'italic'}
        fontSize={'sm'}
        isNumeric
        px={2}
      >
        {ranking.position}
      </Td>
      <Td px={4}>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          <TeamLi team={ranking.team} />
        </Box>
      </Td>
      {row.map((data, i) => (
        <Td key={i} px={2} isNumeric>
          <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>{data}</Box>
        </Td>
      ))}
    </Tr>
  );
}

export default RankingRow;
