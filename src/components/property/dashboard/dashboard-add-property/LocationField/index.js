import React from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";

const LocationField = () => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={""}
              placeholder="Property Address"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={""}
              className="form-control"
              placeholder="Street"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Building Name
            </label>
            <input
              type="text"
              className="form-control"
              name="building_name"
              value={""}
              placeholder="Building Name"
            />
          </div>
        </div>

        {/* End col-12 */}

        <SelectMulitField />

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip</label>
            <input type="text" className="form-control" />
          </div>
        </div> */}
        {/* End col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Neighborhood
            </label>
            <input
              type="text"
              className="form-control"
              name="neighborhood"
              value={""}
              placeholder="Neighborhood"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={""}
              className="form-control"
              placeholder="Landmark"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Apartment Number 
            </label>
            <input
              type="number"
              name="apartment_number"
              value={""}
              className="form-control"
              placeholder="Apartment Number"
            />
          </div>
        </div>

        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Place the listing pin on the map
            </label>
            <Map />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              value={""}
              className="form-control"
              placeholder="Latitude"
              />
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              value={""}
              className="form-control"
              placeholder="Longitude"
              />
          </div>
        </div>
      </div>
      {/* End .row */}
    </form>
  );
};

export default LocationField;
