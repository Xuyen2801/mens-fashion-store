
export default function ColorSelector({ variants, selectedVariant, onColorChange }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm">
        Màu sắc: <span className="font-bold">{selectedVariant?.color}</span>
      </p>
      <div className="flex gap-2 mt-2">
        {variants.map((v) => (
          <button
            key={v.color}
            onClick={() => onColorChange(v)} 
            className={`w-12 h-12 rounded-full border-2 p-0.5 transition-all overflow-hidden ${
              selectedVariant?.color === v.color 
                ? 'border-black scale-110 shadow-md' 
                : 'border-gray-200 opacity-80 hover:opacity-100'
            }`}
            title={v.color}
          >
            <img 
              src={v.image} 
              alt={v.color} 
              className="w-full h-full rounded-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}