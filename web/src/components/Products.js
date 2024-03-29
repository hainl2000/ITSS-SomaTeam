import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ProductAPI from '../api/ProductAPI';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { useWebContext } from '../contexts/WebContext';

export default function Products() {
  const history = useNavigate();
  const { authenticated, redirectWhenNoAuth } = useUserAuthContext();
  const { addToCart, toggleCartOpen } = useCartContext();
  const { searchString } = useWebContext();
  // const { category: id } = useParams();
  const category = new URLSearchParams(window.location.search).get(
    'category'
  );
  const seller_id = new URLSearchParams(window.location.search).get(
    'seller_id'
  );
  // console.log(id, );
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('none');

  const { isLoading, data: products } = useQuery(
    ['products', sortType, searchString, page, category, seller_id],
    () =>
      ProductAPI.getAllProducts(
        sortType,
        searchString,
        page,
        category,
        seller_id
      ),
    { keepPreviousData: true }
  );

  const handleChangeSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  const handleClickProduct = useCallback(
    (e, id) => {
      if (e.target.tagName !== 'BUTTON') {
        history(`${id}`);
      }
    },
    [history]
  );

  const handleClickAddToCart = useCallback(
    (product) => {
      if (!authenticated) {
        redirectWhenNoAuth();
        return;
      }
      addToCart(product);
      toggleCartOpen();
    },
    [addToCart, authenticated, redirectWhenNoAuth, toggleCartOpen]
  );

  return (
    <Box p="60px 0">
      <Box maxW="70rem" m="0 auto" p="0 5rem">
        <Flex alignItems="center" gap={4}>
          <Text>Sắp xếp theo</Text>
          <Flex>
            <Select
              size="sm"
              placeholder="Mặc định"
              onChange={handleChangeSortType}
            >
              <option value="low-to-high">Giá thấp tới cao</option>
              <option value="high-to-low">Giá cao tới thấp</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      {isLoading ? (
        <Flex
          w="full"
          h="full"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner mt="10rem" />
        </Flex>
      ) : (
        <Box mt="30px">
          <Box maxW="70rem" m="0 auto" p="0 5rem">
            <Flex flexWrap="wrap" columnGap="28px" rowGap="28px">
              {products.data.map((product, i) => {
                const { id, name, price, image } = product;
                return (
                  <Box
                    cursor="pointer"
                    key={`product-${i + 1}`}
                    w="calc(25% - 28px * 3 / 4)"
                    maxW="calc(25% - 28px * 3 / 4)"
                    flexGrow={1}
                    flexShrink={0}
                    onClick={(e) => handleClickProduct(e, id)}
                  >
                    <Box h="full" position="relative">
                      <Flex
                        h="full"
                        flexDir="column"
                        border="1px solid rgb(14, 27, 77)"
                        borderRadius="2xl"
                        position="relative"
                      >
                        <Flex
                          w="full"
                          alignItems="stretch"
                          overflow="hidden"
                          position="relative"
                          height="200px"
                        >
                          <Box
                            overflow="hidden"
                            zIndex={0}
                            m="10px"
                            w="calc(100% - 2 * 10px)"
                            bottom={0}
                            top={0}
                            position="absolute"
                          >
                            <Box
                              w="full"
                              bottom={0}
                              position="absolute"
                              top={0}
                              overflow="hidden"
                            >
                              <Image
                                src={image}
                                objectFit="cover"
                                position="absolute"
                                top={0}
                                left={0}
                                h="full"
                                w="full"
                                maxW="full"
                              />
                            </Box>
                          </Box>
                        </Flex>
                        <Flex
                          w="full"
                          flexDir="column"
                          p="10px"
                          pt={0}
                          flexGrow={1}
                        >
                          <Flex pb={3} flexDir="column">
                            <Text fontWeight="bold">{name}</Text>
                            <Text>{price}VNĐ</Text>
                          </Flex>
                          <Button
                            onClick={() =>
                              handleClickAddToCart(product)
                            }
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
            {!isLoading && products?.data?.length === 0 ? (
              <Box textAlign="center" p="20px	100px" color="gray.800">
                No products yet
              </Box>
            ) : (
              <Flex justifyContent="center" py={4}>
                <Button
                  leftIcon={<HiChevronLeft />}
                  onClick={() =>
                    setPage((old) => Math.max(old - 1, 0))
                  }
                  isDisabled={!products?.prev_page_url}
                />

                {[...Array(products?.last_page).keys()].map(
                  (value, index) => {
                    value++;
                    return (
                      <Button
                        key={index}
                        marginLeft={2}
                        marginRight={2}
                        onClick={() => setPage(value)}
                        isDisabled={value === page}
                      >
                        {value}
                      </Button>
                    );
                  }
                )}
                <Button
                  rightIcon={<HiChevronRight />}
                  onClick={() => setPage((old) => old + 1)}
                  isDisabled={!products?.next_page_url}
                />
              </Flex>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
