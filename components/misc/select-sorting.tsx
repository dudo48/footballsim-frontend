import { Select, Stack, Text } from '@chakra-ui/react';
import { startCase } from 'lodash';

interface Props {
  sorts: { [key: string]: (a: never, b: never) => number };
  sorting: string;
  setSorting: (value: string) => void;
  isDesc: boolean;
  setIsDesc: (value: boolean) => void;
}

function SelectSorting({
  sorts,
  sorting,
  setSorting,
  isDesc,
  setIsDesc,
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
        {Object.entries(sorts).map((p) => (
          <option key={p[0]} value={p[0]}>
            {startCase(p[0])}
          </option>
        ))}
      </Select>
      <Select
        maxW={44}
        variant={'solid'}
        onChange={(event) => setIsDesc(event.target.value === 'desc')}
        value={isDesc ? 'desc' : 'asc'}
      >
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>Descending</option>
      </Select>
    </Stack>
  );
}

export default SelectSorting;
