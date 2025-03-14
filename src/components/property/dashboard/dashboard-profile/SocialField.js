"use client"
import React, { useState } from "react";

const SocialField = ({data}) => {
  const [formData, setFormData] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 URL Validation Regex
  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(:\d+)?(\/.*)?$/i;
    return urlPattern.test(url);
  };

  // 🔹 Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Validate Form
  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (formData[field]&&!isValidUrl(formData[field])) {
        newErrors[field] = "Invalid URL format";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Social Links Updated Successfully", formData);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Facebook Url
            </label>
            <input
              type="text"
              name="facebook"
              className="form-control"
              placeholder="Your Facebook"
              value={formData.facebook  || data.facebook}
              onChange={handleInputChange}
              
            />
            {errors.facebook && <p className="text-danger">{errors.facebook}</p>}
          </div>
        </div>
        {/* End .col */}
          {/* <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Pinterest Url
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Pinterest"
                
              />
            </div>
          </div> */}
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Instagram Url
            </label>
            <input
              type="text"
              className="form-control"
               name="instagram"
              placeholder="Your Instagram"
              value={formData.instagram || data.instagram}
              onChange={handleInputChange}
              
            />
            {errors.instagram && <p className="text-danger">{errors.instagram}</p>}
          </div>
        </div>{" "}
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Twitter Url
            </label>
            <input
              type="text"
              name="twitter"
              className="form-control"
              placeholder="Your Twitter"
              value={formData.twitter || data.twitter}
              onChange={handleInputChange}
              
            />
            {errors.twitter && <p className="text-danger">{errors.twitter}</p>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Linkedin Url
            </label>
            <input
              type="text"
               name="linkedin"
              className="form-control"
              placeholder="Your Linkedin"
              value={formData.linkedin || data.linkedin}
              onChange={handleInputChange}
              
            />
            {errors.linkedin && <p className="text-danger">{errors.linkedin}</p>}
          </div>
        </div>
        {/* End .col */}
        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Website Url (without http)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Website Url"
            />
          </div>
        </div> */}
        {/* End .col */}
        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Update Social
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default SocialField;
