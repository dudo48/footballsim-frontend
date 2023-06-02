import Match from '@/interfaces/match.interface';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import MatchRow from './match-row';

interface Props {
  matches: Match[];
  showMatchNumber?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
}

function MatchesTable({
  matches,
  markWinner,
  markLoser,
  showResultTag,
  showMatchNumber,
}: Props) {
  return (
    <TableContainer>
      <Table variant={'striped'} layout={'fixed'}>
        <Thead>
          <Tr>
            {showMatchNumber && (
              <Th w={12} isNumeric>
                NO
              </Th>
            )}
            {showResultTag && <Th w={12}></Th>}
            <Th>HOME TEAM</Th>
            <Th w={32} textAlign={'center'}>
              RESULT
            </Th>
            <Th>AWAY TEAM</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              number={showMatchNumber ? match.id : undefined}
              markWinner={markWinner}
              markLoser={markLoser}
              showResultTag={showResultTag}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesTable;
