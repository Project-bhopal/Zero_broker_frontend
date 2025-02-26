"use client";
import { usePost } from "@/hooks/usePost";
import Link from "next/link";
import React, { useState } from "react";

const SignIn = () => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const mutation = usePost("url");

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mutation.mutate({data},
    //   {
    //     onSuccess : (details)=>{
    //       console.log("Sign up successfull", details)
    //     },
    //     onError: (error)=>{
    //       console.error("Error creating user", error)
    //     }
    //   }
    // )/
    console.log(data);
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
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

      

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <div
          className="form-control"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type={`${show ? 'text' : 'password'}`}
            name="password"
            placeholder="Enter Password"
            className="w-100"
            onChange={inputHandler}
            required
            style={{ border: "none", outline: "none" }}
          />
          <p className="border-none pointer mt-3" onClick={()=>{setShow(!show)}}>{show? "Hide" : "Show"}</p>
        </div>
      </div>

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Sign in <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
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
