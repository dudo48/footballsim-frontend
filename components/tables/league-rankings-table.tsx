import Ranking from '@/shared/interfaces/ranking.interface';
import { sorts } from '@/shared/misc/sorting';
import { getSortingDecoration, updateSorting } from '@/utils/functions';
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import LeagueRankingRow from './league-rankings-row';

interface Props {
  standings: Ranking[];
}

function LeagueRankingsTable({ standings }: Props) {
  const [sort, setSort] = useState<(a: Ranking, b: Ranking) => number>(
    () => sorts.ranking.position
  );
  const [isDesc, setIsDesc] = useBoolean(false);
  const sortedRankings = [...standings].sort(sort);
  if (isDesc) sortedRankings.reverse();

  const headers = [
    { value: 'P', sorting: sorts.ranking.position, px: 2, isNumeric: true },
    {
      value: 'TEAM',
      sort: (a: Ranking, b: Ranking) => sorts.team.name(a.team, b.team),
      px: 4,
    },
    {
      value: 'PL',
      px: 2,
      sorting: sorts.ranking.matchesPlayed,
      isNumeric: true,
    },
    { value: 'W', px: 2, sorting: sorts.ranking.wins, isNumeric: true },
    { value: 'D', px: 2, sorting: sorts.ranking.draws, isNumeric: true },
    { value: 'L', px: 2, sorting: sorts.ranking.losses, isNumeric: true },
    { value: 'F', px: 2, sorting: sorts.ranking.goalsFor, isNumeric: true },
    { value: 'A', px: 2, sorting: sorts.ranking.goalsAgainst, isNumeric: true },
    { value: 'D', px: 2, sorting: sorts.ranking.goalsDiff, isNumeric: true },
    { value: 'PT', px: 2, sorting: sorts.ranking.points, isNumeric: true },
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={h.sort ? 'pointer' : 'auto'}
                onClick={
                  h.sort
                    ? () =>
                        updateSorting(h.sort, sort, setSort, isDesc, setIsDesc)
                    : undefined
                }
                userSelect={h.sort ? 'none' : 'auto'}
                textDecor={getSortingDecoration(sort, isDesc, h.sort)}
                isNumeric={h.isNumeric}
                px={h.px}
              >
                {h.value}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedRankings.map((ranking) => (
            <LeagueRankingRow key={ranking.position} ranking={ranking} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default LeagueRankingsTable;
