import React, { useEffect } from 'react';
import { useState } from 'react';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { Modal, useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Button,
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // Drawer,
  useToast
} from '@chakra-ui/react';
import { AiFillCamera } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import UserAuthAPI from '../api/UserAuthAPI';
const UserProfile = () => {
  const { currentUser, isChangeProfile, setIsChangeProfile } =
    useUserAuthContext();
  const { onClose, isOpen, onOpen } = useDisclosure();

  const { data, isLoading, refetch } = useQuery('product', () =>
    UserAuthAPI.getUserProfile()
  );

  const toast = useToast();
  // console.log(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disable, setDisable] = useState(true);
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
    setValue('image', data?.info?.image);
  };

  const handleCancel = () => {
    initValueForm();
    setDisable(true);
  };

  useEffect(() => {
    initValueForm();
  }, [data]);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      userInfo: {
        name: data?.name,
        image: data?.image,
        email: data?.email
      }
    };
    if (currentUser?.is_seller === 2) {
      payload.sellerInfo = {
        address: data?.address,
        bank: data?.bank,
        credit_number: data?.credit_number,
        phone_number: data?.phone_number
      };
    }
    onClose();
    UserAuthAPI.getUserUpdateProfile(payload)
      .then((res) => {
        if (res.success) {
          toast({
            title: 'Update Success!',
            duration: 3000,
            status: 'success'
          });
          setDisable(true);
          refetch();
          setIsChangeProfile(!isChangeProfile);
        }
      })
      .catch(() => {
        toast({
          title: 'An unknown error occurred',
          duration: 3000,
          status: 'error'
        });
      });
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
            cursor="pointer"
            size="2xl"
            src={data?.info?.image}
            style={{
              position: 'relative'
            }}
            onClick={() => {
              onOpen();
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                bottom: '0',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <AiFillCamera
                style={{
                  // margin: 'auto',
                  width: '22px',
                  height: '22px'
                }}
              />
            </div>
          </Avatar>
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
              // disabled={true}
              readOnly
              {...register('email')}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as="form"
              flexDir="column"
              alignItems="flex-start"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <Input
                  placeholder="URL"
                  {...register('image', {
                    required: 'URL is required'
                  })}
                />
              </FormControl>
              {errors.image ? (
                <Text color="red" mt={1}>
                  {errors.image.message}
                </Text>
              ) : null}
              <Button
                margin="10px 20px "
                // onClick={onClose}
                type="submit"
                colorScheme="blue"
              >
                Edit
              </Button>
            </Flex>
          </ModalBody>
          {/* 
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              
            </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserProfile;
