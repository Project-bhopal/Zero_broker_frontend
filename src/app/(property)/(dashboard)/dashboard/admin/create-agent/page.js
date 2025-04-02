"use client";
import { ApiFetchRequest, ApiPutRequest } from "@/axios/apiRequest";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import Head from "next/head";
import AgentPersonalInfo from "@/components/property/dashboard/agent-profile/AgentPersonalInfo";
import { useState } from "react";
const api_url = process.env.NEXT_PUBLI_API_BASE_UR;
// export const metadata = {
//   title: "Dashboard My Profile || ZeroBroker - Real Estate NextJS Template",
// };

const AgentProfile = () => {
  const [create, setCreate] = useState("Agent")

  return (
    <>
      <Head>
          Dashboard My Profile || ZeroBroker - Real Estate NextJS Template
      </Head>
      <DashboardHeader />
      <MobileMenu />
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>
              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Create {create}</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              <div className="flex  justify-self-end gap-2 me-3 mb-5">
                <h5>Create :</h5>
                <button className={`ud-btn btn-${create === 'Agent' ? 'thm' : 'white'}`} onClick={()=>{setCreate("Agent")}}>Agent</button>
                <button className={`ud-btn btn-${create === 'Sub Admin' ? 'thm' : 'white'}`} onClick={()=>{setCreate("Sub Admin")}}>Sub Admin</button>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">

                    <div className="col-lg-12">
                      <AgentPersonalInfo create={create}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentProfile;
