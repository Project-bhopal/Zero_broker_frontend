"use client";
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });


const Location = ({filterFunctions}) => {
  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    { value: "California", label: "California" },
    { value: "Los Angeles", label: "Los Angeles" },
   
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <Select
                key={Date.now()}
      defaultValue={[locationOptions[0]]}
      name="colors"
      styles={customStyles}
      options={locationOptions}
      className="select-custom"
      classNamePrefix="select"
      required
      value={{value:filterFunctions.location,label:filterFunctions.location}}
      onChange={(e)=>filterFunctions?.handlelocation(e.value)}
    />
  );
};

export default Location;
