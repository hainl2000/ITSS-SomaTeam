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

// import { AiFillEye } from 'react-icons/ai';
import { useQuery } from 'react-query';
import ProductAPI from '../api/ProductAPI';
import CreateAdsDrawer from '../components/CreateAdsDrawer';

export default function AdvertisingManager() {
  const [page, setPage] = useState(1);
  const [isOpenCreateAdsDrawer, setIsOpenCreateAdsDrawer] =
    useState(false);
  const [option, setOption] = useState('add');
  const [selectedAds, setSelectedAds] = useState(null);
  const toast = useToast();
  const allPackage = useQuery(['adminGetAllAds'], () =>
    ProductAPI.getAllAdvertise()
  );

  const toggleCreateAdsDrawer = useCallback(() => {
    setIsOpenCreateAdsDrawer((prev) => !prev);
  }, []);

  const handleClickCreateAds = () => {
    toggleCreateAdsDrawer();
    setOption('add');
  };
  const handleClickEditAds = (ads) => {
    setSelectedAds(ads);
    setOption('edit');
    toggleCreateAdsDrawer();
  };
  return (
    <>
      <CreateAdsDrawer
        isOpen={isOpenCreateAdsDrawer}
        onClose={handleClickCreateAds}
        detail={selectedAds}
        option={option}
        refetch={allPackage.refetch}
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
                Quản lý quảng cáo
              </Text>
              {/* <IconButton
                icon={<HiPlus />}
                onClick={handleClickCreateAds}
              /> */}
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tên gói</Th>
                  <Th>Giá</Th>
                  <Th>Thời gian</Th>
                  <Td>Hành động</Td>
                </Tr>
              </Thead>
              {allPackage.isLoading ? (
                <Tbody>
                  <Tr>
                    <Td>
                      <Spinner mt={2} ml={2} />
                    </Td>
                  </Tr>
                </Tbody>
              ) : (
                <Tbody>
                  {allPackage?.data?.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.time}</Td>
                      <Td>
                        {' '}
                        <IconButton
                          onClick={() => handleClickEditAds(item)}
                          icon={<HiOutlinePencilAlt />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
            {/* {!isLoading && data?.listUsers?.length === 0 ? (
              <Box textAlign="center" p="20px	100px" color="gray.800">
                No users yet
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
            )} */}
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
