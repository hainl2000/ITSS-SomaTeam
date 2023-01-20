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
  useToast,
  Textarea
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import UserAuthAPI from '../api/AdminAuthAPI';
export default function CreateNotiDrawer({
  isOpen,
  onClose,
  option,
  detail,
  refetch
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { currentAdmin age.getItem('role'));
  const [selectedUser, setSelectedUser] = useState([]);
  const toast = useToast();
  const { data } = useQuery(['adminGetListUsers'], () =>
    UserAuthAPI.adminGetListUsers()
  );
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
      //   setValue('name', detail?.name);
      //   setValue('price', detail?.price);
      //   setValue('time', detail?.time);
    } else {
      reset();
    }
  };

  useEffect(() => {
    fillDetail();
  }, [option, isOpen]);

  const onSubmit = (data) => {
    const payload = { ...data, emails: selectedUser };
    UserAuthAPI.sendNotification(payload).then((res) => {
      if (res.success) {
        toast({
          title: 'Thành công',
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
          <DrawerHeader>Add new Notification</DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel>Gửi đến</FormLabel>
                <Select
                  placeholder="Select option"
                  isMulti
                  name="sent"
                  options={data?.listUsers?.map((item) => {
                    return {
                      value: item.email,
                      label: item.name
                    };
                  })}
                  onChange={(val) =>
                    setSelectedUser(val.map((item) => item.value))
                  }
                  //   {...register('sent')}
                  //   {...register('sent', {
                  //     required: 'Email is a required field'
                  //   })}
                />

                {/* {errors.sent ? (
                  <Text color="red" mt={1}>
                    {errors.sent.message}
                  </Text>
                ) : null} */}
              </FormControl>

              <FormControl>
                <FormLabel>Nội dung</FormLabel>
                <Textarea
                  //   type="text"
                  rows={4}
                  placeholder="Content"
                  {...register('content', {
                    required: 'Content is a required field'
                  })}
                />
                {errors.content ? (
                  <Text color="red" mt={1}>
                    {errors.content.message}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>Thời gian gửi</FormLabel>
                <Input
                  type="datetime-local"
                  {...register('send_time', {
                    required: 'send_time is a required field'
                  })}
                />
                {errors.send_time ? (
                  <Text color="red" mt={1}>
                    {errors.send_time.message}
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
