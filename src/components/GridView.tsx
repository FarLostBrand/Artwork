import { type GalleryImage } from "../images";
import styles from "./GridView.module.css";

interface Props {
  images: GalleryImage[];
  onImageClick: (img: GalleryImage) => void;
  freeAspect?: boolean;
}

export default function GridView({
  images,
  onImageClick,
  freeAspect = false,
}: Props) {
  return (
    <div className={styles.grid}>
      {images.map((img, i) => (
        <div key={i} className={styles.card}>
          <div
            className={`${styles.imgWrap} ${freeAspect ? styles.imgWrapFree : ""}`}
            onClick={() => onImageClick(img)}
          >
            <img src={img.src} alt={img.title} className={styles.img} />
          </div>
          <div className={styles.body}>
            <h2 className={styles.title}>{img.title}</h2>
            <p className={styles.text}>{img.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
