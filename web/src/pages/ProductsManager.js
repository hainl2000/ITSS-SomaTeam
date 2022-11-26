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
                Products
              </Text>
              <IconButton
                icon={<HiPlus />}
                onClick={toggleProductFormDrawer}
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
                        <Td>
                          <IconButton
                            onClick={() =>
                              handleClickEditProduct(product)
                            }
                            icon={<HiOutlinePencilAlt />}
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
