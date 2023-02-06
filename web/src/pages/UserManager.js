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
  // HiOutlinePencilAlt,
  HiPlus
} from 'react-icons/hi';
import { FaBan } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
// import { AiFillEye } from 'react-icons/ai';
import { useQuery } from 'react-query';
import UserAuthAPI from '../api/AdminAuthAPI';
import CreateAdminDrawer from '../components/CreateAdminDrawer';
import ProductAPI from '../api/ProductAPI';

export default function UserManager() {
  const [page, setPage] = useState(1);
  const [isOpenCreateAdminDrawer, setIsOpenCreateAdminDrawer] =
    useState(false);
  const toast = useToast();
  const { isLoading, data, refetch } = useQuery(
    ['adminGetListUsers', page],
    () => UserAuthAPI.adminGetListUsers(page)
  );

  const checkBanShop = (item) => {
    const current = new Date().getTime();
    const lastLogin = new Date(item?.last_login).getTime();
    // if (!item?.is_seller) return false;
    if (
      current - lastLogin > 86400000 * 30 &&
      item?.is_seller === 2
    ) {
      return true;
    }
    return false;
  };

  const handleBanShop = (id) => {
    ProductAPI.banShop({
      seller_id: id
    }).then((res) => {
      if (res.success) {
        toast({
          title: 'Đã khóa shop',
          status: 'success'
        });
        refetch();
      } else {
        toast({
          title: 'Có lỗi xảy ra',
          status: 'error'
        });
      }
    });
  };

  const handleLockUser = (id) => {
    UserAuthAPI.adminLockUser({ user_id: id })
      .then((res) => {
        // console.log(res);
        toast({
          position: 'top',
          title: res.message,
          duration: 3000,
          status: 'success'
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
        // toast({
        //   position: 'top',
        //   title: 'Error',
        //   duration: 3000,
        //   status: 'error'
        // });
      });
  };

  const toggleCreateAdminDrawer = useCallback(() => {
    setIsOpenCreateAdminDrawer((prev) => !prev);
  }, []);

  const handleClickCreateAdmin = () => {
    toggleCreateAdminDrawer();
  };
  return (
    <>
      <CreateAdminDrawer
        isOpen={isOpenCreateAdminDrawer}
        onClose={toggleCreateAdminDrawer}
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
                Danh sách người dùng
              </Text>
              <IconButton
                icon={<HiPlus />}
                onClick={handleClickCreateAdmin}
              />
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Avatar</Th>
                  <Th>Tên</Th>
                  <Th>Email</Th>
                  {/* <Th>Created At</Th> */}
                  <Th>Vai trò</Th>
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
                  {data?.listUsers?.length > 0 &&
                    data?.listUsers
                      .concat(data?.listAdmins)
                      .map((user, i) => (
                        <Tr key={`user-${i + 1}`}>
                          <Td>{user?.id}</Td>
                          <Td>
                            <Image src={user.image} h="50px" />
                          </Td>
                          <Td>{user?.name}</Td>
                          <Td>{user?.email}</Td>
                          {/* <Td>{user?.created_at}</Td> */}
                          <Td>
                            {user?.is_seller === 0 ||
                            user?.is_seller === 1
                              ? 'User'
                              : user?.is_seller === 2
                              ? 'Seller'
                              : !user?.is_seller
                              ? 'Admin'
                              : ''}
                          </Td>

                          <Td>
                            <Flex
                              justifyContent="space-between"
                              style={{
                                width: '100px'
                              }}
                            >
                              <IconButton
                                title="Ban shop"
                                onClick={() => handleBanShop(user.id)}
                                style={{
                                  display: checkBanShop(user)
                                    ? ''
                                    : 'none'
                                }}
                                icon={<FaBan color="red" />}
                              />
                              <IconButton
                                title="Ban user"
                                onClick={() =>
                                  handleLockUser(user?.id)
                                }
                                style={{
                                  display:
                                    !user?.is_seller &&
                                    user?.is_seller !== 0
                                      ? 'none'
                                      : ''
                                }}
                                icon={<FaLock color="#Be2525" />}
                              />
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
              )}
            </Table>
            {!isLoading && data?.listUsers?.length === 0 ? (
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
            )}
          </TableContainer>
        </Flex>
      </Box>
    </>
  );
}
