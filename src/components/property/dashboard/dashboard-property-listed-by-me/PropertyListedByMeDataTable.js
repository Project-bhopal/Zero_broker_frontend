"use client"
import { ApiFetchRequest, ApiPutRequest } from '@/axios/apiRequest';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { useUserStore } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function PropertyListedByMeDataTable() {
    const [requestData, setRequestData] = useState([]);
    const [id, setId] = useState("")
    const router = useRouter();
    const {user} = useUserStore();
  
  
    const { data, isLoading, isError, error } = useAxiosFetch(`/property/getPropertiesByAgent/${localStorage.getItem("id")}`);

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
  
  
    return (
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Property Name</th>
            <th scope="col">Requested By</th>
            <th scope="col">Requested Date</th>
            <th scope="col">Status</th>
            <th scope="col">Listed Date</th>
            {/* <th scope="col">Created</th>
            <th scope="col">Action</th> */}
          </tr>
        </thead>
        <tbody className="t-body">
          {requestData?.map((property, index) => (
            <tr key={index}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-thumb">
                    <Image
                      width={110}
                      height={94}
                      className="w-100"
                      src={'/images/listings/list-1.jpg'}
                      alt="property"
                    />
                  </div>
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single-v1/${property._id}`}>
                        {property.name}
                      </Link>
                    </div>
                    <p className="list-text mb-0">{property.location.address}</p>
                    <p className="list-text mb-0">{property.location.city}</p>
                    <p className="list-text mb-0">{property.location.country}</p>
                    <div className="list-price">
                      <a href="#">{property.details.size.value} sqft</a>
                    </div>
                  </div>
                </div>
              </th>
              
              <td className="vam">
              <div className="flex flex-col justify-center items-center py-5">
                <a className="">{property.seller?.fullname}</a>
                <a className="">{property.seller?.email}</a>
              </div>
              </td>
              <td className="vam">{formatDate(property.requested_id.createdAt)}</td>
              <td className="vam">
              <span className={getStatusStyle(property.approval_status.status)}>
                {property.approval_status.status}
              </span>
            </td>
              <td className="vam">
                <span>{formatDate(property.created_at)}</span>
              </td>
              
              {/* <td className="vam">
                <div className="flex gap-2">
                  <button
                    className="py-1 px-2 bg-[#0f8363] text-white rounded-xl"
                    style={{
                      borderRadius: "10px",
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      handleAcceptClick(property._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default PropertyListedByMeDataTable