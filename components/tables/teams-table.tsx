import Team from '@/shared/interfaces/team.interface';
import { sorts } from '@/shared/misc/sorting';
import { getSortingDecoration, updateSorting } from '@/utils/functions';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import TeamRow from './team-row';

interface Props {
  teams: Team[];
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
  showTeamsStrengthRank?: boolean;
  deemphasizedTeams?: Team[];
}

function TeamsTable({
  teams,
  selectTeam,
  selectedTeams,
  showTeamsStrengthRank,
  deemphasizedTeams,
}: Props) {
  const [sort, setSort] = useState<(a: Team, b: Team) => number>(
    () => sorts.team.strength
  );
  const [isDesc, setIsDesc] = useBoolean(true);
  const sortedTeams = [...teams].sort(sort);
  if (isDesc) sortedTeams.reverse();

  const headers = [
    ...(selectTeam ? [{ value: '', px: 2 }] : []),
    ...(showTeamsStrengthRank
      ? [
          {
            value: 'R',
            title: 'Rank according to strength',
            sort: sorts.team.strength,
            px: 2,
            isNumeric: true,
          },
        ]
      : []),
    { value: 'TEAM', sort: sorts.team.name, px: 4, isNumeric: false },
    { value: 'ATT', sort: sorts.team.attack, px: 2, isNumeric: true },
    { value: 'DEF', sort: sorts.team.defense, px: 2, isNumeric: true },
    { value: 'ADV', sort: sorts.team.homeAdvantage, px: 2, isNumeric: true },
    { value: 'STR', sort: sorts.team.strength, px: 2, isNumeric: true },
  ];

  const sortedByStrength = [...teams].sort(sorts.team.strength).reverse();
  return (
    <TableContainer>
      <Table>
        <TableCaption placement={'top'}>
          Displaying {teams.length} team{teams.length === 1 ? '' : 's'}.
        </TableCaption>
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
          {sortedTeams.map((team) => (
            <TeamRow
              key={team.id}
              number={
                showTeamsStrengthRank
                  ? sortedByStrength.findIndex((t) => t.id === team.id) + 1
                  : undefined
              }
              team={team}
              selectTeam={selectTeam}
              selectedTeams={selectedTeams}
              isDeemphasized={deemphasizedTeams?.some((t) => t.id === team.id)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TeamsTable;
