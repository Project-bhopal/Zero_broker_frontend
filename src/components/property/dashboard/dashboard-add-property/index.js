"use client";
import React, { useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import AddtionalDetailsFields from "./additional-details-fields";
import useAxiosPost from "@/hooks/useAxiosPost";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import { useRouter } from "next/navigation";

const AddPropertyTabContent = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('')
  const [tags, setTags] = useState("")
  const [tagsArray, setTagsArray] = useState([])
  const [state, setState] = useState({
      open: false,
      vertical: "top",
      horizontal: "center",
  });
  const router = useRouter()

  const mutation = useAxiosPost("/property/create", {
    onSuccess: (details) => {
      console.log("Property created successfully:", details);
      setState((prev) =>({...prev, open: true}))
      router.push("/dashboard/agent/property-listed-by-me")
    },
    onError: (error) => {
      console.error("Error creating Property:", error.response.data.message);
      setError(error.response.data.message)
    },
  })

  const handletagsChange = (e) => {
    setTags(e.target.value);
    setTagsArray(
      e.target.value.split(",")
      .map((item) => item.trim()) // Trim spaces
      .filter(Boolean)
    );
    
    setData((prev)=>({...prev, developer_notes : {...developer_notes, tags : tagsArray}}))
  };

  const handlePropertySubmit = () => {
    const formData = new FormData();
  
    // Append primitive fields and handle nested objects/arrays
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Append array elements separately
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (typeof value === "object" && value !== null) {
        // If it's a nested object, stringify it
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
  
    // Append files from `developer_notes`
    if (data.developer_notes?.images) {
      data.developer_notes.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
  
    if (data.developer_notes?.videos) {
      data.developer_notes.videos.forEach((video, index) => {
        formData.append(`videos[${index}]`, video);
      });
    }
  
    // Ensure virtual tour availability is stored as a string value
    if (data.developer_notes?.virtual_tour_available) {
      formData.append(
        "virtual_tour_available",
        data.developer_notes.virtual_tour_available.value
      );
    }
  
    console.log([...formData.entries()]); // Debugging output
  
    mutation.mutate(formData);
  };
  

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Description
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            2. Media
          </button>
          <button
            className="nav-link fw600"
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            3. Location
          </button>
          <button
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Detail
          </button>
          <button
            className="nav-link fw600"
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Additional Details
          </button>
          <button
            className="nav-link fw600"
            id="nav-item6-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item6"
            type="button"
            role="tab"
            aria-controls="nav-item6"
            aria-selected="false"
          >
            6. Amenities
          </button>
          <button
            className="nav-link fw600"
            id="nav-item7-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item7"
            type="button"
            role="tab"
            aria-controls="nav-item7"
            aria-selected="false"
          >
            7. Submit
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Property Description</h4>
            <PropertyDescription
              setData={
                setData
              }
            />
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <UploadMedia
            setData={
              setData
            }
          />
        </div>
        {/* End tab for Upload photos of your property */}

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Location</h4>
            <LocationField
              setData={
                setData
              }
            />
          </div>
        </div>
        {/* End tab for Listing Location */}

        <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Details</h4>
            <DetailsFiled
              setData={
                setData
              }
            />
          </div>
        </div>
        {/* End tab for Listing Details */}
        <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Additional Details</h4>
            <AddtionalDetailsFields
              setData={
                setData
              }
            />
          </div>
        </div>
        {/* End tab for Listing Details */}

        <div
          className="tab-pane fade"
          id="nav-item6"
          role="tabpanel"
          aria-labelledby="nav-item6-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Select Amenities</h4>
            <div className="row">
              <Amenities
                setData={
                  setData
                }
              />
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}
        
        <div
          className="tab-pane fade"
          id="nav-item7"
          role="tabpanel"
          aria-labelledby="nav-item7-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <div className="">
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10 mt50">
                Tags (Type Tags separated by comma "," so when people search related this property gets suggested)
              </label>
              <textarea
                cols={30}
                rows={4}
                name="other_amenities"
                placeholder="eg UAE, Dubai, Apartment, Villa ..."
                value={tags}
                onChange={handletagsChange}
              />
            </div>
          </div>
        </div>
            <h4 className="title fz17 mb30">Submit Property Details</h4>
            <div className="row">
              {error&&<p className="text-red-500 text-center">{error}</p>}
              <div className="flex justify-center">
                <button className="w-52 ud-btn btn-thm" onClick={()=>{handlePropertySubmit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}
      </div>
      <StatusSnackbar message={"Property Created Successfully"} state={state}/>
    </>
  );
};

export default AddPropertyTabContent;
