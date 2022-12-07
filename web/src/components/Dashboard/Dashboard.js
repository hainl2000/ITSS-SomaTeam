import React from 'react';
import Products from '../Products';
import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useUserAuthContext } from '../../contexts/UserAuthContext';
import { useCartContext } from '../../contexts/CartContext';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
// import ProductAPI from '../api/ProductAPI';
import ProductAPI from '../../api/ProductAPI';
// import { useWebContext } from '../../contexts/WebContext';
import { useWebContext } from '../../contexts/WebContext';
import './index.css';
import { useState } from 'react';

const mockdata = [
  {
    src: 'https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn',
    title: 'Thời trang nam'
  },
  {
    src: 'https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn',
    title: 'Điện thoại và phụ kiện'
  },
  {
    src: 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn',
    title: 'Thiết bị điện tử'
  },
  {
    src: 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn',
    title: 'Máy tính và lap top'
  },
  {
    src: 'https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn',
    title: 'Máy ảnh'
  },
  {
    src: 'https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c060e4d_tn',
    title: 'Thời trang nữ'
  },
  {
    src: 'https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn',
    title: 'Mẹ và bé'
  },
  {
    src: 'https://cf.shopee.vn/file/24b194a695ea59d384768b7b471d563f_tn',
    title: 'Nhà cửa và đời sống'
  },
  {
    src: 'https://cf.shopee.vn/file/ef1f336ecc6f97b790d5aae9916dcb72_tn',
    title: 'Sắc đẹp'
  },
  {
    src: 'https://cf.shopee.vn/file/49119e891a44fa135f5f6f5fd4cfc747_tn',
    title: 'Sức khỏe'
  }
];
const Dashboard = () => {
  const history = useNavigate();
  const { authenticated, redirectWhenNoAuth } = useUserAuthContext();
  const { addToCart, toggleCartOpen } = useCartContext();
  const { searchString } = useWebContext();

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('none');

  const { isLoading, data: products } = useQuery(
    ['products'],
    () => ProductAPI.getBestSeller(),
    { keepPreviousData: true }
  );
  console.log(products);
  const handleChangeSortType = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  const handleClickProduct = useCallback(
    (e, id) => {
      if (e.target.tagName !== 'BUTTON') {
        history(`product/${id}`);
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
    <div>
      <div className="content">
        <div className="title">
          <h1>Danh mục sản phẩm</h1>
        </div>
        <div className="category">
          {mockdata.map((item, index) => (
            <figure className="card">
              <img src={item.src} alt="cate" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="content">
        <div className="title2">
          <h1>Best Seller</h1>
          <Link to="/all-products">Xem thêm</Link>
        </div>
        <div className="best-seller">
          <Flex flexWrap="wrap" columnGap="28px" rowGap="28px">
            {products?.bestSellerItems?.map((product, i) => {
              const { id, name, price, image } = product[0];
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
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
