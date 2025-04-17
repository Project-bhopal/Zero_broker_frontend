"use client";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import Map from "@/components/property/dashboard/dashboard-add-property/LocationField/Map";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import useAxiosPost from "@/hooks/useAxiosPost";
import { usePropertyStore } from "@/store/store";
import Image from "next/image";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const DriverRequestDetail = () => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [snackMessage, setSnackMessage] = useState("Drivers Request Approved");
  const [status, setStatus] = useState(true);
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const openModal = (url) => {
    setVideoUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl("");
  };

  const latitude = 25.2048;
  const longitude = 55.2708;
  const { properties } = usePropertyStore();

  const Images = properties[2]?.developer_notes?.images;
  const src = properties[2]?.developer_notes?.videos;

  const approveMutation = useAxiosPost(`/agents/review`);
  const rejectMutation = useAxiosPost(``);

  const handleRejectClick = () => {
    setShowReasonBox(true);
  };

  const handleInputChange = (e) => {
    setReason(e.target.value);
  };

  const handleApprove = () => {
    approveMutation.mutate(
      { assignmentId: "", status: "approved", feedback: "" },
      {
        onSuccess: (details) => {
          setStatus(true);
          setState((prev) => ({ ...prev, open: true }));
        },
        onError: (error) => {
          setState((prev) => ({ ...prev, open: true }));
          setStatus(false);
          setSnackMessage(
            "Failed to Approve Drivers Request. Please try again"
          );
        },
      }
    );
  };
  const handleReject = () => {
    rejectMutation.mutate(
      { assignmentId: "", status: "rejected", feedback: "" },
      {
        onSuccess: (details) => {
          setStatus(true);
          setState((prev) => ({ ...prev, open: true }));
          setSnackMessage(
            "Drivers Request Rejected"
          );
        },
        onError: (error) => {
          setState((prev) => ({ ...prev, open: true }));
          setStatus(false);
          setSnackMessage(
            "Failed to Reject Drivers Request. Please try again"
          );
        },
      }
    );
  };

  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>Details</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12 min-h-[50vh]">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative space-y-10">
                    <div>
                      <label className="heading-color ff-heading fw600 mb10">
                        Images of Property Uploaded by Driver
                      </label>
                      <PropertyGallery Images={Images} />
                    </div>

                    <div>
                      <label className="heading-color ff-heading fw600 mb10">
                        Videos of Property Uploaded by Driver
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <video
                          src={src} // Replace with video thumbnail or use a <video> tag with poster
                          alt="Video thumbnail"
                          className="w-32 h-48 object-cover rounded cursor-pointer hover:scale-105 transition"
                          onClick={() => openModal(src)} // Replace with your video URL
                        />
                      </div>
                      {/* Modal */}
                      {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                          <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full relative">
                            <button
                              onClick={closeModal}
                              className="absolute top-2 right-2 text-gray-700 text-lg font-bold"
                            >
                              ✕
                            </button>
                            <video
                              src={videoUrl}
                              controls
                              autoPlay
                              className="w-full rounded-md h-96"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-sm-12">
                      <div className="mb20 mt30">
                        <label className="heading-color ff-heading fw600 mb10">
                          Location of Property Pinned by Driver
                        </label>
                        <Map latitude={latitude} longitude={longitude} />
                      </div>
                    </div>
                    {showReasonBox && (
                      <div className="col-sm-12">
                        <div className="mb20">
                          <label className="heading-color ff-heading fw600 mb10">
                            Reason{" "}
                          </label>
                          <textarea
                            cols={30}
                            rows={5}
                            name="description"
                            value={reason}
                            onChange={handleInputChange}
                            placeholder="Reason for Rejection"
                            required
                          />
                        </div>
                      </div>
                    )}
                    {!showReasonBox ? (
                      <div className="flex items-center gap-2">
                        <button
                          className="md:py-3 py-1 md:px-5 px-4 md:text-base text-sm bg-[#0f8363] text-white bdrs12 font-semibold "
                          onClick={handleApprove}
                        >
                          Approve
                        </button>
                        <button
                          className="md:py-3 py-1 md:px-5 px-4 bg-red-400 text-white bdrs12 font-semibold"
                          onClick={handleRejectClick}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        className="md:py-3 py-1 md:px-5 px-4 bg-[#0f8363] text-white bdrs12 font-semibold"
                        onClick={handleReject}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
        <StatusSnackbar message={snackMessage} state={state} status={status} />
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DriverRequestDetail;
