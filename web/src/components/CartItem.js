import {
  Box,
  Flex,
  Grid,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { HiMinus, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useCartContext } from '../contexts/CartContext';

export default function CartItem({ product }) {
  const { removeItemFromCart, handleChangeQuantity } =
    useCartContext();

  const { id, name, price, quantity, image } = product;

  return (
    <Box w="full" mb={2}>
      <Grid mb={1} gridTemplate="auto auto / 1fr 1fr 1fr 1fr" gap={2}>
        <Box pt={2} gridRow="1/3" verticalAlign="top" width="20">
          <Image maxW="full" h="auto" src={image} />
        </Box>
        <Box
          pl={1}
          pt={2}
          width="auto"
          gridColumn="2/4"
          verticalAlign="top"
        >
          <Text
            fontWeight={700}
            maxW="10rem"
            fontSize="xs"
            wordBreak="break-word"
          >
            {name}
          </Text>
          <Text wordBreak="break-all" mt={1} fontSize="xs">
            ${price}
          </Text>
        </Box>
        <Flex
          alignItems="flex-start"
          justifyContent="flex-end"
          pl={1}
          pt={2}
          fontSize="sm"
        >
          ${price * quantity}
        </Flex>
        <Flex gridColumn="2/5" pl={1} alignItems="center" gap={1}>
          <Box
            border="1px solid rgb(14, 27, 77)"
            w={24}
            borderRadius="lg"
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p="5px 5px"
            >
              <IconButton
                icon={<HiMinus />}
                size="xs"
                onClick={() => handleChangeQuantity(id, 'minus')}
              />
              <Text fontSize="xs">{quantity}</Text>
              <IconButton
                icon={<HiPlus />}
                size="xs"
                onClick={() => handleChangeQuantity(id, 'plus')}
              />
            </Flex>
          </Box>
          <IconButton
            size="sm"
            icon={<HiOutlineTrash />}
            bg="none"
            _hover={{ bg: 'none' }}
            onClick={() => removeItemFromCart(id)}
          />
        </Flex>
      </Grid>
    </Box>
  );
}
