import { usePropertyStore } from "@/store/store";
import React from "react";

const PropertyFeaturesAminites = ({property}) => {

  const transformAmenities = (amenities, itemsPerRow = 4) => {
    return amenities?.reduce((rows, amenity, index) => {
      if (index % itemsPerRow === 0) rows?.push([]); // Create a new row every `itemsPerRow` items
      rows[rows?.length - 1]?.push(amenity);
      return rows;
    }, []);
  };
  const featuresAmenitiesData = transformAmenities(property?.features_amenities, 4);

  // const featuresAmenitiesData = [
  //   ["Air Conditioning", "Barbeque", "Dryer", "Gym"],
  //   ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator"],
  //   ["Swimming Pool", "TV Cable", "Washer", "WiFi6"],
  // ];

  return (
    <>
      {featuresAmenitiesData?.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;
