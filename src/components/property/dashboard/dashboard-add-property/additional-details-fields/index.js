"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import BuildingDetails from "./buidingDetailsFields";

const Select = dynamic(() => import("react-select"), { ssr: false });

const AdditionalDetailsFields = ({setData}) => {
  const [additionalDetails, setAdditionalDetails] = useState({
    year_build: "",
    available_from: "",
    basement: "",
    extra_details: "",
    agent_notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalDetails((prev) => ({ ...prev, [name]: value }));
    setSaved(false)
  };

  const handleSelectChange = (selectedOption, field) => {
    setAdditionalDetails((prev) => ({ ...prev, [field]: selectedOption.value }));
    setSaved(false)
  };

  const basementOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#0f8363" : isFocused ? "#eb675312" : undefined,
    }),
  };
  
  //  const AdditionalDetailsSubmit = (e)=>{
  //   e.preventDefault(); 
  //  }

  return (
    <div className="form-style1">
      {/* <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Year built (numeric)</label>
            <input
              type="text"
              name="year_build"
              value={additionalDetails.year_build}
              className="form-control"
              placeholder="eg 2023"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Available from (date)</label>
            <input
              type="date"
              name="available_from"
              value={additionalDetails.available_from}
              className="form-control"
              placeholder="dd/mm/yyyy"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Basement</label>
            <div className="location-area">
              <Select
                name="basement"
                value={basementOptions.find((option) => option.value === additionalDetails.basement) || ""}
                options={basementOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={(selectedOption) => handleSelectChange(selectedOption, "basement")}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Extra details</label>
            <input
              type="text"
              name="extra_details"
              value={additionalDetails.extra_details}
              className="form-control"
              placeholder="Enter details"
              onChange={handleChange}
            />
          </div>
        </div>
      </div> */}

      <div className="row mt10">
        <h5>Building Info</h5>
        <BuildingDetails  setData={()=>{setData}}/>
      </div>

      {/* <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Owner/ Agent notes (not visible on front end)
            </label>
            <textarea
              cols={30}
              rows={5}
              name="agent_notes"
              placeholder="Agent notes..."
              value={additionalDetails.agent_notes}
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default AdditionalDetailsFields;
