"use client";
import dynamic from "next/dynamic";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useEffect, useRef, useState } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

const VideoUpload = ({ setVideos }) => {
  const [uploaded, setUploaded] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]); // Stores both file & preview
  const fileVideoRef = useRef(null);

  const handleUpload = (files) => {
    const newVideos = [...uploadedVideos];

    for (const file of files) {
      if (file.type.startsWith("video/")) {
        const videoURL = URL.createObjectURL(file);
        newVideos.push({ file, preview: videoURL });
      } else {
        alert("Please upload a valid video file.");
      }
    }

    setUploadedVideos([...newVideos]);
    setUploaded(false);
  };

  useEffect(() => {
    if (uploadedVideos.length > 0) {
      const videoFilesArray = uploadedVideos.map(({ file }) => file);
      setVideos(videoFilesArray);
      console.log(videoFilesArray);
    }
  }, [uploadedVideos]);

  const handleDrop = (event) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (index) => {
    const newVideos = [...uploadedVideos];
    newVideos.splice(index, 1);
    setUploadedVideos(newVideos);
    setUploaded(false);
  };

  const handleSubmit = () => {
    const videoFilesArray = uploadedVideos.map(({ file }) => file); // Extract only files
    setVideos(videoFilesArray); 
    console.log(videoFilesArray); // Debugging to ensure correct values
    setUploaded(true);
  };
  return (
    <>
      <div>
        {/* Upload Section */}
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
          <p className="text fz-10 mb10">Videos size must be less than 25MB</p>
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

        {/* Display Uploaded Videos */}
        <div className="row profile-box position-relative d-md-flex align-items-end mb50 gap-2">
          {uploadedVideos.map(({ preview }, index) => (
            <div className="col-2" key={index}>
              <div className="profile-img mb20 position-relative sm:w-[150px] w-[80px]">
                <video controls width={212} height={194} className="w-100 bdrs12 cover" muted>
                  <source src={preview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  style={{ border: "none" }}
                  className="tag-del sm:h-[45px] rounded-lg sm:w-[45px] h-[25px] w-[25px] absolute sm:top-[10px] top-[3px] sm:left-[10px] left-[2px]"
                  title="Delete Video"
                  onClick={() => handleDelete(index)}
                  type="button"
                  data-tooltip-id={`delete-${index}`}
                >
                  <span className="fas fa-trash-can sm:text-base text-xs sm:mt-0 mt-[-10px]" />
                </button>

                <ReactTooltip id={`delete-${index}`} place="right" content="Delete Video" />
              </div>
            </div>
          ))}
        </div>

        {uploadedVideos.length > 0 && (
          <div className="flex justify-end">
            <button
              disabled={uploadedVideos.length === 0}
              className={`ud-btn ${uploaded ? "btn-thm" : "btn-white2"} duration-200 flex`}
              onClick={()=>{handleSubmit()}}
            >
              {uploaded ? (
                <>
                  Saved <i className="fa fa-check-circle rotate-45"></i>
                </>
              ) : (
                <>Save Videos</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoUpload;
