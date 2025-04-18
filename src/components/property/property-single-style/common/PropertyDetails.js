import { usePropertyStore } from "@/store/store";
import React from "react";

const PropertyDetails = ({property}) => {
  
  const columns = [
    [
      // {
      //   label: "Property ID",
      //   value: "RT48",
      // },
      {
        label: "Price",
        value: `${property?.currency} ${property?.price}`,
      },
      {
        label: "Property Size",
        value: `${property?.details?.size?.value}`,
      },
      {
        label: "Bathrooms",
        value: `${property?.details?.bathrooms}`,
      },
      {
        label: "Bedrooms",
        value: `${property?.details?.bedrooms}`,
      },
    ],
    [
      // {
      //   label: "Garage",
      //   value: "2",
      // },
      // {
      //   label: "Garage Size",
      //   value: "200 SqFt",
      // },
      {
        label: "Year Built",
        value: `${property?.building_information?.year_of_completion}`,
      },
      {
        label: "Property Type",
        value: `${property?.details?.property_type}`,
      },
      {
        label: "Property Status",
        value: `For ${property?.details?.purpose}`,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
