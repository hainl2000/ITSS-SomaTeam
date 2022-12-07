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
        <Route path="all-products" element={<Products />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="forget/*" element={<ResetPassword />} />
        <Route
          path="all-products/product/:id"
          element={<DetailProduct />}
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
          path="products"
          element={
            adminAuthenticated ? (
              <ProductsManager />
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
