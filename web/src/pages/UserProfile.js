import React, { useEffect } from 'react';
import { useState } from 'react';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import {
  Box,
  Button,
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  // Drawer,
  useToast
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import UserAuthAPI from '../api/UserAuthAPI';
const UserProfile = () => {
  const { currentUser } = useUserAuthContext();
  const { data, isLoading, refetch } = useQuery('product', () =>
    UserAuthAPI.getUserProfile()
  );
  // console.log(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isUpdateAvt, setIsUpdateAvt] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const initValueForm = () => {
    setValue('name', data?.info?.name);
    setValue('phone_number', data?.info?.sellerInfo?.phone_number);
    setValue('address', data?.info?.sellerInfo?.address);
    setValue('bank', data?.info?.sellerInfo?.bank);
    setValue('credit_number', data?.info?.sellerInfo?.credit_number);
  };

  const handleCancel = () => {
    initValueForm();
    setDisable(true);
  };

  useEffect(() => {
    initValueForm();
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex
      justifyContent="center"
      p="30px"
      w="90%"
      m="0 auto"
      // h="100vh"
    >
      <Flex
        pt="20px"
        w="60%"
        flexDir="column"
        pb="10"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex></Flex>
        <Flex justify="space-between">
          <Text fontWeight="bold" fontSize="3xl">
            Profile User
          </Text>
          <IconButton
            icon={<FaEdit />}
            onClick={() => setDisable(false)}
          />
        </Flex>
        <Flex justifyContent="center">
          <Avatar
            size="2xl"
            name="Christian Nwamba"
            src={data?.info?.image}
          />
        </Flex>
        <Flex flexDir="column" pr={5} gap={5} mt={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="name"
              // value={currentUser?.name}
              disabled={disable}
              // readOnly
              {...register('name')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              value={currentUser?.email}
              disabled={true}
              // readOnly
              // {...register('email')}
            />
          </FormControl>
        </Flex>
        {currentUser?.is_seller === 2 && (
          <Box>
            <Flex justify="space-between" margin={'30px 0'}>
              <Text fontWeight="bold" fontSize="3xl">
                Shop Seller
              </Text>
            </Flex>
            <Flex flexDir="column" pr={5} gap={5} mt={5}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
          </Box>
        )}
        {!disable && (
          <Flex justifyContent="end" pt={5} pr={5}>
            <Button
              disabled={disable}
              onClick={handleCancel}
              style={{
                margin: '0 30px'
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={disable}
              isLoading={isSubmitting}
              type="submit"
              color="white"
              bg="primaryColor"
              _hover={{ bg: 'primaryColor' }}
            >
              Submit
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default UserProfile;
