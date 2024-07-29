import React, { memo } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Logout from "./pages/Logout.jsx";
import Profile from "./pages/Profile.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<LayoutWithNavbar />}>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default memo(App);
