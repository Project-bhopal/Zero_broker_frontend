import React, { useState } from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";

const LocationField = ({setData}) => {
  const [saved, setSaved] = useState(false)
  const [location, setLocation] = useState({
    country: "",
    emirate: "",
    city: "",
    landmark: "",
    address: "",
    latitude: "",
    longitude: "",
    neighborhood: "",
    street: "",
    building_name: "",
    apartment_number: "",
    floor_number: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleLocationSubmit =(e) =>{
    e.preventDefault();
    setData((prev)=>({...prev, location}))
    setSaved(true)

  }
  return (
    <form className="form-style1" onSubmit={handleLocationSubmit} >
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
              value={location.address}
              onChange={handleChange}
              placeholder="Property Address"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Street</label>
            <input
              type="text"
              name="street"
              value={location.street}
              onChange={handleChange}
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
              value={location.building_name}
              onChange={handleChange}
              placeholder="Building Name"
            />
          </div>
        </div>

        <SelectMulitField location={location} setLocation={setLocation}/>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Neighborhood
            </label>
            <input
              type="text"
              className="form-control"
              name="neighborhood"
              value={location.neighborhood}
              onChange={handleChange}
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
              value={location.landmark}
              onChange={handleChange}
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
              value={location.apartment_number}
              onChange={handleChange}
              className="form-control"
              placeholder="Apartment Number"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Floor Number
            </label>
            <input
              type="number"
              name="floor_number"
              value={location.floor_number}
              onChange={handleChange}
              className="form-control"
              placeholder="Floor Number eg 02..."
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Place the listing pin on the map
            </label>
            <Map />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              value={location.latitude}
              onChange={handleChange}
              className="form-control"
              placeholder="Latitude"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              value={location.longitude}
              onChange={handleChange}
              className="form-control"
              placeholder="Longitude"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
          <button type="submit" disabled={saved} className={`ud-btn ${saved ? "btn-thm" : "btn-white2"} duration-200 flex`}>
           {saved?<>Saved Description <i className="fa fa-check-circle rotate-45"></i></>: <> Save Location Details </>}
          </button>
        </div>
    </form>
  );
};

export default LocationField;
