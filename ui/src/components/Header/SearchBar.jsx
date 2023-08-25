import React from "react";

export default function SearchBar({ handleSearch }) {
  return (
    <div>
      <input
      className="form-control"
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search....."
      />
    </div>
  );
}
