import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductAPI from '../api/ProductAPI';
const Comments = ({ data, refetch }) => {
  const { id: productId } = useParams();
  const { currentUser } = useUserAuthContext();
  const [rate, setRate] = useState(5);
  const [content, setContent] = useState('');
  const toast = useToast();
  const checkRate = (rate) => {
    // console.log(rate);
    // switch (rate) {
    if (rate >= 4.5) {
      // console.log('deo chay');
      return 'Tuyệt vời';
    }
    if (rate >= 3.5) {
      return 'Tạm được';
    }
    if (rate >= 2.5) {
      return 'Tệ';
    }
    if (rate < 2.5) {
      return 'Rất tệ';
    }
  };
  const convertDate = (item) => {
    const date = new Date(item?.created_at).toLocaleString();
    // console.log(date);
    return date;
  };

  const checkIsCommented = () => {
    // console.log(currentUser);
    if (currentUser) {
      for (const item of data) {
        if (item?.user?.id === currentUser?.id) return true;
      }
    }
    return false;
  };
  const handleSubmitComment = () => {
    ProductAPI.commentPost({
      comment_in: productId,
      content: content,
      rating: rate
    }).then((res) => {
      if (res.success) {
        toast({
          title: 'Đã gửi đánh giá',
          status: 'success'
        });
        refetch();
      } else {
        toast({
          title: 'Chưa nhập đánh giá',
          status: 'error'
        });
      }
    });
  };
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
      {currentUser ? (
        !checkIsCommented() ? (
          <div>
            <Flex
              alignItems="center"
              // justifyContent="center"
              width="300px"
            >
              <ReactStars
                count={5}
                value={5}
                onChange={(rate) => setRate(rate)}
                size={28}
                activeColor="#ffd700"
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
              />
              {rate && (
                <div
                  style={{
                    color: 'black',
                    fontWeight: '600',
                    margin: '0 50px'
                  }}
                >
                  {checkRate(rate)}
                </div>
              )}
            </Flex>
            <div
              style={{
                margin: '20px 0'
              }}
            >
              <Input
                width="80%"
                placeholder="Nhập đánh giá của bạn về sản phẩm"
                onChange={(e) => setContent(e.target.value)}
              />

              <Button
                onClick={handleSubmitComment}
                style={{
                  margin: '0 20px'
                }}
              >
                Gửi
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <>
          <Link
            to="/login"
            style={{
              color: 'blue',
              fontWeight: '600'
            }}
          >
            Đăng nhập{' '}
          </Link>
          <span
            style={{
              color: 'black'
            }}
          >
            để bình luận
          </span>
        </>
      )}
      <div>
        {data.map((item, index) => (
          <Flex
            alignItems="center"
            style={{
              margin: '5px 0',
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
                src={item?.user?.image}
              />
              <p>{item?.user?.name}</p>
            </div>
            <div>
              <div
                style={{
                  margin: '0 20px'
                }}
              >
                <ReactStars
                  count={5}
                  value={item?.rating}
                  edit={false}
                  size={18}
                  activeColor="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                />
              </div>
              <p
                style={{
                  fontSize: '18px',
                  margin: '0   20px'
                }}
              >
                {item.content}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'gray',
                  margin: '0 20px'
                }}
              >
                {convertDate(item)}
              </p>
            </div>
          </Flex>
        ))}
      </div>
    </Box>
  );
};

export default Comments;
