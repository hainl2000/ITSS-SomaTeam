import {
  USER_ADD_PRODUCT_ENDPOINT,
  ADMIN_GET_ALL_PRODUCTS_ENDPOINT,
  USER_UPDATE_PRODUCT_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_SINGLE_PRODUCT_ENDPOINT,
  GET_BEST_SELLER,
  SHOP_GET_ALL_PRODUCTS_ENDPOINT,
  ADMIN_APPROVE_PRODUCT_ENDPOINT,
  GET_ALL_CATEGORIES,
  GET_SIMILAR_PRODUCT,
  SHOP_GET_TOTAL_REVENUE,
  SHOP_GET_TOTAL_PRODUCT,
  ADMIN_GET_TOTAL_REVENUE,
  ADMIN_GET_TOTAL_PRODUCT,
  CHECK_COUPON,
  USER_DELETE_PRODUCT_ENDPOINT,
  COMMENT_PRODUCT,
  BAN_SHOP
} from '../constants/endpoints';
import { getAdminToken } from '../utils/adminAuth';
import instanceAxios from './base';
import { getUserToken } from '../utils/userAuth';

class ProductAPI {
  static async getAllProducts(
    sortType,
    searchString,
    page = 1,
    category,
    seller_id
  ) {
    const response = await instanceAxios.get(
      `${GET_ALL_PRODUCTS_ENDPOINT}?sortType=${sortType}&searchString=${searchString}&page=${page}&category=${
        category ? category : ''
      }&seller_id=${seller_id ? seller_id : ''}`
    );
    return response.data;
  }
  static async getAllCategories() {
    const response = await instanceAxios.get(`${GET_ALL_CATEGORIES}`);
    return response.data;
  }
  static async getSimilarProducts(id) {
    const response = await instanceAxios.get(
      `${GET_SIMILAR_PRODUCT(id)}`
    );
    return response.data;
  }
  static async getBestSeller() {
    const response = await instanceAxios.get(`${GET_BEST_SELLER}`);
    return response.data;
  }
  static async getAllRevenue(data) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${SHOP_GET_TOTAL_REVENUE}?isSeller=${data.isSeller}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async commentPost(data) {
    const token = getUserToken();
    const response = await instanceAxios.post(
      `${COMMENT_PRODUCT}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async banShop(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(`${BAN_SHOP}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async getAllRevenueProduct(data) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${SHOP_GET_TOTAL_PRODUCT}?isSeller=${data.isSeller}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async adminGetAllRevenue() {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      `${ADMIN_GET_TOTAL_REVENUE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async adminGetAllRevenueProduct() {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      `${ADMIN_GET_TOTAL_PRODUCT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async adminGetAllProducts(page = 1) {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      `${ADMIN_GET_ALL_PRODUCTS_ENDPOINT}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async adminAproveProduct(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(
      `${ADMIN_APPROVE_PRODUCT_ENDPOINT}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async userCheckCoupon(data) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${CHECK_COUPON}/?couponCode=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async shopGetAllProducts(page = 1) {
    const token = getUserToken();
    const response = await instanceAxios.get(
      `${SHOP_GET_ALL_PRODUCTS_ENDPOINT}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  // static async adminAddProduct(data) {
  //   const token = getAdminToken();
  //   const response = await instanceAxios.post(
  //     ADMIN_ADD_PRODUCT_ENDPOINT,
  //     data,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   );
  //   return response.data;
  // }
  static async userAddProduct(data) {
    const token = getUserToken();
    const response = await instanceAxios.post(
      USER_ADD_PRODUCT_ENDPOINT,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async getSingleProduct(id) {
    const response = await instanceAxios.get(
      `${GET_SINGLE_PRODUCT_ENDPOINT}${id}`
    );
    return response.data;
  }

  static async updateProduct(data) {
    const token = getUserToken();
    const response = await instanceAxios.post(
      USER_UPDATE_PRODUCT_ENDPOINT,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async userDeleteProduct(data) {
    const token = getUserToken();
    const response = await instanceAxios.post(
      USER_DELETE_PRODUCT_ENDPOINT,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
}

export default ProductAPI;
