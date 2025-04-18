import { usePropertyStore } from "@/store/store";
import React from "react";

const PropertyAddress = ({property}) => {


  return (
    <>
        <div
          className={`col-md-12`}
        >
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Address</p>
              <p className="fw600 mb10 ff-heading dark-color">City</p>
              <p className="fw600 mb-0 ff-heading dark-color">State/county</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{property?.location?.address}</p>
              <p className="text mb10">{property?.location?.city}</p>
              <p className="text mb-0">{property?.location?.emirate}</p>
            </div>
          </div>
        </div>
      {/* End col */}

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${property?.location?.address}&t=m&z=14&output=embed&iwloc=near`}
          title={property?.location?.address}
          aria-label={property?.location?.address}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
