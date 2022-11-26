import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  useToast
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import OrderAPI from '../api/OrderAPI';

export default function ChangeOrderStatusPopover({
  selectedOrder,
  refetch
}) {
  const [status, setStatus] = useState(selectedOrder.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const toast = useToast();
  const handleChangeStatus = useCallback((e) => {
    setStatus(e.target.value);
  }, []);

  const handleUpdateStatus = useCallback(() => {
    setIsUpdating(true);
    let data = {};
    data.id = selectedOrder.id;
    data.status = status;
    OrderAPI.adminChangeOrderStatus(data)
      .then((response) => {
        setIsUpdating(false);
        if (response.success) {
          toast({
            title: response.message,
            duration: 3000,
            status: 'success'
          });
        }
        refetch();
      })
      .catch(() => {
        setIsUpdating(false);
        toast({
          title: 'An unknown error occurred',
          duration: 3000,
          status: 'error'
        });
      });
  }, [refetch, selectedOrder.id, status, toast]);

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton onClick={() => {}} icon={<HiOutlineRefresh />} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="200px">
          <PopoverArrow />
          <PopoverHeader>Change status</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Select onChange={handleChangeStatus} value={status}>
              <option value={1}>New</option>
              <option value={2}>Processing</option>
              <option value={3}>Completed</option>
            </Select>
          </PopoverBody>
          <PopoverFooter>
            <Flex justifyContent="flex-end">
              <Button
                onClick={handleUpdateStatus}
                isLoading={isUpdating}
              >
                Update
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
