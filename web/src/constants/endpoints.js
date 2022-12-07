const BASE_API_ENDPOINT = 'http://127.0.0.1:8000/api/';

const USER_LOG_IN_ENDPOINT = 'user/login';
const USER_LOG_OUT_ENDPOINT = 'user/logout';
const USER_REGISTER_ENDPOINT = 'user/register';
const USER_FORGET_PASSWORD = 'user/sendForgetPasswordMail';
const USER_CHECK_FORGETPASSWORD = (token) => `/user/forget/${token}`;
const USER_UPDATE_PASSWORD = (token) =>
  `user/updatePassword/${token}`;
const USER_GET_INFO_ENDPOINT = 'user/me';
const USER_CREATE_ORDER_ENDPOINT = 'user/createOrder';
const USER_GET_ALL_ORDERS_ENDPOINT = 'user/orders';
const USER_GET_DETAIL_ORDER_ENDPOINT = 'user/orders/';

const ADMIN_LOG_IN_ENDPOINT = 'admin/login';
const ADMIN_GET_INFO_ENDPOINT = 'admin/me';
const ADMIN_LOG_OUT_ENDPOINT = 'admin/logout';
const ADMIN_GET_ALL_ORDERS_ENDPOINT = 'admin/orders';
const ADMIN_GET_DETAIL_ORDER_ENDPOINT = 'admin/orders/';
const ADMIN_GET_ALL_PRODUCTS_ENDPOINT = 'admin/products';
const ADMIN_ADD_PRODUCT_ENDPOINT = 'admin/addProduct';
const ADMIN_UPDATE_PRODUCT_ENDPOINT = 'admin/updateProduct';
const ADMIN_CHANGE_ORDER_STATUS_ENDPOINT = 'admin/changeOrderStatus';
const GET_BEST_SELLER = 'getBestSeller';
const GET_ALL_PRODUCTS_ENDPOINT = 'products';
const GET_SINGLE_PRODUCT_ENDPOINT = 'products/';

export {
  BASE_API_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_SINGLE_PRODUCT_ENDPOINT,
  USER_FORGET_PASSWORD,
  USER_LOG_IN_ENDPOINT,
  USER_LOG_OUT_ENDPOINT,
  USER_REGISTER_ENDPOINT,
  USER_GET_INFO_ENDPOINT,
  USER_CREATE_ORDER_ENDPOINT,
  USER_GET_ALL_ORDERS_ENDPOINT,
  USER_GET_DETAIL_ORDER_ENDPOINT,
  ADMIN_LOG_IN_ENDPOINT,
  ADMIN_GET_INFO_ENDPOINT,
  ADMIN_LOG_OUT_ENDPOINT,
  ADMIN_GET_ALL_ORDERS_ENDPOINT,
  ADMIN_GET_DETAIL_ORDER_ENDPOINT,
  ADMIN_GET_ALL_PRODUCTS_ENDPOINT,
  ADMIN_ADD_PRODUCT_ENDPOINT,
  ADMIN_UPDATE_PRODUCT_ENDPOINT,
  ADMIN_CHANGE_ORDER_STATUS_ENDPOINT,
  USER_CHECK_FORGETPASSWORD,
  USER_UPDATE_PASSWORD,
  GET_BEST_SELLER
};
