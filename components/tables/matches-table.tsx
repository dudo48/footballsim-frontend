import Match from '@/shared/interfaces/match.interface';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import MatchRow from './match-row';

interface Props {
  matches: Match[];
  showMatchId?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
  showTeamsStrength?: boolean;
}

function MatchesTable({
  matches,
  markWinner,
  markLoser,
  showResultTag,
  showMatchId,
  showTeamsStrength,
}: Props) {
  const showExtraTime = matches.some((m) => m.result?.extraTime);
  const showPenaltyShootout = matches.some((m) => m.result?.penaltyShootout);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {showMatchId && (
              <Th isNumeric px={2}>
                NO
              </Th>
            )}
            {showResultTag && <Th px={2}></Th>}
            <Th>TEAMS</Th>
            <Th isNumeric title="Standard-time result" px={2}>
              S.T.
            </Th>
            {showExtraTime && (
              <Th isNumeric title="Extra-time result" px={2}>
                E.T.
              </Th>
            )}
            {showPenaltyShootout && (
              <Th isNumeric title="Penalty-shootout result" px={2}>
                P.S.
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              showMatchId={showMatchId}
              markWinner={markWinner}
              markLoser={markLoser}
              showResultTag={showResultTag}
              showExtraTime={showExtraTime}
              showPenaltyShootout={showPenaltyShootout}
              showTeamsStrength={showTeamsStrength}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesTable;
