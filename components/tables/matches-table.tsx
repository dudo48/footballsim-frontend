import Match from '@/shared/interfaces/match.interface';
import { sorts } from '@/shared/misc/sorting';
import { getSortingDecoration, updateSorting } from '@/utils/functions';
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import MatchRow from './match-row';

interface Props {
  matches: Match[];
  showMatchesOrder?: boolean;
  markWinner?: boolean;
  markLoser?: boolean;
  showResultTag?: boolean;
  showTeamsStrength?: boolean;
  showResultOnHover?: boolean;
}

function MatchesTable({
  matches,
  markWinner,
  markLoser,
  showResultTag,
  showMatchesOrder,
  showTeamsStrength,
  showResultOnHover,
}: Props) {
  const [sort, setSort] = useState<(a: Match, b: Match) => number>(
    () => sorts.match.id
  );
  const [isDesc, setIsDesc] = useBoolean(false);

  const sortedMatches = [...matches].sort(sort);
  if (isDesc) sortedMatches.reverse();

  const showExtraTime = matches.some((m) => m.result?.extraTime);
  const showPenaltyShootout = matches.some((m) => m.result?.penaltyShootout);

  const headers = [
    ...(showMatchesOrder
      ? [{ value: '', sort: sorts.match.id, px: 2, isNumeric: true }]
      : []),
    ...(showResultTag ? [{ value: '', sort: sorts.match.result, px: 2 }] : []),
    { value: 'TEAMS', sort: sorts.match.strength, px: 4, isNumeric: false },
    { value: 'ST', sort: sorts.match.goals, px: 2, isNumeric: true },
    ...(showExtraTime
      ? [{ value: 'ET', px: 2, sort: sorts.match.goals, isNumeric: true }]
      : []),
    ...(showPenaltyShootout ? [{ value: 'PS', px: 2, isNumeric: true }] : []),
  ];

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={h.sort ? 'pointer' : 'auto'}
                onClick={
                  h.sort
                    ? () =>
                        updateSorting(h.sort, sort, setSort, isDesc, setIsDesc)
                    : undefined
                }
                userSelect={h.sort ? 'none' : 'auto'}
                textDecor={getSortingDecoration(sort, isDesc, h.sort)}
                isNumeric={h.isNumeric}
                px={h.px}
              >
                {h.value}
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
              showResultOnHover={showResultOnHover}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MatchesTable;
