import PropertyDetail from "../property-details/page";

export const metadata = {
  title: "Property Single V1 || ZeroBroker - Real Estate NextJS Template",
};

const SingleV1 = ({params}) => {
  return (
    <>
      <PropertyDetail params={params}/>
    </>
  );
};

export default SingleV1;
