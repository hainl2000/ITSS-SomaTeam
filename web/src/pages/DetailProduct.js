import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text
} from '@chakra-ui/react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
import { useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';

export default function DetailProduct() {
  const { id: productId } = useParams();
  const { authenticated, redirectWhenNoAuth } = useUserAuthContext();
  const { addToCart, toggleCartOpen } = useCartContext();

  const [quantity, setQuantity] = useState(1);

  const { isLoading, data: product } = useQuery('product', () =>
    ProductAPI.getSingleProduct(productId)
  );

  const handleChangeQuantity = useCallback((type) => {
    if (type === 'plus') {
      setQuantity((prev) => prev + 1);
      return;
    }

    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!authenticated) {
      redirectWhenNoAuth();
      return;
    }
    addToCart(product, quantity);
    toggleCartOpen();
  }, [
    addToCart,
    authenticated,
    product,
    quantity,
    redirectWhenNoAuth,
    toggleCartOpen
  ]);

  if (isLoading) {
    return (
      <Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner mt="10rem" />
      </Flex>
    );
  }

  if (product) {
    const { name, description, price, image } = product;
    return (
      <Box>
        <Box p="60px 5rem 0" maxW="70rem" m="0 auto">
          <Flex flexWrap="wrap" gap="28px">
            <Box
              display="grid"
              maxW="45%"
              w="calc(45% - 14px)"
              flexGrow={1}
              flexShrink={0}
            >
              <Box position="sticky" top="3rem" zIndex={2}>
                <Image src={image} borderRadius="xl" />
              </Box>
            </Box>
            <Box
              maxW="55%"
              w="calc(55% - 14px)"
              flexGrow={1}
              flexShrink={0}
            >
              <Box maxW="40rem">
                <Text fontWeight={700} fontSize="3xl" my={2}>
                  {name}
                </Text>
                <Text my={4}>${price}</Text>
                <Box my={4}>
                  <Text fontSize="xs">Quantity</Text>
                  <Box
                    mt={1}
                    border="1px solid rgb(14, 27, 77)"
                    w={24}
                    borderRadius="lg"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      p="5px 5px"
                    >
                      <IconButton
                        icon={<HiMinus />}
                        size="xs"
                        onClick={() => handleChangeQuantity('minus')}
                      />
                      <Text>{quantity}</Text>
                      <IconButton
                        icon={<HiPlus />}
                        size="xs"
                        onClick={() => handleChangeQuantity('plus')}
                      />
                    </Flex>
                  </Box>
                </Box>
                <Flex my={4} w="24rem">
                  <Button
                    w="full"
                    borderRadius="full"
                    variant="outline"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Flex>
                <Text>{description}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }
  return <NotFound message="Product not found" />;
}
