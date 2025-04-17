"use client";
import React, { useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import AddtionalDetailsFields from "./additional-details-fields";
import useAxiosPost from "@/hooks/useAxiosPost";
import StatusSnackbar from "@/components/Snackbar/Snackbar";
import { useRouter } from "next/navigation";

const AddPropertyTabContent = ({params}) => {
  const [driver, setDriver] = useState();
  const [snackMessage, setSnackMessage] = useState("Property Created Successfully")
  const [data, setData] = useState({
    requested_id : params.id,
    developer_notes : {}
  });
  const [error, setError] = useState('')
  const [tags, setTags] = useState("")
  const [tagsArray, setTagsArray] = useState([])
  const [status, setStatus] = useState(true)
  const [state, setState] = useState({
      open: false,
      vertical: "top",
      horizontal: "center",
  });
  const router = useRouter()
  const driverMutation = useAxiosPost(`/driver/assign`)
  const mutation = useAxiosPost("/property/create", {
    onSuccess: (details) => {
      console.log("Property created successfully:", details);
      setState((prev) =>({...prev, open: true}))
      setStatus(true)
      driverMutation.mutate({propertyId : details?.data?.property?._id, driverId : driver?.value}, {
        onSuccess: (details) =>{
          console.log("assigned to driver" , details.data)
          router.push("/dashboard/agent/property-listed-by-me")
          setState((prev) =>({...prev, open: true}))
          setSnackMessage(`Property Assigned to Driver Successfully`)
        },
        onError : (error) =>{
          console.log("failed to assign driver", error)
          setState((prev) =>({...prev, open: true}))
        }
      })
    },
    onError: (error) => {
      console.error("Error creating Property:", error.response.data.message);
      setError(error.response.data.message)
      setSnackMessage("Failed to Create Property")
      setStatus(false)
      setState((prev) =>({...prev, open: true}))

    },
  })

  const handletagsChange = (e) => {
    const newTags = e.target.value;
    const newTagsArray = newTags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  
    setTags(newTags);
    setTagsArray(newTagsArray);
    
    setData((prev) => ({
      ...prev,
      developer_notes: {
        ...prev.developer_notes,
        tags: newTagsArray,
      },
    }));
  };

  const handlePropertySubmit = () => {
    console.log(data)

    mutation.mutate(data);
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

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <UploadMedia
          propData={data}
            setData={
              setData
            }
            setDriver={setDriver}
            driver={driver}
          />
        </div>
        

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
        
      </div>
      <StatusSnackbar message={snackMessage} state={state} status={status}/>
    </>
  );
};

export default AddPropertyTabContent;
