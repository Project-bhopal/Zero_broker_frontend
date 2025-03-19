"use client"
import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";
import dynamic from "next/dynamic";

const Select = dynamic(() => import('react-select'), { ssr: false });

const DetailsFiled = () => {

    const purpose = [
      { value: "Rent", label: "Rent" },
      { value: "Sell", label: "Sell" },
    ];
    const availablity = [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ];
    const customStyles = {
      option: (styles, { isFocused, isSelected, isHovered }) => {
        return {
          ...styles,
          backgroundColor: isSelected
            ? "#0f8363"
            : isHovered
            ? "#eb675312"
            : isFocused
            ? "#eb675312"
            : undefined,
        };
      },
    };
  return (
    <form className="form-style1">
      <div className="row">
      {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Select Type
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="type"
                value={""}
                options={catergoryOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div> */}
        <StructureType />
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Purpose
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="purpose"
                value={""}
                options={purpose}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Size in sqft (only numbers)
            </label>
            <input
              type="number"
              name="size"
              value={""}
              className="form-control"
              placeholder="eg 1000sqft..."
            />
          </div>
        </div>
        {/* End .col-4 */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={""}
              className="form-control"
              placeholder="Number of Bedrooms"
            />
          </div>
        </div>
        {/* End .col-4 */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={""}
              className="form-control"
              placeholder="Number of Bathrooms"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Completion Status
            </label>
            <input
              type="text"
              name="completion_status"
              value={""}
              className="form-control"
              placeholder="Completion Status"
            />
          </div>
        </div>
        {/* End .col-4 */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Furnishing
            </label>
            <input
              type="text"
              name="furnishing"
              value={""}
              className="form-control"
              placeholder="Furnishing"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Ownership
            </label>
            <input
              type="text"
              name="ownership"
              value={""}
              className="form-control"
              placeholder="Ownership"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Usage
            </label>
            <input
              type="text"
              name="usage"
              value={""}
              className="form-control"
              placeholder="Usage"
            />
          </div>
        </div>
        {/* End .col-4 */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Floor Number
            </label>
            <input
              type="text"
              name="floor_number"
              value={""}
              className="form-control"
              placeholder="Floor Number eg 02..."
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Year built (numeric)
            </label>
            <input
             type="text" 
             name="year_build"
             className="form-control" 
             placeholder="eg 2023"
             />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Available from (date)
            </label>
            <input
              type="date"
              name="available_data"
              value={""}
              className="form-control"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Parking Available
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="parking_available"
                value={""}
                options={availablity}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Basement
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Extra details
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Roofing
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Exterior Material
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        {/* End .col-4 */}

        
      </div>
      {/* End .row */}

      <div className="row">
        <MultiSelectField />

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Owner/ Agent nots (not visible on front end)
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="There are many variations of passages."
              defaultValue={""}
            />
          </div>
        </div>
        {/* End .col-12 */}
      </div>
    </form>
  );
};

export default DetailsFiled;
