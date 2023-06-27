import { isLoss, isWin } from '@/shared/functions/match.functions';
import Match from '@/shared/interfaces/match.interface';
import { Stack, Td, Text, Tr, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';
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
  showTeamsStrength?: boolean;
  showResultOnHover?: boolean;
}

function MatchRow({
  match,
  showMatchId,
  markWinner,
  markLoser,
  showResultTag,
  showExtraTime,
  showPenaltyShootout,
  showTeamsStrength,
  showResultOnHover,
}: Props) {
  const [showResult, setShowResult] = useBoolean(false);

  useEffect(() => {
    showResultOnHover ? setShowResult.off() : setShowResult.on();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResultOnHover, match]);

  return (
    <Tr onMouseEnter={setShowResult.on}>
      {showMatchId && (
        <Td color={'footballsim.200'} fontSize={'sm'} isNumeric px={2}>
          {match.id}
        </Td>
      )}
      {match.result && showResultTag && (
        <Td px={2}>
          <ResultTag result={match.result} />
        </Td>
      )}
      <Td px={4}>
        <Stack spacing={1}>
          <TeamLi
            isHighlighted={markWinner && isWin(match.result)}
            isDeemphasized={showResult && markLoser && isLoss(match.result)}
            team={match.homeTeam}
            showStrength={showTeamsStrength}
          />
          <TeamLi
            isHighlighted={markWinner && isLoss(match.result)}
            isDeemphasized={showResult && markLoser && isWin(match.result)}
            team={match.awayTeam}
            showStrength={showTeamsStrength}
          />
        </Stack>
      </Td>
      <Td isNumeric px={2}>
        <Stack spacing={2}>
          <Text>
            {showResult && match.result ? match.result?.standardTime.home : '-'}
          </Text>
          <Text>
            {showResult && match.result ? match.result?.standardTime.away : '-'}
          </Text>
        </Stack>
      </Td>
      {showExtraTime && (
        <Td isNumeric px={2}>
          <Stack spacing={2}>
            <Text>{showResult && match.result?.extraTime?.home}</Text>
            <Text>{showResult && match.result?.extraTime?.away}</Text>
          </Stack>
        </Td>
      )}
      {showPenaltyShootout && (
        <Td isNumeric px={2}>
          <Stack spacing={2}>
            <Text>{showResult && match.result?.penaltyShootout?.home}</Text>
            <Text>{showResult && match.result?.penaltyShootout?.away}</Text>
          </Stack>
        </Td>
      )}
    </Tr>
  );
}

export default MatchRow;
