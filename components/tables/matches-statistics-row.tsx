import { Box, Td, Tr } from '@chakra-ui/react';

interface Props {
  data: {
    label: string;
    home: number;
    away: number;
    isPercentage?: boolean;
  };
  markSmaller?: boolean;
}

function MatchesStatisticsRow({
  data: { label, home, away, isPercentage },
  markSmaller,
}: Props) {
  const homeGreater = home > away;
  const awayGreater = away > home;

  return (
    <Tr>
      <Td textAlign={'center'}>
        <Box opacity={markSmaller && awayGreater ? 0.5 : 1}>
          {isPercentage ? `${home}%` : home}
        </Box>
      </Td>
      <Td textAlign={'center'}>{label}</Td>
      <Td textAlign={'center'}>
        <Box opacity={markSmaller && homeGreater ? 0.5 : 1}>
          {isPercentage ? `${away}%` : away}
        </Box>
      </Td>
    </Tr>
  );
}

export default MatchesStatisticsRow;
