'use client'

import React from "react";

const ListingStatus = ({filterFunctions, handleFilterChange}) => {
  const options = [
    { id: "flexRadioDefault4", label: "All" , defaultChecked: true },
    { id: "flexRadioDefault1", label: "Buy" },
    { id: "flexRadioDefault2", label: "Rent", },
    { id: "flexRadioDefault3", label: "Commercial", },

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
            
            onChange={()=>{filterFunctions.handlelistingStatus(option.label); handleFilterChange("listingStatus", option.label)}}         
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
