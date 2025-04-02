"use client";
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";

const MoreFilters = ({ filterFunctions, handleFilterChange }) => {
  const defaultRange = [20, 70987]; // Default price range
  const priceRange = filterFunctions?.priceRange || defaultRange; // Fallback for undefined

  const minFeetRef = useRef(null);
  const maxFeetRef = useRef(null);
  const handleMinChange = (e) => {
    const minValue = e.target.value;
    const maxValue = maxFeetRef.current?.value || 0;
    filterFunctions?.handlesquirefeet([minValue, maxValue]);
  };

  const handleMaxChange = (e) => {
    const maxValue = e.target.value;
    const minValue = minFeetRef.current?.value || 0;
    filterFunctions?.handlesquirefeet([minValue, maxValue]);
  };
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
                ref={minFeetRef}
                // onChange={(e) =>
                //   filterFunctions?.handlesquirefeet([
                //     e.target.value,
                //     document.getElementById("maxFeet3").value / 1,
                //   ])
                // }
                onChange={handleMinChange}
                placeholder="Min."
                id="minFeet3"
              />
            </div>
            <span className="dark-color">-</span>
            <div className="form-style1">
              <input
                type="number"
                className="form-control filterInput"
                ref={maxFeetRef}
                placeholder="Max"
                id="maxFeet3"
                // onChange={(e) =>
                //   filterFunctions?.handlesquirefeet([
                //     document.getElementById("minFeet3").value / 1,
                //     e.target.value,
                //   ])
                // }
                onChange={handleMaxChange}
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
