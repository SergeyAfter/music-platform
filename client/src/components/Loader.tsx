import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <Bars
      height="100"
      width="100"
      color="#0ead69"
      ariaLabel="loading"
      wrapperClass="loader"
    />
  );
};

export default Loader;
