import { useEffect } from "react";
import { type GalleryImage } from "../images";
import styles from "./Lightbox.module.css";

interface Props {
  image: GalleryImage;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose}>
        ✕
      </button>
      <img
        src={image.src}
        alt={image.title}
        className={styles.img}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
