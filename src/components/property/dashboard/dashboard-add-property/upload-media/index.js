"use client";
import React, { useEffect, useState } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";
import dynamic from "next/dynamic";
import useAxiosFetch from "@/hooks/useAxiosFetch";
const Select = dynamic(() => import("react-select"), { ssr: false });

const UploadMedia = ({ setData, propData, setDriver, driver }) => {
  const [saved, setSaved] = useState(false);
  const [driversOptions, setDriversOptions] = useState([])
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState({
    images: [],
    videos: [],
    virtual_tour_available: false,
  });

  const virtualTourOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  const {data, error, isLoading, isError} = useAxiosFetch(`/agents/role/driver`)
  

  useEffect(()=>{
    if(data){
      console.log(data?.data?.data)
      setDriversOptions(data?.data?.data?.map((driver, index) => ({
        value: driver._id,
        label: driver.fullname,
      })))
    }
  },[data !== undefined]);
  
  const handleDriverSelect = (selectedOption)=>{
    setDriver(selectedOption)
  };

  const handleRemoveDriver = ()=>{
    setDriver("")
  }

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#0f8363"
          : isHovered
          ? "#ebfff9"
          : isFocused
          ? "#ebfff9"
          : undefined,
      };
    },
  };
  useEffect(() => {
    setFiles((prev) => ({
      ...prev,
      images,
      videos,
      virtual_tour_available: files.virtual_tour_available,
    }));
  }, [images, videos]);

  const handleSelectChange = (selectedOption) => {
    setFiles((prev) => ({ ...prev, virtual_tour_available: selectedOption }));
    setSaved(false);
  };

  // useEffect(() => {
  //   console.log("propData :".propData);
  // }, [propData]);

  const handleFilesSubmit = (e) => {
    e.preventDefault();

    if (!files) {
      console.error("Files object is missing.");
      return;
    }

    const selectOption = files?.virtual_tour_available?.value || false;
    // setData((prev)=>({...prev, developer_notes : { ...files, virtual_tour_available : selectOption}}))

    setData((prev) => ({
      ...prev,
      developer_notes: {
        ...(prev.developer_notes || {}), // Ensure the previous data persists
        ...files,
        virtual_tour_available: selectOption,
      },
    }));

    setSaved(true);
    console.log("files :", files);
  };

  return (
    <div className="ps-widget bgc-white bdrs12 p30 bg-[#ebfff9] min-h-[70vh] overflow-hidden position-relative">
        <div className="col-4 my-3">
          <label className="heading-color ff-heading fw600 mb10">
            Assign to Driver
          </label>
          <div className="flex items-center gap-2">
            <Select
              key={Date.now()}
              defaultValue={""}
              name="virtual_tour_available"
              value={driver}
              options={driversOptions}
              styles={customStyles}
              onChange={handleDriverSelect}
              className="select-custom pl-0"
              classNamePrefix="select"
            />
            <i class="fa fa-times" aria-hidden="true" className="" onClick={handleRemoveDriver}></i>
          </div>
        </div>
        {!driver&&<><h4 className="title fz17 mb30">OR</h4>
        <h4 className="title fz17 mb30">Upload photos of your property</h4>
        <form className="form-style1" onSubmit={handleFilesSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery setImages={setImages} />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Virtual Tour
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="virtual_tour_available"
                value={files.virtual_tour_available}
                options={virtualTourOptions}
                styles={customStyles}
                onChange={handleSelectChange}
                className="select-custom pl-0"
                classNamePrefix="select"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <h4 className="title fz17 mb30">
            Upload videos of your property <>{"(required*)"}</>
          </h4>
          <div className="col-lg-12">
            <VideoOptionFiled setVideos={setVideos} />
          </div>
        </div>
        {/* End .row */}

        {images.length !== 0 && videos.length !== 0 && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saved}
              className={`ud-btn ${
                saved ? "btn-thm" : "btn-white2"
              } duration-200 flex`}
            >
              {saved ? (
                <>
                  Files Saved<i className="fa fa-check-circle rotate-45"></i>
                </>
              ) : (
                <> Save Files </>
              )}
            </button>
          </div>
        )}
      </form></>}
    </div>
  );
};

export default UploadMedia;
