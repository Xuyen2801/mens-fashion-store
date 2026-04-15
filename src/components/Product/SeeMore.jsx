"use client";

import { useState } from "react";

export default function SeeMore({
  children,
  maxHeight = 600,
  moreText = "Xem thêm",
  lessText = "Thu gọn"
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="see-more-wrapper">
      <div
        className={`see-more-content ${expanded ? "expanded" : ""}`}
        style={!expanded ? { maxHeight } : {}}
      >
        {children}
        {!expanded && <div className="see-more-overlay" />}
      </div>
     <div className = "seeMore_btn">
      <button
        className="btn-see-more-unified"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? lessText : moreText}
      </button>
    </div>
      
    </div>
  );
}
