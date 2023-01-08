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
import React, { useCallback, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePencilAlt,
  HiPlus
} from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useQuery } from 'react-query';
import ProductAPI from '../../api/ProductAPI';
import ProductFormDrawer from '../ProductFormDrawer';
// import ProductAPI from '../api/ProductAPI';
// import ProductFormDrawer from '../components/ProductFormDrawer';

export default function ShopManager() {
  const [page, setPage] = useState(1);
  const [isOpenProductFormDrawer, setIsOpenProductFormDrawer] =
    useState(false);
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [option, setOption] = useState('');
  const { isLoading, data, refetch } = useQuery(
    ['shopGetAllProducts', page],
    () => ProductAPI.shopGetAllProducts(page)
  );

  const toggleProductFormDrawer = () => {
    setIsOpenProductFormDrawer((prev) => !prev);
  };

  const handleClickEditProduct = (product) => {
    setSelectedProduct(product);
    setOption('edit');
    toggleProductFormDrawer();
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOption('add');
    toggleProductFormDrawer();
  };

  const handleClickDelete = (product) => {
    ProductAPI.userDeleteProduct({ product_id: product?.id })
      .then((res) => {
        if (res.success) {
          toast({
            title: 'Xóa thành công',
            status: 'success'
          });
          refetch();
        } else {
          toast({
            title: 'Có lỗi xảy ra',
            status: 'error'
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Có lỗi xảy ra',
          status: 'error'
        });
      });
  };

  return (
    <>
      <ProductFormDrawer
        isOpen={isOpenProductFormDrawer}
        onClose={toggleProductFormDrawer}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        refetch={refetch}
        option={option}
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
                Products
              </Text>
              <IconButton
                icon={<HiPlus />}
                onClick={handleAddProduct}
              />
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
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
                        <Td>{product?.categories?.name}</Td>
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
                            ? 'Rejected'
                            : product.is_approve === 1
                            ? 'Pending'
                            : 'Approved'}
                        </Td>

                        <Td>
                          <Flex
                            justifyContent="space-between"
                            width="100px"
                          >
                            <IconButton
                              onClick={() =>
                                handleClickEditProduct(product)
                              }
                              icon={<HiOutlinePencilAlt />}
                            />
                            <IconButton
                              onClick={() =>
                                handleClickDelete(product)
                              }
                              icon={<AiOutlineDelete color="red" />}
                            />
                          </Flex>
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
                  Previous
                </Button>
                <Button
                  rightIcon={<HiChevronRight />}
                  onClick={() => setPage((old) => old + 1)}
                  isDisabled={!data?.next_page_url}
                >
                  Next
                </Button>
              </Flex>
            )}
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
