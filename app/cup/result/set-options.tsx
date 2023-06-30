import TeamsTable from '@/components/tables/teams-table';
import Cup from '@/shared/interfaces/cup.interface';
import { Box, Checkbox, Heading, Select, Stack, Text } from '@chakra-ui/react';
import { inRange } from 'lodash';

interface Props {
  cup: Cup;
}

function SetOptions({ cup }: Props) {
  return (
    <Box
      flex={1}
      p={2}
      borderWidth={1}
      borderColor={'footballsim.500'}
      rounded={'md'}
    >
      <Heading size={'md'}>Cup Options</Heading>
      <Stack p={4}>
        <>
          <Text>Number of seeds</Text>
          <Select isReadOnly value={cup.seeds}>
            <option value={cup.seeds}>{cup.seeds}</option>
          </Select>
        </>
        <Checkbox isReadOnly isChecked={cup.allowExtraTime}>
          Extra-time
        </Checkbox>
        {inRange(cup.hosts.length, 1, cup.teams.length) && (
          <>
            <Text>Host teams</Text>
            <TeamsTable
              teams={cup.hosts.length ? cup.hosts : []}
              showTeamsStrengthRank
            />
          </>
        )}
      </Stack>
    </Box>
  );
}

export default SetOptions;
