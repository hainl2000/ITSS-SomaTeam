import React from 'react';
import Highcharts from 'highcharts';
import { Text } from '@chakra-ui/react';
import HighchartsReact from 'highcharts-react-official';
import { useQuery } from 'react-query';
import ProductAPI from '../../api/ProductAPI';
const ShopDashboard = () => {
  const { data: revenue } = useQuery('revenue', () =>
    ProductAPI.getAllRevenue({ isSeller: true })
  );
  const { data: revenueProduct } = useQuery('revenueProduct', () =>
    ProductAPI.getAllRevenueProduct({ isSeller: true })
  );
  console.log(revenue, revenueProduct);
  const options = {
    title: {
      text: 'Doanh thu'
    },
    xAxis: {
      title: {
        text: 'Tháng'
      },
      categories: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ]
    },
    yAxis: {
      // title: { text: 'Doanh thu' }
    },
    series: [
      {
        data: revenue,
        name: 'revenue'
      },
      { data: revenueProduct, name: 'total product' }
    ]
    // series: [
    //   {
    //     data: [122, 221, 334, 567]
    //   }
    // ]
  };
  return (
    <div
      style={{
        padding: '30px 50px'
      }}
    >
      <Text fontSize="20px" fontWeight={600} margin="30px 0">
        Dashboard
      </Text>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ShopDashboard;
