export default function ColorSelector({ colors, selectedColor, onSelectColor }) {
  return (
    <div className="mt-4">
      <p className="text-sm">Màu sắc: <span className="font-bold">{selectedColor}</span></p>
      <div className="flex gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelectColor(color.name)}
            className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
              selectedColor === color.name ? 'border-black scale-110' : 'border-gray-200 opacity-70'
            }`}
          >
            <img src={color.thumbnail} alt={color.name} className="w-full h-full rounded-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

