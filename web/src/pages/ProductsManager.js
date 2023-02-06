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

export default function ProductsManager() {
  const [page, setPage] = useState(1);
  const [isOpenProductFormDrawer, setIsOpenProductFormDrawer] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isLoading, data, refetch } = useQuery(
    ['adminGetAllProducts', page],
    () => ProductAPI.adminGetAllProducts(page)
  );

  const toggleProductFormDrawer = useCallback(() => {
    setIsOpenProductFormDrawer((prev) => !prev);
  }, []);

  const handleClickEditProduct = useCallback(
    (product) => {
      setSelectedProduct(product);
      toggleProductFormDrawer();
    },
    [toggleProductFormDrawer]
  );
  // const handleClickAddProduct = () => {
  //   setSelectedProduct(null);
  //   toggleProductFormDrawer();
  // };
  return (
    <>
      <ProductFormDrawer
        isOpen={isOpenProductFormDrawer}
        onClose={toggleProductFormDrawer}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
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
                Danh sách sản phẩm
              </Text>
              {/* <IconButton
                icon={<HiPlus />}
                onClick={handleClickAddProduct}
              /> */}
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Ảnh</Th>
                  <Th>Tên</Th>
                  <Th>Giá</Th>
                  <Th>Mô tả</Th>
                  <Th>Số lượng</Th>
                  <Th>Trạng thái</Th>
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
                  {data?.data?.length > 0 &&
                    data.data.map((product, i) => (
                      <Tr key={`product-${i + 1}`}>
                        <Td>{product.id}</Td>
                        <Td>
                          <Image src={product.image} h="50px" />
                        </Td>
                        <Td>{product.name}</Td>
                        <Td>{product.price}</Td>
                        <Td>{product.description}</Td>
                        <Td>{product?.quantity}</Td>
                        <Td
                          style={{
                            color:
                              product.is_approve === 0
                                ? 'Red'
                                : product.is_approve === 1
                                ? '#E5951D'
                                : 'Green'
                          }}
                        >
                          {product.is_approve === 0
                            ? 'Từ chối'
                            : product.is_approve === 1
                            ? 'Đang chờ duyệt'
                            : 'Công khai'}
                        </Td>
                        <Td>
                          <IconButton
                            onClick={() =>
                              handleClickEditProduct(product)
                            }
                            icon={<AiFillEye />}
                          />
                        </Td>
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
