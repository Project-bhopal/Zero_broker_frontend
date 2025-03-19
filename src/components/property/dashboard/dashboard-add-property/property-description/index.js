"use client";
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });


const PropertyDescription = () => {

  const currency = [
    { value: "dollar", label: "Dollar" },
    { value: "dihram", label: "Dihram" },
  ];
  const PropertyStatus = [
    { value: "All Cities", label: "All Cities" },
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Published", label: "Published" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#0f8363"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Property Name</label>
            <input
              type="text"
              name='name'
              value={""}
              className="form-control"
              placeholder="Property Name"
            />
          </div>
        </div>
        {/* End .col-12 */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Property Title</label>
            <input
              type="text"
              name='title'
              value={""}
              className="form-control"
              placeholder="Property Title"
            />
          </div>
        </div>
        {/* End .col-12 */}



        

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Property Status
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={[PropertyStatus[1]]}
                name="colors"
                options={PropertyStatus}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
              />
            </div>
          </div>
        </div> */}
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Price in {"$"}
            </label>
            <input
              type="text"
              value={''}
              className="form-control"
              placeholder="Property Price"
            />
          </div>
        </div>
        {/* End .col-6 */}

          {/* <div className="col-sm-6 col-xl-4">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">
                Yearly Tax Rate
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>
          </div> */}
        {/* End .col-6 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              After Price Label
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div> */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Currency
            </label>
            <div className="location-area">
              <Select
                key={Date.now()}
                defaultValue={""}
                name="colors"
                options={currency}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Description <span className='text-gray-500'>{"(optional)"}</span>
            </label>
            <textarea
              cols={30}
              rows={5}
              name='description'
              value={""}
              className=''
              placeholder="Property Description"
            />
          </div>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default PropertyDescription;
