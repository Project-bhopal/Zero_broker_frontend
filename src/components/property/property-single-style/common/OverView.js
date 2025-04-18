import listings from "@/data/listings";
import { usePropertyStore } from "@/store/store";
import React from "react";


const OverView = ({property}) => {

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: property?.details?.bedrooms,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: property?.details?.bathrooms,
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: property?.building_information?.year_of_completion,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: property?.details?.size?.value,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: property?.details?.property_type,
    },
  ];
  
 
  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
