"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Chỉ render lên thẻ body của trình duyệt để thoát khỏi overflow:hidden của thẻ cha
  return mounted ? createPortal(children, document.body) : null;
}