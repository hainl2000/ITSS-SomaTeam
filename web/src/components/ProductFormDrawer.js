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
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { useAdminAuthContext } from '../contexts/AdminAuthContext';
import { useQuery } from 'react-query';
// import ProductAPI from '../api/ProductAPI';
export default function ProductFormDrawer({
  isOpen,
  onClose,
  selectedProduct,
  option,
  refetch
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: category } = useQuery('catygory', () =>
    ProductAPI.getAllCategories()
  );
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const handleCloseDrawer = () => {
    // setIsSubmitting(false)

    reset();
    onClose();
  };

  const handleRejectProduct = () => {
    // setIsSubmitting(true);
    const payload = {
      product_id: selectedProduct.id,
      status: 0
    };
    ProductAPI.adminAproveProduct(payload)
      .then((response) => {
        // setIsSubmitting(false);
        toast({
          title: response.message,
          duration: 3000,
          status: response.success ? 'success' : 'error'
        });
        refetch();
        handleCloseDrawer();
        // if (response.success) {
        // }
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

  const checkIsAdmin = () => {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;
  };

  const onSubmit = (data) => {
    if (localStorage.getItem('role') === 'user') {
      if (!selectedProduct) {
        setIsSubmitting(true);
        ProductAPI.userAddProduct(data)
          .then((response) => {
            setIsSubmitting(false);
            toast({
              title: response.message,
              duration: 3000,
              status: response.success ? 'success' : 'error'
            });
            refetch();
            if (response.success) {
              handleCloseDrawer();
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
      } else {
        setIsSubmitting(true);
        data.id = selectedProduct.id;
        ProductAPI.updateProduct(data)
          .then((response) => {
            setIsSubmitting(false);
            toast({
              title: response.message,
              duration: 3000,
              status: response.success ? 'success' : 'error'
            });
            handleCloseDrawer();
            refetch();
            // if (response.success) {
            // }
          })
          .catch(() => {
            setIsSubmitting(false);
            toast({
              title: 'An unknown error occurred',
              duration: 3000,
              status: 'error'
            });
          });
      }
    } else {
      setIsSubmitting(true);
      const payload = {
        product_id: selectedProduct.id,
        status: 2
      };
      ProductAPI.adminAproveProduct(payload)
        .then((response) => {
          setIsSubmitting(false);
          toast({
            title: response.message,
            duration: 3000,
            status: response.success ? 'success' : 'error'
          });
          refetch();
          if (response.success) {
            handleCloseDrawer();
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
    }
  };

  const initForm = () => {
    if (option === 'edit' || checkIsAdmin()) {
      if (selectedProduct) {
        setValue('name', selectedProduct.name);
        setValue('price', selectedProduct.price);
        setValue('description', selectedProduct.description);
        setValue('image', selectedProduct.image);
        setValue('quantity', selectedProduct.quantity);
        setValue('category', selectedProduct.category_id);
      }
    } else {
      // reset();
    }
  };

  useEffect(() => {
    // console.log(selectedProduct);
    initForm();
    // return () => {
    //   reset();
    // };
  });

  useEffect(() => {
    if (option === 'add') {
      reset();
    }
  }, [option]);

  // useEffect(() => {
  //   initForm();
  // });

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
          <DrawerHeader>
            {!selectedProduct && !checkIsAdmin()
              ? 'Add new product'
              : selectedProduct && !checkIsAdmin()
              ? 'Update Product'
              : 'Product Approval'}
          </DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl isReadOnly={checkIsAdmin()}>
                <FormLabel>Product name</FormLabel>
                <Input
                  placeholder="Product name"
                  {...register('name', {
                    required: 'Product name is a required field'
                  })}
                />
                {errors.name ? (
                  <Text color="red" mt={1}>
                    {errors.name.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl isReadOnly={checkIsAdmin()}>
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
              <FormControl isReadOnly={checkIsAdmin()}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  rows={3}
                  placeholder="Description"
                  {...register('description', {
                    required: 'Description is a required field'
                  })}
                />
                {errors.description ? (
                  <Text color="red" mt={1}>
                    {errors.description.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl isReadOnly={checkIsAdmin()}>
                <FormLabel>Image link</FormLabel>
                <Input
                  placeholder="Image link"
                  {...register('image', {
                    required: 'Image link is a required field'
                  })}
                />
                {errors.image ? (
                  <Text color="red" mt={1}>
                    {errors.image.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl isReadOnly={checkIsAdmin()}>
                <FormLabel>Quantity</FormLabel>
                <Input
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
              <FormControl isReadOnly={checkIsAdmin()}>
                <FormLabel>Category</FormLabel>
                <Select
                  // placeholder="Category"
                  defaultValue="1"
                  {...register('category', {
                    required: 'Category is a required field'
                  })}
                >
                  {category?.listCategories?.map((item) => (
                    <option key={item.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Select>
                {errors.quantity ? (
                  <Text color="red" mt={1}>
                    {errors.quantity.message}
                  </Text>
                ) : null}
              </FormControl>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={
                checkIsAdmin()
                  ? handleRejectProduct
                  : handleCloseDrawer
              }
            >
              {!checkIsAdmin() ? 'Cancel' : 'Reject'}
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              {selectedProduct &&
              localStorage.getItem('role') === 'user'
                ? 'Update'
                : selectedProduct &&
                  localStorage.getItem('role') === 'admin'
                ? 'Approve'
                : 'Add'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Box>
    </Drawer>
  );
}
