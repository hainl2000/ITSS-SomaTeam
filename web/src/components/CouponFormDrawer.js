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
  Textarea,
  useToast,
  Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ProductAPI from '../api/ProductAPI';
import { useQuery } from 'react-query';
import UserAuthAPI from '../api/AdminAuthAPI';
// import ProductAPI from '../api/ProductAPI';
export default function CouponFormDrawer({
  isOpen,
  onClose,
  refetch
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const handleCloseDrawer = () => {
    // setIsSubmitting(false)

    reset();
    onClose();
  };

  const onSubmit = (data) => {
    UserAuthAPI.adminCreateCoupon(data)
      .then((res) => {
        toast({
          position: 'top',
          title: 'Created coupon',
          duration: 3000,
          status: 'success'
        });
        refetch();
        handleCloseDrawer();
      })
      .catch((err) => {
        // console.log(err);
        toast({
          position: 'top',
          title: 'Error',
          duration: 3000,
          status: 'error'
        });
      });
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
          <DrawerHeader>Add new Coupon</DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <Input
                  placeholder="code"
                  {...register('code', {
                    required: 'Code is a required field'
                  })}
                />
                {errors.code ? (
                  <Text color="red" mt={1}>
                    {errors.code.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  min={1}
                  type="number"
                  placeholder="Quantity"
                  {...register('quantity', {
                    required: 'Quantity is a required field'
                  })}
                />
                {errors.quantity ? (
                  <Text color="red" mt={1}>
                    {errors.quantity.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Discount</FormLabel>
                <Input
                  min={0}
                  max={100}
                  type="number"
                  placeholder="Discount (%)"
                  {...register('sale', {
                    required: 'Discount is a required field'
                  })}
                />
                {errors.sale ? (
                  <Text color="red" mt={1}>
                    {errors.sale.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Max discount</FormLabel>
                <Input
                  type="number"
                  placeholder="Max discount"
                  {...register('max_sale', {
                    required: 'Max discount is a required field'
                  })}
                />
                {errors.max_sale ? (
                  <Text color="red" mt={1}>
                    {errors.max_sale.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  //   min={new Date()}
                  max={watch('end_date')}
                  {...register('start_date', {
                    required: 'Start date is a required field'
                  })}
                />
                {errors.start_date ? (
                  <Text color="red" mt={1}>
                    {errors.start_date.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  min={watch('start_date')}
                  {...register('end_date', {
                    required: 'End date is a required field'
                  })}
                />
                {errors.end_date ? (
                  <Text color="red" mt={1}>
                    {errors.end_date.message}
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
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Box>
    </Drawer>
  );
}
