"use client";
import { usePost } from "@/hooks/usePost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import GoogleAuth from "../google-oauth/GoogleOauth";
import Loader from "../Loader";
// import { Modal } from "bootstrap";
import { useUserStore } from "@/store/store";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("bootstrap"), { ssr: false });

const SignIn = () => {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    mobile: "",
    password: "",
  });
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap").then(({ Modal }) => {
        const modalElement = document.getElementById("loginSignupModal");
        if (modalElement) {
          modalRef.current = modalElement;
          modalInstanceRef.current = Modal.getOrCreateInstance(modalElement);
        }
      });
    }
  }, []);

  const mutation = usePost("/auth/login");
  const inputHandler = (e) => {
    const { name, value } = e.target;

    // Special validation for the email/mobile field
    if (name === "userInput") {
      if (/^\d{10}$/.test(value)) {
        setData((prev) => ({ ...prev, email: "", mobile: value }));
        setValidationError(""); // Clear error if valid
      } else if (/^\S+@\S+\.\S+$/.test(value)) {
        setData((prev) => ({ ...prev, email: value, mobile: "" }));
        setValidationError(""); // Clear error if valid
      } else {
        setData((prev) => ({ ...prev, email: "", mobile: "" }));
        setValidationError(
          "Please enter a valid email or 10-digit mobile number."
        );
      }
    } else {
      // Handle password normally
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   mutation.mutate(data, {
  //     onSuccess: (details) => {
  //       localStorage.removeItem("id")
  //       console.log(details);
  //       setUser(details.data);
  //       const modalElement = document.getElementById("loginSignupModal");
  //       if (modalElement) {
  //         const modalInstance = Modal.getInstance(modalElement);
  //         if (modalInstance) {
  //           modalInstance.hide();
  //         }
  //       }

  //       // Manually remove the backdrop if it remains
  //       const modalBackdrops = document.querySelectorAll(".modal-backdrop");
  //       modalBackdrops.forEach((backdrop) => backdrop.remove());
  //       document.getElementById("loginSignupModal")
  //         ?.addEventListener("hidden.bs.modal", () => {
  //           document.body.classList.remove("modal-open");
  //           document.body.style.overflow = "";
  //           document.body.style.paddingRight = "";
  //           window.location.reload();
  //         });

  //       if (!details.data.isVerified) {
  //         sessionStorage.setItem("e", data.email);

  //         setIsLoading(false);
  //         setIsEmailVerified(false);
  //         setError("Your Email is not Verified first verify your email");
  //         sessionStorage.setItem("ot", "varification");
  //       } else if (details.data.isVerified) {
  //         localStorage.setItem("name" , details.data.full_name)
  //         localStorage.setItem("id" , details.data.user_id)

  //         router.push("/");
  //         localStorage.setItem("loginSuccessfull", "true");
  //         setIsLoading(false);
  //       }
  //       setIsLoading(false);
  //     },
  //     onError: (error) => {
  //       console.error("Error creating user", error);
  //       setIsLoading(false);
  //       setError(
  //         error.response.data.error.message || error.response.data.error.message
  //       );
  //     },
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    mutation.mutate(data, {
      onSuccess: (details) => {
        localStorage.removeItem("id");
        setUser(details.data);

        // ✅ Safe Modal handling
        if (modalInstanceRef.current) {
          modalInstanceRef.current.hide();
        }

        // Cleanup backdrop manually
        const modalBackdrops = document.querySelectorAll(".modal-backdrop");
        modalBackdrops.forEach((backdrop) => backdrop.remove());

        modalRef.current?.addEventListener("hidden.bs.modal", () => {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
          window.location.reload();
        });

        if (!details.data.isVerified) {
          sessionStorage.setItem("e", data.email);
          sessionStorage.setItem("ot", "varification");

          setIsLoading(false);
          setIsEmailVerified(false);
          setError("Your Email is not Verified. Please verify your email.");
        } else {
          localStorage.setItem("name", details.data.full_name);
          localStorage.setItem("id", details.data.user_id);
          localStorage.setItem("loginSuccessfull", "true");

          router.push("/");
          setIsLoading(false);
        }
      },
      onError: (error) => {
        setIsLoading(false);
        console.error("Login error:", error);
        setError(
          error.response?.data?.error?.message || "Something went wrong."
        );
      },
    });
  };


  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="text"
          name="userInput"
          className="form-control"
          placeholder="Enter Email or Mobile Number"
          onChange={inputHandler}
          required
        />
        {validationError && (
          <p style={{ color: "red", fontSize: "14px" }}>{validationError}</p>
        )}
      </div>

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <div
          className="form-control"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type={`${show ? "text" : "password"}`}
            name="password"
            placeholder="Enter Password"
            className="w-100"
            onChange={inputHandler}
            required
            style={{ border: "none", outline: "none" }}
          />
          <p
            className="border-none pointer mt-3"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Hide" : "Show"}
          </p>
        </div>
      </div>

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <Link className="fz14 ff-heading" href="/verification/verify-email">
          Lost your password?
        </Link>
      </div>
      {/* End  Lost your password? */}

      {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}
      {!isEmailVerified ? (
        <div className="d-grid mb20">
          <Link href={"/verification/verify-otp"} className="ud-btn btn-thm">
            Verify Email
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      ) : (
        <div className="d-grid mb20">
          <button
            className="ud-btn btn-thm"
            type="submit"
            disabled={Object.values(validationError).some(
              (error) => error !== ""
            )}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                Sign in <i className="fal fa-arrow-right-long" />
              </>
            )}
          </button>
        </div>
      )}
      {/* End submit */}

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <GoogleAuth />
      </div>
      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
