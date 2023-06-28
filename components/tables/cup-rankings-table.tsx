import { getRoundEliminatedAt } from '@/shared/functions/cup.functions';
import Ranking from '@/shared/interfaces/ranking.interface';
import Round from '@/shared/interfaces/round.interface';
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
import CupRankingRow from './cup-rankings-row';

interface Props {
  standingsTable: Ranking[];
  rounds: Round[];
}

function CupRankingsTable({ standingsTable, rounds }: Props) {
  const [sort, setSort] = useState<(a: Ranking, b: Ranking) => number>(
    () => sorts.ranking.position
  );
  const [isDesc, setIsDesc] = useBoolean(false);
  const sortedRankings = [...standingsTable].sort(sort);
  if (isDesc) sortedRankings.reverse();
  const [customSorts] = useState({
    teamName: (a: Ranking, b: Ranking) => sorts.team.name(a.team, b.team),
  });

  const headers = [
    { value: 'P', sort: sorts.ranking.position, px: 2, isNumeric: true },
    { value: 'TEAM', sort: customSorts.teamName, px: 4 },
    {
      value: 'E',
      px: 2,
      sort: sorts.ranking.position,
      title: 'Round eliminated at',
    },
    { value: 'F', px: 2, sort: sorts.ranking.goalsFor, isNumeric: true },
    { value: 'A', px: 2, sort: sorts.ranking.goalsAgainst, isNumeric: true },
    { value: 'D', px: 2, sort: sorts.ranking.goalsDiff, isNumeric: true },
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={'pointer'}
                onClick={
                  h.sort
                    ? () =>
                        updateSorting(h.sort, sort, setSort, isDesc, setIsDesc)
                    : undefined
                }
                userSelect={'none'}
                textDecor={getSortingDecoration(sort, isDesc, h.sort)}
                isNumeric={h.isNumeric}
                px={h.px}
                title={h?.title}
              >
                {h.value}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedRankings.map((ranking) => (
            <CupRankingRow
              key={ranking.team.id}
              ranking={ranking}
              roundEliminated={getRoundEliminatedAt(ranking.team, rounds)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CupRankingsTable;
