import {
  // Box,
  Button,
  //   Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProductAPI from '../../api/ProductAPI';
export default function RegisterPackageModal({
  isOpen,
  onClose,
  packageDetail
}) {
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      advertise_id: packageDetail?.id,
      bank: data.bank,
      credit_number: data.credit_number
    };
    // console.log(payload);
    ProductAPI.registerPakage(payload)
      .then((response) => {
        setIsSubmitting(false);
        toast({
          position: 'top',
          title: 'Đăng ký gói thành công',
          duration: 3000,
          status: 'success'
        });
        onClose();
        reset();
      })
      .catch(() => {
        setIsSubmitting(false);
        toast({
          title: 'Thất bại',
          duration: 3000,
          status: 'error'
        });
        onClose();
        reset();
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register Advertise</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            pt="20px"
            // w="60%"
            flexDir="column"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex flexDir="column" pr={5} gap={5} mt={5}>
              <FormControl>
                <FormLabel>Tên gói</FormLabel>
                <Input
                  placeholder="name"
                  value={packageDetail?.name}
                  disabled
                  // readOnly
                  // {...register('name')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ngân hàng</FormLabel>
                <Input
                  placeholder="Tên ngân hàng"
                  {...register('bank', {
                    required: 'Vui lòng nhập'
                  })}
                />
                {errors.bank ? (
                  <Text color="red" mt={1}>
                    {errors.bank.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Số tài khoản</FormLabel>
                <Input
                  placeholder="Số tài khoản"
                  {...register('credit_number', {
                    required: 'Vui lòng nhập'
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
