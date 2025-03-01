"use client";
import { usePost } from "@/hooks/usePost";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [user, setUser] = useState({})
  const [resendOtp, setResendOtp] = useState(false)
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [error, setError] = useState(null)

  const mutation = usePost("/auth/verify-otp")
  const router = useRouter();
  const params = useSearchParams();
  const inputRef = useRef(null)

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user)
    setOtp(new Array(6).fill(""))
    // startTimer()
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, [resendOtp]);

  
  // useEffect(() => {
  //   mutation.mutate({email : params.email, otp, otp_type : params.otp_type},
  //     {
  //       onSuccess : (details)=>{
  //         console.log("otp verification successfull", details)
          
  //       },
  //       onError: (error)=>{
  //         console.error("Error creating user", error)
  //       }
  //     }
  //   )
  // }, []);

  const handleResendOtp = () => {
    setResendOtp(true)
    // startTimer()
    setTimeLeft(180);
    setIsResendEnabled(false);
    console.log("OTP Resent!");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      if (element.previousSibling && !element.value) {
        element.previousSibling.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  const handleOtpSubmit = (e) =>{
    e.preventDefault();
    
    const ot = sessionStorage.getItem("ot");
    const otp_number = otp.join("");
    mutation.mutate({email : user.email , otp_number , otp_type: ot},
      {
        onSuccess : (details)=>{
          console.log("otp verification successfull", details);
          router.push("/login")
        },
        onError: (error)=>{
          console.error("Error creating user", error)
          setError(error.response.data.error.msg)
        }
      }
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl text-center space-y-10">
          <h2 className="text-2xl  font-[200]">Verify OTP</h2>
          <p className="text-gray-500 mt-2">
            Enter the OTP sent to{" "}
            <span className="font-medium">{user.email}</span>
          </p>
          <form onSubmit={handleOtpSubmit}>
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                ref={index === 0 ? inputRef : null} 
                autoComplete="off"
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-green-900 rounded-lg focus:border-green-300 focus:ring-2 focus:ring-[#068662] outline-none transition-all"
              />
            ))}
          </div>

          {timeLeft > 0 && !isResendEnabled ? (
            <>
              <p className="text-md font-bold text-gray-300 mt-4">Time left: <span className="font-bold text-[#068662]">{formatTime(timeLeft)}</span>s</p>

              <button className={`ud-btn btn-white`} type="submit" disabled={otp.some((digit) => digit === "")}>
                submit
              </button>
            </>
          ) : (
            <p className="text-sm text-center mt-4">
              Didn't receive an email?
              <button className="text-[#068662] font-semibold" onClick={()=>{handleResendOtp()}}>
                &nbsp;
                RESEND OTP
              </button>
            </p>
          )}
            </form>

          {/* Success Message */}
          {isVerified && (
            <div className="flex items-center justify-center mt-4 text-green-600 font-medium">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              Code verified
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VerifyOTP;
