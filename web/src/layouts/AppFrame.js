import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAdminAuthContext } from '../contexts/AdminAuthContext';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import Checkout from '../pages/Checkout';
import DetailOrder from '../pages/DetailOrder';
import DetailProduct from '../pages/DetailProduct';
import FullPageSpinner from '../pages/FullPageSpinner';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import MyOrders from '../pages/MyOrders';
import Signup from '../pages/Signup';
import WebLayout from './WebLayout';
import AdminLogIn from '../pages/AdminLogIn';
import OrdersManager from '../pages/OrdersManager';
import ProductsManager from '../pages/ProductsManager';
import DashboardLayout from './DashboardLayout';
import NotFound from '../components/NotFound';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import Products from '../components/Products';
import ShopSeller from '../components/ShopSeller';
import SellerRegister from '../pages/SellerRegister';
import UserManager from '../pages/UserManager';
import UserProfile from '../pages/UserProfile';
import AdminDashboard from '../pages/AdminDashboard';
import CouponManager from '../pages/CouponManager';
import AdvertisingManager from '../pages/AdvertisingManager';
import NotificationManage from '../pages/NotificationManager';
import AdvertiseOrderManager from '../pages/AdvertiseOrderManager';

export default function AppFrame() {
  const {
    authenticated: userAuthenticated,
    initializing: userInitializing
  } = useUserAuthContext();

  const {
    authenticated: adminAuthenticated,
    initializing: adminInitializing
  } = useAdminAuthContext();

  return userInitializing || adminInitializing ? (
    <FullPageSpinner />
  ) : (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Homepage />} />
        <Route
          path="login"
          element={
            userAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="profile"
          element={
            userAuthenticated ? (
              <UserProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="products" element={<Products />} />
        {/* <Route path="products/" element={<Products option='all'/>} /> */}
        <Route path="signup" element={<Signup />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="forget/*" element={<ResetPassword />} />
        <Route path="products/:id" element={<DetailProduct />} />
        <Route path="shop-seller/products" element={<ShopSeller />} />
        <Route
          path="shop-seller/advertise"
          element={<ShopSeller />}
        />
        <Route
          path="shop-seller/dashboard"
          element={<ShopSeller />}
        />
        <Route
          path="orders"
          element={
            userAuthenticated ? (
              <MyOrders />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
        <Route
          path="orders/:id"
          element={
            userAuthenticated ? (
              <DetailOrder />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
      </Route>
      <Route
        path="checkout"
        element={
          userAuthenticated ? (
            <Checkout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/admin/login"
        element={
          adminAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogIn />
          )
        }
      />
      <Route
        path="/admin"
        element={
          adminAuthenticated ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route
          path="dashboard"
          element={
            adminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="orders"
          element={
            adminAuthenticated ? (
              <OrdersManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="coupon-manager"
          element={
            adminAuthenticated ? (
              <CouponManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="advertising-transaction"
          element={
            adminAuthenticated ? (
              <AdvertiseOrderManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="products"
          element={
            adminAuthenticated ? (
              <ProductsManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="advertising-manager"
          element={
            adminAuthenticated ? (
              <AdvertisingManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="noti-manager"
          element={
            adminAuthenticated ? (
              <NotificationManage />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="user-manager"
          element={
            adminAuthenticated ? (
              <UserManager />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route
          path="shop-manager"
          element={
            adminAuthenticated ? (
              <SellerRegister />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Route>
      <Route
        path="*"
        element={<NotFound message="Page not found" />}
      />
    </Routes>
  );
}
