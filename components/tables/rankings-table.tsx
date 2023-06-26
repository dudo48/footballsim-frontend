import Standings from '@/shared/interfaces/standings.interface';
import Team from '@/shared/interfaces/team.interface';
import { rankingSorts } from '@/shared/misc/sorting';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import RankingRow, { PartialRanking } from './rankings-row';

interface Props {
  standings: Omit<Standings, 'table'> & { table: PartialRanking[] };
  deemphasizedTeams?: Team[];
}

function RankingsTable({ standings, deemphasizedTeams }: Props) {
  const [sorting, setSorting] = useState('position');
  const [isDesc, setIsDesc] = useState(false);

  const sortedRankings = [...standings.table].sort(rankingSorts[sorting]);
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

  const firstRow = standings.table.length ? standings.table[0] : undefined;
  const headers = [
    { title: '', sorting: 'position', px: 2 },
    { title: 'TEAM', sorting: 'teamName', px: 4 },
    ...(isFinite(Number(firstRow?.matchesPlayed))
      ? [{ title: 'P', px: 2, sorting: 'matchesPlayed', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.wins))
      ? [{ title: 'W', px: 2, sorting: 'wins', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.draws))
      ? [{ title: 'D', px: 2, sorting: 'draws', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.losses))
      ? [{ title: 'L', px: 2, sorting: 'losses', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.goalsFor))
      ? [{ title: 'F', px: 2, sorting: 'goalsFor', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.goalsAgainst))
      ? [{ title: 'A', px: 2, sorting: 'goalsAgainst', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.goalsFor)) &&
    isFinite(Number(firstRow?.goalsAgainst))
      ? [{ title: 'D', px: 2, sorting: 'goalsDiff', isNumeric: true }]
      : []),
    ...(isFinite(Number(firstRow?.points))
      ? [{ title: 'PT', px: 2, sorting: 'points', isNumeric: true }]
      : []),
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
                {h.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedRankings.map((ranking) => (
            <RankingRow
              key={ranking.position}
              ranking={ranking}
              isDeemphasized={deemphasizedTeams?.some(
                (t) => t.id === ranking.team.id
              )}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default RankingsTable;
