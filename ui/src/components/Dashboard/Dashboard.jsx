import axios from "axios";
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Card from "./Card";
import Header from "../Header/Header";
import Review from "../Review/Review";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function xyz() {
      try {
        const res = await axios.get(`https://localhost:7046/api/Products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    xyz();
  }, []);

  function handleCategory(value) {
    setCategory(value);
  }
  const filteredProducts = products.filter(
    (product) =>
      product.category === category ||
      category === "" ||
      category === "Categories"
  );

  function handleChangeOnSearch(filteredProducts, searchTerm) {
    return filteredProducts.filter(
      (filteredProduct) =>
        filteredProduct.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        filteredProduct.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  return (
    products && (
      <>
        <Header handleCategory={handleCategory} handleSearch={setSearchTerm} />
        <div className="container">
          <div className="products">
            {handleChangeOnSearch(filteredProducts, searchTerm).map(
              (product) => (
                <Card key={product.id} product={product} />
              )
            )}
          </div>

        </div>
       
      </>
    )
  );
}
