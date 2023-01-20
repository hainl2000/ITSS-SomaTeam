import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import ProductAPI from '../../api/ProductAPI';
import { useQuery } from 'react-query';
import RegisterPackageModal from './RegisterPackageModal';
const Advertise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();
  const allPackage = useQuery(['allPackage'], () =>
    ProductAPI.getAllAdvertise()
  );

  const checkRegistered = useQuery(['checkRegistered'], () =>
    ProductAPI.checkRegisteredPackage()
  );

  return (
    <div
      style={{
        padding: '50px'
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {checkRegistered?.data?.end_advertise <
          new Date().toLocaleString() ||
        !checkRegistered?.data?.end_advertise ? (
          allPackage.data?.map((item) => (
            <div
              key={item.id}
              style={{
                margin: '20px',
                padding: '10px',
                borderRadius: '10px',
                //   height: '200px',
                width: '28%',
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                fontWeight: 600,
                background: '#6495ED'
              }}
            >
              <div
                style={{
                  padding: '10px'
                }}
              >
                <p
                  style={{
                    fontSize: '28px'
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    color: '#FFFACD'
                  }}
                >{`${item.price}$`}</p>
              </div>
              <div
                style={{
                  height: '1px',
                  width: '90%',
                  background: 'white',
                  margin: 'auto'
                }}
              ></div>
              <div
                style={{
                  padding: '30px'
                }}
              >
                <p>{`Thời gian: ${item.time} tháng`}</p>
              </div>
              <Button
                onClick={() => {
                  setIsOpen(true);
                  setSelected(item);
                }}
              >
                Đăng ký
              </Button>
            </div>
          ))
        ) : (
          <>
            <div
              style={{
                margin: '20px',
                padding: '10px',
                borderRadius: '10px',
                //   height: '200px',
                width: '28%',
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
                fontWeight: 600,
                background: '#6495ED'
              }}
            >
              <div
                style={{
                  padding: '10px'
                }}
              >
                <p
                  style={{
                    fontSize: '28px'
                  }}
                >
                  {checkRegistered?.data?.package[0]?.name}
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    color: '#FFFACD'
                  }}
                >{`${checkRegistered?.data?.package[0]?.price}$`}</p>
                <p
                  style={{
                    color: 'green'
                  }}
                >
                  {`Đã đăng ký ngày ${new Date(
                    checkRegistered?.data?.package[0]?.created_at
                  ).toLocaleDateString()}`}
                </p>
              </div>
              <div
                style={{
                  height: '1px',
                  width: '90%',
                  background: 'white',
                  margin: 'auto'
                }}
              ></div>
              <div
                style={{
                  padding: '30px'
                }}
              >
                <p>{`Thời gian: ${checkRegistered?.data?.package[0]?.time} tháng`}</p>
              </div>
            </div>
          </>
        )}
      </Flex>
      <RegisterPackageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        packageDetail={selected}
      />
    </div>
  );
};

export default Advertise;
