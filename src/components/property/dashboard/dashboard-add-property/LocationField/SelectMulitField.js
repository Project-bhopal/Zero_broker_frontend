"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const options = {
  emirate: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  city: [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman"
  ],
  country: ["UAE"],
};

const customStyles = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#0f8363" : isFocused ? "#ebfff9" : undefined,
  }),
};

const SelectMultiField = ({ location, setLocation }) => {
  const handleChange = (selectedOption, field) => {
    setLocation((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  return (
    <>
      {Object.keys(options).map((key, index) => (
        <div className="col-sm-6 col-xl-4" key={key}>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <div className="location-area">
              <Select
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                options={options[key].map((item) => ({
                  value: item,
                  label: item,
                }))}
                value={
                  location[key]
                    ? { value: location[key], label: location[key] }
                    : null
                }
                onChange={(selectedOption) => handleChange(selectedOption, key)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SelectMultiField;
