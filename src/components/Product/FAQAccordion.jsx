
"use client";
import { useState } from "react";
import faqData from "../../data/Product/fadData.json"; 
import "../../styles/Product/Fad.css"; 
import { IoCaretDownOutline } from "react-icons/io5";
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="body">
    <div className="faq-accordion">
    
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "active" : ""}`}
        >
          <button
            className="faq-question"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            {item.title}
            <span className="faq-icon">{openIndex === index ? <IoCaretDownOutline/> : <IoCaretDownOutline/>}</span>
          </button>

          <div className="faq-answer">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQAccordion;