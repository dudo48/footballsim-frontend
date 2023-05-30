import Match from '@/interfaces/match.interface';
import { isLoss, isWin } from '@/utils/functions';
import { Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  match: Match;
  number?: number;
  markWinner?: boolean;
  markLoser?: boolean;
}

function MatchRow({ match, number, markWinner, markLoser }: Props) {
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
      <Td>
        <TeamLi
          isHighlighted={markWinner && isWin(match.result)}
          isDeemphasized={markLoser && isLoss(match.result)}
          team={match.homeTeam}
        />
      </Td>
      <Td textAlign={'center'} w={'full'} fontSize={'xl'}>
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
