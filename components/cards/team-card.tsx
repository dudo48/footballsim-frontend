import { useTeamActions, useTeams } from '@/services/teams-service';
import Team from '@/shared/interfaces/team.interface';
import { getStrength } from '@/shared/functions/team.functions';
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

interface Props {
  team?: Team;
  isHighlighted?: boolean;
  deletable?: boolean;
}

function TeamCard({ team, deletable, isHighlighted }: Props) {
  const { teams, mutate } = useTeams();

  const toast = useToast();
  const { deleteTeam } = useTeamActions();

  async function deleteTeamHandler() {
    if (!team) return;
    const result = await deleteTeam(team.id as number);
    if (!result.error) {
      toast({
        status: 'success',
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
      borderWidth={isHighlighted ? 4 : 1}
      borderColor={isHighlighted ? 'footballsim.200' : 'footballsim.500'}
      w={60}
    >
      <CardHeader p={2} textAlign={'center'}>
        <Text
          title={team && team.name}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          fontSize={'lg'}
        >
          {team ? team.name : '-'}
        </Text>
        <Center>
          <FaTshirt
            style={{ stroke: '#ffffff', strokeWidth: 4 }}
            fontSize={128}
            color={team ? team.color : '#888888'}
          />
        </Center>
        <Box>
          <Stat title="Strength: The mean of attack and defense">
            <StatLabel>STR</StatLabel>
            <StatNumber>{team ? getStrength(team).toFixed(1) : '-'}</StatNumber>
          </Stat>
        </Box>
      </CardHeader>
      <Divider />
      <CardBody p={2} textAlign={'center'}>
        <StatGroup>
          <Stat title="Attack">
            <StatLabel>ATT</StatLabel>
            <StatNumber>{team ? team.attack.toFixed(1) : '-'}</StatNumber>
          </Stat>
          <Stat title="Defense">
            <StatLabel>DEF</StatLabel>
            <StatNumber>{team ? team.defense.toFixed(1) : '-'}</StatNumber>
          </Stat>
          <Stat title="Home Advantage">
            <StatLabel>ADV</StatLabel>
            <StatNumber>
              {team ? team.homeAdvantage.toFixed(1) : '-'}
            </StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup></StatGroup>
      </CardBody>
      <Divider />
      <CardFooter>
        {team && deletable && (
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
