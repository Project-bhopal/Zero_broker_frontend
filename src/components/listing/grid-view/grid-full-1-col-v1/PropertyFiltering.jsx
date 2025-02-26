"use client";

import listings from "@/data/listings";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import Image from "next/image";

export default function PropertyFiltering() {
  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 4, pageNumber * 4),
    );
    setPageContentTrac([
      (pageNumber - 1) * 4 + 1,
      pageNumber * 4,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleTourModal, setIsScheduleTourModal] = useState(false);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm],
      );
    }
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    console.log(elm);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm],
      );
    }
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,

    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };

  useEffect(() => {
    const refItems = listings.filter((elm) => {
      if (listingStatus == "All") {
        return true;
      } else if (listingStatus == "Buy") {
        return !elm.forRent;
      } else if (listingStatus == "Rent") {
        return elm.forRent;
      }
    });

    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      const filtered = refItems.filter((elm) =>
        propertyTypes.includes(elm.propertyType),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.bed >= bedrooms),
    ];
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => el.bath >= bathroms),
    ];

    filteredArrays = [
      ...filteredArrays,
      refItems.filter(
        (el) =>
          el.city
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.location
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.title
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.features
            .join(" ")
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()),
      ),
    ];

    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) =>
          categories.every((elem) => elm.features.includes(elem)),
        ),
    ];

    if (location != "All Cities") {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter((el) => el.city == location),
      ];
    }

    if (priceRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          Number(elm.price.split("$")[1].split(",").join("")) >=
          priceRange[0] &&
          Number(elm.price.split("$")[1].split(",").join("")) <= priceRange[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (squirefeet.length > 0 && squirefeet[1]) {
      const filtered = refItems.filter(
        (elm) => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item)),
    );

    setFilteredData(commonItems);
  }, [
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    searchQuery,
  ]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding,
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join(""),
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join(""),
      );
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);
  const inputStyle = {
    width: "100%", // The width of the input field (100% of the container's width)
    padding: "10px", // Padding inside the input field
    marginBottom: "10px", // Space below each input field
    border: "1px solid #ddd", // Border style
    borderRadius: "8px", // Rounded corners
    fontSize: "14px", // Font size
    color: "#555", // Text color
  };

  return (
    <section className="pt0 pb90 bgc-f7">


      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          // tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        <div className="row gx-xl-5">
          <div className="col-lg-8">
            <div className="row align-items-center mb20">
              <TopFilterBar
                pageContentTrac={pageContentTrac}
                colstyle={colstyle}
                setColstyle={setColstyle}
                setCurrentSortingOption={setCurrentSortingOption}
              />
            </div>
            {/* End .row */}

            <div className="row mt15">
              <FeaturedListings colstyle={colstyle} data={pageItems} setIsScheduleTourModal={setIsScheduleTourModal} />
            </div>
            {/* End .row */}

            <div className="row text-center">
              <PaginationTwo
                pageCapacity={4}
                data={sortedFilteredData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
            {/* End .row */}
          </div>
          {/* End col-8 */}

          {/* <div className="col-lg-4 d-none d-lg-block">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div> */}
          <div className="col-lg-4 d-none d-lg-block" style={{ paddingLeft: "0px", marginTop: "55px" }}>
            {/* Image */}
            <Image
              width={300}
              height={300}
              src="/images/listings/propertiesAdsDemo.jpg"
              alt="scroll image"
              style={{ borderRadius: "10px" }}
            />

            {/* Popular Searches */}
            <div style={{ marginTop: "20px" }}>
              <h4>Popular Searches</h4>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Properties for sale</li>
                <li>Apartments for sale</li>
                <li>Villas for sale</li>
                <li>Townhouses for sale</li>
                <li>Penthouses for sale</li>
                <li>Compounds for sale</li>
                <li>Duplexes for sale</li>
                <li>Land for sale</li>
                <li>Bungalows for sale</li>
                <li>Hotel apartments for sale</li>
                <li>1 bedroom properties for sale</li>
                <li>2 bedroom properties for sale</li>
                <li>3 bedroom properties for sale</li>
                <li>4 bedroom properties for sale</li>
                <li>5 bedroom properties for sale</li>
              </ul>
            </div>

            {/* Nearby Areas */}
            <div style={{ marginTop: "20px" }}>
              <h4>Nearby Areas</h4>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Properties for sale in Dubai</li>
                <li>Properties for sale in Abu Dhabi</li>
                <li>Properties for sale in Ajman</li>
                <li>Properties for sale in Sharjah</li>
                <li>Properties for sale in Ras Al Khaimah</li>
              </ul>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4>Properties for Rent</h4>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Properties for rent</li>
              </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", }}>
              {/* Schedule a Tour Section */}
              {/* <div style={{ border: "1px solid #ddd", borderRadius: "15px", padding: "20px", backgroundColor: "#fff"}}>
                <h4>Schedule a tour</h4>
                <form>
                  <input
                    type="text"
                    placeholder="Time"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                  />
                  <textarea
                    placeholder="Enter Your Messages"
                    style={{ ...inputStyle, height: "100px", resize: "none" }}
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "15px",
                      backgroundColor: "#f56b51",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Submit a Tour Request
                  </button>
                </form>
              </div> */}
              {isScheduleTourModal && (
                <div
                  style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "1000",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      maxWidth: "500px",
                      border: "1px solid #ddd",
                      borderRadius: "15px",
                      padding: "20px",
                      backgroundColor: "#fff",
                    }}
                  ><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4>Schedule a tour</h4>
                      <p
                        onClick={() => setIsScheduleTourModal(false)}
                        style={{cursor:"pointer"}}
                      >
                        X
                      </p>
                    </div>
                    <form>
                      <input
                        type="text"
                        placeholder="Time"
                        style={inputStyle}
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        style={inputStyle}
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        style={inputStyle}
                      />
                      <textarea
                        placeholder="Enter Your Messages"
                        style={{ ...inputStyle, height: "100px", resize: "none" }}
                      ></textarea>
                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "15px",
                          backgroundColor: "#0f8363",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Submit a Tour Request
                      </button>
                    </form>
                  </div>
                </div>
              )}


              {/* Get More Information Section */}
              <div style={{ border: "1px solid #ddd", borderRadius: "15px", padding: "20px", backgroundColor: "#fff" }}>
                <h4>Get More Information</h4>
                <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px" }}>
                  <Image
                    width={100}
                    height={100}
                    src="/images/listings/demoAgent.jpg"
                    alt="scroll image"
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Arlene McCoy</p>
                    <p style={{ margin: 0, color: "#555" }}>(920) 012-3421</p>
                    <a href="#" style={{ textDecoration: "underline", color: "#f56b51" }}>
                      View Listings
                    </a>
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #000",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Contact Agent
                </button>
              </div>
            </div>


          </div>

          {/* End col-4 */}
        </div>
        {/* End TopFilterBar */}
      </div>
      {/* End .container */}
    </section>
  );
}
