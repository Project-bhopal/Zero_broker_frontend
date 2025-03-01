"use client";
import { usePost } from "@/hooks/usePost";
import { Box, Snackbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleAuth from "../google-oauth/GoogleOauth";


const SignUp = () => {
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
  const router = useRouter();
  const mutation = usePost("/auth/signup");
  const mutation1 = usePost("/auth/generate-otp");

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = localStorage.getItem("role");

    mutation.mutate(
      { ...data, role },
      {
        onSuccess: (details) => {
          console.log("Sign up successfull", details);
          sessionStorage.removeItem("user", "ot");
          setState({ ...state, open: true });

          sessionStorage.setItem("user", JSON.stringify(details.data));
          sessionStorage.setItem("ot", "varification");
          mutation1.mutate(
            { email: data.email, otp_type: "varification" },
            {
              onSuccess: (details) => {
                if (details) {
                  router.push("/verify-otp");
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
        </div>
        {/* End Email */}

        <div className="mb25">
          <label className="form-label fw600 dark-color">Phone Number</label>
          <input
            type="number"
            name="mobile"
            className="form-control"
            placeholder="Enter Phone Number"
            maxLength={10}
            onChange={inputHandler}
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
        </div>
        {/* End Password */}

        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Create account <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        <div className="hr_content mb20">
          <hr />
          <span className="hr_top_text">OR</span>
        </div>

        <div className="d-grid mb10 ">
            <GoogleAuth/>
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
    </>
  );
};

export default SignUp;
