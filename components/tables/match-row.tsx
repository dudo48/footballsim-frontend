import Match from '@/interfaces/match.interface';
import { isLoss, isWin } from '@/utils/functions';
import { Td, Tr } from '@chakra-ui/react';
import ResultTag from '../misc/result-tag';
import TeamLi from '../misc/team-li';

interface Props {
  match: Match;
  number?: number;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
}

function MatchRow({
  match,
  number,
  markWinner,
  markLoser,
  showResultTag,
}: Props) {
  return (
    <Tr>
      {number && (
        <Td
          color={'footballsim.200'}
          fontStyle={'italic'}
          fontSize={'sm'}
          isNumeric
        >
          {number}
        </Td>
      )}
      {match.result && showResultTag && (
        <Td>
          <ResultTag result={match.result} />
        </Td>
      )}
      <Td>
        <TeamLi
          isHighlighted={markWinner && isWin(match.result)}
          isDeemphasized={markLoser && isLoss(match.result)}
          team={match.homeTeam}
        />
      </Td>
      <Td textAlign={'center'} fontSize={'xl'}>
        {match.result
          ? `${match.result.fullTime.home} - ${match.result.fullTime.away}`
          : 'VS'}
      </Td>
      <Td>
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
