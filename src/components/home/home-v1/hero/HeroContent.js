"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Bedroom from "@/components/listing/sidebar/Bedroom";
import Bathroom from "@/components/listing/sidebar/Bathroom";
const Select = dynamic(() => import("react-select"), { ssr: false });

const HeroContent = () => {
  const [showDropdown, setShowDropdown] = useState(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    bedrooms: "",
    bathrooms: "",
  });

  const handleFilterChange = (filterName, value) => {
    console.log(filterName + ":" + value);
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
  ];

  const structureTypeOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "Villa", label: "Villa" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#0f8363"
        : isHovered
        ? "#ebfff9"
        : isFocused
        ? "#ebfff9"
        : undefined,
    }),
  };
  const handleDoneClick = () => {
    setShowDropdown(null);
  };

  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };

  const filterFunctions = {
    handlebedrooms,
    handlebathroms,
    bedrooms,
    bathroms,
  };

  return (
    <>
      {}
      <div className="advance-search-tab mt70 mt30-md mx-auto animate-up-3 ">
        <ul className="nav nav-tabs p-0 m-0">
          {tabs.map((tab) => (
            <li className="nav-item p-1" key={tab.id}>
              <button
                className={` font-medium  py-2 px-4 ${
                  activeTab === tab.id
                    ? " text-[#0f8363] bg-[#b3ffe995] "
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  borderRadius: '10px'
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content space-y-2">
          {tabs.map((tab) => (
            <div
              className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
              key={tab.id}
            >
              <div className="advance-content-style1">
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="advance-search-field position-relative text-start">
                      <form className="form-search position-relative">
                        <div className="box-search bg-gray-100 bdrs12">
                          <span className="icon flaticon-maps" />
                          <input
                            className="form-control bgc-71  bg-transparent"
                            type="text"
                            name="search"
                            placeholder={`Enter an address, neighborhood, city, or ZIP code for ${tab.label}`}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* End .col-md-8 */}

                  <div className="col-md-4 col-lg-3">
                    <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                      <button
                        className="advance-search-btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModal"
                      >
                        <span className="flaticon-settings" /> Advanced
                      </button>
                      <button
                        className="advance-search-icon ud-btn btn-thm ms-4"
                        onClick={() => router.push("/map-v1")}
                        type="button"
                      >
                        <span className="flaticon-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex sm:flex-row flex-col  justify-start">
            <div className="col-sm-2 col-xl-3">
              <div className="">
                <div className="location-area">
                  <Select
                    key={Date.now()}
                    styles={customStyles}
                    className="home-select-custom h-10"
                    classNamePrefix="select"
                    required
                    defaultValue={structureTypeOptions[0]}
                    name="structureType"
                    options={structureTypeOptions}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <li className="list-inline-item position-relative ">
                <button
                  type="button"
                  className="open-btn mb15 dropdown-toggle border-1 py-[7px]  px-5 rounded-xl border-[#0f8363]"
                  style={{ borderRadius: "5px" }}
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  id="bedsBathsDropdown"
                >
                  Beds / Baths
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
            </div>
          </div>
        </div>
          <div>
            <h6 className="bg-[#297862db] py-2 px-3 rounded-b-xl text-white">Buy / Sell Property Without Brokerage and Hassle Free</h6>
          </div>
      </div>
    </>
  );
};

export default HeroContent;
