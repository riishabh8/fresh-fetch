import React from "react";
import CategorySort from "./CategorySort";
import SearchBar from "./SearchBar";
import "./header.css"

export default function Header({handleCategory,handleSearch}) {




  return (
    <div className="container header-section">
      <CategorySort handleCategory={handleCategory} />
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}
