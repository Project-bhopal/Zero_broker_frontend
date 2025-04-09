import PropertyDetail from "../property-details/page";

export const metadata = {
  title: "Property Details || ZeroBroker",
};

const SingleV1 = ({params}) => {
  return (
    <>
      <PropertyDetail params={params}/>
    </>
  );
};

export default SingleV1;
