import Ranking from '@/shared/interfaces/ranking.interface';
import { Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  ranking: Ranking;
}

function LeagueRankingRow({ ranking }: Props) {
  const numericData = [
    ranking.matchesPlayed,
    ranking.wins,
    ranking.draws,
    ranking.losses,
    ranking.goalsFor,
    ranking.goalsAgainst,
    ranking.points,
  ];

  return (
    <Tr>
      <Td color={'footballsim.200'} fontSize={'sm'} isNumeric px={2}>
        {ranking.position}
      </Td>
      <Td px={4}>
        <TeamLi team={ranking.team} />
      </Td>
      {numericData.map((data, i) => (
        <Td key={i} px={2} isNumeric>
          {data}
        </Td>
      ))}
    </Tr>
  );
}

export default LeagueRankingRow;
