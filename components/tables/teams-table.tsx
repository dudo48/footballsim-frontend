import Team from '@/interfaces/team.interface';
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
            {selectTeam && <Th></Th>}
            <Th>COLORS</Th>
            <Th>NAME</Th>
            <Th isNumeric>STRENGTH</Th>
            <Th isNumeric>ATTACK</Th>
            <Th isNumeric>DEFENSE</Th>
            <Th isNumeric>HOME ADVANTAGE</Th>
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
