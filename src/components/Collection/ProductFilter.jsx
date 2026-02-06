import React from "react";

const ProductFilter = ({ conditions }) => {
  return (
    <div className="flex justify-end mb-6">
      <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
        <option value="default">Sản phẩm nổi bật</option>
        {conditions &&
          conditions.map((cond, index) => (
            <option key={index} value={cond}>
              {cond}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProductFilter;
