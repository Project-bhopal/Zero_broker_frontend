"use client"
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AllAgentsDataTable from "@/components/property/dashboard/admin-dashboard-all-users/AllAgentsDataTable";
import AllBuyersDataTable from "@/components/property/dashboard/admin-dashboard-all-users/AllBuyersDataTable";
import AllDriversDataTable from "@/components/property/dashboard/admin-dashboard-all-users/AllDriversDataTable";
import AllSellersDataTable from "@/components/property/dashboard/admin-dashboard-all-users/AllSellersDataTable";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardRequests = () => {
  const [showTable, setShowTable] = useState("Agents");
  const [role, setRole] = useState("agent")
      const router = useRouter()

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
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              
              <div className="row align-items-center">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>Seller's Requests</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
              <div className="flex md:flex-row flex-col gap-8">

                <div className="item1">
                  <div className="search_area">
                    <input
                      type="text"
                      className="form-control bdrs12"
                      placeholder="User Name ..."
                      required
                    />
                    <label>
                      <span className="flaticon-search" />
                    </label>
                  </div>
                </div>
                {/* End item1 */}
              <div className="grid grid-cols-4 justify-self-end gap-2 mb-5">
                <button className={`ud-btn btn-${showTable === 'Agents' ? 'thm' : 'white'}`} onClick={()=>{setShowTable("Agents");setRole("agent")}}>Agents</button>

                <button className={`ud-btn btn-${showTable === 'Sellers' ? 'thm' : 'white'}`} onClick={()=>{setShowTable("Sellers");setRole("seller")}}>Sellers</button>

                <button className={`ud-btn btn-${showTable === 'Buyers' ? 'thm' : 'white'}`} onClick={()=>{setShowTable("Buyers");setRole("buyer")}}>Buyers</button>

                <button className={`ud-btn btn-${showTable === 'Drivers' ? 'thm' : 'white'}`} onClick={()=>{setShowTable("Drivers");setRole('driver')}}>Drivers</button>
              </div>
              </div>
              <div className="row">
                <div className="col-xl-12 min-h-[50vh]">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      {showTable === "Agents"&&(
                        <AllAgentsDataTable role={role}/>
                      )}  
                      {showTable === "Sellers"&&(
                        <AllSellersDataTable role={role}/>
                      )}
                      {showTable === "Buyers"&&(
                        <AllBuyersDataTable role={role}/>
                      )}
                      {showTable === "Drivers"&&(
                        <AllDriversDataTable role={role}/>
                      )}

                      
                    </div>
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
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardRequests;
