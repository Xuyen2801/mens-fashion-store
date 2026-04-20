import Link from "next/link";
import Image from "next/image";

type Props = {
  id: number;
  title: string;
  image: string;
  link: string;
  name: string
};

export default function CollectionCard({ title, image, link, name }: Props) {
  return (
    <Link href={link || "#"}>
      <div className="relative h-[500px] md:h-[600px] overflow-hidden group cursor-pointer">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-10 left-6 text-white">
          <p className="text-lg tracking-wide">{name}</p>
          <h3 className="text-3xl md:text-4xl font-bold">
            {title}
          </h3>
        </div>

      </div>
    </Link>
  );
}