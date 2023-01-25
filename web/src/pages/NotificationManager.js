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
import UserAuthAPI from '../api/AdminAuthAPI';
import CreateNotiDrawer from '../components/CreateNotiDrawer';

export default function NotificationManage() {
  // const [page, setPage] = useState(1);
  const [isOpenCreateNoti, setIsOpenCreateNoti] = useState(false);
  const [option, setOption] = useState('add');
  const [selectedNoti, setSelectedNoti] = useState(null);
  const toast = useToast();

  const { data, isLoading, refetch } = useQuery(['listNoti'], () =>
    UserAuthAPI.adminGetListNotification()
  );

  const toggleCreateNotiDrawer = useCallback(() => {
    setIsOpenCreateNoti((prev) => !prev);
  }, []);

  const handleClickCreateNoti = () => {
    toggleCreateNotiDrawer();
    setOption('add');
  };
  // const handleClickEditNoti = (ads) => {
  //   setSelectedNoti(ads);
  //   setOption('edit');
  //   toggleCreateNotiDrawer();
  // };
  return (
    <>
      <CreateNotiDrawer
        isOpen={isOpenCreateNoti}
        onClose={toggleCreateNotiDrawer}
        detail={selectedNoti}
        option={option}
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
                Quản lý thông báo
              </Text>
              <IconButton
                icon={<HiPlus />}
                onClick={handleClickCreateNoti}
              />
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Send to</Th>
                  <Th>Content</Th>
                  <Th>Time send</Th>
                  <Th>Status</Th>
                  {/* <Th>Action</Th> */}
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
                  {data?.length &&
                    data?.map((item) => (
                      <Tr key={item?.id}>
                        <Td>{item?.email}</Td>
                        <Td>{item?.content}</Td>
                        <Td>
                          {new Date(
                            item?.send_time
                          ).toLocaleDateString()}
                        </Td>
                        <Td>
                          {item?.status === 0 ? 'Chưa gửi' : 'Đã gửi'}
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
