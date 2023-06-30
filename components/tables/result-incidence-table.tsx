import Match from '@/shared/interfaces/match.interface';
import Result from '@/shared/interfaces/result.interface';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { countBy } from 'lodash';
import ResultIncidenceRow from './result-incidence-row';

interface Props {
  matches: Required<Match>[];
  markLoser?: boolean;
}

function ResultIncidenceTable({ matches, markLoser }: Props) {
  const results = matches.map((m) => m.result.standardTime);

  // convert result to string in order to be an object key then convert back and sort
  const resultIncidence = Object.entries(
    countBy(results, (r) => `${r.home}.${r.away}`)
  )
    .sort((a, b) => b[1] - a[1])
    .map((p) => [
      { home: +p[0].split('.')[0], away: +p[0].split('.')[1] },
      p[1],
    ]);

  const data = resultIncidence.map((p) => ({
    home: (p[0] as Result).home,
    away: (p[0] as Result).away,
    incidence: p[1] as number,
    percentage: +(((p[1] as number) / matches.length) * 100).toFixed(3),
  }));

  return (
    <TableContainer>
      <Table>
        <TableCaption placement={'top'}>
          Result Incidence (standard-time result only)
        </TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>HOME</Th>
            <Th isNumeric>AWAY</Th>
            <Th isNumeric>INCID.</Th>
            <Th isNumeric>INCID. PERCENTAGE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d) => (
            <ResultIncidenceRow
              key={`${d.home}.${d.away}`}
              data={d}
              markLoser={markLoser}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ResultIncidenceTable;
