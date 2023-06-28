import Team from '@/shared/interfaces/team.interface';
import { teamSorts } from '@/shared/misc/sorting';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
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
  const [sorting, setSorting] = useState('strength');
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

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

  const headers = [
    ...(selectTeam ? [{ value: '', px: 2 }] : []),
    ...(showTeamsStrengthRank
      ? [
          {
            value: 'R',
            title: 'Rank according to strength',
            sorting: 'strength',
            px: 2,
            isNumeric: true,
          },
        ]
      : []),
    { value: 'TEAM', sorting: 'name', px: 4, isNumeric: false },
    { value: 'ATT', sorting: 'attack', px: 2, isNumeric: true },
    { value: 'DEF', sorting: 'defense', px: 2, isNumeric: true },
    { value: 'ADV', sorting: 'homeAdvantage', px: 2, isNumeric: true },
    { value: 'STR', sorting: 'strength', px: 2, isNumeric: true },
  ];

  const sortedByStrength = [...teams].sort(teamSorts['strength']).reverse();
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
                cursor={h.sorting ? 'pointer' : 'auto'}
                onClick={h.sorting ? () => updateSorting(h.sorting) : undefined}
                userSelect={h.sorting ? 'none' : 'auto'}
                textDecor={getSortingDecoration(h.sorting)}
                isNumeric={h.isNumeric}
                px={h.px}
                title={h?.title}
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
