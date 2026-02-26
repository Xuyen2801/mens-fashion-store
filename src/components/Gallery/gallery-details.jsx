export default function Gallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div>
      {images.map((img, index) => (
        <img key={index} src={img} />
      ))}
    </div>
  );
}