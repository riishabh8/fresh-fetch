import React from "react";

export default function OrderItem({ order }) {
  return (
    <div className="customCard" key={order.id}>
      <div>
        <img src={order.product.imageFile} alt="..." />
      </div>
      <div className="customCard--text">
        <h5>{order.product.productName}</h5>
        <hr />
        <p className="customCard--cost">
          ₹{order.price}X{order.quantity} = ₹{order.price * order.quantity}
        </p>
        <hr />
        <p>Ordered On : {order.date}</p>
        <hr />
      </div>
    </div>
  );
}
