"use client";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";

const MoreFilters = ({ filterFunctions, handleFilterChange }) => {
  const defaultRange = [20, 70987]; // Default square feet range
const squareFeetRange = filterFunctions?.squareFeetRange || defaultRange;

const [minFeet, setMinFeet] = useState("");
const [maxFeet, setMaxFeet] = useState("");

const minFeetRef = useRef(null);
const maxFeetRef = useRef(null);

// Input change handler
const handleOnChange = (event) => {
  const { name, value } = event.target;

  if (name === "min_feet") {
    setMinFeet(value);
  } else if (name === "max_feet") {
    setMaxFeet(value);
  }
};

// Debounce min feet
useEffect(() => {
  const timeout = setTimeout(() => {
    if (minFeet !== "") {
      const minValue = minFeet;
      const maxValue = maxFeetRef.current?.value || "";
      filterFunctions?.handlesquirefeet?.([minValue, maxValue]);
      handleFilterChange("min_feet", minValue);
    }
  }, 500);

  return () => clearTimeout(timeout);
}, [minFeet]);

// Debounce max feet
useEffect(() => {
  const timeout = setTimeout(() => {
    if (maxFeet !== "") {
      const maxValue = maxFeet;
      const minValue = minFeetRef.current?.value || "";
      filterFunctions?.handlesquirefeet?.([minValue, maxValue]);
      handleFilterChange("max_feet", maxValue);
    }
  }, 500);

  return () => clearTimeout(timeout);
}, [maxFeet]);
  return (
    <div className="">
      <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <div className="space-area">
          <div className="d-flex align-items-center justify-content-between">
            <div className="form-style1">
              <input
                type="number"
                className="form-control filterInput"
                 name="min_feet"
                ref={minFeetRef}
                value={minFeet}
                onChange={handleOnChange}
                placeholder="Min."
                id="minFeet3"
              />
            </div>
            <span className="dark-color">-</span>
            <div className="form-style1">
              <input
                type="number"
                className="form-control filterInput"
                name="max_feet"
                ref={maxFeetRef}
                placeholder="Max"
                value={maxFeet}
                id="maxFeet3"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="widget-wrapper">
          <h6 className="list-title">Keywords</h6>
          <div className="form-style2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a relevant Keywords"
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="widget-wrapper">
          <h6 className="list-title">Developer</h6>
          <div className="form-style2">
            <input
              type="text"
              className="form-control"
              placeholder="Select a developer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreFilters;
