"use client";
import { ApiFetchRequest, ApiPutRequest } from "@/axios/apiRequest";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MediaRequestRejectedDataTable() {
  const [requestData, setRequestData] = useState([]);
  const router = useRouter();

  const { data, isLoading, isError, error } = useAxiosFetch(
    "/requestproperty/accepted-by-me"
  );

  useEffect(() => {
    if (data) {
      setRequestData(data.data);
    }
  }, [data]);

  useEffect(() => {
    console.log(requestData);
  }, [requestData]);

  function formatDate(dateString) {
    if (!dateString) return "Invalid Date"; // Handle empty or undefined input

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date formats

    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Returns DD/MM/YYYY
  }

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Property Name</th>
          <th scope="col">Assigned By</th>
          <th scope="col">Requested Date</th>
          <th scope="col">Rejected Date</th>
          <th scope="col">Reason</th>

          {/* <th scope="col">Created</th>
            <th scope="col">Action</th> */}
        </tr>
      </thead>
      <tbody className="t-body">
        {requestData?.map((property, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/single-v1/${property._id}`}>
                      {property.propertyName}
                    </Link>
                  </div>
                  <p className="list-text mb-0">{property.address}</p>
                  <p className="list-text mb-0">{property.location}</p>
                  <div className="list-price">
                    <a href="#">{property.area} sqft</a>
                  </div>
                </div>
              </div>
            </th>

            <td className="vam">{formatDate(property.createdAt)}</td>
            <td className="vam">
              <span>{formatDate(property.rejectedData)}</span>
            </td>
            <td className="vam">
              <div className="flex gap-2 items-center">
                <div className="relative group cursor-pointer">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-max px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    This is your helpful message!
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MediaRequestRejectedDataTable;
