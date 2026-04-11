"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CollectionCard from "./CollectionCard";
 
type CollectionItem = {
  _id?: string;
  id?: number;
  title: string;
  image: string;
  link: string;
  name: string;
};

type Props = {
  collections: CollectionItem[];
};

function CollectionSection({ collections }: Props) {

  return (
    <section className="w-full px-12 py-20 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        BỘ SƯU TẬP MỚI NHẤT
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={20}
        slidesPerView={3}
      >
        <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">
            ‹
          </button>
        </div>

        <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">
            ›
          </button>
        </div>

        {collections.map((item) => (
          <SwiperSlide key={item._id ?? item.id}>
            <CollectionCard
              id={item.id ?? 0}
              title={item.title}
              image={item.image}
              link={item.link}
              name={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default CollectionSection;