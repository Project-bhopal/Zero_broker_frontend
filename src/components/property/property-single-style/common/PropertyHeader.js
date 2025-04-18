"use client";

import { usePropertyStore } from "@/store/store";
import React from "react";

const PropertyHeader = ({property}) => {
  
  return (
    <>
      <div className="col-lg-8 ">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{property?.name}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {property?.location?.address}
            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For {property?.details?.puspose ? "rent" : "sale"}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
              style={{color : "#0f8363"}}
            >
              <i className="far fa-clock pe-2" />
              {Number(new Date().getFullYear()) -
                Number(property?.building_information?.year_of_completion)}{" "}
              years ago
            </a>
          </div>
          <h1 className="mb-0">{property?.currency} {property?.price}</h1>
            {/* <p className="text space fz15">
              $
              {(
                Number(property?.price?.split("$")[1].split(",").join("")) / property?.details?.size?.value
              ).toFixed(2)}
              /sq ft
            </p> */}
          {/* <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-bed pe-2 align-text-top" />
              {property?.details?.bedrooms} bed
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-shower pe-2 align-text-top" />
              {property?.details?.bathrooms} bath
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {property?.details?.size?.value} sqft
            </a>
          </div> */}
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#" style={{color : "#0f8363"}}>
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#" style={{color : "#0f8363"}}>
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#" style={{color : "#0f8363"}}>
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#" style={{color : "#0f8363"}}>
                <span className="flaticon-printer" />
              </a>
            </div>
            
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
