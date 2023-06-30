import { getStrength } from '@/shared/functions/team.functions';
import Team from '@/shared/interfaces/team.interface';
import { Box, Checkbox, Td, Tr } from '@chakra-ui/react';
import TeamLi from '../misc/team-li';

interface Props {
  team: Team;
  selectTeam?: (team: Team) => void;
  isSelected?: boolean;
  number?: number;
  isDeemphasized?: boolean;
}

function TeamRow({
  team,
  selectTeam,
  isSelected,
  number,
  isDeemphasized,
}: Props) {
  const deemphasizedOpacity = 0.25;
  return (
    <Tr>
      {selectTeam && (
        <Td px={2}>
          <Checkbox onChange={() => selectTeam(team)} isChecked={isSelected} />
        </Td>
      )}
      {number && (
        <Td color={'footballsim.200'} fontSize={'sm'} isNumeric px={2}>
          {number}
        </Td>
      )}
      <Td px={4}>
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
