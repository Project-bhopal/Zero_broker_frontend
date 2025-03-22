import useAxiosFetch from "@/hooks/useAxiosFetch";
import React from "react";

const adminStatisticsData = [
  {
    text: "Total Seller",
    title: "583",
    icon: "flaticon-user",
  },
  {
    text: "Total Agent",
    title: "192",
    icon: "flaticon-user-1",
  },
  {
    text: "Listed Properties",
    title: "43",
    icon: "flaticon-home",
  },
  {
    text: "Total Requests",
    title: "67",
    icon: "",
  },
  {
    text: "Requests Accepted",
    title: "67",
    icon: "flaticon-like",
  },
  {
    text: "Requests Pending",
    title: "67",
    icon: "flaticon-clock",
  },
];

const buyerStatisticsData = [
  {
    text: "Total Credits",
    title: "192",
    icon: "flaticon-search-chart",
  },
  {
    text: "Remaining Credits",
    title: "43",
    icon: "flaticon-review",
  },
  {
    text: "Total Favorites",
    title: "67",
    icon: "flaticon-like",
  },
];

const sellerStatisticsData = [
  {
    text: "All Properties",
    title: "583",
    icon: "flaticon-home",
  },
  {
    text: "Views",
    title: "192",
    icon: "flaticon-search-chart",
  },
  {
    text: "Requested",
    title: "43",
    icon: "flaticon-review",
  },
  {
    text: "Favorites",
    title: "67",
    icon: "flaticon-like",
  },
  {
    text: "Pending",
    title: "67",
    icon: "flaticon-clock",
  },
  {
    text: "Accepted",
    title: "67",
    icon: "flaticon-like",
  },
];

const agentStatisticsData = [
  {
    text: "Pending Requests",
    title: "83",
    icon: "flaticon-clock Requests",
  },
  {
    text: "Accepted Requests",
    title: "102",
    icon: "flaticon-search-chart",
  },
  {
    text: "Listing",
    title: "63",
    icon: "flaticon-home",
  },
  {
    text: "Approved properties",
    title: "47",
    icon: "flaticon-like",
  },
  
];

const TopStateBlock = ({role}) => {

  const { data, isLoading, isError, error } = useAxiosFetch(`/dashboard/${role}`)
  console.log(data?.data)


  return (
    <>
      {role == "seller"&&sellerStatisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
      {role == "buyer"&&buyerStatisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
      {role == "agent"&&agentStatisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
      {role == "admin"&&adminStatisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
    </> 
  );
};

export default TopStateBlock;
