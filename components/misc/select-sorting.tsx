/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Select } from '@chakra-ui/react';
import { startCase } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  sorts: Record<string, (a: any, b: any) => number>;
  sort: (a: any, b: any) => number;
  setSort: Dispatch<SetStateAction<(a: any, b: any) => number>>;
  isDesc: boolean;
  setIsDesc: Record<string, () => void>;
}

function SelectSorting({ sorts, sort, setSort, isDesc, setIsDesc }: Props) {
  return (
    <Flex gap={2} align={'center'}>
      <Select
        maxW={48}
        variant={'solid'}
        onChange={(event) => setSort(() => sorts[event.target.value])}
        value={
          (
            Object.entries(sorts).find((p) => p[1] === sort) as [
              string,
              (a: never, b: never) => number
            ]
          )[0]
        }
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
        onChange={() => setIsDesc.toggle()}
        value={isDesc ? 'desc' : 'asc'}
      >
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>Descending</option>
      </Select>
    </Flex>
  );
}

export default SelectSorting;
