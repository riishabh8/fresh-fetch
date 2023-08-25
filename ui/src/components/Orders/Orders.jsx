import axios from "axios";
import "./orders.css";
import React, { useEffect, useState } from "react";
import CartItem from "../Cart/CartItem";
import OrderItem from "./OrderItem";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await axios.get(
          `https://localhost:7046/api/Order/${localStorage.getItem("userId")}`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getOrders();
  }, []);

  return (
    <div className="container">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}
