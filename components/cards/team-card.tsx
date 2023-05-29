import Team from '@/interfaces/team.interface';
import { useTeamActions, useTeams } from '@/services/team-service';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  IconButton,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { FaTshirt } from 'react-icons/fa';
import { getStrength } from '../../utils/functions';

interface Props {
  team: Team;
  deletable?: boolean;
}

function TeamCard({ team, deletable }: Props) {
  const { teams, mutate } = useTeams();

  const toast = useToast();
  const { deleteTeam } = useTeamActions();

  async function deleteTeamHandler() {
    const result = await deleteTeam(team.id as number);
    if (!result.error) {
      toast({
        status: 'info',
        description: `Team '${team.name}' was deleted.`,
        duration: 1000,
      });
      mutate(teams.filter((t: Team) => t.id !== team.id));
    } else {
      toast({
        status: 'error',
        description: `Failed to delete team.`,
      });
    }
  }

  return (
    <Card
      boxShadow={'md'}
      p={1}
      bg={'footballsim.900'}
      size={'md'}
      border={'1px'}
      borderColor={'footballsim.500'}
      w={60}
    >
      <CardHeader>
        <Center>
          <Text
            title={team.name}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            fontSize={'lg'}
          >
            {team.name}
          </Text>
        </Center>
        <Center>
          <FaTshirt
            style={{ stroke: '#ffffff', strokeWidth: 4 }}
            fontSize={128}
            color={team.color}
          />
        </Center>
      </CardHeader>
      <Divider />
      <CardBody textAlign={'center'}>
        <StatGroup>
          <Stat title="The sum of attack and defense">
            <StatLabel>Strength</StatLabel>
            <StatNumber>{getStrength(team).toFixed(1)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Attack</StatLabel>
            <StatNumber>{team.attack.toFixed(1)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Defense</StatLabel>
            <StatNumber>{team.defense.toFixed(1)}</StatNumber>
          </Stat>
        </StatGroup>
        <Flex mt={2}>
          <Stat>
            <StatLabel>Home Advantage</StatLabel>
            <StatNumber>{team.homeAdvantage.toFixed(1)}</StatNumber>
          </Stat>
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter>
        {deletable && (
          <IconButton
            colorScheme={'red'}
            onClick={deleteTeamHandler}
            aria-label="delete button"
            icon={<BsTrash />}
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default TeamCard;
