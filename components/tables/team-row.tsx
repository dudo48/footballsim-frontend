import Team from '@/interfaces/team.interface';
import { getStrength } from '@/utils/functions';
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import { FaTshirt } from 'react-icons/fa';

interface Props {
  team: Team;
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
}

function TeamRow({ team, selectTeam, selectedTeams }: Props) {
  return (
    <Tr>
      {selectTeam && selectedTeams && (
        <Td>
          <Checkbox
            isChecked={selectedTeams.some((t) => t.id === team.id)}
            onChange={() => selectTeam(team)}
          ></Checkbox>
        </Td>
      )}
      <Td>
        <FaTshirt
          style={{ stroke: '#ffffff', strokeWidth: 8 }}
          fontSize={32}
          color={team.color}
        />
      </Td>
      <Td>{team.name}</Td>
      <Td isNumeric>{getStrength(team).toFixed(1)}</Td>
      <Td isNumeric>{team.attack.toFixed(1)}</Td>
      <Td isNumeric>{team.defense.toFixed(1)}</Td>
      <Td isNumeric>{team.homeAdvantage.toFixed(1)}</Td>
    </Tr>
  );
}

export default TeamRow;
