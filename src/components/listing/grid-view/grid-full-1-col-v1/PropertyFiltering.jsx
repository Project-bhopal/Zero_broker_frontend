"use client";

import listings from "@/data/listings";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import Image from "next/image";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useAxiosPost from "@/hooks/useAxiosPost";
import { useRouter, useSearchParams } from "next/navigation";

export default function PropertyFiltering({showModal, setShowModal}) {
  const [propData, setPropData] = useState([])
  const [searchName, setSearchName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
 
  const {data, isLoading, error, isError} = useAxiosFetch("/property/approved")
  
  useEffect(()=>{
    if(data){
      setPropData(data?.data)
    }
  },[data])
 


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
  const [bathrooms, setBathrooms] = useState(0);
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
    setBathrooms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
  };

  const handlelistingStatus = (elm) => {
    setListingStatus(elm);
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
    setBathrooms(elm);
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
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };


  useEffect(() => {
    const refItems = propData.filter((elm) => {
      if (listingStatus == "All") {
        return true;
      } else if (listingStatus == "Buy") {
        return elm.details.purpose == "Sell";
      } else if (listingStatus == "Rent") {
        return elm.details.purpose == "Rent";
      }
    });
    console.log(listingStatus)
    setPageItems(refItems)
    
    let filteredArrays = [];

    if (propertyTypes.length > 0) {
      filteredArrays.push(refItems.filter((elm) =>
        propertyTypes.includes(elm.details.property_type)));
    }

    filteredArrays.push(refItems.filter((el) => el.details.bedrooms >= bedrooms));
    filteredArrays.push(refItems.filter((el) => el.details.bathrooms >= bathrooms));

    filteredArrays.push(refItems.filter(
      (el) =>
        el.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.location.emirate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.features_amenities.join(" ").toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.other_amenities.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
    ));

    filteredArrays.push(!categories.length
      ? [...refItems]
      : refItems.filter((elm) =>
          categories.every((elem) => elm.features_amenities.includes(elem))));

    if (location != "All Cities") {
      filteredArrays.push(refItems.filter((el) => el.location.city == location));
    }

    if (priceRange.length > 0) {
      filteredArrays.push(refItems.filter(
        (elm) =>
          Number(elm.price) >= priceRange[0] &&
          Number(elm.price) <= priceRange[1]
      ));
    }
    if (squirefeet.length > 0 && squirefeet[1]) {
      filteredArrays.push(refItems.filter(
        (elm) => elm.details.size.value >= squirefeet[0] && elm.details.size.value <= squirefeet[1]
      ));
    }
    if (yearBuild.length > 0) {
      filteredArrays.push(refItems.filter(
        (elm) =>
          elm.building_information.year_of_completion >= yearBuild[0] &&
          elm.building_information.year_of_completion <= yearBuild[1]
      ));
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    setFilteredData(commonItems);
  }, [
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    searchQuery,
    propData
  ]);
  
  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => b.building_information.year_of_completion - a.building_information.year_of_completion
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort((a, b) => a.price - b.price);
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort((a, b) => b.price - a.price);
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

  const mutation = useAxiosPost("/savefilter", {
    onSuccess: (details) => {
      console.log("Search Saved successfully:", details);
      setShowModal(false);
    },
    onError: (error) => {
      console.error("Error Saving Search:", error.response.data.message);
    },
  })

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstWord = window.location.pathname.split("/")[1];
    
    mutation.mutate( {filterName : searchName, })
    
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
          <div className="col-lg-9">
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
              <FeaturedListings colstyle={colstyle} data={propData} setIsScheduleTourModal={setIsScheduleTourModal} />
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
          <div className="col-lg-3 d-none d-lg-block" style={{ paddingLeft: "0px", marginTop: "-70px" }}>
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
              {/* <div style={{ border: "1px solid #ddd", borderRadius: "15px", padding: "20px", backgroundColor: "#fff" }}>
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
              </div> */}
            </div>


          </div>

          {/* End col-4 */}
        </div>
        {/* End TopFilterBar */}
      </div>
      {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleCloseModal}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()} >
                      <h2 className="text-lg font-semibold mb-4">Save Search</h2>
                      <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium mb-2">Search Name:</label>
                        <input
                          type="text"
                          name="search_name"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-md mb-4"
                          required
                        />
                        <div className="flex justify-end gap-2">
                          <button type="button" className="px-4 py-2 bg-[#ebebeb] rounded" onClick={handleCloseModal}>
                            Cancel
                          </button>
                          <button type="submit" className="px-4 py-2 bg-[#188063] text-white rounded">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
      {/* End .container */}
    </section>
  );
}
