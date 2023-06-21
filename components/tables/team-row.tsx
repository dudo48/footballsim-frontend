import { getStrength } from '@/shared/functions/team.functions';
import Team from '@/shared/interfaces/team.interface';
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  team: Team;
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
}

function TeamRow({ team, selectTeam, selectedTeams }: Props) {
  return (
    <Tr>
      {selectTeam && selectedTeams && (
        <Td px={1}>
          <Checkbox
            isChecked={selectedTeams.some((t) => t.id === team.id)}
            onChange={() => selectTeam(team)}
          ></Checkbox>
        </Td>
      )}
      <Td px={4}>
        <TeamLi team={team} />
      </Td>
      <Td px={2} isNumeric>
        {getStrength(team).toFixed(1)}
      </Td>
      <Td px={2} isNumeric>
        {team.attack.toFixed(1)}
      </Td>
      <Td px={2} isNumeric>
        {team.defense.toFixed(1)}
      </Td>
      <Td px={2} isNumeric>
        {team.homeAdvantage.toFixed(1)}
      </Td>
    </Tr>
  );
}

export default TeamRow;
