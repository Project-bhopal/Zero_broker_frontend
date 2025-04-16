'use client'

import React, { useState } from "react";

const ListingStatus = ({filterFunctions, handleFilterChange}) => {
  const [purpose, setPurpose] = useState()
  const options = [
    { id: "flexRadioDefault4", label: "All" , value:"properties", defaultChecked: true },
    { id: "flexRadioDefault1", label: "Buy", value :"for-sale" },
    { id: "flexRadioDefault2", label: "Rent", value:"for-rent" },
    { id: "flexRadioDefault3", label: "Commercial", value :"commmercial" },

  ];
  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            id={option.id}
            type="radio"
            checked={filterFunctions?.listingStatus == option.label}
            onChange={()=>{filterFunctions.handlelistingStatus(option.label); handleFilterChange("listingStatus", option.value)}}         
          />
          <label className="form-check-label" htmlFor={option.id} style={{fontSize : "16px"}}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
