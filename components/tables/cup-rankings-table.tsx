import { getRoundEliminatedAt } from '@/shared/functions/cup.functions';
import Ranking from '@/shared/interfaces/ranking.interface';
import Round from '@/shared/interfaces/round.interface';
import { rankingSorts } from '@/shared/misc/sorting';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import CupRankingRow from './cup-rankings-row';

interface Props {
  standingsTable: Ranking[];
  rounds: Round[];
}

function CupRankingsTable({ standingsTable, rounds }: Props) {
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
    { value: 'E', title: 'Round eliminated at', px: 2 },
    { value: 'F', px: 2, sorting: 'goalsFor', isNumeric: true },
    { value: 'A', px: 2, sorting: 'goalsAgainst', isNumeric: true },
    { value: 'D', px: 2, sorting: 'goalsDiff', isNumeric: true },
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
