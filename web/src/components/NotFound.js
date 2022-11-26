/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ message = 'Not found' }) {
  const history = useNavigate();

  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      gap={5}
      py={5}
    >
      <Text fontSize="2xl" fontWeight="bold">
        {message}
      </Text>
      <Button
        colorScheme="blue"
        onClick={() => history('/')}
        bg="primaryColor"
        _hover={{ bg: 'primaryColor' }}
      >
        Go to Home
      </Button>
    </Flex>
  );
}
