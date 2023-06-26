import { getStrength } from '@/shared/functions/team.functions';
import Team from '@/shared/interfaces/team.interface';
import { Box, Checkbox, Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  team: Team;
  selectTeam?: (team: Team) => void;
  selectedTeams?: Team[];
  number?: number;
  isDeemphasized?: boolean;
}

function TeamRow({
  team,
  selectTeam,
  selectedTeams,
  number,
  isDeemphasized,
}: Props) {
  const deemphasizedOpacity = 0.25;
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
          fontSize={'sm'}
          isNumeric
          px={2}
        >
          {number}
        </Td>
      )}
      <Td px={4} pl={2}>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          <TeamLi team={team} />
        </Box>
      </Td>
      <Td px={2} isNumeric>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          {team.attack.toFixed(1)}
        </Box>
      </Td>
      <Td px={2} isNumeric>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          {team.defense.toFixed(1)}
        </Box>
      </Td>
      <Td px={2} isNumeric>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          {team.homeAdvantage.toFixed(1)}
        </Box>
      </Td>
      <Td px={2} isNumeric>
        <Box opacity={isDeemphasized ? deemphasizedOpacity : 1}>
          {getStrength(team).toFixed(1)}
        </Box>
      </Td>
    </Tr>
  );
}

export default TeamRow;
