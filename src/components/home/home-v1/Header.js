"use client";
import MainMenu from "@/components/common/MainMenu";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { pageRoutes } from "@/utilis/common";
import Cookies from "js-cookie";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [islogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(false)
  // const {data, isLoading, error, isError} = useAxiosFetch("/profile/me")
  
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const islogin = Cookies.get('accessToken')
    setIsLogin(islogin)
    setUser(localStorage.getItem("name"))
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu  ${navbar ? "sticky" : ""
          } z-50`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="flex items-center justify-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href={pageRoutes.home}>
                      <img
                        src="/images/logoWhite.png"
                        alt="Header Logo"
                        className="h-20 w-auto"
                      />  
                    </Link>
                    <Link className="header-logo logo2" href={pageRoutes.home}>
                      <img
                        src="/images/logoBlack.png"
                        alt="Header Logo"
                        className="h-20"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu navbar={navbar} />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}
              {/* 
              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <a
                    href="#"
                    className="login-info d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"
                  >
                    <i className="far fa-user-circle fz16 me-2" />{" "}
                    <span className="d-none d-xl-block">Login</span>
                  </a> */}
              {/* <Link
                    className="ud-btn add-property menu-btn bdrs60 mx-2 mx-xl-4"
                    href="/dashboard-add-property"
                  >
                    Add Property
                    <i className="fal fa-arrow-right-long" />
                  </Link> */}
              {/* <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/icon/nav-icon-white.svg"
                      alt="humberger menu"
                    />

                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/images/icon/nav-icon-dark.svg"
                      alt="humberger menu"
                    />
                  </a> */}
              {/* </div>
              </div> */}
              <div className="col-auto">
                <div className="d-flex align-items-center">
                <span className={`${!navbar ? "text-white" : "text-black" } font-semibold`}> Hii, {user} </span> &nbsp; &nbsp;
                  {islogin ?(
                    <a
                    href="/dashboard/my-profile"
                    className="login-info d-flex align-items-center"
                    role="button"
                    style={{
                      textShadow: "none", // No shadow when navbar is sticky
                    }}
                  >
                   
                    <i
                      className="far fa-user-circle fz16 me-1"
                      style={{
                        textShadow: "none",
                      }}
                    />
                    <span
                      className=""
                      style={{
                        textShadow:  "none",
                      }}
                    >
                    Profile 
                    </span>
                  </a>
                  
                  ) : (
                    <a
                    href="#"
                    className="login-info d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"
                    style={{textShadow:"none"}}
                  >
                    <i
                      className="far fa-user-circle fz16 me-2"
                      style={{
                        textShadow:"none",
                      }}
                    />
                    <span
                      className="d-none d-xl-block"
                      style={{
                        textShadow: "none",
                      }}
                    >
                      Login
                    </span>
                  </a>
                  )}
                  
                  
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      {/* <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div> */}
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
