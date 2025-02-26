"use client";

import React from "react";

const PropertyType = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault1", label: "All",defaultChecked: true },
    { id: "flexRadioDefault2", label: "Houses" },
    { id: "flexRadioDefault3", label: "Apartments" },
    { id: "flexRadioDefault4", label: "Office" },
    { id: "flexRadioDefault5", label: "Villa" },
    { id: "flexRadioDefault6", label: "Townhome" },
    { id: "flexRadioDefault7", label: "Bungalow" },
    { id: "flexRadioDefault8", label: "Loft" },
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

            onChange={() => filterFunctions.handlepropertyTypes(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default PropertyType;
