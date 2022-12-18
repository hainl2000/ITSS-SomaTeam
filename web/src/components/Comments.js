import React from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
const Comments = ({ data }) => {
  return (
    <Box
      w="70rem"
      p="30px 5rem"
      style={{
        margin: '30px 0',
        background: 'white',
        borderRadius: '12px'
      }}
    >
      <p
        style={{
          fontWeight: '600',
          fontSize: '20px'
          // margin: '0   20px'
        }}
      >
        Đánh giá sản phẩm
      </p>
      <div
        style={{
          margin: '20px 0'
        }}
      >
        <Input
          width="80%"
          placeholder="Nhập đánh giá của bạn về sản phẩm"
        />

        <Button
          // leftIcon={<>helo</>}
          style={{
            margin: '0 20px'
          }}
        >
          Gửi
        </Button>
      </div>
      <div>
        {data.map((item, index) => (
          <Flex
            alignItems="center"
            style={{
              margin: '20px 0',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              padding: '20px 0'
            }}
          >
            <div>
              <img
                alt="avt"
                style={{
                  borderRadius: '30px',
                  width: '60px',
                  height: '60px'
                }}
                src={item.src}
              />
              <p>{item.name}</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'gray'
                }}
              >
                {item.time}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  margin: '0   20px'
                }}
              >
                {item.cmt}
              </p>
            </div>
          </Flex>
        ))}
      </div>
    </Box>
  );
};

export default Comments;
