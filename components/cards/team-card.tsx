import Team from '@/interfaces/team.interface';
import { useTeamActions, useTeams } from '@/services/team-service';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
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
      <CardHeader p={2}>
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
        <Box textAlign={'center'}>
          <Stat title="Strength: The mean of attack and defense">
            <StatLabel>STR</StatLabel>
            <StatNumber>{getStrength(team).toFixed(1)}</StatNumber>
          </Stat>
        </Box>
      </CardHeader>
      <Divider />
      <CardBody p={2} textAlign={'center'}>
        <StatGroup>
          <Stat title="Attack">
            <StatLabel>ATT</StatLabel>
            <StatNumber>{team.attack.toFixed(1)}</StatNumber>
          </Stat>
          <Stat title="Defense">
            <StatLabel>DEF</StatLabel>
            <StatNumber>{team.defense.toFixed(1)}</StatNumber>
          </Stat>
          <Stat title="Home Advantage">
            <StatLabel>ADV</StatLabel>
            <StatNumber>{team.homeAdvantage.toFixed(1)}</StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup></StatGroup>
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
