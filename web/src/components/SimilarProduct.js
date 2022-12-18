import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
// import './Dashboard/index.css';
import { useParams } from 'react-router-dom';

const SimilarProduct = () => {
  const { id: productId } = useParams();
  const history = useNavigate();
  const { data: similar } = useQuery('similar', () =>
    ProductAPI.getSimilarProducts(productId)
  );
  console.log(similar);
  // const handleClickProduct = (e, id) => {
  //   if (e.target.tagName !== 'BUTTON') {
  //     history(`../products/${id}`, {
  //       replace: true
  //     });
  //   }
  // };

  return (
    <Box
      w="70rem"
      p="30px 5rem"
      style={{
        margin: '30px 0',
        background: 'white',
        borderRadius: '12px'
      }}
    >
      <Flex justifyContent="space-between">
        <p
          style={{
            fontWeight: '600',
            fontSize: '20px'
            // margin: '0   20px'
          }}
        >
          Similar Products
        </p>
        <Link
          to={`/products?category=${
            similar ? similar[0]?.category_id : ''
          }`}
        >
          Xem thêm
        </Link>
      </Flex>
      <div>
        <Flex flexWrap="wrap" columnGap="28px" rowGap="28px">
          {similar?.map((product, i) => {
            const { id, name, price, image } = product;
            return (
              <Box
                cursor="pointer"
                key={`product-${i + 1}`}
                w="calc(25% - 28px * 3 / 4)"
                maxW="calc(25% - 28px * 3 / 4)"
                flexGrow={1}
                flexShrink={0}
                // onClick={(e) => handleClickProduct(e, id)}
              >
                <Box h="full" position="relative">
                  <a href={`/products/${id}`}>
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
                        height="300px"
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
                          <Text>${price}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </a>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </div>
    </Box>
  );
};

export default SimilarProduct;
