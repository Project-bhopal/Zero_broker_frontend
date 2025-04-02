"use client";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import { IoCheckmarkOutline } from "react-icons/io5";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useAxiosPost from "@/hooks/useAxiosPost";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import useAxiosDelete from "@/hooks/useAxiosDelete";

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
  const [status, setStatus] = useState(null);
  const [id, setId] = useState(null);
    const [pendingAgents, setPendingAgents] = useState([]);
    const [approvedAgents, setApprovedAgents] = useState([]);
    const [message, setMessage] = useState("Agent deleted Successfully");
    const [state, setState] = useState({
      open: false,
      vertical: "top",
      horizontal: "center",
    });
  
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
    const AcceptRequestsMutation = useAxiosPost(`/property/approve/${id}`,{
      onSuccess : (details )=>{
        setMessage(`Property Approved Successfully`)
        setStatus(true)
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
          window.location.reload();
        }, 2000);
      },
      onError : (error) =>{
        setStatus(false)
        setMessage(`Unable to Approve Property`)
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
        }, 3000);
      }
    })
    const DeleteRequestsMutation = useAxiosDelete(`/property/delete/${id}`,{
      onSuccess : (details )=>{
        setMessage(`Property Deleted Successfully`)
        setStatus(true)
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
          window.location.reload();
        }, 2000);
      },
      onError : (error) =>{
        setStatus(false)
        setMessage(`Unable to delete Property`)
        setState((prev) =>({...prev, open: true}))
        setTimeout(() => {
          setState((prev) =>({...prev, open: false}))
        }, 3000);
      }
    })

  const handleApproveClick = () =>{
    AcceptRequestsMutation.mutate()
  }
  const handleDeleteClick = () =>{
    console.log(id)
    DeleteRequestsMutation.mutate()
  }

  const displayedAgents = (selectedValue === "Pending") ? pendingAgents : selectedValue === "Approved" ? approvedAgents : []
  console.log(displayedAgents)
  return (
    <>
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
                    // src={property.developer_notes.images[0]}
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
                    <a href="#">{property?.price} {property.currency}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">{formatDate(property?.listing?.added_on)}</td>
            <td className="vam">
              <span className={getStatusStyle(property?.approval_status?.status)}>
                {property?.approval_status?.status}
              </span>
            </td>
            <td className="vam">
              <div className="flex flex-col justify-center items-center py-5">
                <a className="">Aman Agent</a>
                <a className="">amanchhalotre200@gmail.com</a>
              </div>
              </td>
            <td className="vam">
              <div className="d-flex gap-2">
                {property.approval_status.status !== "Approved"&&<button
                  className="icon flex items-center justify-center"
                  style={{ border: "none" }}
                  data-tooltip-id={`approve-${property._id}`}
                  onClick={()=>{handleApproveClick(); setId(property._id)}}
                >
                  <span><IoCheckmarkOutline /></span>
                </button>}
                <button
                  className="icon "
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${property._id}`}
                  onClick={()=>{handleDeleteClick(); setId(property._id)}}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`approve-${property._id}`}
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
    <StatusSnackbar message={message} state={state} status={status}/>
    </>
  );
};

export default AgentsRequestsDataTable;
