import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlus
} from 'react-icons/hi';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
import ProductFormDrawer from '../components/ProductFormDrawer';
import UserAuthAPI from '../api/AdminAuthAPI';

export default function SellerRegister() {
  const [page, setPage] = useState(1);

  const [selectedShop, setSelectedShop] = useState(null);
  const toast = useToast();
  const { isLoading, data, refetch } = useQuery(
    ['getShopRegister', page],
    () => UserAuthAPI.getShopRegister()
  );

  const handleApproveShop = (status, shop) => {
    UserAuthAPI.adminApproveSeller({
      status,
      user_id: shop?.user_id
    })
      .then((res) => {
        toast({
          position: 'top',
          title: res.message,
          duration: 3000,
          status: 'success'
        });
        refetch();
      })
      .catch(() => {
        toast({
          position: 'top',
          title: 'Error',
          duration: 3000,
          status: 'error'
        });
      });
    // console.log(status, shop);
  };

  return (
    <>
      <Box
        paddingTop={8}
        paddingBottom={8}
        paddingInlineStart={8}
        paddingInlineEnd={8}
        marginInline="auto"
        marginTop="2rem"
        maxW="6xl"
        w="100%"
      >
        <Flex background="white" boxShadow="sm" borderRadius="lg">
          <TableContainer whiteSpace="unset" w="full">
            <Flex
              padding={3}
              justifyContent="space-between"
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Text fontWeight="600" fontSize="xl">
                Danh sách đăng ký bán hàng
              </Text>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Ảnh</Th>
                  <Th>Tên</Th>
                  <Th>Email</Th>
                  <Th>Số điện thoại</Th>
                  <Th>Địa chỉ</Th>
                  <Th>Ngân hàng</Th>
                  <Th>Số thẻ</Th>
                  <Th>Hành động</Th>
                </Tr>
              </Thead>
              {isLoading ? (
                <Tbody>
                  <Tr>
                    <Td>
                      <Spinner mt={2} ml={2} />
                    </Td>
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  {data?.listSellerRequests?.length > 0 &&
                    data?.listSellerRequests?.map((shop, i) => (
                      <Tr key={i}>
                        <Td>
                          <Image
                            src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-56.jpg"
                            h="50px"
                          />
                        </Td>
                        <Td>{shop.user_name}</Td>
                        <Td>{shop.user_email}</Td>
                        <Td>{shop.phone_number}</Td>
                        <Td>{shop.address}</Td>
                        <Td>{shop.bank}</Td>
                        <Td
                          style={{
                            width: '50px'
                          }}
                        >
                          {shop.credit_number}
                        </Td>
                        <Td>
                          <Flex justifyContent="space-between">
                            <div
                              onClick={() =>
                                handleApproveShop(2, shop)
                              }
                            >
                              <AiFillCheckCircle
                                color="green"
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '25px'
                                }}
                              />
                            </div>
                            <div
                              onClick={() =>
                                handleApproveShop(0, shop)
                              }
                            >
                              <AiFillCloseCircle
                                color="red"
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '25px'
                                }}
                              />
                            </div>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              )}
            </Table>
            {!isLoading && data?.listSellerRequests?.length === 0 ? (
              <Box textAlign="center" p="20px	100px" color="gray.800">
                Chưa có yêu cầu
              </Box>
            ) : (
              <Flex justifyContent="space-between" px={6} py={2}>
                <Button
                  leftIcon={<HiChevronLeft />}
                  onClick={() =>
                    setPage((old) => Math.max(old - 1, 0))
                  }
                  isDisabled={!data?.prev_page_url}
                >
                  Trước
                </Button>
                <Button
                  rightIcon={<HiChevronRight />}
                  onClick={() => setPage((old) => old + 1)}
                  isDisabled={!data?.next_page_url}
                >
                  Sau
                </Button>
              </Flex>
            )}
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
