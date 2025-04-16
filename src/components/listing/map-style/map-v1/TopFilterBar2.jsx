"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";
import MoreFilters from "../../sidebar/MoreFilters";
import { IoCloseOutline } from "react-icons/io5";

const dummyLocations = [
  "Dubai",
  "Dubai Marina",
  "Downtown Dubai",
  "Dubai Land Residence Complex",
  "Dubai South",
  "Dubailand",
  "Dubai Hills Estate",
];

const TopFilterBar2 = ({ filterFunctions, handleFilterChange }) => {
  const [showDropdown, setShowDropdown] = useState(null);
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

  const handleDoneClick = () => {
    setShowDropdown(null);
  };

  const handleFindClick = () => {
    const fullPath = window.location.href;
    const baseURL = window.location.origin + "/";
    const relativePath = fullPath.replace(baseURL, "");
    console.log(relativePath);
  };

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [selectedTag, setSelectedTag] = useState(
    filterFunctions.location || null
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    const matches = dummyLocations.filter((loc) =>
      loc.toLowerCase().includes(input.toLowerCase())
    );
    setFiltered(matches);
    setShowInputDropdown(true);
    setHighlightedIndex(0);
  };

  const handleSelect = (value) => {
    setSelectedTag(value);
    setQuery(value);
    setShowInputDropdown(false);
    filterFunctions.handlelocation(value);
    handleFilterChange("location", value);
    setQuery("");
  };
  const removeTag = () => {
    setSelectedTag(null);
    setTimeout(() => inputRef.current?.focus(), 0);
    handleFilterChange("location", "uae"); // Refocus input
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const lower = filtered[highlightedIndex].toLowerCase();
      const lowerdLocation = lower.includes(" ")
        ? lower.replace(/\s+/g, "-")
        : lower;
      if (lowerdLocation) {
        handleSelect(lowerdLocation);
        setQuery("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }

      setQuery("");
      // Optional: Clear input DOM directly too
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      {/* Search Bar */}
      <li className="list-inline-item position-relative">
        <div
          className="d-flex align-items-center md:w-[580px] w-full relative"
          style={{
            backgroundColor: "var(--styleguide-color-neutral-01, #f7f7f7)",
            borderRadius: "5px",
            cursor: "text",
            padding: "0.8rem 1.2rem",
            marginBottom: "1rem",
          }}
        >
          <i className="flaticon-maps me-2" style={{ fontSize: "1.2rem" }} />

          {selectedTag && selectedTag !== "Uae" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <span style={{ fontWeight: 500 }} className="text-nowrap">
                {selectedTag}
              </span>
              <button
                onClick={removeTag}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <IoCloseOutline />
              </button>
            </div>
          )}

          <>
            <input
              ref={inputRef}
              type="text"
              placeholder={`${
                !selectedTag || selectedTag == "Uae" ? "City, Location" : ""
              } `}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontSize: "1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                setShowDropdown(true);
                const matches = dummyLocations.filter((loc) =>
                  loc.toLowerCase().includes(query.toLowerCase())
                );
                setFiltered(matches);
              }}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </>

          {showInputDropdown && query && filtered.length > 0 && (
            <div className="absolute top-full left-0 w-full border border-gray-200 rounded bg-white shadow-md z-10 max-h-60 overflow-y-auto mt-1">
              {filtered.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left px-4 py-2 border-b border-gray-100 cursor-pointer 
                    ${index === highlightedIndex ? "bg-gray-200" : "bg-white"} 
                    hover:bg-gray-100 focus:outline-none`}
                  onMouseDown={(e) => e.preventDefault()} // avoid blur
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </li>

      {/* Listing Status Dropdown */}
      <li className="list-inline-item position-relative">
        <button
          type="button"
          className={`open-btn mb15 dropdown-toggle dropdown-toggle-custom  ${
            filterFunctions?.listingStatus ? "selected" : "default"
          }`}
          style={{ borderRadius: "5px" }}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="listingStatusDropdown"
          onClick={() => toggleDropdown("listingStatusDropdown")}
        >
          {filterFunctions?.listingStatus || "For Sale"}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div
          className={`dropdown-menu ${
            showDropdown === "listingStatusDropdown" ? "show" : ""
          }`}
        >
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
          className={`open-btn mb15 dropdown-toggle dropdown-toggle-custom ${
            filterFunctions?.propertyTypes ? "selected" : "default"
          }`}
          style={{ borderRadius: "5px" }}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="propertyTypeDropdown"
          onClick={() => toggleDropdown("propertyTypeDropdown")}
        >
          {filterFunctions?.propertyTypes || "Property Type"}
          <i className="fa fa-angle-down ms-2" />
        </button>
        <div
          className={`dropdown-menu ${
            showDropdown === "propertyTypeDropdown" ? "show" : ""
          }`}
        >
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
          style={{ borderRadius: "5px" }}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="priceRangeDropdown"
          onClick={() => toggleDropdown("priceRangeDropdown")}
        >
          Price <i className="fa fa-angle-down ms-2" />
        </button>
        <div
          className={`dropdown-menu dd3 ${
            showDropdown === "priceRangeDropdown" ? "show" : ""
          }`}
        >
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <h6 className="list-title">Price (AED)</h6>
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
          style={{ borderRadius: "5px" }}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="bedsBathsDropdown"
          onClick={() => toggleDropdown("bedsBathsDropdown")}
        >
          {filterFunctions?.bedrooms !== 0 ? filterFunctions.bedrooms : ""} Beds
          / {filterFunctions?.bathrooms !== 0 ? filterFunctions.bathrooms : ""}{" "}
          Baths <i className="fa fa-angle-down ms-2" />
        </button>
        <div
          className={`dropdown-menu dd4 pb20 ${
            showDropdown === "bedsBathsDropdown" ? "show" : ""
          }`}
        >
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
      {/* <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          style={{borderRadius : '5px'}}
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" /> More Filter
        </button>
      </li> */}

      <li className="list-inline-item position-relative">
        <button
          type="button"
          className="open-btn mb15 dropdown-toggle"
          style={{ borderRadius: "5px" }}
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="moreFilterDropdown"
          onClick={() => toggleDropdown("moreFilterDropdown")}
        >
          More Filters <i className="flaticon-settings ms-2" />
        </button>
        <div
          className={`dropdown-menu dd3 ${
            showDropdown === "moreFilterDropdown" ? "show" : ""
          }`}
        >
          <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
            <div className="range-slider-style1">
              <MoreFilters
                filterFunctions={filterFunctions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="text-end mt10 pr10">
            <button
              type="button"
              className="done-btn ud-btn btn-thm drop_btn3"
              onClick={() => handleDoneClick("moreFilterDropdown")}
            >
              Done
            </button>
          </div>
        </div>
      </li>

      {/* Find Button */}
      {/* <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          style={{
            borderRadius: "10px",
            backgroundColor: "#0f8363",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            fontWeight: "normal",
          }}
          onClick={handleFindClick} // Trigger the Find button action
        >
          Find
        </button>
      </li> */}
    </>
  );
};

export default TopFilterBar2;
