import { Select, Stack, Text } from '@chakra-ui/react';

interface Props {
  sorting: string;
  setSorting: (value: string) => void;
  isDescending: boolean;
  setIsDescending: (value: boolean) => void;
}

function SortTeams({
  sorting,
  setSorting,
  isDescending,
  setIsDescending,
}: Props) {
  return (
    <Stack direction={'row'} align={'center'}>
      <Text>Sort by</Text>
      <Select
        maxW={48}
        variant={'solid'}
        onChange={(event) => setSorting(event.target.value)}
        value={sorting}
      >
        <option value={'lastAdded'}>Last Added</option>
        <option value={'name'}>Name</option>
        <option value={'attack'}>Attack</option>
        <option value={'defense'}>Defense</option>
        <option value={'homeAdvantage'}>Home Advantage</option>
        <option value={'strength'}>Strength</option>
      </Select>
      <Select
        maxW={44}
        variant={'solid'}
        onChange={(event) => setIsDescending(event.target.value === 'desc')}
        value={isDescending ? 'desc' : 'asc'}
      >
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>Descending</option>
      </Select>
    </Stack>
  );
}

export default SortTeams;
