import Team from '@/shared/interfaces/team.interface';
import { sorts } from '@/shared/misc/sorting';
import { getSortingDecoration, updateSorting } from '@/utils/functions';
import {
  Checkbox,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import { differenceBy, inRange } from 'lodash';
import { useState } from 'react';
import TeamRow from './team-row';

interface Props {
  teams: Team[];
  selectedTeams?: Team[];
  setSelectedTeams?: (teams: Team[]) => void;
  showTeamsStrengthRank?: boolean;
  deemphasizedTeams?: Team[];
  hiddenTeams?: Team[];
}

function TeamsTable({
  teams,
  setSelectedTeams,
  selectedTeams,
  showTeamsStrengthRank,
  deemphasizedTeams,
  hiddenTeams,
}: Props) {
  const [sort, setSort] = useState<(a: Team, b: Team) => number>(
    () => sorts.team.strength
  );
  const [isDesc, setIsDesc] = useBoolean(true);
  const sortedTeams = [...teams].sort(sort);
  if (isDesc) sortedTeams.reverse();

  const visibleSortedTeams = differenceBy(
    sortedTeams,
    hiddenTeams || [],
    (t) => t.id
  );

  const headers = [
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

  function selectTeam(team: Team) {
    if (!selectedTeams || !setSelectedTeams) return;
    let result = selectedTeams.filter((t) => t.id !== team.id);
    if (!(selectedTeams.length - result.length))
      result = selectedTeams.concat(team);
    setSelectedTeams(result);
  }

  function selectAll() {
    if (!setSelectedTeams) return;
    selectedTeams?.length
      ? setSelectedTeams([])
      : setSelectedTeams(visibleSortedTeams);
  }

  const sortedByStrength = [...teams].sort(sorts.team.strength).reverse();
  return (
    <TableContainer>
      <Table>
        <TableCaption placement={'top'}>
          Displaying {visibleSortedTeams.length} team
          {visibleSortedTeams.length === 1 ? '' : 's'}.
        </TableCaption>
        <Thead>
          <Tr>
            {setSelectedTeams && (
              <Th px={2}>
                <Checkbox
                  isChecked={
                    teams.length === selectedTeams?.length && teams.length > 0
                  }
                  isIndeterminate={
                    inRange(selectedTeams?.length || 0, 1, teams.length) &&
                    teams.length > 0
                  }
                  onChange={selectAll}
                />
              </Th>
            )}
            {headers.map((h, i) => (
              <Th
                key={i}
                cursor={'pointer'}
                onClick={
                  h.sort
                    ? () =>
                        updateSorting(h.sort, sort, setSort, isDesc, setIsDesc)
                    : undefined
                }
                userSelect={'none'}
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
          {visibleSortedTeams.map((team) => (
            <TeamRow
              key={team.id}
              number={
                showTeamsStrengthRank
                  ? sortedByStrength.findIndex((t) => t.id === team.id) + 1
                  : undefined
              }
              team={team}
              selectTeam={
                setSelectedTeams && selectedTeams ? selectTeam : undefined
              }
              isSelected={selectedTeams?.some((t) => t.id === team.id)}
              isDeemphasized={deemphasizedTeams?.some((t) => t.id === team.id)}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TeamsTable;
