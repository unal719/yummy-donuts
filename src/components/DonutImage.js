import React from "react";

const DonutImage = ({ donutId = null }) => {
  return (
    donutId !== null && (
      <img
        src={`${
          process.env.PUBLIC_URL
        }/donuts-images/donuts-${donutId.toString()}.PNG`}
        alt=""
      />
    )
  );
};

export default DonutImage;
