"use client"
import React, { useEffect, useState } from "react";

const PersonalInfo = ({ data, onChange, handleSubmit }) => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   phone: "",
  //   whatsapp: "",
  //   profession: "",
  //   address: "",
  //   about: "",
  // });

  const [errors, setErrors] = useState({});

  // // 🔹 Handle Input Change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // // 🔹 Validate Form
  // const validateForm = () => {
  //   let newErrors = {};

  //   if (!formData.username) newErrors.username = "Username is required";
  //   if (!formData.phone || !/^\d+$/.test(formData.phone)) 
  //     newErrors.phone = "Phone must contain only numbers";
  //   if (formData.whatsapp && !/^\d+$/.test(formData.whatsapp)) 
  //     newErrors.whatsapp = "WhatsApp number must be numeric";
  //   if (formData.about.length > 500) 
  //     newErrors.about = "About Me cannot exceed 500 characters";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // // 🔹 Handle Form Submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // if (validateForm()) {
  //     console.log("Form Submitted Successfully", formData);
  //   // }
  // };

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    onChange(updatedData); // 🔹 Send data back to parent
  };

  const validateForm = () => {
    let newErrors = {};

    if (localData.phone && !/^\d+$/.test(localData.phone)) 
      newErrors.phone = "Phone must contain only numbers";
    if (localData.whatsapp && !/^\d+$/.test(localData.whatsapp)) 
      newErrors.whatsapp = "WhatsApp number must be numeric";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalSubmit = (e)=>{
    e.preventDefault()
  if(validateForm()){
    handleSubmit()
  }
  }

  return (
    <form className="form-style1" onSubmit={handleLocalSubmit}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Username
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Your Name"
              readOnly
              value={localData?.fullname}
              
            />
            {/* {errors.username && <p className="text-danger">{errors.username}</p>} */}
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
              
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              placeholder="Your Phone"
              readOnly
              value={localData?.mobile}
              
            />
            {errors.phone && <p className="text-danger">{errors.mobile}</p>}
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Email
            </label>
            <input
              type="text"
              readOnly
              value={localData?.email}
              className="form-control"
              placeholder="Your Email"
            />
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Language
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Whatsapp Number
            </label>
            <input
              type="text"
              className="form-control"
              name="whatsappNumber"
              placeholder="Your Whatsapp Number"
              value={localData?.whatsappNumber}
              onChange={handleInputChange}
              
            />
            {errors.whatsappNumber && <p className="text-danger">{errors.whatsappNumber}</p>}
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Profession
            </label>
            <input
              type="text"
              className="form-control"
              name="profession"
              placeholder="Your Name"
              value={localData?.profession}
              onChange={handleInputChange}
              
            />
            {/* {errors.whatsapp && <p className="text-danger">{errors.profession}</p>} */}
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Your Address"
              value={localData?.address}
              onChange={handleInputChange}
              
            />
            {/* {errors.whatsapp && <p className="text-danger">{errors.address}</p>} */}
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              About me
            </label>
            <textarea
              cols={30}
              rows={4}
              maxLength={500}
              name="aboutMe"
              placeholder="About yourself"
              value={localData?.aboutMe}
              onChange={handleInputChange}
              defaultValue={""}
            />
            {/* {errors.about && <p className="text-danger">{errors.about}</p>} */}
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Update Profile
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
     </form>
  );
};

export default PersonalInfo;
