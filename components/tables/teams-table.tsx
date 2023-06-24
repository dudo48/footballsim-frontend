import { getStrength } from '@/shared/functions/team.functions';
import Team from '@/shared/interfaces/team.interface';
import { teamSorts } from '@/shared/misc/sorting';
import {
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { meanBy } from 'lodash';
import { useState } from 'react';
import SelectSorting from '../misc/select-sorting';
import TeamRow from './team-row';

interface Props {
  teams: Team[];
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
  showTeamNumber?: boolean;
  allowSorting?: boolean;
  showStrengthStats?: boolean;
}

function TeamsTable({
  teams,
  selectTeam,
  selectedTeams,
  showTeamNumber,
  allowSorting,
  showStrengthStats,
}: Props) {
  const [sorting, setSorting] = useState('strength');
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

  function table() {
    return (
      <TableContainer>
        <Table>
          {showStrengthStats && (
            <TableCaption placement="top">
              Mean strength:{' '}
              {(
                meanBy(selectedTeams ? selectedTeams : teams, getStrength) || 0
              ).toFixed(1)}
            </TableCaption>
          )}
          <Thead>
            <Tr>
              {selectTeam && <Th px={1}></Th>}
              {showTeamNumber && (
                <Th isNumeric px={2}>
                  NO
                </Th>
              )}
              <Th px={4}>Team</Th>
              <Th px={2} isNumeric>
                ATT
              </Th>
              <Th px={2} isNumeric>
                DEF
              </Th>
              <Th title="Home advantage" px={2} isNumeric>
                ADV
              </Th>
              <Th px={2} isNumeric>
                STR
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedTeams.map((team, i) => (
              <TeamRow
                key={team.id}
                number={showTeamNumber ? i + 1 : undefined}
                team={team}
                selectTeam={selectTeam}
                selectedTeams={selectedTeams}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  return allowSorting ? (
    <Stack>
      <SelectSorting
        sorts={teamSorts}
        sorting={sorting}
        setSorting={setSorting}
        isDesc={isDesc}
        setIsDesc={setIsDesc}
      />
      {table()}
    </Stack>
  ) : (
    table()
  );
}

export default TeamsTable;
