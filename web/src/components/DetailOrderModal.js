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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Detail of order #{selectedOrder?.id}
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
                          ${orderDetail.quantity * orderDetail.price}
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
                    Shipping fee
                  </Text>
                  <Text color="gray.500">$10</Text>
                </Flex>
                <Divider borderColor="gray.300" my={3} />
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="gray.500" fontSize="lg">
                    Total
                  </Text>
                  <Text color="gray.500">
                    ${selectedOrder?.total_price}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
