// const BASE_API_ENDPOINT =
//   'https://itss-somateam-production.up.railway.app/api/';

const BASE_API_ENDPOINT = 'http://127.0.0.1:8000/api/';

const USER_LOG_IN_ENDPOINT = 'user/login';
const USER_LOG_OUT_ENDPOINT = 'user/logout';
const REGISTER_SELLER = 'user/registerSeller';
const USER_REGISTER_ENDPOINT = 'user/register';
const USER_FORGET_PASSWORD = 'user/sendForgetPasswordMail';
const USER_CHECK_FORGETPASSWORD = (token) => `/user/forget/${token}`;
const USER_UPDATE_PASSWORD = (token) =>
  `user/updatePassword/${token}`;
const USER_GET_INFO_ENDPOINT = 'user/me';
const USER_PROFILE = 'user/profile';
const USER_UPDATE_PROFILE = 'user/updateProfile';
const USER_CREATE_ORDER_ENDPOINT = 'user/createOrder';
const USER_GET_ALL_ORDERS_ENDPOINT = 'user/orders';
const USER_GET_DETAIL_ORDER_ENDPOINT = 'user/orders/';
const CHECK_COUPON = 'user/checkCoupon';
const ADMIN_LOG_IN_ENDPOINT = 'admin/login';
const REGISTER_ADMIN = 'admin/registerAdmin';
const ADMIN_GET_INFO_ENDPOINT = 'admin/me';
const ADMID_GET_SHOP_REGISTER = 'admin/getListSellerRequests';
const ADMIN_GET_LIST_USER = '/admin/getUsers';
const ADMIN_LOCK_USER = 'admin/lockUser';
const ADMIN_CREATE_COUPON = 'admin/coupon/create';
const ADMIN_APPROVE_SELLER = 'admin/approveSeller';
const ADMIN_LOG_OUT_ENDPOINT = 'admin/logout';
const ADMIN_GET_LIST_COUPON = 'admin/coupon/list';
const ADMIN_GET_ALL_ORDERS_ENDPOINT = 'admin/orders';
const ADMIN_GET_DETAIL_ORDER_ENDPOINT = 'admin/orders/';
const ADMIN_GET_ALL_PRODUCTS_ENDPOINT = 'admin/products';
const ADMIN_APPROVE_PRODUCT_ENDPOINT = 'admin/approveProduct';
const SHOP_GET_ALL_PRODUCTS_ENDPOINT = 'user/products';
const USER_ADD_PRODUCT_ENDPOINT = 'user/addProduct';
const USER_UPDATE_PRODUCT_ENDPOINT = 'user/updateProduct';
const USER_DELETE_PRODUCT_ENDPOINT = 'user/deleteProduct';
const ADMIN_CHANGE_ORDER_STATUS_ENDPOINT = 'admin/changeOrderStatus';
const GET_BEST_SELLER = 'getBestSeller';
const SHOP_GET_TOTAL_REVENUE = 'user/totalRevenue';
const SHOP_GET_TOTAL_PRODUCT = 'user/totalProduct';
const COMMENT_PRODUCT = 'user/comment';
const BAN_SHOP = 'admin/deleteShop';
const ADMIN_GET_TOTAL_REVENUE = 'admin/totalRevenue';
const ADMIN_GET_TOTAL_PRODUCT = 'admin/totalProduct';
const GET_ALL_PRODUCTS_ENDPOINT = 'products';
const GET_ALL_CATEGORIES = 'allCategories';
const GET_SIMILAR_PRODUCT = (id) => `similarProduct/${id}`;
const GET_SINGLE_PRODUCT_ENDPOINT = 'products/';

export {
  BASE_API_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_SINGLE_PRODUCT_ENDPOINT,
  USER_FORGET_PASSWORD,
  USER_LOG_IN_ENDPOINT,
  USER_LOG_OUT_ENDPOINT,
  USER_PROFILE,
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
  USER_ADD_PRODUCT_ENDPOINT,
  USER_UPDATE_PRODUCT_ENDPOINT,
  ADMIN_CHANGE_ORDER_STATUS_ENDPOINT,
  USER_UPDATE_PROFILE,
  USER_CHECK_FORGETPASSWORD,
  COMMENT_PRODUCT,
  USER_UPDATE_PASSWORD,
  ADMIN_CREATE_COUPON,
  ADMIN_LOCK_USER,
  GET_BEST_SELLER,
  REGISTER_SELLER,
  SHOP_GET_ALL_PRODUCTS_ENDPOINT,
  ADMID_GET_SHOP_REGISTER,
  ADMIN_APPROVE_SELLER,
  GET_ALL_CATEGORIES,
  USER_DELETE_PRODUCT_ENDPOINT,
  ADMIN_GET_TOTAL_REVENUE,
  ADMIN_GET_TOTAL_PRODUCT,
  BAN_SHOP,
  ADMIN_APPROVE_PRODUCT_ENDPOINT,
  ADMIN_GET_LIST_USER,
  REGISTER_ADMIN,
  SHOP_GET_TOTAL_REVENUE,
  SHOP_GET_TOTAL_PRODUCT,
  GET_SIMILAR_PRODUCT,
  ADMIN_GET_LIST_COUPON,
  CHECK_COUPON
};
