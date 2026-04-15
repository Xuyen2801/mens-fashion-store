import styles from "./HeroBanner.module.css";
// import banners from "../../../data/Banner/homeStore";
import {useState, useEffect} from "react";

interface Props{
    images: string[];
}

function HeroBanner({images}: Props){
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() =>{
        if (!images.length) {
          return;
        }

        if (images.length <= 1) {
          return;
        }

        const interval = setInterval(() =>{
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1);
        }, 3000);

        return() => clearInterval(interval);
    }, [images.length]);

    if (!images.length) {
      return null;
    }

    return (
  <div className={styles.hero}>
    <img
      src={images[currentIndex]}
      alt={`Banner ${currentIndex + 1}`}
      className={styles.image}
    />

    <button
      className={`${styles.navBtn} ${styles.prev}`}
      onClick={() =>
        setCurrentIndex(
          currentIndex === 0 ? images.length - 1 : currentIndex - 1
        )
      }
    >
      &#10094;
    </button>

    <button
      className={`${styles.navBtn} ${styles.next}`}
      onClick={() =>
        setCurrentIndex(
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        )
      }
    >
      &#10095;
    </button>
  </div>
);

}

export default HeroBanner;