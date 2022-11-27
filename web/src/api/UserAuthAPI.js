import {
  USER_CHECK_FORGETPASSWORD,
  USER_FORGET_PASSWORD,
  USER_GET_INFO_ENDPOINT,
  USER_LOG_IN_ENDPOINT,
  USER_LOG_OUT_ENDPOINT,
  USER_REGISTER_ENDPOINT,
  USER_UPDATE_PASSWORD
} from '../constants/endpoints';
import { getUserToken } from '../utils/userAuth';
import instanceAxios from './base';

class UserAuthAPI {
  static async getUser() {
    const token = getUserToken();
    const response = await instanceAxios.get(USER_GET_INFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async login(data) {
    const response = await instanceAxios.post(
      USER_LOG_IN_ENDPOINT,
      data
    );
    return response.data;
  }

  static async register(data) {
    const response = await instanceAxios.post(
      USER_REGISTER_ENDPOINT,
      data
    );
    return response.data;
  }

  static async logout() {
    const token = getUserToken();
    const response = await instanceAxios.get(USER_LOG_OUT_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async forgetPassword(data) {
    const response = await instanceAxios.post(
      USER_FORGET_PASSWORD,
      data
    );
    return response.data;
  }
  static async checkForgetPasswordToken(data) {
    const response = await instanceAxios.get(
      USER_CHECK_FORGETPASSWORD(data)
    );
    return response.data;
  }
  static async userUpdatePassword(token, data) {
    const response = await instanceAxios.post(
      USER_UPDATE_PASSWORD(token),
      data
    );
    return response.data;
  }
}

export default UserAuthAPI;
