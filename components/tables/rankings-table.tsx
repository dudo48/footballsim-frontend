import Standings from '@/shared/interfaces/standings.interface';
import Team from '@/shared/interfaces/team.interface';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import RankingRow, { PartialRanking } from './rankings-row';

interface Props {
  standings: Omit<Standings, 'table'> & { table: PartialRanking[] };
  deemphasizedTeams?: Team[];
}

function RankingsTable({ standings, deemphasizedTeams }: Props) {
  const firstRow = standings.table.length ? standings.table[0] : undefined;
  const row = [];
  if (firstRow) {
    if (firstRow.matchesPlayed !== undefined) row.push('MP');
    if (firstRow.wins !== undefined) row.push('W');
    if (firstRow.draws !== undefined) row.push('D');
    if (firstRow.losses !== undefined) row.push('L');
    if (firstRow.goalsFor !== undefined) row.push('GF');
    if (firstRow.goalsAgainst !== undefined) row.push('GA');
    if (firstRow.goalsFor !== undefined && firstRow.goalsAgainst !== undefined)
      row.push('GD');
    if (firstRow.points !== undefined) row.push('PTS');
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th isNumeric px={2}>
              POS
            </Th>
            <Th px={4}>Team</Th>
            {row.map((data) => (
              <Th key={data} px={2} isNumeric>
                {data}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {standings.table.map((ranking) => (
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
