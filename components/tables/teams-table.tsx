import Team from '@/shared/interfaces/team.interface';
import { teamSorts } from '@/utils/sorting';
import {
  Stack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import SelectSorting from '../misc/select-sorting';
import TeamRow from './team-row';

interface Props {
  teams: Team[];
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
  showTeamNumber?: boolean;
  allowSorting?: boolean;
}

function TeamsTable({
  teams,
  selectTeam,
  selectedTeams,
  showTeamNumber,
  allowSorting,
}: Props) {
  const [sorting, setSorting] = useState('lastAdded');
  const [isDesc, setIsDesc] = useState(true);

  const sortedTeams = [...teams].sort(teamSorts[sorting]);
  if (isDesc) sortedTeams.reverse();

  function table() {
    return (
      <TableContainer>
        <Table>
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
                STR
              </Th>
              <Th px={2} isNumeric>
                ATT
              </Th>
              <Th px={2} isNumeric>
                DEF
              </Th>
              <Th px={2} isNumeric>
                ADV
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
