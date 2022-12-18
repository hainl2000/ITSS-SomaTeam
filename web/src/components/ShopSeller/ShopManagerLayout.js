import React from 'react';

import { Flex } from '@chakra-ui/react';
import SideBarShop from '../SideBarShop';
import ShopManager from './ShopManager';
import { useLocation } from 'react-router-dom';
import ShopDashboard from './ShopDashboard';
const ShopManagerLayout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Flex flexWrap="nowrap" maxH="100vh" bg="gray.50">
      <SideBarShop />
      <Flex w="full" flexDir="column" overflowY="scroll">
        {location.pathname === '/shop-seller/products' ? (
          <ShopManager />
        ) : (
          <ShopDashboard />
        )}
      </Flex>
    </Flex>
  );
};

export default ShopManagerLayout;
