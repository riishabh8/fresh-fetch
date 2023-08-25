import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./detail.css";
import Review from "../Review/Review";

export default function Detail({ addToCart, items, isUser, isAdmin }) {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(1);

  try {
    async function xyz() {
      const res = await axios.get(`https://localhost:7046/api/Products/${id}`);
      setData(res.data);
    }

    useEffect(() => {
      xyz();
    }, []);
  } catch (err) {
    console.log(err);
  }

  function handleDelete() {
    const res = axios.delete(`https://localhost:7046/api/Products/${id}`);
    window.location.href = "/";
    console.log(res);
  }

  return (
    <div className="container productDetail">
      <div>
        <img src={data.imageFile} alt="image" />
        <div className="productDetail--cost">
          <p className="productDetail--cost--final">
            <span className="final--cost">
              ₹{(data.price - data.discount).toFixed(2)}
            </span>
          </p>
          <p className="productDetail--cost--discount">
            Discount :- ₹{data.discount}
          </p>
          <p className="productDetail--cost--mrp">
            M.R.P:-{" "}
            <span className="productDetail--cost--mrp-strike">
              ₹{data.price}
            </span>
          </p>
        </div>
      </div>
      <div className="productDetail--text">
        <h2>{data.productName}</h2>
        <p>{data.description}</p>
        <hr />
        <span className="badge rounded-pill text-bg-warning">
          {data.category}
        </span>
        <hr />
        <p>
          {data.quantity ? (
            <span className="productDetail--text--stock--avlbl">In Stock</span>
          ) : (
            <span className="productDetail--text--stock--red">
              Out of Stock
            </span>
          )}
        </p>
        <hr />

        <p>{data.specification}</p>
        <hr />
        {isUser === "true" && data.quantity > 0 && (
          <>
            <div className="add-to-cart">
              <div className="quantity">
                {" "}
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setQuantity((prevVal) => prevVal - 1);
                  }}
                >
                  -
                </button>{" "}
                <input type="number" value={quantity} />{" "}
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setQuantity((prevVal) => prevVal + 1);
                  }}
                >
                  +
                </button>{" "}
              </div>
              <button
                onClick={() => {
                  addToCart(data, quantity);
                  console.log(items);
                }}
                className="btn btn-outline-success"
              >
                Add To Cart
              </button>
            </div>
            <hr />
            <Review id={id} />
          </>
        )}

        <hr />

        {isAdmin === "true" && (
          <Link to={`/edit/${data.id}`}>
            <button className="btn btn-outline-danger">Edit From Cart</button>
          </Link>
        )}
        {isAdmin === "true" && (
          <button onClick={handleDelete} className="btn btn-outline-danger">
            Delete From Cart
          </button>
        )}
      </div>
    </div>
  );
}
