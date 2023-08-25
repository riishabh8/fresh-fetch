import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import AddProduct from "./components/AddProduct/AddProduct";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";
import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Image from "./Image";
import ImageView from "./ImageView.jsx";
import Edit from "./components/Edit/Edit";
import Orders from "./components/Orders/Orders";
import axios from "axios";
import Footer from "./components/Footer/Footer";
function App() {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.isAdmin);
  const [isUser, setIsUser] = useState(localStorage.isUser);
  const [name, setName] = useState(localStorage.name);

  function addToCart(item, quantity) {
    const exists = cart.find((prevItem) => item.id === prevItem.id);
    if (exists) {
      const updatedCart = cart.map((prevItem) => {
        if (prevItem.id === item.id) {
          return { ...prevItem, quantity: prevItem.quantity + quantity };
        }
        return prevItem;
      });
      setCart(updatedCart);
    } else {
      item.quantity = quantity;
      setCart([...cart, item]);
    }
  }

  function deleteFromCart(item) {
    console.log(item);
    const newCart = cart.filter((cartItem) => cartItem != item);
    setCart(newCart);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar isAdmin={isAdmin} isUser={isUser} name={name} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/detail/:id"
            element={
              <Detail addToCart={addToCart} isAdmin={isAdmin} isUser={isUser} />
            }
          />
          <Route path="/edit/:id" element={<Edit />} />

          <Route
            path="/login"
            element={
              <Login
                handleAdmin={setIsAdmin}
                handleUser={setIsUser}
                handleName={setName}
              />
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={cart}
                handleCart={setCart}
                deleteFromCart={deleteFromCart}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

/**
 * App Layout
 * Navbar
 *  ->Dashboard
 *      ->Header
 *          ->Category
 *          ->Search
 *      ->Products
 *        ->Product
 *          ->Card
 *  ->Cart
 *      ->CartItems
 *  ->Login Page
 *  ->Signup Page
 *  ->Edit
 * -> Add product
 *
 */
