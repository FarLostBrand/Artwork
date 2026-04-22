import { useState, useEffect } from "react";
import { type GalleryImage } from "../images";
import styles from "./Slideshow.module.css";

interface Props {
  images: GalleryImage[];
  onImageClick: (img: GalleryImage) => void;
}

export default function Slideshow({ images, onImageClick }: Props) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const img = images[index];

  return (
    <div className={styles.container}>
      <div className={styles.stage}>
        <img
          src={img.src}
          alt={img.title}
          className={styles.img}
          key={index}
          onClick={() => onImageClick(img)}
        />
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={prev}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={next}
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div className={styles.caption}>
        <h2 className={styles.title}>{img.title}</h2>
        <p className={styles.text}>{img.text}</p>
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
