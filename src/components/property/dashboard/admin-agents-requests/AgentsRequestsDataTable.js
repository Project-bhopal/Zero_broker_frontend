"use client";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useAxiosPost from "@/hooks/useAxiosPost";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const propertyData = [
  {
    _id: 1,
    title: "Equestrian Family Home",
    imageSrc: "/images/listings/list-1.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Pending",
  },
  {
    _id: 2,
    title: "Luxury villa in Rego Park",
    imageSrc: "/images/listings/list-2.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Published",
  },
  {
    _id: 3,
    title: "Villa on Hollywood Boulevard",
    imageSrc: "/images/listings/list-3.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Processing",
  },
  {
    _id: 4,
    title: "Equestrian Family Home",
    imageSrc: "/images/listings/list-4.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Pending",
  },
  {
    _id: 5,
    title: "Luxury villa in Rego Park",
    imageSrc: "/images/listings/list-5.jpg",
    location: "California City, CA, USA",
    price: "$14,000/mo",
    datePublished: "December 31, 2022",
    status: "Published",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Approved":
      return "pending-style style2";
    default:
      return "";
  }
};

const AgentsRequestsDataTable = ({agentsRequests, selectedValue}) => {
    const [pendingAgents, setPendingAgents] = useState([]);
    const [approvedAgents, setApprovedAgents] = useState([]);
  
    useEffect(() => {
      if (agentsRequests?.length > 0) {
        const pending = agentsRequests.filter(
          (property) => property.approval_status.status === "Pending"
        );
        const approved = agentsRequests.filter(
          (property) => property.approval_status.status === "Approved"
        );
  
        setPendingAgents(pending);
        setApprovedAgents(approved);
      }
    }, [agentsRequests]);

    function formatDate(dateString) {
        if (!dateString) return "Invalid Date"; // Handle empty or undefined input
    
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid Date"; // Handle invalid date formats
    
        const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`; // Returns DD/MM/YYYY
      }
    const AcceptRequestsMutation = useAxiosPost("/property/approve/")
  const handleAgentRequestsAcceptClick = async(id) =>{
    AcceptRequestsMutation.mutate(id,{
      onSuccess : (details )=>{
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
          window.location.reload();
        }, 3000);
        setStatus(true)
      },
      onError : (error) =>{
        setStatus(false)
        setMessage("Unable to delete Agent")
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
        }, 3000);
      }
    })
  }

  const displayedAgents = selectedValue === "Pending" ? pendingAgents : approvedAgents;
  console.log(displayedAgents)
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Listing title</th>
          <th scope="col">Date Requested</th>
          <th scope="col">Status</th>
          <th scope="col">Agent</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {displayedAgents?.map((property) => (
          <tr key={property._id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={""}
                    alt="property"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/single-v1/${property._id}`}>{property?.name}</Link>
                  </div>
                  <p className="list-text mb-0">{property?.location?.address || property?.location?.city}</p>
                  <div className="list-price">
                    <a href="#">{property?.price}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">{formatDate(property?.listing?.added_on)}</td>
            <td className="vam">
              <span className={getStatusStyle(property?.approval_status?.status)}>
                {property?.approval_status?.status}
              </span>
            <td className="vam">{property?.approval_status?.approved_to}</td>
            </td>
            <td className="vam">
              <div className="d-flex gap-2">
                <button
                  className="px-3 rounded bg-[#0f83623d] text-[#0f8363] "
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${property._id}`}
                  onClick={()=>{handleAgentRequestsAcceptClick(property._id)}}
                >
                  <span className="fas fa-check" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${property._id}`}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`edit-${property._id}`}
                  place="top"
                  content="Approve"
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

export default AgentsRequestsDataTable;
