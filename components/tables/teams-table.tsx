import Team from '@/shared/interfaces/team.interface';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import TeamRow from './team-row';

interface Props {
  teams: Team[];
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
}

function TeamsTable({ teams, selectTeam, selectedTeams }: Props) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {selectTeam && <Th px={1}></Th>}
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
          {teams.map((team) => (
            <TeamRow
              key={team.id}
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

export default TeamsTable;
