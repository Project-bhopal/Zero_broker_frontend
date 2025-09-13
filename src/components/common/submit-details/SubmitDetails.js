"use client";
import { usePost } from "@/hooks/usePost";
import { Box, Snackbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useUserStore } from "@/store/store";
import GoogleAuth from "@/components/common/google-oauth/GoogleOauth";

const SubmitDetails = () => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [data, setData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    document: null, // Changed from password to document
  });

  const [validationErrors, setValidationErrors] = useState({
    fullname: "",
    email: "",
    document: "",
  });

  const [errors, setErrors] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const mutation = usePost("");
  const { setUser } = useUserStore();

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

    if (name === "document") {
      if (!value) {
        error = "Please upload a document.";
      } else {
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/jpg",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(value.type)) {
          error = "Only PDF, JPG, or PNG files are allowed.";
        } else if (value.size > maxSize) {
          error = "File size should be less than 5MB.";
        }
      }
    }

    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, document: file }));
      validateInput("document", file);

      // Create preview for both PDF and images
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentPreview(e.target.result);
      };

      if (file.type === "application/pdf") {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      }
    }
  };

  const removeDocument = () => {
    setData((prev) => ({ ...prev, document: null }));
    setDocumentPreview(null);
    setValidationErrors((prev) => ({ ...prev, document: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = localStorage.getItem("role");
    const interest = localStorage.getItem("interestedIn");

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("document", data.document);
    formData.append("role", role);
    formData.append("interest", interest);

    mutation.mutate(
        formData,
        {
          onSuccess: (details) => {
            console.log(details)
            setState({ ...state, open: true });
          },
          onError: (error) => {
            console.error("Error Submitting Details", error);
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

        <div className="mb25">
          <label className="form-label fw600 dark-color">Phone Number</label>
          <input
            type="tel"
            name="mobile"
            className="form-control"
            placeholder="Enter Phone Number"
            onChange={inputHandler}
            maxLength={10}
            pattern="[0-9]*"
            required
          />
        </div>

        {errors.length > 0 && (
          <div className="mb20">
            {errors.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err.msg}
              </p>
            ))}
          </div>
        )}

        <div className="mb20">
          <label className="form-label fw600 dark-color">
            Upload Document (Passport/Title Deed/Emirates ID)
          </label>
          <input
            type="file"
            name="document"
            className="form-control"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
            ref={fileInputRef}
          />
          <small className="text-muted">
            Please upload a PDF, JPG, or PNG of your documents (max 5MB)
          </small>
          {validationErrors.document && (
            <p style={{ color: "red" }}>{validationErrors.document}</p>
          )}

          {/* Document/Image Preview Section */}
          {documentPreview && (
            <div className="mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fw600">Selected File:</span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={removeDocument}
                >
                  Remove
                </button>
              </div>

              <div className="mt-2 border p-2">
                {data.document?.type === "application/pdf" ? (
                  <>
                    <iframe
                      src={documentPreview}
                      width="100%"
                      height="300px"
                      style={{ border: "none" }}
                      title="Document Preview"
                    />
                    <div className="text-center mt-2">
                      <a
                        href={documentPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Open in New Tab
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <img
                      src={documentPreview}
                      alt="Document Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                      className="img-fluid"
                    />
                    <div className="mt-2">
                      <a
                        href={documentPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Open in New Tab
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="d-grid mb20">
          <button
            className="ud-btn btn-thm"
            type="submit"
            disabled={
              Object.values(validationErrors).some(error => error !== "") ||
              mutation.isPending
            }
          >
            {mutation.isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              <>
                Submit Details <i className="fal fa-arrow-right-long" />
              </>
            )}
          </button>
        </div>
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
              Details Submitted Successfully!{" "}
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

export default SubmitDetails;
