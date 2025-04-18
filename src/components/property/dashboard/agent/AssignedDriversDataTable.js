"use client";
import { ApiPostRequest, ApiPutRequest } from "@/axios/apiRequest";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import useAxiosPost from "@/hooks/useAxiosPost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

function AssignedDriversDataTable({setShowTable}) {
  const [requestData, setRequestData] = useState([]);
  const router = useRouter();

 
    const { data, isLoading, isError, error } = useAxiosFetch("/driver/agent/assignments");
 

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

  async function handleAcceptClick(id) {
    const response = await ApiPutRequest(`/requestproperty/accept/${id}`)
    // console.log(response.data.status)
    if(response.data.status == "success"){
      setShowTable("Accepted")
      window.location.reload();
      
    }
  }


  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Property Name</th>
          <th scope="col">Seller</th>
          <th scope="col">Driver</th>
          <th scope="col">Assigned</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {requestData?.map((property, index) => (
          <tr key={index}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link href={`/single-v1/${property.property._id}`}>
                      {property.property.title}
                    </Link>
                  </div>
                  <p className="list-text mb-0">{property.property.address}</p>
                  <p className="list-text mb-0">{property.property.type}</p>
                  <p className="font-bold  text-lg">AED {property.property.price}</p>
                    
                </div>
              </div>
            </th>
            <td className="vam">
            <div className="flex flex-col justify-center items-center py-5">
              <a className="">{property.property.seller.fullname}</a>
              <a className="">{property.property.seller.email}</a>
            </div>
            </td>
            <td className="vam">
            <div className="flex flex-col justify-center items-center py-5">
              <a className="">{property.driver.fullname}</a>
              <a className="">{property.driver.email}</a>
              <a className="">{property.driver.mobile}</a>
            </div>
            </td>
            <td className="vam">{formatDate(property.assignedAt)}</td>
            <td className="vam">{property.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssignedDriversDataTable;
