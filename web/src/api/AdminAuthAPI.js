import {
  ADMIN_GET_INFO_ENDPOINT,
  ADMIN_LOG_IN_ENDPOINT,
  ADMIN_LOG_OUT_ENDPOINT,
  ADMID_GET_SHOP_REGISTER,
  ADMIN_APPROVE_SELLER,
  ADMIN_GET_LIST_USER,
  ADMIN_LOCK_USER,
  REGISTER_ADMIN,
  ADMIN_CREATE_COUPON,
  ADMIN_GET_LIST_COUPON
} from '../constants/endpoints';

import { getAdminToken } from '../utils/adminAuth';
import instanceAxios from './base';

class UserAuthAPI {
  static async getAdmin() {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      ADMIN_GET_INFO_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async getShopRegister() {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      ADMID_GET_SHOP_REGISTER,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async adminGetListUsers() {
    const token = getAdminToken();
    const response = await instanceAxios.get(ADMIN_GET_LIST_USER, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
  static async adminLockUser(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(ADMIN_LOCK_USER, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async adminCreateCoupon(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(
      ADMIN_CREATE_COUPON,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async adminGetListCoupon(page = 1) {
    const token = getAdminToken();
    const response = await instanceAxios.get(
      `${ADMIN_GET_LIST_COUPON}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async adminApproveSeller(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(
      ADMIN_APPROVE_SELLER,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
  static async login(data) {
    const response = await instanceAxios.post(
      ADMIN_LOG_IN_ENDPOINT,
      data
    );
    return response.data;
  }

  static async registerAdmin(data) {
    const token = getAdminToken();
    const response = await instanceAxios.post(REGISTER_ADMIN, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async logout() {
    const token = getAdminToken();
    const response = await instanceAxios.get(ADMIN_LOG_OUT_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default UserAuthAPI;
