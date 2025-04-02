"use client";
import React, { useState } from "react";

const locations = [
  { name: "Dubai", count: 1069 },
  { name: "Abu Dhabi", count: 122 },
  { name: "Sharjah", count: 73 },
  { name: "Ras Al Khaimah", count: 53 },
  { name: "Umm Al Quwain", count: 27 },
  { name: "Ajman", count: 12 },
];

const TopFilterBar = ({ setCurrentSortingOption, pageContentTrac }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleLocations = showAll ? locations : locations.slice(0, 3);
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          {/* <p className="pagination_page_count mb-0">
            Showing {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} of {pageContentTrac[2]} results
          </p> */}
        </div>
      </div>
      {/* End .col-sm-6 */}
      <div className="flex md:flex-row flex-col-reverse md:items-stretch items-end gap-4">

      <div className="w-full border rounded-lg px-4 py-2">
        <div className="flex flex-wrap justify-between space-x-5 space-y-2">
          {visibleLocations.map((loc, index) => (
            <a
              href="#"
              key={index}
              style={{ color: "#0f8363", textDecoration: "underline" }}
              className="hover:underline font-semibold"
            >
              {loc.name} <span className="text-gray-500">({loc.count})</span>
            </a>
          ))}
        </div>
        <div className=" text-right">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#0f8363] md:text-base text-sm font-semibold"
          >
            {showAll ? "VIEW FEWER LOCATIONS" : "VIEW MORE LOCATIONS"}
          </button>
        </div>
      </div>

      <div className="w-[230px] border border-[#0f8363] px-2 py-3 rounded-lg">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>
        </div>
      </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
