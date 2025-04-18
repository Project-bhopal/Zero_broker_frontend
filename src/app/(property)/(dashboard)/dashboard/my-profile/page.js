"use client"
import { ApiFetchRequest, ApiPutRequest } from "@/axios/apiRequest";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
import SocialField from "@/components/property/dashboard/dashboard-profile/SocialField";
import Head from "next/head";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { useEffect, useState } from "react";
const api_url = process.env.NEXT_PUBLI_API_BASE_UR
// export const metadata = {
//   title: "Dashboard My Profile || ZeroBroker - Real Estate NextJS Template",
// };

const DashboardMyProfile = () => {
  const [formData, setFormData] = useState({
    userProfile: null,
    personalInfo: {},
    socialMediaLinks: {},
  });
  
  const { data, isLoading, isError, error } = useAxiosFetch("/profile/me");
  
  useEffect(() => {
    if (data?.data) {
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: { ...data.data.socialMediaLinks }, // Ensure a valid object
        userProfile: data.data.profilePhoto, // Handle potential null values
        personalInfo: {
          ...data.data.user,
          whatsappNumber: data.data.whatsappNumber, // Fix merging issue
          address : data.data.address,
          aboutMe : data.data.aboutMe,
          profession : data.data.profession,
        },
      }));
    }
  }, [data]);
  
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

 
  const handleFormChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  
  const handleSubmit = async () => {
    const { fullname, mobile, email, role, ...filteredPersonalInfo } = formData.personalInfo;
    const userData = {...formData.userProfile, ...filteredPersonalInfo}
    console.log(userData)
    try {
      const response = await ApiPutRequest("/profile/update", userData);
      if(response.data){
        console.log("Profile updated successfully:", response.data);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };
  
  return (
    <>
    <Head>
      <title>Dashboard My Profile || ZeroBroker - Real Estate NextJS Template</title>
    </Head>
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
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Profile</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="col-xl-7">
                    <ProfileBox
                      data={formData.userProfile}
                      onChange={(data) => handleFormChange("userProfile", data)}
                    />
                    </div>
                    {/* End ProfileBox */}

                    <div className="col-lg-12">
                    <PersonalInfo
                      data={formData.personalInfo }
                      onChange={(data) => handleFormChange("personalInfo", data)}
                      handleSubmit={()=>handleSubmit()}
                    />
                    </div>
                    {/* End PersonalInfo */}
                  </div>
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Social Media</h4>
                    <SocialField data ={formData.socialMediaLinks}
                    onChange={(data) => handleFormChange("personalInfo", data)}
                    handleSubmit={()=>handleSubmit()}/>
                  </div>
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Change password</h4>
                    <ChangePasswordForm />
                  </div>
                  {/* End .ps-widget */}
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyProfile;
