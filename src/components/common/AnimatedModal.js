"use client"
import { forwardRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../../public/css/AnimatedModal.module.css"

const AnimatedModal = forwardRef(({ show, handleClose }, ref) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedInterestedIn, setSelectedInterestedIn] = useState(null);

  const handleSelection = (role) => {
    setSelectedRole(role);
    if(role){
      localStorage.setItem("role", role)
    }
  };

  const handleInterestedIn = (interestedIn)=>{
    setSelectedInterestedIn(interestedIn)
    if(interestedIn){
      localStorage.setItem("interestedIn", interestedIn)
      handleClose()
    }
  }

  return (
    <Modal ref={ref} show={show} onHide={handleClose} centered>
      <Modal.Body className={styles.modalBody}>
        <h4 className="text-center mb-4">Continue as {selectedRole}</h4>

        <div className={styles.buttonContainer}>
          {!selectedRole && (
            <>
              <button  className="ud-btn btn-white text-nowrap" onClick={() => handleSelection("seller")}>
                Seller
              </button>
              <button  className="ud-btn btn-white text-nowrap" onClick={() => handleSelection("buyer")}>
                Buyer
              </button>
            </>
          )}
        </div>

        {selectedRole && (
          <div className={`${styles.buttonContainer} ${styles.fadeIn}`}>
            {selectedRole === "seller" ? (
              <>
                <button  className="ud-btn btn-white text-nowrap" onClick={()=>{handleInterestedIn("List a property for sell")}}>List a Property for Sale</button>
                <button  className="ud-btn btn-white text-nowrap" onClick={()=>{handleInterestedIn("List a  property for Rent")}}>List a Property for Rent</button>
              </>
            ) : (
              <>
                <button  className="ud-btn btn-white text-nowrap" onClick={()=>{handleInterestedIn("purchase a property")}}>Purchase a Property</button>
                <button  className="ud-btn btn-white text-nowrap" onClick={()=>{handleInterestedIn("rent a property")}}>Rent a Property</button>
              </>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
});

export default AnimatedModal;
