"use client";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const sellers = [
  {
    _id: 1,
    fullname: "hariom Seller",
    email: "hariraykhere.com@gmail.com",
    role:"Seller",
    mobile: "8269281819",
    createdAt: "02/03/2025",
  },
  {
    _id: 1,
    fullname: "Jhon Seller",
    email: "jhon@gmail.com",
    role:"Seller",
    mobile: "6091412609",
    createdAt: "13/03/2025",
  },
  {
    _id: 1,
    fullname: "abhi Seller",
    email: "abhi@gmail.com",
    role:"Seller",
    mobile: "7849687548",
    createdAt: "15/03/2025",
  },
  {
    _id: 1,
    fullname: "abhi Seller",
    email: "abhi11@gmail.com",
    role:"Seller",
    mobile: "7849187529",
    createdAt: "15/03/2025",
  },
  {
    _id: 1,
    fullname: "abhi Seller",
    email: "abhi22@gmail.com",
    role:"Seller",
    mobile: "7849187129",
    createdAt: "15/03/2025",
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

const AllSellersDataTable = ({role}) => {
  // const [sellers, setSellers] = useState([])

  // const { data, error, isLoading, isError } = useAxiosFetch(
  //   `/agents/role/${role}`
  // );
  
  // useEffect(() => {
  //   setSellers(data?.data?.data);
  // }, [data]);


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
        <th scope="col">Name</th>
          <th scope="col">Contacts</th>
          <th scope="col">Role</th>
          <th scope="col">Date Created</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {sellers?.map((seller) => (
          <tr key={seller._id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={seller.imageSrc}
                    alt="agent"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    {seller.fullname}
                </div>
              </div>
            </th>
            <td className="vam">
              <p className="list-text mb-0">{seller.email}</p>
              <p href="#">{seller.mobile}</p>
            </td>
            <td className="vam">{seller.role}</td>
            <td className="vam">{formatDate(seller.createdAt)}</td>
            <td className="vam">
              <div className="d-flex">
                <Link
                  href={`/dashboard/seller/request-to-agent/${seller._id}`}
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${seller._id}`}
                >
                  <span className="fas fa-pen fa" />
                </Link>
                <p
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${seller._id}`}
                  onClick={()=>{handleAgentDeleteClick(seller._id)}}
                >
                  <span className="flaticon-bin" />
                </p>

                <ReactTooltip
                  id={`edit-${seller._id}`}
                  place="top"
                  content="Edit"
                />
                <ReactTooltip
                  id={`delete-${seller._id}`}
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

export default AllSellersDataTable;
