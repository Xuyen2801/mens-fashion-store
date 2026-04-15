import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_BANNER = "/images/banners/2000x900_-_banner_nhom_sp_-_tat_ca_san_pham.jpg";

const normalizeBannerUrl = (value) => {
  const src = String(value || "").trim();
  if (!src) {
    return DEFAULT_BANNER;
  }

  return src;
};

const CollectionBanner = ({ backgroundImage }) => {
  const preferredSrc = useMemo(() => normalizeBannerUrl(backgroundImage), [backgroundImage]);
  const [bannerSrc, setBannerSrc] = useState(preferredSrc);

  useEffect(() => {
    setBannerSrc(preferredSrc);
  }, [preferredSrc]);

  return (
    <div className="relative w-full h-[600px] mb-4 overflow-hidden bg-gray-100">
      <img
        src={bannerSrc}
        alt="Collection banner"
        className="w-full h-full object-cover"
        loading="eager"
        onError={(event) => {
          if (event.currentTarget.src !== DEFAULT_BANNER) {
            setBannerSrc(DEFAULT_BANNER);
          }
        }}
      />
    </div>
  );
};

export default CollectionBanner;
