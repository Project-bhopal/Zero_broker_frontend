import React, { useState } from "react";

const amenitiesData = {
  column1: [
    { label: "Attic" },
    { label: "Basketball court" },
    { label: "Air Conditioning" },
    { label: "Lawn" },
    { label: "Swimming Pool" },
    { label: "Barbeque" },
    { label: "Microwave" },
  ],
  column2: [
    { label: "TV Cable" },
    { label: "Dryer" },
    { label: "Outdoor Shower" },
    { label: "Washer" },
    { label: "Gym" },
    { label: "Ocean view" },
    { label: "Private space" },
  ],
  column3: [
    { label: "Lake view" },
    { label: "Wine cellar" },
    { label: "Front yard" },
    { label: "Refrigerator" },
    { label: "WiFi" },
    { label: "Laundry" },
    { label: "Sauna" },
  ],
};

const Amenities = ({setData}) => {
  const [saved, setSaved] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [otherAmenities, setOtherAmenities] = useState("");
  const [otherAmenitiesArray, setOtherAmenitiesArray] = useState([]);

  const handleCheckboxChange = (label) => {
    setSelectedAmenities((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
    setSaved(false)
  };

  const handleOtherAmenitiesChange = (e) => {
    setOtherAmenities(e.target.value);
    setOtherAmenitiesArray(
      e.target.value.split(",").map((item) => item.trim()).filter(Boolean)
    );
    
    setSaved(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otherAmenitiesArray = otherAmenities
    .split(",")
    .map((item) => item.trim()) // Trim spaces
    .filter(Boolean);
    console.log("Selected Amenities:", selectedAmenities);
    console.log("other Amenities:", otherAmenitiesArray);
    setData((prev)=>({...prev, features_amenities: selectedAmenities, other_amenities : otherAmenitiesArray}))
    setSaved(true)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="row">
        {Object.keys(amenitiesData).map((columnKey, index) => (
          <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
            <div className="checkbox-style1">
              {amenitiesData[columnKey].map((amenity, amenityIndex) => (
                <label key={amenityIndex} className="custom_checkbox">
                  {amenity.label}
                  <input
                    type="checkbox"
                    name="amenities"
                    checked={selectedAmenities.includes(amenity.label)}
                    onChange={() => handleCheckboxChange(amenity.label)}
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10 mt50">
                Other Amenities (Type amenities separated by comma ",")
              </label>
              <textarea
                cols={30}
                rows={5}
                name="other_amenities"
                placeholder="Power Backup, Back yard ..."
                value={otherAmenities}
                onChange={handleOtherAmenitiesChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saved} className={`ud-btn ${saved ? "btn-thm" : "btn-white2"} duration-200 flex`}>
           {saved?<>Saved <i className="fa fa-check-circle rotate-45"></i></>: <> Save Amenities </>}
          </button>
        </div>
      </div>
      </form>
    </>
  );
};

export default Amenities;
