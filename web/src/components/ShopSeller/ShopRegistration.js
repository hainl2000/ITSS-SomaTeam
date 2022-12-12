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
// import OrderAPI from '../api/OrderAPI';
import OrderAPI from '../../api/OrderAPI';
import UserAuthAPI from '../../api/UserAuthAPI';
import { useCartContext } from '../../contexts/CartContext';
import { useUserAuthContext } from '../../contexts/UserAuthContext';
// import { useCartContext } from '../contexts/CartContext';
// import { useUserAuthContext } from '../contexts/UserAuthContext';

const SHIPPING_FEE = 10;

export default function ShopRegistration() {
  const history = useNavigate();
  // const his = His
  const toast = useToast();
  const { cart, getTotalAmount, resetCart } = useCartContext();
  const { currentUser } = useUserAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    UserAuthAPI.registerSeller(data)
      .then((response) => {
        setIsSubmitting(false);
        toast({
          position: 'top',
          title: response.message,
          duration: 3000,
          status: 'success'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })

      .catch(() => {
        setIsSubmitting(false);
        toast({
          title: 'An unknown error occurred',
          duration: 3000,
          status: 'error'
        });
      });
  };

  // data.totalPrice = getTotalAmount() + SHIPPING_FEE;
  // data.products = cart.products;
  // setIsSubmitting(true);
  // OrderAPI.createOrder(data)
  //   .then((response) => {
  //     resetCart();
  //     setIsSubmitting(false);
  //     toast({
  //       title: response.message,
  //       duration: 3000,
  //       status: 'success'
  //     });
  //     history('/');
  //   })
  //   .catch(() => {
  //     setIsSubmitting(false);
  //     toast({
  //       title: 'An unknown error occurred',
  //       duration: 3000,
  //       status: 'error'
  //     });
  //   });
  // },

  return (
    <Flex
      justifyContent="center"
      p="30px 0"
      w="90%"
      m="0 auto"
      h="100vh"
    >
      <Flex
        pt="20px"
        w="60%"
        flexDir="column"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text fontWeight="bold" fontSize="3xl">
          Shop Resgistration
        </Text>
        <Flex flexDir="column" pr={5} gap={5} mt={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="name"
              value={currentUser?.name}
              disabled
              // readOnly
              // {...register('name')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              value={currentUser?.email}
              disabled
              // readOnly
              // {...register('email')}
            />
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
              {...register('phone_number', {
                required: 'Phone number is a required field'
              })}
            />
            {errors.phone_number ? (
              <Text color="red" mt={1}>
                {errors.phone_number.message}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>Bank</FormLabel>
            <Input
              placeholder="Bank"
              {...register('bank', {
                required: 'Bank is a required field'
              })}
            />
            {errors.bank ? (
              <Text color="red" mt={1}>
                {errors.bank.message}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>Creadit Number</FormLabel>
            <Input
              placeholder="Credit number"
              {...register('credit_number', {
                required: 'Credit number is a required field'
              })}
            />
            {errors.credit_number ? (
              <Text color="red" mt={1}>
                {errors.credit_number.message}
              </Text>
            ) : null}
          </FormControl>
        </Flex>
        <Flex justifyContent="end" pt={5} pr={5}>
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
    </Flex>
  );
}
