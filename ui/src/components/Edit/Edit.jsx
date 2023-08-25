import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../AddProduct/category";

export default function Edit() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [Description, setDescription] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Price, setPrice] = useState(0.0);
  const [Discount, setDiscount] = useState(0.0);
  const [Specification, setSpecification] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    async function xyz() {
      const res = await axios.get(`https://localhost:7046/api/Products/${id}`);
      const final = res.data;
      setProductName(final.productName);
      setDescription(final.description);
      setQuantity(final.quantity);
      setCategory(final.category);
      setDiscount(final.discount);
      setSpecification(final.specification);
      setPrice(final.price);
    }
    xyz();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      ProductName,
      Description,
      Category,
      Quantity,
      Price,
      Discount,
      Specification,
    };

    try {
      const response = await axios.put(
        `https://localhost:7046/api/Products/${id}`,
        formData
      );
      if(response.status === 200){
        window.location.href = "/";
      }
    } catch (err) {
      // setUploadMessage("Something Happend Try again");
      console.log(err);
    }
  }
  return (
    <div>
      <form className="form-signin w-100 m-auto add-product ">
        <h1>Add a Product !</h1>
        <input
          className="form-control"
          type="text"
          placeholder="ProductName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          value={ProductName}
        />
        <textarea
          className="form-control"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows={"3"}
          value={Description}
        ></textarea>

        <select
          name="categories"
          id="categories"
          className="form-control"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={Category}
        >
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>

        <input
          className="form-control"
          type="number"
          placeholder="Quantity"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={Quantity}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Price"
          step="0.01"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={Price}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Discount"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
          value={Discount}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Specification"
          onChange={(e) => {
            setSpecification(e.target.value);
          }}
          value={Specification}
        />
        <button
          className="btn btn-primary w-100 py-2 btn--login"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </form>
    </div>
  );
}
