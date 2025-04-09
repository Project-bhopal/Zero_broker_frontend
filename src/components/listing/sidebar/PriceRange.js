"use client";
import React, { useState, useEffect } from "react";

const PriceRange = ({ filterFunctions, handleFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Debounce min price
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (minPrice !== "") {
        filterFunctions?.handlepriceRange?.(minPrice);
        handleFilterChange("min_price", minPrice);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [minPrice]);

  // Debounce max price
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (maxPrice !== "") {
        filterFunctions?.handlepriceRange?.(maxPrice);
        handleFilterChange("max_price", maxPrice);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [maxPrice]);

  // Input change handler
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "min_price") {
      setMinPrice(value);
    } else if (name === "max_price") {
      setMaxPrice(value);
    }
  };

  return (
    <div className="range-wrapper">
      <div className="d-flex align-items-center justify-content-between gap-1">
        <div className="form-style1">
          <input
            type="number"
            className="form-control filterInput"
            name="min_price"
            onChange={handleOnChange}
            placeholder="Min."
            min={0}
            id="minPrice"
            value={minPrice}
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            className="form-control filterInput"
            placeholder="Max"
            name="max_price"
            id="maxPrice"
            max={1000000}
            onChange={handleOnChange}
            value={maxPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
