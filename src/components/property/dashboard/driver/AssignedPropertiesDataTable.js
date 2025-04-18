"use client"
import { ApiFetchRequest, ApiPutRequest } from '@/axios/apiRequest';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function AssignedPropertiesDataTable({assignments,}) {
    const [requestData, setRequestData] = useState([]);
    const router = useRouter();
  
  
    // const { data, isLoading, isError, error } = useAxiosFetch("/requestproperty/accepted-by-me");
          

    
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
            <th scope="col">Assigned Date</th>
            <th scope="col">Action</th>
            {/* <th scope="col">Created</th>
            <th scope="col">Action</th> */}
          </tr>
        </thead>
        <tbody className="t-body">
          {assignments?.map((assignment, index) => (
            <tr key={index}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single-v1/${assignment.property._id}`}>
                        {assignment.property.title}
                      </Link>
                    </div>
                    <p className="list-text mb-0">{assignment.property.address}</p>
                    {/* <p className="list-text mb-0">{property.location}</p> */}
                    <div className="list-price">
                      <a href="#">{assignment.property.price} sqft</a>
                    </div>
                  </div>
                </div>
              </th>
              
              <td className="vam">
              <div className="flex flex-col justify-center items-center py-5">
                <a className="">{assignment.property.seller.fullname}</a>
                <a className="">{assignment.property.seller.email}</a>
              </div>
              </td>
              <td className="vam">
                <span>{formatDate(assignment.assignedAt )}</span>
              </td>
              <td className="vam">
                <span>
                <Link
                  href={`/dashboard/driver/add-media/${assignment._id}`}
                  className="py-2 px-4 hover:bg-[#0f8363] border-1 border-[#0f8363] text-[#0f8363] hover:text-white font-semibold rounded-xl"
                  style={{
                    backgroundColor: '#0f8363',
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: 'white'
                  }}
                >
                  Upload
                </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default AssignedPropertiesDataTable