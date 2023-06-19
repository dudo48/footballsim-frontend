import Match from '@/interfaces/match.interface';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  matches: Match[];
}

function MatchesResultsFrequencies({ matches }: Props) {
  const frequencies = matches.reduce(
    (data: { [key: string]: number }, match) => {
      const result = `${match.result?.fullTime.home} - ${match.result?.fullTime.away}`;
      data[result] = (data[result] || 0) + 1;
      return data;
    },
    {}
  );

  return (
    <TableContainer bg={'footballsim.600'} shadow={'xl'} p={2}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Result</Th>
            <Th isNumeric>Frequency</Th>
            <Th isNumeric>Percentage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(frequencies)
            .sort((a, b) => b[1] - a[1])
            .map((entry, i) => (
              <Tr key={i}>
                <Td>{entry[0]}</Td>
                <Td isNumeric>{entry[1]}</Td>
                <Td isNumeric>
                  {((entry[1] / matches.length) * 100).toFixed(1)}%
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesResultsFrequencies;
