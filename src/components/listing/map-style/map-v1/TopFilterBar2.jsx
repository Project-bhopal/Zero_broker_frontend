"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";

const TopFilterBar2 = ({ filterFunctions }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    listingStatus: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
  });
  const router = useRouter(); // Initialize the router

  // Function to handle the selection of filters
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  // Function to handle the "Done" button click in each dropdown
  const handleDoneClick = (dropdownId) => {
    // Close the dropdown by triggering Bootstrap's dropdown hide method
    const dropdownElement = document.getElementById(dropdownId);
    const dropdown = new bootstrap.Dropdown(dropdownElement);
    dropdown.hide();

    // You can handle any additional logic after setting the filter state (optional)
    console.log(`Selected ${dropdownId}: `, selectedFilters[dropdownId]);
  };

  // Function to handle the "Find" button click
  const handleFindClick = () => {
    // Convert the selected filters to query params
    const queryParams = new URLSearchParams(selectedFilters).toString();

    // Update the URL with the selected filters as query params
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
            borderRadius: "2.4rem",
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
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="listingStatusDropdown"
        >
          {filterFunctions?.listingStatus ? filterFunctions?.listingStatus : 'For Sale'}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">Listing Status</h6>
            <div className="radio-element">
              <ListingStatus
                filterFunctions={filterFunctions}
                onChange={(value) => handleFilterChange("listingStatus", value)}
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
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="propertyTypeDropdown"
        >
          {filterFunctions?.propertyTypes ? filterFunctions?.propertyTypes : 'Property Type'}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
            <h6 className="list-title">Property Type</h6>
            <div className="radio-element">

              <PropertyType
                filterFunctions={filterFunctions}
                onChange={(value) => handleFilterChange("propertyType", value)}
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
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="priceRangeDropdown"
        >
          Price <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu dd3">
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Price Range</h6>
            <div className="range-slider-style1">
              <PriceRange
                filterFunctions={filterFunctions}
                onChange={(value) => handleFilterChange("priceRange", value)}
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
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="bedsBathsDropdown"
        >
          Beds / Baths <i className="fa fa-angle-down ms-2" />
        </button>
        <div className="dropdown-menu dd4 pb20">
          <div className="widget-wrapper pl20 pr20">
            <h6 className="list-title">Bedrooms</h6>
            <div className="d-flex">
              <Bedroom
                filterFunctions={filterFunctions}
                onChange={(value) => handleFilterChange("bedrooms", value)}
              />
            </div>
          </div>

          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Bathrooms</h6>
            <div className="d-flex">
              <Bathroom
                filterFunctions={filterFunctions}
                onChange={(value) => handleFilterChange("bathrooms", value)}
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
