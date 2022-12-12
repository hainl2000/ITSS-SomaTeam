import React from 'react';

import { Flex } from '@chakra-ui/react';
import SideBarShop from '../SideBarShop';
import ShopManager from './ShopManager';
const ShopManagerLayout = () => {
  return (
    <Flex flexWrap="nowrap" maxH="100vh" bg="gray.50">
      <SideBarShop />
      <Flex w="full" flexDir="column" overflowY="scroll">
        <ShopManager />
      </Flex>
    </Flex>
  );
};

export default ShopManagerLayout;
