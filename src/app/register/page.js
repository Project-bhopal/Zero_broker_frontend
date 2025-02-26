import SignUp from "@/components/common/login-signup-modal/SignUp";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Register  || ZeroBroker - Real Estate NextJS Template",
};

const Register = () => {
  return (
    <>
      {/* Our Compare Area */}
      <section className="our-compare pt0 pb0">
        <Image
          width={1012}
          height={519}
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p40 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb30">
                  <Link href="/">
                    <Image
                      width={138}
                      height={44}
                      className="mb15"
                      src="/images/zero-broker/zero_brokerage_ae_long_h.jpg"
                      alt="logo"
                    />
                  </Link>
                  <h2>Create account</h2>
                  <p className="text">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
