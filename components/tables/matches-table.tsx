import Match from '@/interfaces/match.interface';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import MatchRow from './match-row';

interface Props {
  matches: Match[];
  showMatchNumber?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
}

function MatchesTable({
  matches,
  markWinner,
  markLoser,
  showMatchNumber,
}: Props) {
  return (
    <TableContainer>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            {showMatchNumber && <Th isNumeric>NO</Th>}
            <Th>HOME TEAM</Th>
            <Th textAlign={'center'}>RESULT</Th>
            <Th>AWAY TEAM</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((match, i) => (
            <MatchRow
              key={match.id}
              match={match}
              number={showMatchNumber ? i + 1 : undefined}
              markWinner={markWinner}
              markLoser={markLoser}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesTable;
