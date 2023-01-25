import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQuery } from 'react-query';
import { Text } from '@chakra-ui/react';
import ProductAPI from '../api/ProductAPI';
const AdminDashboard = () => {
  const { data: revenue } = useQuery('revenue', () =>
    ProductAPI.adminGetAllRevenue()
  );
  const { data: revenueProduct } = useQuery('revenueProduct', () =>
    ProductAPI.adminGetAllRevenueProduct()
  );
  //   console.log(revenue, revenueProduct);
  const options = {
    title: {
      text: 'My chart'
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
      title: { text: 'Doanh thu' }
    },
    series: [
      {
        data: revenue,
        name: 'doanh thu'
      },
      { data: revenueProduct, name: 'sản phẩm' }
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
        Thống kê
      </Text>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AdminDashboard;
