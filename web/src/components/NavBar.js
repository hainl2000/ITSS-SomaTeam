import React, { useCallback, useRef } from 'react';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiX
} from 'react-icons/hi';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import UserAuthAPI from '../api/UserAuthAPI';
import { setUserToken } from '../utils/userAuth';
import { useWebContext } from '../contexts/WebContext';

export default function NavBar() {
  const history = useNavigate();
  const { authenticated, setCurrentUser, redirectWhenNoAuth } =
    useUserAuthContext();
  const { toggleCartOpen, resetCart, cart } = useCartContext();
  const { searchString, setSearchString } = useWebContext();

  const searchInputRef = useRef(null);

  const handleChangeSearchString = useCallback(
    (e) => {
      setSearchString(e.target.value);
    },
    [setSearchString]
  );

  const handleClearSearchString = useCallback(() => {
    setSearchString('');
    searchInputRef.current.value = '';
  }, [setSearchString]);

  const handleClickCart = useCallback(() => {
    if (!authenticated) {
      redirectWhenNoAuth();
      return;
    }
    toggleCartOpen();
  }, [authenticated, redirectWhenNoAuth, toggleCartOpen]);

  const handleLogOut = useCallback(() => {
    UserAuthAPI.logout().then((response) => {
      if (response.success) {
        resetCart();
        setCurrentUser(null);
        setUserToken(null);
        history('/');
      }
    });
  }, [history, resetCart, setCurrentUser]);

  return (
    <Box bg="primaryColor" color="lightTextColor">
      <Box
        p="20px 5rem 20px"
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        alignItems="center"
        maxW="70rem"
        m="0 auto"
      >
        <Flex>
          <InputGroup>
            <Input
              ref={searchInputRef}
              placeholder="Search"
              onChange={handleChangeSearchString}
            />
            <InputRightElement>
              {searchString ? (
                <IconButton
                  icon={<HiX />}
                  bg="none"
                  _hover={{ bg: 'none' }}
                  _active={{ bg: 'none' }}
                  onClick={handleClearSearchString}
                />
              ) : (
                <HiOutlineSearch color="lightTextColor" />
              )}
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Link as={NavLink} to="/" justifySelf="center">
          <Text fontWeight="bold" fontSize="xl">
            Shopping Cart
          </Text>
        </Link>
        <Flex justifySelf="right" alignItems="center" gap={3}>
          <Box position="relative">
            <IconButton
              onClick={handleClickCart}
              bg="none"
              size="lg"
              _hover={{ bg: 'none' }}
              icon={<HiOutlineShoppingBag color="lightTextColor" />}
            />
            {cart.total > 0 ? (
              <Text
                position="absolute"
                bottom="8px"
                right="8px"
                borderRadius="full"
                bg="white"
                color="primaryColor"
                w="13px"
                h="13px"
                textAlign="center"
                fontSize="8px"
                lineHeight="13px"
                fontWeight="500"
              >
                {cart.total}
              </Text>
            ) : null}
          </Box>
          {authenticated ? (
            <Menu>
              <MenuButton as={Avatar} size="sm" cursor="pointer" />
              <MenuList color="primaryColor">
                <MenuItem onClick={() => history('/orders')}>
                  My orders
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link as={NavLink} to="/login">
              Log in
            </Link>
          )}
        </Flex>
        {/* <Box gridColumn="2/3" justifySelf="center" mt={1}>
          <Flex>
            <Link as={NavLink} to="/" p="0.5rem">
              Home
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Catalog
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Contact
            </Link>
            <Link as={NavLink} to="/" p="0.5rem">
              Happy page
            </Link>
          </Flex>
        </Box> */}
      </Box>
    </Box>
  );
}
