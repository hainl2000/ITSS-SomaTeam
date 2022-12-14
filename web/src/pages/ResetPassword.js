/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
// import { redirect } from 'react-router-dom';
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
import NotFound from '../components/NotFound';

export default function ResetPassword() {
  //   const { setCurrentUser } = useUserAuthContext();
  const history = useNavigate();
  const path = window.location.pathname;
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const toast = useToast();
  const [checkToken, setCheckToken] = useState(false);
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
  useEffect(() => {
    const x = path.split('/');
    UserAuthAPI.checkForgetPasswordToken(x[2])
      .then((res) => {
        setCheckToken(true);
      })
      .catch((err) => {
        console.log(err);
        setCheckToken(false);
        history('/login');
      });
  });
  const onSubmit = useCallback(
    (data) => {
      UserAuthAPI.userUpdatePassword(path.split('/')[2], data).then(
        (response) => {
          if (response.success) {
            toast({
              title: 'Success reset password',
              position: 'top',
              duration: 3000,
              status: 'success'
            });
            history('/');
            // redirect('/');
          } else {
            reset();
            toast({
              title: 'Error',
              position: 'top',
              description: response.message,
              duration: 5000,
              status: 'error'
            });
          }
        }
      );
    },
    [history, reset, toast]
  );

  return (
    <>
      {checkToken && (
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
              //   bg={useBreakpointValue({
              //     base: 'white'
              //   })}
              //   boxShadow={{
              //     base: 'none',
              //     sm: useColorModeValue('md', 'md-dark')
              //   }}
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="password">
                        Password
                      </FormLabel>
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
                            // onClick={onClickReveal}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      colorScheme="blue"
                      bg="primaryColor"
                      _hover={{ bg: 'primaryColor' }}
                    >
                      Reset Password
                    </Button>
                  </Stack>
                </Stack>
              </form>
              {/* <Link href="/login">Login</Link> */}
            </Box>
          </Stack>
        </Container>
      )}
    </>
  );
}
