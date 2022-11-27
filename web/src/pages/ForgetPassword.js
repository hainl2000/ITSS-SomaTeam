/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef } from 'react';
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
  Link,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import UserAuthAPI from '../api/UserAuthAPI';
import { setUserToken } from '../utils/userAuth';
import { useUserAuthContext } from '../contexts/UserAuthContext';

export default function ForgetPassword() {
  const { setCurrentUser } = useUserAuthContext();
  const history = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  //   const onClickReveal = () => {
  //     onToggle();
  //     if (inputRef.current) {
  //       inputRef.current.focus({ preventScroll: true });
  //     }
  //   };

  const onSubmit = useCallback(
    (data) => {
      UserAuthAPI.forgetPassword(data).then((response) => {
        if (response.success) {
          //   setUserToken(response.token.user_access_token);
          //   setCurrentUser(response.user);
          toast({
            title: 'Send to mail',
            position: 'top',
            duration: 3000,
            status: 'success'
          });
          history('/login');
        } else {
          reset();
          toast({
            title: 'Invalid email',
            position: 'top',
            description: response.message,
            duration: 5000,
            status: 'error'
          });
        }
      });
    },
    [history, reset, setCurrentUser, toast]
  );

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
      h="full"
      color="primaryColor"
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing="2" textAlign="center">
            <Text
              fontSize="3xl"
              fontWeight="bold"
              lineHeight="1.2"
              color="primaryColor"
            >
              Forget Password
            </Text>
          </Stack>
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
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="5">
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
              </Stack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="blue"
                  bg="primaryColor"
                  _hover={{ bg: 'primaryColor' }}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
