"use client";

import { useState } from "react";
import { IoCaretDownOutline } from "react-icons/io5";

const FAQAccordion = ({ faqData = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqData || faqData.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`border-b border-gray-100 transition-all duration-300 ${
              openIndex === index ? "pb-4" : "pb-0"
            }`}
          >
            <button
              className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800 hover:text-black transition-colors"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-[15px] md:text-base leading-snug">{item.title}</span>
              <span 
                className={`text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-black" : ""
                }`}
              >
                <IoCaretDownOutline size={18} />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed pr-8">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;