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

export default function CreateAdsDrawer({
  isOpen,
  onClose,
  option,
  detail,
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

  const fillDetail = () => {
    if (option === 'edit') {
      setValue('name', detail?.name);
      setValue('price', detail?.price);
      setValue('time', detail?.time);
    } else {
      reset();
    }
  };

  useEffect(() => {
    fillDetail();
  }, [option, isOpen]);

  const onSubmit = (data) => {
    UserAuthAPI.adminUpdatePackage({
      ...data,
      advertise_id: detail?.id
    }).then((res) => {
      if (res.success) {
        toast({
          title: 'Chỉnh sửa gói thành công',
          status: 'success'
        });
        refetch();
      } else {
        toast({
          title: 'Có lỗi xảy ra',
          status: 'error'
        });
      }
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
          <DrawerHeader>Add new Advertising</DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Package name"
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
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  {...register('price', {
                    required: 'Price is a required field'
                  })}
                />
                {errors.price ? (
                  <Text color="red" mt={1}>
                    {errors.price.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input
                  type="number"
                  placeholder="Time (month)"
                  {...register('time', {
                    required: 'Time is a required field'
                  })}
                />
                {errors.time ? (
                  <Text color="red" mt={1}>
                    {errors.time.message}
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
