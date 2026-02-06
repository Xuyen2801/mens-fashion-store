"use client";

import Link from "next/link";

export default function Breadcrumb({ items = /** @type {any[]} */ ([]), className = "" }) {
  return (
    <nav className={`py-4 text-sm text-gray-500 ${className}`}>
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-black">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-black font-medium" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
