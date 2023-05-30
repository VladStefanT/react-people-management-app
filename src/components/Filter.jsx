import React, { useState } from "react";

export default function Filter({ onFilterChange }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSearch = () => {
    onFilterChange(name, department);
  };

  const handleFilterReset = () => {
    setName("");
    setDepartment("");
    onFilterChange("", "");
  };

  return (
    <>
      <div className="filter-nav">
        <input
          className="search-bar"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name.."
        ></input>
        <select
          className="select-dept"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Department</option>
          <option value="1">IT</option>
          <option value="2">Marketing</option>
        </select>
        <button
          style={{ marginRight: "-25%" }}
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
        <button onClick={handleFilterReset}>↺</button>
      </div>
    </>
  );
}
