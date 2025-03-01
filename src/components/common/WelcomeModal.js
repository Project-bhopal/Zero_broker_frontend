"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

const WelcomeModal = ({ showModal, setShowModal }) => {
  const router = useRouter();

  
  useEffect(() => {
    if (typeof window !== "undefined" && showModal) {
      import("bootstrap/dist/js/bootstrap.bundle.min")
        .then((bootstrap) => {
          const modalElement = document?.getElementById("welcomeModal");
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            modalElement.addEventListener("hidden.bs.modal", () => {
              document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
                backdrop.remove();
              });
            });
          }
        })
        .catch((error) => console.error("Bootstrap Modal Error:", error));
    }
  }, [showModal]);

  const handleCreateAccount = () => {
    router.push("/register"); // Redirect to signup page
  };

  const handleContinueAs = (role) => {
   localStorage.setItem("role", role)
    
  }


  return (
    <div className="modal fade" id="welcomeModal" tabIndex={-1} aria-hidden="true"  data-bs-backdrop="static">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-body ">
            <div className="d-flex justify-content-center gap-3">
              {/* <button className="ud-btn btn-white" data-bs-dismiss="modal" onClick={handleCreateAccount}>
                Create an Account
              </button> */}

              <button
                className="ud-btn btn-white"
                data-bs-dismiss="modal"
                onClick={()=>{handleContinueAs("seller"); handleCreateAccount()}}
              >
                Continue as a Seller
              </button>
              <button
                className="ud-btn btn-white"
                data-bs-dismiss="modal"
                onClick={()=>{handleContinueAs("buyer"); handleCreateAccount()}}
              >
                Continue as a Buyer
              </button>
              <button
                className="ud-btn btn-white"
                data-bs-dismiss="modal"
                onClick={()=>{handleContinueAs("guest")}}
              >
                Continue as a Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
