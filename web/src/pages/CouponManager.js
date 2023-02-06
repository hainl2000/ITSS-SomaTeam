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
  Tr
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePencilAlt,
  HiPlus
} from 'react-icons/hi';
import { AiFillEye } from 'react-icons/ai';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
import ProductFormDrawer from '../components/ProductFormDrawer';
import CouponFormDrawer from '../components/CouponFormDrawer';
import UserAuthAPI from '../api/AdminAuthAPI';

export default function CouponManager() {
  const [page, setPage] = useState(1);
  const [isOpenCouponFormDrawer, setIsOpenCouponFormDrawer] =
    useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  const { isLoading, data, refetch } = useQuery(
    ['adminGetAllCoupon', page],
    () => UserAuthAPI.adminGetListCoupon(page)
  );

  const checkStatus = (start_date, end_date) => {
    const today = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (today < start) {
      return {
        stt: 'Sắp diễn ra',
        color: 'orange'
      };
    } else if (today > end) {
      return {
        stt: 'Hết hạn',
        color: 'red'
      };
    }
    return {
      stt: 'Đang diễn ra',
      color: 'green'
    };
  };
  const handleClickAddCoupon = useCallback(() => {
    setIsOpenCouponFormDrawer((prev) => !prev);
  }, []);

  return (
    <>
      <CouponFormDrawer
        isOpen={isOpenCouponFormDrawer}
        onClose={handleClickAddCoupon}
        refetch={refetch}
      />
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
              padding={6}
              justifyContent="space-between"
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Text fontWeight="600" fontSize="xl">
                Khuyến mãi
              </Text>
              <IconButton
                icon={<HiPlus />}
                onClick={handleClickAddCoupon}
              />
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Mã</Th>
                  <Th>Số lượng</Th>
                  <Th>Giảm giá</Th>
                  <Th>Mức giảm tối đa</Th>
                  <Th>Ngày bắt đầu</Th>
                  <Th>Ngày kết thúc</Th>
                  <Th>Trạng thái</Th>
                  <Th>Tạo bởi</Th>
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
                  {data?.length > 0 &&
                    data.map((cp, i) => (
                      <Tr key={`product-${i + 1}`}>
                        <Td>{cp?.id}</Td>
                        <Td>{cp?.code}</Td>
                        <Td>{cp?.quantity}</Td>
                        <Td>{cp?.sale}</Td>
                        <Td>{cp?.max_sale}</Td>
                        <Td>{cp?.start_date}</Td>
                        <Td>{cp?.end_date}</Td>
                        <Td
                          color={
                            checkStatus(cp?.start_date, cp?.end_date)
                              .color
                          }
                        >
                          {
                            checkStatus(cp?.start_date, cp?.end_date)
                              .stt
                          }
                        </Td>
                        <Td>{cp?.admin?.name}</Td>
                      </Tr>
                    ))}
                </Tbody>
              )}
            </Table>
            {!isLoading && data?.data?.length === 0 ? (
              <Box textAlign="center" p="20px	100px" color="gray.800">
                No products yet
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
