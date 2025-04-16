"use client";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

// const buyers = [
//   {
//     _id: 1,
//     fullname: "Jhon Seller",
//     email: "jhon@gmail.com",
//     role:"Buyer",
//     mobile: "6091412609",
//     createdAt: "13/03/2025",
//   },
//   {
//     _id: 1,
//     fullname: "abhi buyer",
//     email: "abhishekgurjar5020@gmail.com",
//     role:"Buyer",
//     mobile: "7849687574",
//     createdAt: "15/03/2025",
//   },
//   {
//     _id: 1,
//     fullname: "Aman buyer",
//     email: "amanbuyer@gmail.com",
//     role:"Buyer",
//     mobile: "9985478541",
//     createdAt: "18/03/2025",
//   },
//   {
//     _id: 1,
//     fullname: "abhi Seller",
//     email: "abhi11@gmail.com",
//     role:"Buyer",
//     mobile: "7849187529",
//     createdAt: "15/03/2025",
//   },
//   {
//     _id: 1,
//     fullname: "Jhon Seller",
//     email: "abhi1212@gmail.com",
//     role:"Buyer",
//     mobile: "6121412609",
//     createdAt: "19/03/2025",
//   },
// ];

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

const AllDriversDataTable = ({role}) => {
    const [drivers, setDrivers] = useState([])
    
  const { data, error, isLoading, isError } = useAxiosFetch(
    `/agents/role/${role}`
  );
  
  useEffect(() => {
    setDrivers(data?.data?.data);
  }, [data]);

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
          <th scope="col">Listing title</th>
          <th scope="col">Date Published</th>
          <th scope="col">Status</th>
          <th scope="col">View</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
              {drivers?.map((driver) => (
                <tr key={driver._id}>
                  <th scope="row">
                    <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                      <div className="list-thumb">
                        <Image
                          width={110}
                          height={94}
                          className="w-100"
                          src={driver.imageSrc}
                          alt="agent"
                        />
                      </div>
                      <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                          {driver.fullname}
                      </div>
                    </div>
                  </th>
                  <td className="vam">
                    <span className={getStatusStyle(driver?.status)}>
                    <p className="list-text mb-0">{driver.email}</p>
                    <p href="#">{driver.mobile}</p>
                    </span>
                  </td>
                  <td className="vam">{driver.role}</td>
                  <td className="vam">{formatDate(driver.createdAt)}</td>
                  <td className="vam">
                    <div className="d-flex">
                      <Link
                        href={`/dashboard/seller/request-to-agent/${driver._id}`}
                        className="icon"
                        style={{ border: "none" }}
                        data-tooltip-id={`edit-${driver._id}`}
                      >
                        <span className="fas fa-pen fa" />
                      </Link>
                      <p
                        className="icon"
                        style={{ border: "none" }}
                        data-tooltip-id={`delete-${driver._id}`}
                        onClick={()=>{handleAgentDeleteClick(driver._id)}}
                      >
                        <span className="flaticon-bin" />
                      </p>
      
                      <ReactTooltip
                        id={`edit-${driver._id}`}
                        place="top"
                        content="Edit"
                      />
                      <ReactTooltip
                        id={`delete-${driver._id}`}
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

export default AllDriversDataTable;
