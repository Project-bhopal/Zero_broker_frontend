"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function VerifyEmail() {
    const [email, setEmail] = useState("");

    const [isValid, setIsValid] = useState("");

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    setIsValid(emailRegex.test(newEmail)); // Update validation state
  };

  const handleVerify = () => {
    alert(`Verification email sent to ${email}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card rounded p-4 shadow-lg w-[500px] gap-y-8">
        <img
          src="/images/emailverificationicon.png"
          alt=""
          className="h-[80px] w-[80px] self-center"
        />
        <h2 className="text-center font-[200]">Verify Your Email</h2>
        <div className="mb-3">
          <div className="flex items-center gap-2">
          <input
            type="email"
            className="border outline-none rounded p-2 w-full"
            placeholder="Please Enter Your Email Address"
            value={email}
            onChange={handleInputChange}
          />
          <i><i className={` ${isValid ? "fa fa-check": "a"}`}  aria-hidden="true"></i></i>
          </div>
          <p className="text-sm ms-1 text-gray">OTP will be sent to this email</p>
        </div>
        <button
          className="ud-btn btn-white"
          onClick={handleVerify}
          disabled={!isValid}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
