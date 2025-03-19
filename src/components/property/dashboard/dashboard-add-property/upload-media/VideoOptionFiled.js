"use client";
import dynamic from "next/dynamic";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRef, useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

const videoField = [
  { value: "Youtube", label: "Youtube" },
  { value: "Facebook", label: "Facebook" },
  { value: "Vimeo", label: "Vimeo" },
];

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};

const VideoOptionFiled = () => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const fileVideoRef = useRef(null);

  const handleUpload = (files) => {
    const newVideo = [...uploadedVideos];

    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        const videoURL = URL.createObjectURL(file);
        newVideo.push(videoURL);
        setUploadedVideos(newVideo);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newVideo = [...uploadedVideos];
    newVideo.splice(index, 1);
    setUploadedVideos(newVideo);
  };

  return (
    <>
      <div className="">
        {/* <div className="mb30">
          <label className="heading-color ff-heading fw600 mb10">
            Video from
          </label>
          <div className="location-area">
            <Select
                key={Date.now()}
              defaultValue={[videoField[1]]}
              name="colors"
              options={videoField}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              isMulti
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb30">
          <label className="heading-color ff-heading fw600 mb10">
            Embed Video id
          </label>
          <input type="file" className="form-control" placeholder="Your Name" />
        </div> */}
        <div
          className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2 min-h-56"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="icon mb5">
            <span className="flaticon-upload" />
          </div>
          <h4 className="title fz17 mb1">
            Upload/Drag Videos of your property
          </h4>
          <p className="text fz-10 mb10">Videos size must be less than 25mb</p>
          <label className="ud-btn btn-white">
            Browse Files
            <input
              ref={fileVideoRef}
              id="fileInput"
              type="file"
              name="video"
              accept="video/*"
              multiple
              className="ud-btn btn-white"
              onChange={(e) => handleUpload(e.target.files)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* Display uploaded images */}
        <div className="row profile-box position-relative d-md-flex align-items-end mb50 gap-2">
          {uploadedVideos.map((videoUrl, index) => (
            <div className="col-2" key={index}>
              <div className="profile-img mb20 position-relative sm:w-[150px] w-[80px]">
                <video
                  controls
                  width={212}
                  height={194}
                  autoPlay
                  className="w-100 bdrs12 cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  style={{ border: "none" }}
                  className="tag-del sm:h-[45px] rounded-lg sm:w-[45px] h-[25px] w-[25px] absolute sm:top-[10px] top-[3px] sm:left-[10px] left-[2px]"
                  title="Delete Image"
                  onClick={() => handleDelete(index)}
                  type="button"
                  data-tooltip-id={`delete-${index}`}
                >
                  <span className="fas fa-trash-can sm:text-base text-xs sm:mt-0 mt-[-10px]" />
                </button>

                <ReactTooltip
                  id={`delete-${index}`}
                  place="right"
                  content="Delete Image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoOptionFiled;
