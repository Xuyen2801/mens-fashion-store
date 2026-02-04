import React from "react";

const CollectionBanner = ({ backgroundImage }) => {
  return (
    <div
      className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center mt-4 mb-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default CollectionBanner;
