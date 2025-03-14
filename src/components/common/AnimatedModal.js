import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../../public/css/AnimatedModal.module.css"

const AnimatedModal = ({ show, handleClose }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
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
                <button  className="ud-btn btn-white text-nowrap">List a Property for Sale</button>
                <button  className="ud-btn btn-white text-nowrap">List a Property for Rent</button>
              </>
            ) : (
              <>
                <button  className="ud-btn btn-white text-nowrap">Purchase a Property</button>
                <button  className="ud-btn btn-white text-nowrap">Rent a Property</button>
              </>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AnimatedModal;
