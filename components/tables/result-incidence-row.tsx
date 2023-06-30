import { Td, Tr } from '@chakra-ui/react';

interface Props {
  data: {
    home: number;
    away: number;
    incidence: number;
    percentage: number;
  };
  markLoser?: boolean;
}

function ResultIncidenceRow({
  data: { home, away, incidence, percentage },
  markLoser,
}: Props) {
  const homeGreater = home > away;
  const awayGreater = away > home;

  return (
    <Tr>
      <Td isNumeric opacity={markLoser && awayGreater ? 0.5 : 1}>
        {home}
      </Td>
      <Td isNumeric opacity={markLoser && homeGreater ? 0.5 : 1}>
        {away}
      </Td>
      <Td isNumeric>{incidence}</Td>
      <Td isNumeric>{percentage}%</Td>
    </Tr>
  );
}

export default ResultIncidenceRow;
