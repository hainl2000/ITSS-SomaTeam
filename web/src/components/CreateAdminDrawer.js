import React, { useCallback, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import UserAuthAPI from '../api/AdminAuthAPI';

export default function CreateAdminDrawer({
  isOpen,
  onClose,

  refetch
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { currentAdmin age.getItem('role'));
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const handleCloseDrawer = useCallback(() => {
    // setIsSubmitting(false)

    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit = (data) => {
    // console.log(data);
    UserAuthAPI.registerAdmin(data)
      .then((res) => {
        toast({
          position: 'top',
          title: res.message,
          duration: 3000,
          status: 'success'
        });
        refetch();
      })
      .catch(() => {
        toast({
          position: 'top',
          title: 'Error',
          duration: 3000,
          status: 'error'
        });
      });
    reset();
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleCloseDrawer}
    >
      <DrawerOverlay />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add new admin</DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Admin name"
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
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
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
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is a required field'
                  })}
                />
                {errors.password ? (
                  <Text color="red" mt={1}>
                    {errors.password.message}
                  </Text>
                ) : null}
              </FormControl>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={handleCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Box>
    </Drawer>
  );
}
