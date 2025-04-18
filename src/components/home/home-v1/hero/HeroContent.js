"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

const dummyLocations = [
  "Dubai",
  "Dubai Marina",
  "Downtown Dubai",
  "Dubai Land Residence Complex",
  "Dubai South",
  "Dubailand",
  "Dubai Hills Estate",
];

const HeroContent = () => {
  const [showDropdown, setShowDropdown] = useState(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("for-sale");
  const [propertyTypeOption, setPropertyTypeOption] = useState();
  const [propertyType, setPropertyType] = useState("properties");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("uae");

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const lower = location.toLowerCase();
    const Location = lower.includes(" ") ? lower.replace(/\s+/g, "-") : lower;
    if (propertyType !== "") {
      if (bedrooms) {
        if (bathrooms) {
          router.push(
            `/${activeTab}/${bedrooms}-bedrooms-${propertyType}/${Location}?bathrooms=${bathrooms}`
          );
          return;
        }
        router.push(
          `/${activeTab}/${bedrooms}-bedrooms-${propertyType}/${location}`
        );
        return;
      }
      if (bathrooms) {
        if (bedrooms) {
          router.push(
            `/${activeTab}/${bedrooms}-bedrooms-${propertyType}/${Location}?bathrooms=${bathrooms}`
          );
          return;
        }
        router.push(
          `/${activeTab}/${propertyType}/${location}?bathrooms=${bathrooms}`
        );
        return;
      }
      router.push(`/${activeTab}/${propertyType}/${Location}`);
    }

    if (bedrooms !== 0) {
      if (bathrooms !== 0) {
        router.push(
          `/${activeTab}/${propertyType}/${Location}?bathrooms=${bathrooms}`
        );
        return;
      }
      router.push(
        `/${activeTab}/${bedrooms}-bedrooms-${propertyType}/${Location}`
      );
      return;
    }

    if (bathrooms !== 0) {
      if (bedrooms !== 0) {
        router.push(
          `/${activeTab}/${propertyType}/${Location}?bathrooms=${bathrooms}`
        );
        return;
      }
      router.push(
        `/${activeTab}/${bedrooms}-bedrooms-${propertyType}/${Location}`
      );
      return;
    }
    router.push(`/${activeTab}/${propertyType}/${Location}`);
    return;
  };

  const handlePropertyTypeChange = (selectedOption) => {
    setPropertyTypeOption(selectedOption);
    setPropertyType(selectedOption.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "for-sale", label: "Buy" },
    { id: "for-rent", label: "Rent" },
  ];

  const propertyTypeOptions = [
    { value: "Properties", label: "All Properties" },
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "Villa", label: "Villa" },
  ];

  const bathroomsOptions = [
    { id: "bathany", label: "any", defaultChecked: true, value: 0 },
    { id: "bathoneplus", label: "1+", value: 1 },
    { id: "bathtwoplus", label: "2+", value: 2 },
    { id: "baththreeplus", label: "3+", value: 3 },
    { id: "bathfourplus", label: "4+", value: 4 },
    { id: "bathfiveplus", label: "5+", value: 5 },
  ];

  const bedroomsOptions = [
    { id: "any", label: "any", value: 0, defaultChecked: true },
    { id: "oneplus", label: "1+", value: 1 },
    { id: "twoplus", label: "2+", value: 2 },
    { id: "threeplus", label: "3+", value: 3 },
    { id: "fourplus", label: "4+", value: 4 },
    { id: "fiveplus", label: "5+", value: 5 },
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
  const handlebathrooms = (elm) => {
    setBathrooms(elm);
  };
  const handleProperty = (elm) => {
    setPropertyType(elm);
  };
  const handleLocation = (elm) => {
    setLocation(elm);
  };

  const filterFunctions = {
    handleProperty,
    handlebedrooms,
    handleLocation,
    handlebathrooms,
    location,
    bedrooms,
    bathrooms,
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
    setLocation(value)
    setShowInputDropdown(false);
    filterFunctions.handleLocation(value);
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
      const selectedValue = filtered[highlightedIndex];
      handleSelect(selectedValue);

      // Optional: Clear input DOM directly too
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="advance-search-tab mt70 mt30-md mx-auto animate-up-3 ">
        <ul className="nav nav-tabs p-0 m-0">
          {tabs.map((tab) => (
            <li className="nav-item p-1" key={tab.id}>
              <button
                className={` font-medium  md:py-2 py-1 md:px-4 px-3 ${
                  activeTab === tab.id
                    ? " bg-[#0f8363] text-white"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  borderRadius: "10px",
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
                    <div className="advance-search-field text-start">
                        <div className="box-search bg-gray-100 bdrs12 relative">
                          <i className="icon flaticon-maps" />
                          <input
                            ref={inputRef}
                            className="py-3 bgc-71  bg-transparent"
                            type="text"
                            name="search"
                            autoComplete="off"
                            value={query}
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
                            placeholder={`Enter an address, neighborhood, city, or ZIP code for ${tab.label}`}
                          />
                          {showInputDropdown &&
                            query &&
                            filtered.length > 0 && (
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
                    </div>
                  </div>
                  {/* End .col-md-8 */}

                  <div className="col-md-4 col-lg-3">
                    <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                      <button
                        className="md:w-full w-[40%] bg-[#0f8363] bdrs12 text-white rounded-2xl md:py-[13px] py-[5px] px-0 flex items-center justify-center gap-2"
                        onClick={handleSearch}
                        type="button"
                      >
                        <span className="flaticon-search font-semibold mb-[-5px]" />
                        <span className="font-semibold md:text-lg text-sm">Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="grid md:grid-cols-2 grid-cols-1 justify-start ">
          <div className="">
              <li className="list-inline-item position-relative ">
                <button
                  type="button"
                  className="open-btn mb15 dropdown-toggle border-1 py-[7px] lg:min-w-52 min-w-38 px-5 rounded-xl border-[#0f8363]"
                  style={{ borderRadius: "5px" }}
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  id="bedsBathsDropdown"
                  onClick={() => {
                    setShowDropdown("bedsBathsDropdown");
                  }}
                >
                  {bedrooms !== 0 ? bedrooms : ""} Beds /{" "}
                  {bathrooms !== 0 ? bathrooms : ""} Baths
                </button>
                <div
                  className={`dropdown-menu dd4 pb20 ${
                    showDropdown === "bedsBathsDropdown" ? "show" : ""
                  }`}
                >
                  <div className="widget-wrapper pl20 pr20">
                    <h6 className="list-title">Bedrooms</h6>
                    <div className="d-flex">
                      {/* {Bedrooms} */}
                      {bedroomsOptions.map((option) => (
                        <div className="selection" key={option.id}>
                          <input
                            id={option.id}
                            type="radio"
                            onChange={(e) => {
                              filterFunctions?.handlebedrooms(option.value);
                            }}
                            checked={filterFunctions?.bedrooms == option.value}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                    <h6 className="list-title">Bathrooms</h6>
                    <div className="d-flex">
                      {/* {Bathrooms} */}
                      {bathroomsOptions.map((option) => (
                        <div className="selection" key={option.id}>
                          <input
                            id={option.id}
                            type="radio"
                            checked={bathrooms == option.value}
                            onChange={() => {
                              filterFunctions?.handlebathrooms(option.value);
                            }}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
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
            <div className="">
              <div className="">
                <div className=" selection">
                  <Select
                    key={Date.now()}
                    styles={customStyles}
                    className="home-select-custom h-10 lg:min-w-52 min-w-38"
                    classNamePrefix="select"
                    required
                    defaultValue={propertyTypeOptions[0]}
                    value={propertyTypeOption}
                    name="structureType"
                    onChange={handlePropertyTypeChange}
                    options={propertyTypeOptions}
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div>
          <h6 className="bg-[#297862db] py-2 px-3 rounded-b-xl text-white">
            Buy / Sell Property Without Brokerage and Hassle Free
          </h6>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
