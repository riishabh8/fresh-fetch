import React from "react";
import { Link } from "react-router-dom";
export default function CartItem({ product, deleteFromCart }) {
  return (
    <div className="customCard" key={product.Id}>
      <div>
        <img src={product.imageFile} alt="..." />
      </div>
      <div className="customCard--text">
        <h5>{product.productName}</h5>
        <hr />
        <p className="customCard--cost">
          ₹{product.price - product.discount}X{product.quantity} = ₹
          {(product.price - product.discount) * product.quantity}
        </p>
        <hr />
        <button
          className="btn btn-outline-danger customBtn"
          onClick={() => {
            deleteFromCart(product);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
