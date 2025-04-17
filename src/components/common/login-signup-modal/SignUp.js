"use client";
import { usePost } from "@/hooks/usePost";
import { Box, Snackbar } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GoogleAuth from "../google-oauth/GoogleOauth";
import Cookies from "js-cookie";
import WelcomeModal from "../WelcomeModal";
import AnimatedModal from "../AnimatedModal";
// import { Modal } from "bootstrap";
import { useUserStore } from "@/store/store";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("bootstrap"), { ssr: false });

const SignUp = () => {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [validationErrors, setvalidationErrors] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const mutation = usePost("/auth/signup");
  const mutation1 = usePost("/auth/generate-otp");
  const {setUser} = useUserStore();

  useEffect(() => {
  
    if (pathname === "/register") {
      const token = Cookies.get("accessToken");
      const firstVisit = localStorage.getItem("firstVisit");
      const role = localStorage.getItem("role");
      localStorage.clear()

      if (modalRef.current) {
        const modalInstance = Modal.getInstance(modalRef.current);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    //  Manually remove the backdrop if it remains
      const modalBackdrops = document.querySelectorAll(".modal-backdrop");
      modalBackdrops.forEach((backdrop) => backdrop.remove());

      if (modalRef.current) {
        modalRef.current.addEventListener("hidden.bs.modal", () => {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        });
      }

      if (!token && !firstVisit && !role) {
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
      } else {
        setShowModal(false);
      }
    }
  }, []);


  

  const validateInput = (name, value) => {
    let error = "";

    if (name === "fullname") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        error = "Name should contain only alphabets.";
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = "Enter a valid email address.";
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character(@$!%*?&).";
      }
    }

    setvalidationErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = localStorage.getItem("role");
    const interest = localStorage.getItem("interestedIn");

    mutation.mutate(
      { ...data, role, interest},
      {
        onSuccess: (details) => {
          sessionStorage.removeItem("user", "ot");
          setState({ ...state, open: true });
          setUser(details.data)
          // sessionStorage.setItem("user", JSON.stringify(details.data));
          sessionStorage.setItem("ot", "varification");
          mutation1.mutate(
            { email: data.email, otp_type: "varification" },
            {
              onSuccess: (details) => {
                if (details) {
                  router.push("/verification/verify-otp");
                          
                }
              },
              onError: (error) => {
                console.log(`error during generating otp :`, error);
              },
            }
          );
        },
        onError: (error) => {
          console.error("Error creating user", error);
          setErrors(error.response.data.errors);
          error.response.data.errors.map((err) => {
            console.log(err.msg);
          });
        },
      }
    );
    console.log(data);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="mb25">
          <label className="form-label fw600 dark-color">Full Name</label>
          <input
            type="text"
            name="fullname"
            className="form-control"
            placeholder="Enter Full Name"
            onChange={inputHandler}
            required
          />
          {validationErrors.fullname && (
            <p style={{ color: "red" }}>{validationErrors.fullname}</p>
          )}
        </div>
        <div className="mb25">
          <label className="form-label fw600 dark-color">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={inputHandler}
            required
          />
          {validationErrors.email && (
            <p style={{ color: "red" }}>{validationErrors.email}</p>
          )}
        </div>
        {/* End Email */}

        <div className="mb25">
          <label className="form-label fw600 dark-color">Phone Number</label>
          <input
            type="number"
            name="mobile"
            className="form-control"
            placeholder="Enter Phone Number"
            onChange={inputHandler}
            maxLength={10}
            inputMode="tel"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="mb20">
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
          {validationErrors.password && (
            <p style={{ color: "red" }}>{validationErrors.password}</p>
          )}
        </div>
        {/* End Password */}
        {errors &&
          errors.map((err) => <p style={{ color: "red" }}>{err.msg}</p>)}

        <div className="d-grid mb20">
          <button
            className="ud-btn btn-thm"
            type="submit"
            disabled={Object.values(validationErrors).some(
              (error) => error !== ""
            )}
          >
            Create account <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        <div className="hr_content mb20">
          <hr />
          <span className="hr_top_text">OR</span>
        </div>

        <div className="d-grid mb10 ">
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
          Already Have an Account?{" "}
          <Link className="dark-color fw600" href="/login">
            Login
          </Link>
        </p>
      </form>

      <Box>
        <Snackbar
          anchorOrigin={{
            vertical: state.vertical,
            horizontal: state.horizontal,
          }}
          open={state.open}
          onClose={handleClose}
          key={state.vertical + state.horizontal}
          autoHideDuration={5000}
          message={
            <div>
              Account Created Successfully!{" "}
              <i className="fa fa-check-circle"></i>
            </div>
          }
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#068662",
              color: "white",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
      {/* <WelcomeModal showModal={showModal} setShowModal={setShowModal} /> */}
      <AnimatedModal show={showModal} handleClose={() => setShowModal(false)} ref={modalRef}/>
    </>
  );
};

export default SignUp;
