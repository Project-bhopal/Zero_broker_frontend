"use client";
import { usePropertyStore } from "@/store/store";
import React, { useState } from "react";
// import ModalVideo from "react-modal-video";

const PropertyVideo = ({src}) => {
  const [isOpen, setOpen] = useState(false);
  const {property} = usePropertyStore();
  return (
    <>
      {/* <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      /> */}

      {/* <div className="col-md-12">
        <div className="property_video bdrs12 w-100">
          <button
            className="video_popup_btn mx-auto popup-img"
            onClick={() => setOpen(true)}
            style={{ border: "none", background: "transparent" }}
          >
            <span className="flaticon-play" />
          </button>
        </div>
      </div> */}
          <video
            src={src}
            autoPlay
            muted
            className="h-52"
          />
    </>
  );
};

export default PropertyVideo;
