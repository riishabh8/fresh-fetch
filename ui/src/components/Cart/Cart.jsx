import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import "./cart.css";

export default function Cart({ items, deleteFromCart, handleCart }) {
  const [err, setErr] = useState();
  // console.log(items);
  async function handleOrder() {
    const userId = localStorage.getItem("userId");
    const orders = items.map((item) => {
      const data = {
        id: item.id,
        quantity: item.quantity,
        price: item.price - item.discount,
      };
      return data;
    });
    const newForm = new FormData();
    const requestBody = { userId, orders };
    newForm.append("userId", userId);
    newForm.append("orders", JSON.stringify(orders));

    try {
      const res = await axios.post("https://localhost:7046/api/Order", newForm);
      if (res.status == 200) {
        handleCart([]);
      }
    } catch (err) {
      console.log(err);
      setErr("Out Of Stock ");
    }

    // console.log(res);
  }

  return (
    <div>
      {console.log(items)}
      {items.length != 0 ? (
        <div className="container">
          <div className="products">
            {items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  product={item}
                  deleteFromCart={deleteFromCart}
                />
              );
            })}
          </div>
          <button
            className="btn btn-outline-success place-order"
            onClick={handleOrder}
          >
            Place an Order
          </button>
          <p style={{ color: "red" }}>{err}</p>
        </div>
      ) : (
        <div className="error"><h1 className="emptyCart"> First Add Something.......</h1></div>
      )}
    </div>
  );
}
