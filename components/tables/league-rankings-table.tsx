import Ranking from '@/shared/interfaces/ranking.interface';
import { rankingSorts } from '@/shared/misc/sorting';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import LeagueRankingRow from './league-rankings-row';

interface Props {
  standingsTable: Ranking[];
}

function LeagueRankingsTable({ standingsTable }: Props) {
  const [sorting, setSorting] = useState('position');
  const [isDesc, setIsDesc] = useState(false);

  const sortedRankings = [...standingsTable].sort(rankingSorts[sorting]);
  if (isDesc) sortedRankings.reverse();

  function updateSorting(type: string) {
    if (sorting === type) {
      if (!isDesc) {
        setSorting('default');
        return;
      }
      setIsDesc(false);
    } else {
      setSorting(type);
      setIsDesc(true);
    }
  }

  function getSortingDecoration(type?: string) {
    if (sorting !== type) {
      return 'none';
    }
    return isDesc ? 'underline' : 'overline';
  }

  const headers = [
    { value: 'P', sorting: 'position', px: 2, isNumeric: true },
    { value: 'TEAM', sorting: 'teamName', px: 4 },
    { value: 'PL', px: 2, sorting: 'matchesPlayed', isNumeric: true },
    { value: 'W', px: 2, sorting: 'wins', isNumeric: true },
    { value: 'D', px: 2, sorting: 'draws', isNumeric: true },
    { value: 'L', px: 2, sorting: 'losses', isNumeric: true },
    { value: 'F', px: 2, sorting: 'goalsFor', isNumeric: true },
    { value: 'A', px: 2, sorting: 'goalsAgainst', isNumeric: true },
    { value: 'D', px: 2, sorting: 'goalsDiff', isNumeric: true },
    { value: 'PT', px: 2, sorting: 'points', isNumeric: true },
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={h.sorting ? 'pointer' : 'auto'}
                onClick={h.sorting ? () => updateSorting(h.sorting) : undefined}
                userSelect={h.sorting ? 'none' : 'auto'}
                textDecor={getSortingDecoration(h.sorting)}
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
