import React from "react";
import CardShortHand from "../../ShortHand/CardShortHand/CardShortHand";

const MensCategories = () => {
  return (
    <CardShortHand
      text={"Categories For Men"}
      url={"/mens-categories"}
      apiUrl={`http://localhost:5000/api/products/all`}
      width={255}
      height={250}
      color={"#f5f5f5"}
      slice={8}
    />
  );
};

export default MensCategories;
