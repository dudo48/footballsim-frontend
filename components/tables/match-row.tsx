import { isLoss, isWin } from '@/shared/functions/result.functions';
import Match from '@/shared/interfaces/match.interface';
import { Stack, Td, Text, Tr } from '@chakra-ui/react';
import ResultTag from '../misc/result-tag';
import TeamLi from '../misc/team-li';

interface Props {
  match: Match;
  showMatchId?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
  showExtraTime?: boolean;
  showPenaltyShootout?: boolean;
}

function MatchRow({
  match,
  showMatchId,
  markWinner,
  markLoser,
  showResultTag,
  showExtraTime,
  showPenaltyShootout,
}: Props) {
  return (
    <Tr>
      {showMatchId && (
        <Td
          color={'footballsim.200'}
          fontStyle={'italic'}
          fontSize={'sm'}
          isNumeric
          px={2}
        >
          {match.id}
        </Td>
      )}
      {match.result && showResultTag && (
        <Td px={2}>
          <ResultTag result={match.result} />
        </Td>
      )}
      <Td pl={2}>
        <Stack spacing={1}>
          <TeamLi
            isHighlighted={markWinner && isWin(match.result)}
            isDeemphasized={markLoser && isLoss(match.result)}
            team={match.homeTeam}
          />
          <TeamLi
            isHighlighted={markWinner && isLoss(match.result)}
            isDeemphasized={markLoser && isWin(match.result)}
            team={match.awayTeam}
          />
        </Stack>
      </Td>
      <Td isNumeric px={2}>
        <Stack spacing={2}>
          <Text>{match.result ? match.result?.standardTime.home : '-'}</Text>
          <Text>{match.result ? match.result?.standardTime.away : '-'}</Text>
        </Stack>
      </Td>
      {showExtraTime && (
        <Td isNumeric px={2}>
          <Stack spacing={2}>
            <Text>{match.result?.extraTime?.home}</Text>
            <Text>{match.result?.extraTime?.away}</Text>
          </Stack>
        </Td>
      )}
      {showPenaltyShootout && (
        <Td isNumeric px={2}>
          <Stack spacing={2}>
            <Text>{match.result?.penaltyShootout?.home}</Text>
            <Text>{match.result?.penaltyShootout?.away}</Text>
          </Stack>
        </Td>
      )}
    </Tr>
  );
}

export default MatchRow;
