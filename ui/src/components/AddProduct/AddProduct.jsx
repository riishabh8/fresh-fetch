import React, { useEffect, useState } from "react";
import "./addProduct.css";
import axios from "axios";
import { categories } from "./category.js";

export default function AddProduct() {
  useEffect(() => {
    if (!localStorage.isAdmin || localStorage.isAdmin === "false") {
      window.location.href = "/";
    }
  }, []);

  const [Description, setDescription] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Image, setImage] = useState(null);
  const [Price, setPrice] = useState(0.0);
  const [Discount, setDiscount] = useState(0.0);
  const [Specification, setSpecification] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("Description", Description);
    formData.append("Category", Category);
    formData.append("Quantity", Quantity);
    formData.append("ImageFile", Image);
    formData.append("Price", Price);
    formData.append("Discount", Discount);
    formData.append("Specification", Specification);

    try {
      const response = await axios.post(
        "https://localhost:7046/api/Products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form className="form-signin w-100 m-auto add-product ">
        <h1>Add a Product !</h1>
        <input
          className="form-control"
          type="text"
          placeholder="ProductName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <textarea
          className="form-control"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows={"3"}
        ></textarea>

        <select
          name="categories"
          id="categories"
          className="form-control"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
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
        />
        <input
          className="form-control"
          type="file"
          placeholder="Image"
          // accept="image/jpeg, image/png"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          className="form-control"
          type="number"
          placeholder="Price"
          step="0.01"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Discount"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Specification"
          onChange={(e) => {
            setSpecification(e.target.value);
          }}
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
    </>
  );
}
