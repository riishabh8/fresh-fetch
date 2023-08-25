import React from "react";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <div  className="customCard">
      {console.log(product.id)}
      <div>
        <img src={product.imageFile} alt="..." />
      </div>
      <div className="customCard--text">
        <h5>{product.productName}</h5>
        <hr />
        <p className="customCard--cost">₹{product.price}</p>
        <hr />
        <Link
          to={`/detail/${product.id}`}
          className="btn btn-outline-warning customBtn"
        >
          Check it Out !
        </Link>
      </div>
    </div>
  );
}
