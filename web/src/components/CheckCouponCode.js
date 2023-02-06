import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import ProductAPI from '../api/ProductAPI';
import { useForm } from 'react-hook-form';
const CheckCouponCode = ({ setCoupon }) => {
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm();
  const [error, setError] = useState('');
  const onSubmit = (data) => {
    if (!data.code) {
      setError('');
      setCoupon(null);
    } else {
      ProductAPI.userCheckCoupon(data.code)
        .then((res) => {
          if (res?.success) {
            setCoupon(res?.coupon);
            setError('');
          } else {
            setError('Mã không hợp lệ');
            setCoupon(null);
          }
        })
        .catch(() => {
          setError('Mã không hợp lệ');
          setCoupon(null);
        });
    }
  };
  return (
    <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Mã giảm giá</FormLabel>
        <Flex alignItems="flex-start">
          <div>
            <Input placeholder="Mã" {...register('code')} />
            <div
              style={{
                height: '20px',
                margin: '0 5px'
              }}
            >
              {error && (
                <Text fontSize="13px" color="red">
                  {error}
                </Text>
              )}
            </div>
          </div>
          <Button
            color="white"
            bg="primaryColor"
            _hover={{ bg: 'primaryColor' }}
            margin="0 10px"
            type="submit"
          >
            Kiểm tra
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default CheckCouponCode;
