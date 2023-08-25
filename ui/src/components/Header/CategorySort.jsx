import React from "react";
import { categories } from "./../AddProduct/category";

export default function CategorySort({ handleCategory }) {
  return (
    <span>
      <select
        name="categories"
        id="categories"
        className="form-control"
        onChange={(e) => {
          handleCategory(e.target.value);
        }}
      >
        {categories.map((category,index) => {
          return <option key={index} value={category}>{category}</option>;
        })}
      </select>
    </span>
  );
}
