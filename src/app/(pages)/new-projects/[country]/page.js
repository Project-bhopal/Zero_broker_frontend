"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import TopFilterBar2 from "@/components/listing/map-style/map-v1/TopFilterBar2";
import NewProjectListing from "@/components/listing/new-project/NewProjectListing";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useNewProjectFilter from "@/hooks/useNewProjectFilter";

import { useEffect, useState } from "react";

const locations = [
  { name: "Dubai", count: 1069 },
  { name: "Abu Dhabi", count: 122 },
  { name: "Sharjah", count: 73 },
  { name: "Ras Al Khaimah", count: 53 },
  { name: "Umm Al Quwain", count: 27 },
  { name: "Ajman", count: 12 },
];

const Commercial = () => {
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const visibleLocations = showAll ? locations : locations.slice(0, 3);
 
  const handleSaveSearchClick = () => {
    setShowModal(true);
  };

  const { data, isLoading, error, isError } = useAxiosFetch("/property/approved");


  const {handleFilterChange, filterFunctions, selectedFilter,  listingStatus, sortedFilteredData} = useNewProjectFilter();


  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <div className="d-flex w-full justify-content-center align-items-center xl:h-[120px] md:h-[170px]">
        <div>
          <div className="advance-feature-modal">
            <div
              className="modal fade"
              id="advanceSeachModal"
              tabIndex={-1}
              aria-labelledby="advanceSeachModalLabel"
              aria-hidden="true"
            >
              <AdvanceFilterModal filterFunctions={filterFunctions} />
            </div>
          </div>

          <div className="col-lg-12" style={{ marginTop: "15px" }}>
            <div className="advance-search-list d-flex justify-content-between">
              <div className="dropdown-lists">
                <ul className="p-0 mb-0">
                  <TopFilterBar2
                    filterFunctions={filterFunctions}
                    handleFilterChange={handleFilterChange}
                  />
                </ul>
                <button
                  className="hover:underline text-[#0a644a]"
                  onClick={handleSaveSearchClick}
                >
                  Save Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="flex md:flex-row flex-col items-center w-[74%]">
            <div className="md:w-1/2">
              <div className="breadcumb-style1">
                <h2 className="title">New Projects in UAE </h2>
                <div className="breadcumb-list">
                  <a href="/" style={{ color: "#1E6753" }}>
                    Home
                  </a>
                  <a
                    href={`/${selectedFilter}/properties`}
                    style={{ color: "#0f8363" }}
                  >
                    {listingStatus}
                  </a>
                </div>
                {/* <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a> */}
              </div>
            </div>

            {/* <div className="md:w-1/2 border rounded-lg px-4 py-2 md:mt-0 mt-2">
              <div className="flex flex-wrap gap-4">
                {visibleLocations.map((loc, index) => (
                  <a href="#" key={index} style={{color : "#0f8363" , textDecoration : "underline"}} className="hover:underline">
                    {loc.name}{" "}
                    <span className="text-gray-500">({loc.count})</span>
                  </a>
                ))}
              </div>
              <div className="mt-1 text-right">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[#0f8363] md:text-base text-sm font-semibold"
                >
                  {showAll ? "VIEW FEWER LOCATIONS" : "VIEW MORE LOCATIONS"}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <NewProjectListing
        showModal={showModal}
        setShowModal={setShowModal}
        filteredData={data?.data}
        handleFilterChange={handleFilterChange}
        sortedFilteredData={sortedFilteredData}
      />

      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Commercial;
