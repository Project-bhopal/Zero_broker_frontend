"use client";
import { ApiDeleteRequest } from "@/axios/apiRequest";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import useAxiosDelete from "@/hooks/useAxiosDelete";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const AllAgentsDataTable = ({agents}) => {
  const [status, setStatus]  = useState(null);
  const [message, setMessage] = useState("Agent deleted Successfully")
   const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
    const router = useRouter();
    const deleteAgentMutation = useAxiosDelete(`/agents/delete/`)

    const handleAgentDeleteClick = async(id) =>{
      deleteAgentMutation.mutate(id,{
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
  return (
    <>
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
        {agents.map((agent) => (
          <tr key={agent._id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <Image
                    width={110}
                    height={94}
                    className="w-100"
                    src={agent.imageSrc}
                    alt="agent"
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <Link href={`/single-v1/${agent._id}`}>{agent.fullname}</Link>
                </div>
              </div>
            </th>
            <td className="vam">
              <span className={getStatusStyle(agent?.status)}>
              <p className="list-text mb-0">{agent.email}</p>
              <p href="#">{agent.mobile}</p>
              </span>
            </td>
            <td className="vam">{agent.role}</td>
            <td className="vam">{agent.createdAt}</td>
            <td className="vam">
              <div className="d-flex">
                <Link
                  href={`/dashboard/seller/request-to-agent/${agent._id}`}
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${agent._id}`}
                >
                  <span className="fas fa-pen fa" />
                </Link>
                <p
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${agent._id}`}
                  onClick={()=>{handleAgentDeleteClick(agent._id)}}
                >
                  <span className="flaticon-bin" />
                </p>

                <ReactTooltip
                  id={`edit-${agent._id}`}
                  place="top"
                  content="Edit"
                />
                <ReactTooltip
                  id={`delete-${agent._id}`}
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

export default AllAgentsDataTable;
