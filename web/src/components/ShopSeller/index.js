import React from 'react';
import { useUserAuthContext } from '../../contexts/UserAuthContext';
import Pending from './Pending';

import ShopManagerLayout from './ShopManagerLayout';
import ShopRegistration from './ShopRegistration';
const ShopSeller = () => {
  const { currentUser } = useUserAuthContext();
  // console.log(currentUser);
  console.log(currentUser);
  const checkIsSeller = (user) => {
    switch (user?.is_seller) {
      case 0:
        return <ShopRegistration />;
      case 1:
        return <Pending />;
      case 2:
        return <ShopManagerLayout />;
      default:
        return <></>;
    }
  };
  return checkIsSeller(currentUser);
};

export default ShopSeller;
