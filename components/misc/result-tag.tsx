import MatchResult from '@/interfaces/matchResult.interface';
import { isDraw, isWin } from '@/utils/functions';
import { Tag } from '@chakra-ui/react';

interface Props {
  result: MatchResult;
}

function ResultTag({ result }: Props) {
  const value = isWin(result) ? 'W' : isDraw(result) ? 'D' : 'L';
  const bg = isWin(result)
    ? 'green.600'
    : isDraw(result)
    ? 'yellow.500'
    : 'red.600';
  return (
    <Tag
      color={'white'}
      fontFamily={'monospace'}
      fontSize={18}
      variant={'solid'}
      bg={bg}
    >
      {value}
    </Tag>
  );
}

export default ResultTag;
