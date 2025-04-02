  "use client"
  import React, { useState } from "react";
  import MultiSelectField from "./MultiSelectField";
  import StructureType from "./StructureType";
  import dynamic from "next/dynamic";

  const Select = dynamic(() => import('react-select'), { ssr: false });

  const DetailsFiled = ({setData}) => {
    const [saved, setSaved] = useState(false)
    const [details, setDetails] = useState({
      property_type : "",
      purpose : "",
      bedrooms :"",
      bathrooms:"",
      size :{
        unite : "sqft",
        value:''
      },
      completion_status :"",
      furnishing :"",
      ownership :"",
      usage :"",
      parking_available : ''
    })

      const purpose = [
        { value: "Rent", label: "Rent" },
        { value: "Sell", label: "Sell" },
      ];
      const parking = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ];
      const completion = [
        { value: "completed", label: "Completed" },
        { value: "underConstruction", label: "Under Construction" },
      ];
      const customStyles = {
        option: (styles, { isFocused, isSelected, isHovered }) => {
          return {
            ...styles,
            backgroundColor: isSelected
            ? "#0f8363"
            : isHovered
            ? "#ebfff9"
            : isFocused
            ? "#ebfff9"
              : undefined,
          };
        },
      };
      const structureTypeOptions = [
        { value: "Apartments", label: "Apartments" },
        { value: "Bungalow", label: "Bungalow" },
        { value: "Houses", label: "Houses" },
        { value: "Loft", label: "Loft" },
        { value: "Office", label: "Office" },
        { value: "Townhome", label: "Townhome" },
        { value: "Villa", label: "Villa" },
      ];
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setDetails((prev) => {
            if (name === "size") {
                return {
                    ...prev,
                    size: {
                        ...prev.size,
                        value: Number(value), 
                        unite : "sqft"
                    },
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    
        setSaved(false);
    };

    
      const handleSelectChange = (selectedOption, { name }) => {
        setDetails((prev) => ({
          ...prev,
          [name]: selectedOption ? selectedOption.value : "",
        }));
        setSaved(false)
      }

      const handleSubmit = (e)=>{
        e.preventDefault()
        setData((prev)=>({...prev, details}))
        setSaved(true)
      }
    return (
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
        <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Select Type
              </label>
              <div className="location-area">
                <Select
                  key={Date.now()}
                  defaultValue={""}
                  name="property_type"
                  value={structureTypeOptions.find(option => option.value === details.property_type)}
                  options={structureTypeOptions}
                  styles={customStyles}
                  onChange={handleSelectChange}
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
                Purpose
              </label>
              <div className="location-area">
                <Select
                  key={Date.now()}
                  defaultValue={""}
                  name="purpose"
                  value={purpose.find(option => option.value === details.purpose)}
                  options={purpose}
                  styles={customStyles}
                  onChange={handleSelectChange}
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
                value={details.size.value}
                className="form-control"
                onChange={handleChange} 
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
                value={details.bedrooms}
                className="form-control"
                onChange={handleChange} 
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
                value={details.bathrooms}
                className="form-control"
                onChange={handleChange} 
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
              <div className="location-area">
                <Select
                  key={Date.now()}
                  defaultValue={""}
                  name="completion_status"
                  value={completion.find(option => option.value === details.completion_status)}
                  options={completion}
                  styles={customStyles}
                  onChange={handleSelectChange}
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
              Furnishing
              </label>
              <input
                type="text"
                name="furnishing"
                value={details.furnishing}
                className="form-control"
                onChange={handleChange} 
                placeholder="Furnishing"
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
                  value={parking.find(option => option.value === details.parking_available)}
                  options={parking}
                  onChange={handleSelectChange}
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
                Ownership
              </label>
              <input
                type="text"
                name="ownership"
                value={details.ownership}
                className="form-control"
                onChange={handleChange} 
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
                value={details.usage}
                className="form-control"
                onChange={handleChange} 
                placeholder="Usage"
              />
            </div>
          </div>
          {/* End .col-4 */}
          
        </div>
        <div className="flex justify-end">
            <button type="submit" disabled={saved} className={`ud-btn ${saved ? "btn-thm" : "btn-white2"} duration-200 flex`}>
            {saved?<>Saved Details <i className="fa fa-check-circle rotate-45"></i></>: <> Save Details</>}
            </button>
          </div>
        {/* End .row */}
      </form>
    );
  };

  export default DetailsFiled;
