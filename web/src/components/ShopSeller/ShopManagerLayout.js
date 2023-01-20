import React from 'react';

import { Flex } from '@chakra-ui/react';
import SideBarShop from '../SideBarShop';
import Advertise from './Advertise';
import ShopManager from './ShopManager';
import { useLocation } from 'react-router-dom';
import ShopDashboard from './ShopDashboard';
const ShopManagerLayout = () => {
  const location = useLocation();
  const onChangeTab = () => {
    switch (location.pathname) {
      case '/shop-seller/products':
        return <ShopManager />;
      case '/shop-seller/dashboard':
        return <ShopDashboard />;
      case '/shop-seller/advertise':
        return <Advertise />;
      default:
        return;
    }
  };
  return (
    <Flex flexWrap="nowrap" maxH="100vh" bg="gray.50">
      <SideBarShop />
      <Flex w="full" flexDir="column" overflowY="scroll">
        {onChangeTab()}
      </Flex>
    </Flex>
  );
};

export default ShopManagerLayout;
