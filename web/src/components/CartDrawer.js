import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

export default function CartDrawer({ isOpen, onClose, cart }) {
  const history = useNavigate();
  const { getTotalAmount } = useCartContext();

  const renderDrawerContent = useCallback(() => {
    if (cart?.products?.length > 0) {
      return (
        <>
          <DrawerHeader px={4}>Giỏ hàng</DrawerHeader>
          <DrawerBody px={4}>
            <Flex justifyContent="space-between">
              <Text
                textTransform="uppercase"
                color="gray.500"
                fontSize="xs"
              >
                Sản phẩm
              </Text>
              <Text
                textTransform="uppercase"
                color="gray.500"
                fontSize="xs"
              >
                Giá
              </Text>
            </Flex>
            <Divider />
            {cart.products.map((product, i) => (
              <CartItem
                product={product}
                key={`cart-item-${i + 1}`}
              />
            ))}
          </DrawerBody>
          <Box px={4}>
            <Divider />
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px={4}
            pt={2}
          >
            <Text
              textTransform="uppercase"
              color="gray.500"
              fontWeight={700}
              fontSize="sm"
            >
              Tổng giá
            </Text>
            <Text color="gray.500">${getTotalAmount()}VNĐ</Text>
          </Flex>
          <DrawerFooter px={4}>
            <Button
              w="full"
              color="white"
              bg="primaryColor"
              _hover={{ bg: 'primaryColor' }}
              onClick={() => {
                onClose();
                history('/checkout');
              }}
            >
              Thanh toán
            </Button>
          </DrawerFooter>
        </>
      );
    }

    return (
      <Flex alignItems="center" justifyContent="center" h="full">
        <Box textAlign="center">
          <Text fontWeight={700} fontSize="xl">
            Giỏ hàng rỗng
          </Text>
          <Button
            color="lightTextColor"
            bg="primaryColor"
            mt={3}
            _hover={{ bg: 'primaryColor' }}
            onClick={() => {
              history('/');
              onClose();
            }}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </Flex>
    );
  }, [cart.products, cart?.total, history, onClose, getTotalAmount]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {renderDrawerContent()}
      </DrawerContent>
    </Drawer>
  );
}
