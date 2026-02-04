import React from "react";

const CollectionBanner = ({ backgroundImage }) => {
  return (
    <div
      className="relative w-full h-[796px] bg-cover bg-center flex items-center justify-center mb-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default CollectionBanner;
