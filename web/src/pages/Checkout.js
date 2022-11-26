import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import OrderAPI from '../api/OrderAPI';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';

const SHIPPING_FEE = 10;

export default function Checkout() {
  const history = useNavigate();
  const toast = useToast();
  const { cart, getTotalAmount, resetCart } = useCartContext();
  const { currentUser } = useUserAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(
    (data) => {
      data.totalPrice = getTotalAmount() + SHIPPING_FEE;
      data.products = cart.products;
      setIsSubmitting(true);
      OrderAPI.createOrder(data)
        .then((response) => {
          resetCart();
          setIsSubmitting(false);
          toast({
            title: response.message,
            duration: 3000,
            status: 'success'
          });
          history('/');
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
    [cart.products, getTotalAmount, history, resetCart, toast]
  );

  return (
    <Flex
      justifyContent="space-between"
      p="30px 0"
      w="90%"
      m="0 auto"
      h="100vh"
    >
      <Flex
        pt="20px"
        w="60%"
        flexDir="column"
        borderRight="1px solid #e1e1e1"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text fontWeight="bold" fontSize="3xl">
          Checkout
        </Text>
        <Flex flexDir="column" pr={5} gap={5} mt={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={currentUser.name} isReadOnly isDisabled />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={currentUser.email} isReadOnly isDisabled />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Address"
              {...register('address', {
                required: 'Address is a required field'
              })}
            />
            {errors.address ? (
              <Text color="red" mt={1}>
                {errors.address.message}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>Phone number</FormLabel>
            <Input
              placeholder="Phone number"
              {...register('phoneNumber', {
                required: 'Phone number is a required field'
              })}
            />
            {errors.phoneNumber ? (
              <Text color="red" mt={1}>
                {errors.phoneNumber.message}
              </Text>
            ) : null}
          </FormControl>
        </Flex>
        <Flex justifyContent="space-between" pt={5} pr={5}>
          <Button
            leftIcon={<HiArrowSmLeft />}
            variant="link"
            onClick={() => history('/')}
          >
            Continue to shopping
          </Button>
          <Button
            isLoading={isSubmitting}
            type="submit"
            color="white"
            bg="primaryColor"
            _hover={{ bg: 'primaryColor' }}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      <Flex px={5} w="40%" bg="blackAlpha.50" flexDir="column">
        <Flex
          mt="60px"
          flexDir="column"
          w="full"
          gap={4}
          h="50%"
          overflowY="auto"
        >
          {cart.products.map(
            ({ image, name, id, quantity, price }) => (
              <Flex
                key={`product-${id}`}
                justifyContent="space-between"
                w="full"
              >
                <Flex gap={3}>
                  <Box width="20">
                    <Image maxW="full" h="auto" src={image} />
                  </Box>
                  <Box>
                    <Text
                      fontWeight={700}
                      maxW="10rem"
                      fontSize="sm"
                      wordBreak="break-word"
                    >
                      {name}
                    </Text>
                    <Text
                      maxW="10rem"
                      fontSize="sm"
                      wordBreak="break-word"
                    >
                      x{quantity}
                    </Text>
                  </Box>
                </Flex>
                <Text pl={1} pt={2} fontSize="md">
                  ${quantity * price}
                </Text>
              </Flex>
            )
          )}
        </Flex>
        <Divider borderColor="gray.300" my={3} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Subtotal
          </Text>
          <Text color="gray.500">${getTotalAmount()}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Shipping fee
          </Text>
          <Text color="gray.500">${SHIPPING_FEE}</Text>
        </Flex>
        <Divider borderColor="gray.300" my={3} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.500" fontSize="lg">
            Total
          </Text>
          <Text color="gray.500">
            ${getTotalAmount() + SHIPPING_FEE}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
