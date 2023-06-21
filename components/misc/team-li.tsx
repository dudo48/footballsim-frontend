import Team from '@/shared/interfaces/team.interface';
import { Flex, Text } from '@chakra-ui/react';
import { FaTshirt } from 'react-icons/fa';

interface Props {
  team: Team;
  isHighlighted?: boolean;
  isDeemphasized?: boolean;
}

function TeamLi({ team, isHighlighted, isDeemphasized }: Props) {
  return (
    <Flex gap={2} align={'center'}>
      <FaTshirt
        style={{ stroke: '#ffffff', strokeWidth: 8 }}
        fontSize={28}
        color={team.color}
      />
      <Text
        title={team.name}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
        fontWeight={isHighlighted ? 'bold' : 'normal'}
        opacity={isDeemphasized ? 0.25 : 1}
      >
        {team.name}
      </Text>
    </Flex>
  );
}

export default TeamLi;
