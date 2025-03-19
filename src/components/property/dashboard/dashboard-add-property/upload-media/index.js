"use client"
import React from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";
import dynamic from "next/dynamic";
const Select = dynamic(() => import('react-select'), { ssr: false });


const UploadMedia = () => {
  const virtualTourOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#0f8363"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Upload photos of your property</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery />
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Virtual Tour
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="colors"
                options={virtualTourOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="row">
          <h4 className="title fz17 mb30">Upload videos of your property</h4>
          <div className="col-lg-12">
            <VideoOptionFiled />
          </div>
        </div>
        {/* End .row */}
        
      </form>
    </div>
  );
};

export default UploadMedia;
