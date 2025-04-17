import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "550px",
};

const center = {
  lat: 25.2048, // London Eye
  lng: 55.2708,
};

const MapPin = ({setLocations}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCITJsGKWFtOhyCmurW0ZmftmMTxHvPVz0", // replace with your key
  });

  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setLocations({
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
    })
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default MapPin;
