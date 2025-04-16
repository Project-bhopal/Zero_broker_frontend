"use client";

import listings from "@/data/listings";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../sidebar/index";
import TopFilterBar from "../map-style/map-v1/TopFilterBar";
import Image from "next/image";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useAxiosPost from "@/hooks/useAxiosPost";
import { useRouter, useSearchParams } from "next/navigation";
import { usePropertyStore } from "@/store/store";
import NewProjects from "./NewProjects";
import PaginationTwo from "../PaginationTwo";

export default function NewProjectListing({
  showModal,
  setShowModal,
  filterFunctions,
  handleFilterChange,
  sortedFilteredData,
  filteredData,
}) {
  const [propData, setPropData] = useState([]);
  const [searchName, setSearchName] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  const [isScheduleTourModal, setIsScheduleTourModal] = useState(false);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  // const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  const { properties } = usePropertyStore();

  useEffect(() => {
    if (properties) {
      setPropData(properties);
    }
  }, [properties]);

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
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstWord = window.location.pathname.split("/")[1];

    mutation.mutate({ filterName: searchName });
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
            <ListingSidebar
              filterFunctions={filterFunctions}
              handleFilterChange={handleFilterChange}
            />
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
              <NewProjects
                colstyle={colstyle}
                data={filteredData}
                setIsScheduleTourModal={setIsScheduleTourModal}
                sortedFilteredData={sortedFilteredData}
              />
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
          <div
            className="col-lg-3 d-none d-lg-block"
            style={{ paddingLeft: "0px", marginTop: "-70px" }}
          >
            {/* Popular Searches */}
            <div style={{ marginTop: "20px" }}>
              <h4 className="ms-8 text-lg">Invest In</h4>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li className="hover:underline cursor-pointer">Off Plan Properties in UAE</li>
                <li className="hover:underline cursor-pointer">Off Plan Apartments in UAE</li>
                <li className="hover:underline cursor-pointer">Off Plan Villas in UAE</li>
                <li className="hover:underline cursor-pointer">
                  Off Plan Residential Plots in UAE
                </li>
              </ul>
            </div>
            {/* Image */}
            <div className="h-[1100px]">
              <Image
                width={300}
                height={300}
                src="/images/listings/propertiesAdsDemo.jpg"
                alt="scroll image"
                style={{ borderRadius: "10px" }}
                className=" sticky top-0"
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>Enter your details to get notified.</h4>
                      <p
                        onClick={() => setIsScheduleTourModal(false)}
                        style={{ cursor: "pointer" }}
                      >
                        X
                      </p>
                    </div>
                    <form>
                      <input
                        type="text"
                        placeholder="Name"
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        style={inputStyle}
                      />
                      <textarea
                        placeholder="Enter Your Messages"
                        style={{
                          ...inputStyle,
                          height: "100px",
                          resize: "none",
                        }}
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
                        Notify Me <i class="fa fa-bell" aria-hidden="true"></i>
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Save Search</h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-2">
                Search Name:
              </label>
              <input
                type="text"
                name="search_name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#ebebeb] rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#188063] text-white rounded"
                >
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
