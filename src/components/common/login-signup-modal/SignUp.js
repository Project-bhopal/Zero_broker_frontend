"use client";
import { usePost } from "@/hooks/usePost";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
      email: "",
      phone: "",
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
      {/* End Email */}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Phone Number</label>
        <input
          type="number"
          name="phone"
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
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
