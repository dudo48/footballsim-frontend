'use client';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

function Page() {
  return (
    <Box w={'full'}>
      <Heading size={'lg'} textAlign={'center'} mb={'6'}>
        What is this?
      </Heading>
      <Container maxW={'3xl'}>
        <Text>
          This is a football simulator where you can create teams, create
          matches between those teams and simulate these matches with results
          generated according to each team&apos;s strength.
        </Text>
      </Container>
    </Box>
  );
}

export default Page;
