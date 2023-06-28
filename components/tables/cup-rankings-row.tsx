import { getGoalsDiff } from '@/shared/functions/ranking.functions';
import Ranking from '@/shared/interfaces/ranking.interface';
import Round from '@/shared/interfaces/round.interface';
import { getCupRoundName } from '@/utils/functions';
import { Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  ranking: Ranking;
  roundEliminated: Round;
}

function CupRankingRow({ ranking, roundEliminated }: Props) {
  const numericData = [
    ranking.goalsFor,
    ranking.goalsAgainst,
    getGoalsDiff(ranking),
  ];

  return (
    <Tr>
      <Td color={'footballsim.200'} fontSize={'sm'} isNumeric px={2}>
        {ranking.position}
      </Td>
      <Td px={4}>
        <TeamLi team={ranking.team} />
      </Td>
      <Td px={2}>{roundEliminated ? getCupRoundName(roundEliminated) : '-'}</Td>
      {numericData.map((data, i) => (
        <Td key={i} px={2} isNumeric>
          {data}
        </Td>
      ))}
    </Tr>
  );
}

export default CupRankingRow;
