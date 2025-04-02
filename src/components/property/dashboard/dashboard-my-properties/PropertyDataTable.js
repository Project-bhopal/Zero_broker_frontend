"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const propertyData = [
  {
    _id: 1,
    title: "Samana Lake Views",
    imageSrc: "/images/listings/list-1.jpg",
    location: "Dubai Production City (IMPZ)",
    price: "$1,99,900",
    datePublished: "24/03/2025",
    status: "Published",
  },
  {
    _id: 2,
    title: "Forest City Tower",
    imageSrc: "/images/listings/list-2.jpg",
    location: "Majan, Dubai",
    price: "$1,24,080",
    datePublished: "24/03/2025",
    status: "Pending",
  },
  {
    _id: 3,
    title: "Palatium Residences",
    imageSrc: "/images/listings/list-3.jpg",
    location: " JVC District 14, Jumeirah Village Circle (JVC)",
    price: "$1,12,900",
    datePublished: "23/03/2025",
    status: "Pending",
  },
  {
    _id: 4,
    title: "Guzel Towers Block B",
    imageSrc: "/images/listings/list-4.jpg",
    location: "Guzel Towers, JVT District 1, Dubai",
    price: "$1,00,000",
    datePublished: "25/03/2025",
    status: "Pending",
  },
  {
    _id: 5,
    title: "Cotier House by Imtiaz",
    imageSrc: "/images/listings/list-5.jpg",
    location: "Dubai Islands, Dubai",
    price: "$80,890",
    datePublished: "23/2/03/2025",
    status: "Pending",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = () => {
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Listing title</th>
          <th scope="col">Date Published</th>
          <th scope="col">Status</th>
          <th scope="col">View</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {propertyData.map((property) => (
          <tr key={property._id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={property.imageSrc}
                    alt="property"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/single-v1/${property.id}`}>{property.title}</Link>
                  </div>
                  <p className="list-text mb-0">{property.location}</p>
                  <div className="list-price">
                    <a href="#">{property.price}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">{property.datePublished}</td>
            <td className="vam">
              <span className={getStatusStyle(property.status)}>
                {property.status}
              </span>
            </td>
            <td className="vam">{property.datePublished}</td>
            <td className="vam">
              <div className="d-flex">
                <Link
                  href={`/dashboard/seller/request-to-agent/${property._id}`}
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${property._id}`}
                >
                  <span className="fas fa-pen fa" />
                </Link>
                <Link
                  href={`/dashboard/seller/request-to-agent/${property._id}`}
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${property._id}`}
                >
                  <span className="flaticon-bin" />
                </Link>

                <ReactTooltip
                  id={`edit-${property._id}`}
                  place="top"
                  content="Edit"
                />
                <ReactTooltip
                  id={`delete-${property._id}`}
                  place="top"
                  content="Delete"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
