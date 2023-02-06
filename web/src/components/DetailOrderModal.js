import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import React from 'react';

export default function DetailOrderModal({
  isOpen,
  onClose,
  selectedOrder
}) {
  let sum = 0;
  selectedOrder?.order_details?.forEach((element) => {
    sum += element?.price * element?.quantity;
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Chi tiết đơn hàng #{selectedOrder?.id}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex h="400px" justifyContent="flex-end">
            <Flex
              p={5}
              bg="blackAlpha.50"
              flexDir="column"
              h="full"
              w="full"
              justifyContent="space-between"
            >
              <Flex
                flexDir="column"
                w="full"
                gap={4}
                h="full"
                overflowY="auto"
              >
                {selectedOrder?.order_details.map(
                  (orderDetail, id) => {
                    const {
                      product: { image, name }
                    } = orderDetail;
                    return (
                      <Flex
                        key={`product-${id}`}
                        justifyContent="space-between"
                        w="full"
                      >
                        <Flex gap={3}>
                          <Box width="20">
                            <Image maxW="full" h="auto" src={image} />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={700}
                              maxW="10rem"
                              fontSize="sm"
                              wordBreak="break-word"
                            >
                              {name}
                            </Text>
                            <Text
                              maxW="10rem"
                              fontSize="sm"
                              wordBreak="break-word"
                            >
                              {orderDetail.price} x{' '}
                              {orderDetail.quantity}
                            </Text>
                          </Box>
                        </Flex>
                        <Text pl={1} pt={2} fontSize="md">
                          {orderDetail.quantity * orderDetail.price}VNĐ
                        </Text>
                      </Flex>
                    );
                  }
                )}
              </Flex>
              <Flex flexDir="column">
                <Divider borderColor="gray.300" my={3} />
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="gray.500" fontSize="sm">
                    Phí ship
                  </Text>
                  <Text color="gray.500">10VNĐ</Text>
                </Flex>
                <Divider borderColor="gray.300" my={3} />
                <Flex
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <div>
                    <Text color="gray.500" fontSize="lg">
                      Tổng
                    </Text>
                    {selectedOrder?.coupon_codes && (
                      <Text color="green" fontSize="14px">
                        {`Mã áp dụng: ${selectedOrder?.coupon_codes?.code}`}
                      </Text>
                    )}
                  </div>
                  <div>
                    {selectedOrder?.coupon_codes && (
                      <Text
                        color="gray.500"
                        textDecoration="line-through"
                      >
                        {`${sum + 10}VNĐ`}
                      </Text>
                    )}
                    <Text
                      color={
                        selectedOrder?.coupon_codes
                          ? 'green'
                          : 'gray.500'
                      }
                    >
                      {selectedOrder?.total_price}VNĐ
                    </Text>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
