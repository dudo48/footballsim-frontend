import { Button, Input, Stack } from '@chakra-ui/react';

function CreateTeamForm() {
  return (
    <form>
      <Stack>
        <Input placeholder="Team name" type="text" />
        <Input placeholder="Attack strength" type="number" />
        <Input placeholder="Defense strength" type="number" />
        <Input placeholder="Home advantage" type="number" />
        <Input placeholder="Team color" type="color" />
        <Button type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateTeamForm;
