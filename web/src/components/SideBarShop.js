/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text
} from '@chakra-ui/react';
import {
  HiOutlineLogout,
  HiOutlineShoppingCart,
  HiOutlineCube
} from 'react-icons/hi';

import {
  Link as NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

const siderBarItems = [
  {
    title: 'Dashboard',
    url: '/shop-seller/dashboard',
    icon: HiOutlineCube
  },
  {
    title: 'Products',
    url: '/shop-seller/products',
    icon: HiOutlineCube
  }
];

export default function SideBarShop() {
  const location = useLocation();

  //   const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Flex
      width="sm"
      pb={8}
      pt={8}
      paddingInlineStart={6}
      paddingInlineEnd={6}
      bg="rgb(176,196,222)"
      color="white"
      height="100vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex flexDir="column" width="full">
        <Box
          mt={6}
          marginInline={0}
          mb={0}
          display="inline-block"
          flex="0 0 auto"
        >
          <Flex flexDir="column">
            {siderBarItems.map((item, i) => (
              <Link
                as={NavLink}
                key={`sidebaritem-${i + 1}`}
                display="inline-flex"
                appearance="none"
                alignItems="center"
                justifyContent="start"
                whiteSpace="nowrap"
                verticalAlign="middle"
                borderRadius="lg"
                minW={10}
                h={10}
                transitionProperty="common"
                transitionDuration="normal"
                fontWeight="medium"
                color="lightTextColor"
                to={item.url}
                _hover={{
                  textDecoration: 'none',
                  background: 'lightTextColor',
                  color: 'primaryColor'
                }}
                mt={1}
                marginInline={0}
                mb={0}
                paddingInlineStart={4}
                paddingInlineEnd={4}
                {...(location.pathname === item.url
                  ? { bg: 'lightTextColor', color: 'primaryColor' }
                  : {})}
              >
                <Flex alignItems="center" gap={2}>
                  <Icon as={item.icon} w={6} h={6} />
                  <Text fontSize="1.1rem">{item.title}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
