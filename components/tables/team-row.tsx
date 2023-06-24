import { getStrength } from '@/shared/functions/team.functions';
import Team from '@/shared/interfaces/team.interface';
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  team: Team;
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
  number?: number;
}

function TeamRow({ team, selectTeam, selectedTeams, number }: Props) {
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
      {number && (
        <Td
          color={'footballsim.200'}
          fontStyle={'italic'}
          fontSize={'sm'}
          isNumeric
          px={2}
        >
          {number}
        </Td>
      )}
      <Td px={4}>
        <TeamLi team={team} />
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
      <Td px={2} isNumeric>
        {getStrength(team).toFixed(1)}
      </Td>
    </Tr>
  );
}

export default TeamRow;
