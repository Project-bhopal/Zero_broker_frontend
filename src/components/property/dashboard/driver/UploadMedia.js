"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PhotoUpload from "./PhotoUpload";
import VideoUpload from "./VideoUpload";
import MapPin from "./MapPin";
import { ApiPostRequest, ApiPutRequest } from "@/axios/apiRequest";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import { useRouter } from "next/navigation";

const   UploadMedia = ({params}) => {
  const [saved, setSaved] = useState(false);
  const [snackMessage, setSnackMessage] = useState("Media and Location Uploaded Successfully")
  const [status, setStatus] = useState(true)
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [locations, setLocations] = useState({
    latitude: null,
    longitude: null,
  });
  const [files, setFiles] = useState({
    images: [],
    videos: [],
  });
    const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const router = useRouter()

  useEffect(() => {
    setFiles((prev) => ({
      ...prev,
      images,
      videos,
    }));
  }, [images, videos]);

  
  const handleFilesSubmit = async(e) => {
    e.preventDefault();
    if (!files) {
      console.error("Files object is missing.");
      return;
    }
    if (!locations.latitude && !locations.longitude) {
      console.error("Please fill Longitude and Latitude.");
      return;
    }

    setSaved(true);
    // console.log("files :", {assignmentId : "",media : files, longitude : locations.longitude, latitude : locations.latitude});
    const response  = await ApiPostRequest(`/driver/assignments/media`, {assignmentId : params.id, media : files, longitude : locations.longitude, latitude : locations.latitude})
    console.log(response)
    if(response.status !== 200){
      setState((prev) =>({...prev, open: true}))
      setStatus(false)
      setSnackMessage("Failed to upload Media and Location. Please try again")
      router.push(`/dashboard/driver/uploaded-media`)
      return
    }
    setStatus(true)
    setState((prev) =>({...prev, open: true}))
  };

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLocations((prev) => ({...prev, [name] : value}))
  }

  return (
    <div className="ps-widget bgc-white bdrs12 p30 bg-[#ebfff9] overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Upload photos of your property</h4>
      <form className="form-style1" onSubmit={handleFilesSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <PhotoUpload setImages={setImages} />
          </div>
        </div>
        {/* End col-12 */}

        <div className="row">
          <h4 className="title fz17 mb30">
            Upload videos of your property <>{"(required*)"}</>
          </h4>
          <div className="col-lg-12">
            <VideoUpload setVideos={setVideos} />
          </div>
        </div>
        {/* End .row */}
        <div className="col-sm-12">
          <div className="mb20 mt30">
            <label className="heading-color ff-heading fw600 mb30">
              Select the Location on the map or fill Latitude and Longitude field
            </label>
            <MapPin setLocations={setLocations} />
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
                value={locations.latitude}
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
                value={locations.longitude}
                onChange={handleChange}
                className="form-control"
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>

        {images.length !== 0 && videos.length !== 0 && (
          <div className="flex justify-end">
            <button
              type="submit"
              className={`ud-btn ${
                saved ? "btn-thm" : "btn-white2"
              } duration-200 flex`}
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <StatusSnackbar message={snackMessage} state={state} status={status}/>
    </div>
  );
};

export default UploadMedia;
