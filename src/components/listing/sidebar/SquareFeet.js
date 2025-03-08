"use client";

import { useRef } from "react";

const SquareFeet = ({ filterFunctions }) => {
  const minFeetRef = useRef(null);
  const maxFeetRef = useRef(null);


  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            ref={minFeetRef}
            // onChange={(e) =>
            //   filterFunctions?.handlesquirefeet([
            //     e.target.value,
            //     document.getElementById("maxFeet").value / 1,
            //   ])
            // }
            onChange={(e) =>
              filterFunctions?.handlesquirefeet([
                e.target.value,
                maxFeetRef.current?.value || 0, // Avoids undefined
              ])
            }
            className="form-control filterInput"
            placeholder="Min."
            id="minFeet"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            id="maxFeet"
            ref={maxFeetRef}
            // onChange={(e) =>
            //   filterFunctions?.handlesquirefeet([
            //     document.getElementById("minFeet").value / 1,
            //     e.target.value,
            //   ])
            // }
            onChange={(e) =>
              filterFunctions?.handlesquirefeet([
                minFeetRef.current?.value || 0, // Avoids undefined
                e.target.value,
              ])
            }
            className="form-control filterInput"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default SquareFeet;
