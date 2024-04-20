import React from "react";
import CardShortHand from "../../ShortHand/CardShortHand/CardShortHand";

const NewArrival = () => {
  return (
    <CardShortHand
      text={"New Arrivals"}
      url={"/new-arrival"}
      apiUrl={`http://localhost:5000/api/products/all`}
      width={255}
      height={250}
      color={"#f5f5f5"}
      slice={4}
    />
  );
};

export default NewArrival;
