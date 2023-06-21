import { isLoss, isWin } from '@/shared/functions/result.functions';
import Match from '@/shared/interfaces/match.interface';
import { Box, Stack, Td, Text, Tr } from '@chakra-ui/react';
import ResultTag from '../misc/result-tag';
import TeamLi from '../misc/team-li';

interface Props {
  match: Match;
  showMatchId?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
}

function MatchRow({
  match,
  showMatchId,
  markWinner,
  markLoser,
  showResultTag,
}: Props) {
  return (
    <Tr>
      {showMatchId && (
        <Td
          color={'footballsim.200'}
          fontStyle={'italic'}
          fontSize={'sm'}
          isNumeric
          verticalAlign={'top'}
          px={2}
        >
          {match.id}
        </Td>
      )}
      {match.result && showResultTag && (
        <Td verticalAlign={'top'} px={2}>
          <ResultTag result={match.result} />
        </Td>
      )}
      <Td verticalAlign={'top'}>
        <TeamLi
          isHighlighted={markWinner && isWin(match.result)}
          isDeemphasized={markLoser && isLoss(match.result)}
          team={match.homeTeam}
        />
      </Td>
      <Td textAlign={'center'}>
        {!match.result ? (
          'VS'
        ) : (
          <Stack>
            <Text
              fontSize={'xl'}
              title="Standard-time result"
            >{`${match.result.standardTime.home} - ${match.result.standardTime.away}`}</Text>
            {match.result.extraTime && (
              <Text title="Extra-time result">
                {`${match.result.extraTime.home} - ${match.result.extraTime.away} `}
                <Box as="span" fontStyle={'italic'}>
                  (E.T.)
                </Box>
              </Text>
            )}
            {match.result.penaltyShootout && (
              <Text title="Penalty shootout result">
                {`${match.result.penaltyShootout.home} - ${match.result.penaltyShootout.away} `}
                <Box as="span" fontStyle={'italic'}>
                  (P.S.)
                </Box>
              </Text>
            )}
          </Stack>
        )}
      </Td>
      <Td verticalAlign={'top'}>
        <TeamLi
          isHighlighted={markWinner && isLoss(match.result)}
          isDeemphasized={markLoser && isWin(match.result)}
          team={match.awayTeam}
        />
      </Td>
    </Tr>
  );
}

export default MatchRow;
