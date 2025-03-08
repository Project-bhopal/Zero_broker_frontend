"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";

const TopFilterBar2 = ({ filterFunctions }) => {
  const [showDropdown, setShowDropdown] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    listingStatus: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
  });
  const router = useRouter();

  const toggleDropdown = (dropdownId) => {
    setShowDropdown(showDropdown === dropdownId ? null : dropdownId);
  };


  const handleFilterChange = (filterName, value) => {
    console.log(filterName + ":" + value)
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };


  const handleDoneClick = () => {
    setShowDropdown(null)
  };


  const handleFindClick = () => {
    const queryParams = new URLSearchParams(selectedFilters).toString();
    router.push(`/?${queryParams}`);
  };
  return (
    <>
      {/* Search Bar */}
      <li className="list-inline-item position-relative">
        <div
          className="d-flex align-items-center mb15"
          style={{
            backgroundColor: "var(--styleguide-color-neutral-01, #f7f7f7)",
            borderRadius: "5px",
            cursor: "text",
            padding: "0.8rem 1.2rem",
            width: "100%",
            maxWidth: "600px",
            marginBottom: "1rem",
          }}
        >
          <i className="flaticon-search me-2" style={{ fontSize: "1.2rem" }} />
          <input
            type="text"
            placeholder="City, community or building"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              fontSize: "1rem",
            }}
          />
        </div>
      </li>

      {/* Listing Status Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className={`open-btn mb15 dropdown-toggle dropdown-toggle-custom ${filterFunctions?.listingStatus ? 'selected' : 'default'}`}
          style={{borderRadius : '5px'}}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="listingStatusDropdown"
          onClick={()=> toggleDropdown("listingStatusDropdown")}
        >
          {filterFunctions?.listingStatus ||  'For Sale'}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className={`dropdown-menu ${showDropdown === "listingStatusDropdown" ? "show" : ""}`}>
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">Listing Status</h6>
            <div className="radio-element">
              <ListingStatus
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />

            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              type="button"
              className="done-btn ud-btn btn-thm drop_btn"
              onClick={() => handleDoneClick("listingStatusDropdown")}
            >
              Done
            </button>
          </div>
        </div>
      </li>

      {/* Property Type Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className={`open-btn mb15 dropdown-toggle dropdown-toggle-custom ${filterFunctions?.propertyTypes ? 'selected' : 'default'}`}
          style={{borderRadius : '5px'}}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="propertyTypeDropdown"
          onClick={()=> toggleDropdown("propertyTypeDropdown")}
        >
          {filterFunctions?.propertyTypes || 'Property Type'}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className={`dropdown-menu ${showDropdown === "propertyTypeDropdown" ? "show" : ""}`}>
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">Property Type</h6>
            <div className="radio-element">

              <PropertyType
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              type="button"
              className="done-btn ud-btn btn-thm dropdown-toggle"
              onClick={() => handleDoneClick("propertyTypeDropdown")}
            >
              Done
            </button>
          </div>
        </div>
      </li>

      {/* Price Range Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          style={{borderRadius : '5px'}}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="priceRangeDropdown"
          onClick={()=> toggleDropdown("priceRangeDropdown")}
        >
          Price <i className="fa fa-angle-down ms-2" />
        </button>
        <div className={`dropdown-menu dd3 ${showDropdown === "priceRangeDropdown" ? "show" : ""}`}>
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Price Range</h6>
            <div className="range-slider-style1">
              <PriceRange
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              type="button"
              className="done-btn ud-btn btn-thm drop_btn3"
              onClick={() => handleDoneClick("priceRangeDropdown")}
            >
              Done
            </button>
          </div>
        </div>
      </li>

      {/* Bedrooms and Bathrooms Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          style={{borderRadius : '5px'}}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="bedsBathsDropdown"
          onClick={()=> toggleDropdown("bedsBathsDropdown")}
        >
          Beds / Baths <i className="fa fa-angle-down ms-2" />
        </button>
        <div className={`dropdown-menu dd4 pb20 ${showDropdown === "bedsBathsDropdown" ? "show" : ""}`}>
          <div className="widget-wrapper pl20 pr20">
            <h6 className="list-title">Bedrooms</h6>
            <div className="d-flex">
              <Bedroom
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Bathrooms</h6>
            <div className="d-flex">
              <Bathroom
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              type="button"
              className="done-btn ud-btn btn-thm drop_btn4"
              onClick={() => handleDoneClick("bedsBathsDropdown")}
            >
              Done
            </button>
          </div>
        </div>
      </li>

      {/* More Filters */}
      <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          style={{borderRadius : '5px'}}
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" /> More Filter
        </button>
      </li>

      {/* Find Button */}
      <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          style={{
            borderRadius: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={handleFindClick} // Trigger the Find button action
        >
          Find
        </button>
      </li>
    </>
  );
};

export default TopFilterBar2;
