import Match from '@/shared/interfaces/match.interface';
import { matchSorts } from '@/shared/misc/sorting';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import MatchRow from './match-row';

interface Props {
  matches: Match[];
  showMatchesOrder?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
  showTeamsStrength?: boolean;
}

function MatchesTable({
  matches,
  markWinner,
  markLoser,
  showResultTag,
  showMatchesOrder,
  showTeamsStrength,
}: Props) {
  const [sorting, setSorting] = useState('id');
  const [isDesc, setIsDesc] = useState(false);

  const sortedMatches = [...matches].sort(matchSorts[sorting]);
  if (isDesc) sortedMatches.reverse();

  function updateSorting(type: string) {
    if (sorting === type) {
      if (!isDesc) {
        setSorting('default');
        return;
      }
      setIsDesc(false);
    } else {
      setSorting(type);
      setIsDesc(true);
    }
  }

  function getSortingDecoration(type?: string) {
    if (sorting !== type) {
      return 'none';
    }
    return isDesc ? 'underline' : 'overline';
  }

  const showExtraTime = matches.some((m) => m.result?.extraTime);
  const showPenaltyShootout = matches.some((m) => m.result?.penaltyShootout);

  const headers = [
    ...(showMatchesOrder
      ? [{ title: '', sorting: 'id', px: 2, isNumeric: true }]
      : []),
    ...(showResultTag ? [{ title: '', sorting: 'result', px: 2 }] : []),
    { title: 'TEAMS', sorting: 'strength', px: 4, isNumeric: false },
    { title: 'ST', sorting: 'goals', px: 2, isNumeric: true },
    ...(showExtraTime
      ? [{ title: 'ET', px: 2, sorting: 'goals', isNumeric: true }]
      : []),
    ...(showPenaltyShootout ? [{ title: 'PS', px: 2, isNumeric: true }] : []),
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={h.sorting ? 'pointer' : 'auto'}
                onClick={h.sorting ? () => updateSorting(h.sorting) : undefined}
                userSelect={h.sorting ? 'none' : 'auto'}
                textDecor={getSortingDecoration(h.sorting)}
                isNumeric={h.isNumeric}
                px={h.px}
              >
                {h.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedMatches.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              showMatchId={showMatchesOrder}
              markWinner={markWinner}
              markLoser={markLoser}
              showResultTag={showResultTag}
              showExtraTime={showExtraTime}
              showPenaltyShootout={showPenaltyShootout}
              showTeamsStrength={showTeamsStrength}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesTable;
