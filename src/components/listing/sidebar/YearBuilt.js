"use client";

import { useRef } from "react";

const YearBuilt = ({ filterFunctions }) => {

  const minYearRef = useRef(null);
  const maxYearRef = useRef(null);

  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            ref={minYearRef}
            // onChange={(e) =>
            //   filterFunctions?.handleyearBuild(
            //     [
            //       e.target.value || 1800,
            //       document.getElementById("maxFeet2").value / 1,
            //     ] || 2050
            //   )
            // }
            onChange={(e) =>
              filterFunctions?.handleyearBuild([
                e.target.value || 1800,
                maxYearRef.current?.value || 2050,
              ])
            }
            className="form-control filterInput"
            placeholder={2019}
            id="minFeet2"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            ref={maxYearRef}
            // onChange={(e) =>
            //   filterFunctions?.handleyearBuild([
            //     document.getElementById("minFeet2").value / 1 || 1800,
            //     e.target.value || 2050,
            //   ])
            // }
            onChange={(e) =>
              filterFunctions?.handleyearBuild([
                minYearRef.current?.value || 1800,
                e.target.value || 2050,
              ])
            }
            className="form-control filterInput"
            placeholder={2022}
            id="maxFeet2"
          />
        </div>
      </div>
    </div>
  );
};

export default YearBuilt;
