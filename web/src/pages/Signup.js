/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import UserAuthAPI from '../api/UserAuthAPI';

export default function Signup() {
  const history = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const toast = useToast();

  const onSubmit = useCallback(
    (data) => {
      setIsSubmitting(true);
      UserAuthAPI.register(data)
        .then((response) => {
          setIsSubmitting(false);
          if (response.success) {
            toast({
              title: response.message,
              description: 'Please log in to use',
              duration: 3000,
              status: 'success'
            });
            history('/login');
          } else {
            reset();
            toast({
              title: response.message,
              description: 'Please try again',
              duration: 3000,
              status: 'error'
            });
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          toast({
            title: 'An unknown error occurred',
            duration: 3000,
            status: 'error'
          });
        });
    },
    [history, reset, toast]
  );

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
      h="full"
    >
      <Stack spacing="8">
        <Stack spacing="6" textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" lineHeight="1.2">
            Create a new account
          </Text>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({
            base: 'white'
          })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark')
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('name', {
                    required: 'Name is a required field'
                  })}
                />
                {errors.name ? (
                  <Text color="red" mt={1}>
                    {errors.name.message}
                  </Text>
                ) : null}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'Email is a required field'
                  })}
                />
                {errors.email ? (
                  <Text color="red" mt={1}>
                    {errors.email.message}
                  </Text>
                ) : null}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    ref={inputRef}
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is a required field'
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password ? (
                  <Text color="red" mt={1}>
                    {errors.password.message}
                  </Text>
                ) : null}
              </FormControl>
            </Stack>

            <Stack spacing="6">
              <Button
                type="submit"
                colorScheme="blue"
                bg="primaryColor"
                _hover={{ bg: 'primaryColor' }}
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
              <HStack justify="center">
                <Text color="muted">Already have an account?</Text>
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => history('/login')}
                  color="primaryColor"
                >
                  Log in
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
