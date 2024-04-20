import React from "react";
import CardShortHand from "../../ShortHand/CardShortHand/CardShortHand";

const DiscountedOffers = () => {
  return (
    <CardShortHand
      text={"Big Saving Zone"}
      url={"/discounted-offers"}
      apiUrl={`http://localhost:5000/api/products/all`}
      width={255}
      height={250}
      color={"#f5f5f5"}
      slice={8}
    />
  );
};

export default DiscountedOffers;
