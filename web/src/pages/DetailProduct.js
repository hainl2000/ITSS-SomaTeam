import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  Input
} from '@chakra-ui/react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import Comments from '../components/Comments';
import SimilarProduct from '../components/SimilarProduct';
export default function DetailProduct() {
  const { id: productId } = useParams();
  const { authenticated, redirectWhenNoAuth } = useUserAuthContext();
  const { addToCart, toggleCartOpen } = useCartContext();

  const [quantityOrder, setQuantityOrder] = useState(1);

  const { isLoading, data: product } = useQuery('product', () =>
    ProductAPI.getSingleProduct(productId)
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleChangeQuantity = (type) => {
    if (type === 'plus') {
      if (quantityOrder < product?.quantity) {
        setQuantityOrder((prev) => prev + 1);
      }
      return;
    }

    setQuantityOrder((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  // useEffect(() => {
  //   console.log(quantityOrder, 'quantity');
  // }, [quantityOrder]);

  const handleAddToCart = useCallback(() => {
    if (!authenticated) {
      redirectWhenNoAuth();
      return;
    }
    addToCart(product, quantityOrder);
    toggleCartOpen();
  }, [
    addToCart,
    authenticated,
    product,
    quantityOrder,
    redirectWhenNoAuth,
    toggleCartOpen
  ]);
  const mockData = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99Rsp3koHF7EywrLN6E1xvJcRK48uQjfyXBoOWUs&s',
      cmt: 'Sản phẩm đẹp, dùng rất OK',
      time: '12:53 11/27/2022',
      name: 'Luong Hai'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99Rsp3koHF7EywrLN6E1xvJcRK48uQjfyXBoOWUs&s',
      cmt: 'Sản phẩm đẹp, dùng rất OK',
      time: '12:53 11/27/2022',
      name: 'Luong Hai'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99Rsp3koHF7EywrLN6E1xvJcRK48uQjfyXBoOWUs&s',
      cmt: 'Sản phẩm đẹp, dùng rất OK',
      time: '12:53 11/27/2022',
      name: 'Luong Hai'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99Rsp3koHF7EywrLN6E1xvJcRK48uQjfyXBoOWUs&s',
      cmt: 'Sản phẩm đẹp, dùng rất OK',
      time: '12:53 11/27/2022',
      name: 'Luong Hai'
    }
  ];
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
    const { name, description, price, image, quantity, categories } =
      product;
    return (
      <Flex alignItems="center" flexDirection="column">
        <Box
          w="70rem"
          p="30px 5rem"
          style={{
            margin: '30px 0',
            background: 'white',
            borderRadius: '12px'
          }}
        >
          <Flex
            style={{
              marginBottom: '20px'
            }}
            alignItems="center"
          >
            <div>
              <img
                alt="avt"
                style={{
                  borderRadius: '50px',
                  minWidth: '40px',
                  minHeight: '40px'
                  // objectFit: 'fill'
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh55CCvqcNxzNaCmfMlXhMwQj5MFv51qe8KtLqqBgYTA&s"
              />
            </div>
            <p
              style={{
                fontWeight: '600',
                fontSize: '20px',
                margin: '0   20px'
              }}
            >
              Hanamaplus Shop
            </p>
          </Flex>
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
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontWeight={700} fontSize="3xl" my={2}>
                    {name}
                  </Text>
                </Flex>
                <Text my={4} fontWeight={600} fontSize="20px">
                  ${price}
                </Text>
                <Box my={4}>
                  <Text fontSize="xs">Quantity</Text>
                  <Flex
                    alignItems="center"
                    // justifyContent="space-between"
                  >
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
                          onClick={() =>
                            handleChangeQuantity('minus')
                          }
                        />
                        <Text>{quantityOrder}</Text>
                        <IconButton
                          icon={<HiPlus />}
                          size="xs"
                          onClick={() => handleChangeQuantity('plus')}
                        />
                      </Flex>
                    </Box>
                    <Text
                      margin="0 30px"
                      color="red"
                    >{`${quantity} available`}</Text>
                  </Flex>
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
                <div
                  style={{
                    margin: '20px 0'
                  }}
                >
                  <Text fontWeight={600}>{`Danh mục: `}</Text>
                  <a
                    style={{
                      color: '#4169E1'
                    }}
                    href={`/products?category=${categories?.id}`}
                  >
                    {categories?.name}
                  </a>
                </div>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Comments data={mockData} />
        <SimilarProduct data={[]} />
      </Flex>
    );
  }
  return <NotFound message="Product not found" />;
}
