export default function SizeSelector({ sizes, selectedSize, onSelectSize, outOfStockSizes = [] }) {
  return (
    <div className="mt-4">
      <p className="text-sm font-bold uppercase mb-2">Kích thước: {selectedSize}</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isOutOfStock = outOfStockSizes.includes(size);
          return (
            <button
              key={size}
              disabled={isOutOfStock}
              onClick={() => onSelectSize(size)}
              className={`relative w-12 h-10 border text-sm font-bold transition-all ${
                isOutOfStock ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'hover:border-black'
              } ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600'}`}
            >
              {size}
              {isOutOfStock && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full bg-gray-300 rotate-45"></div></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}