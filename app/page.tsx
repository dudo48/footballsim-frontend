'use client';
import { Container, Heading, Text } from '@chakra-ui/react';

function Page() {
  return (
    <>
      <Heading textAlign={'center'} mb={'6'}>
        What is this?
      </Heading>
      <Container maxW={'3xl'}>
        <Text>
          This is a football simulator where you can create teams, create
          matches between those teams and simulate these matches with results
          generated according to each team&apos;s strength.
        </Text>
      </Container>
    </>
  );
}

export default Page;
