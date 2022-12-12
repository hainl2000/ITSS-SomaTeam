import {
  USER_ADD_PRODUCT_ENDPOINT,
  ADMIN_GET_ALL_PRODUCTS_ENDPOINT,
  USER_UPDATE_PRODUCT_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_SINGLE_PRODUCT_ENDPOINT,
  GET_BEST_SELLER,
  SHOP_GET_ALL_PRODUCTS_ENDPOINT,
  ADMIN_APPROVE_PRODUCT_ENDPOINT
} from '../constants/endpoints';
import { getAdminToken } from '../utils/adminAuth';
import instanceAxios from './base';
import { getUserToken } from '../utils/userAuth';

class ProductAPI {
  static async getAllProducts(sortType, searchString, page = 1) {
    const response = await instanceAxios.get(
      `${GET_ALL_PRODUCTS_ENDPOINT}?sortType=${sortType}&searchString=${searchString}&page=${page}`
    );
    return response.data;
  }
  static async getBestSeller() {
    const response = await instanceAxios.get(`${GET_BEST_SELLER}`);
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
}

export default ProductAPI;
