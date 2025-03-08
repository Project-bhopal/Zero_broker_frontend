"use client";

import React from "react";

const PropertyType = ({ filterFunctions, handleFilterChange }) => {
  const options = [
    { id: "flexRadioPropertyType1", label: "All",defaultChecked: true },
    { id: "flexRadioPropertyType2", label: "Houses" },
    { id: "flexRadioPropertyType3", label: "Apartments" },
    { id: "flexRadioPropertyType4", label: "Office" },
    { id: "flexRadioPropertyType5", label: "Villa" },
    { id: "flexRadioPropertyType6", label: "Townhome" },
    { id: "flexRadioPropertyType7", label: "Bungalow" },
    { id: "flexRadioPropertyType8", label: "Loft" },
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
            type="radio"
            checked={filterFunctions?.propertyTypes === option.label}
            id={option.id}
            onChange={() => {filterFunctions.handlepropertyTypes(option.label); handleFilterChange("propertyType", option.label)}}
          />
          <label className="form-check-label" htmlFor={option.id} style={{fontSize : "16px"}}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default PropertyType;
