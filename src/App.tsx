import { useState, useEffect } from "react";
import { images, type GalleryImage } from "./images";
import GridView from "./components/GridView";
import CardView from "./components/CardView";
import Slideshow from "./components/Slideshow";
import Lightbox from "./components/Lightbox";
import styles from "./App.module.css";

type View = "grid" | "cards" | "slideshow";
type Theme = "dark" | "light";

export default function App() {
  const [view, setView] = useState<View>("grid");
  const [theme, setTheme] = useState<Theme>("dark");
  const [freeAspect, setFreeAspect] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.siteTitle}>Art Challenge</h1>
        <div className={styles.controls}>
          {view !== "slideshow" && (
            <button
              className={`${styles.viewBtn} ${freeAspect ? styles.active : ""}`}
              onClick={() => setFreeAspect((v) => !v)}
              aria-label="Toggle aspect ratio"
              title={
                freeAspect
                  ? "Switch to uniform size"
                  : "Switch to natural aspect ratio"
              }
            >
              {freeAspect ? "⊡ Uniform" : "⊞ Natural"}
            </button>
          )}

          <div className={styles.viewSwitcher}>
            {(["grid", "cards", "slideshow"] as View[]).map((v) => (
              <button
                key={v}
                className={`${styles.viewBtn} ${view === v ? styles.active : ""}`}
                onClick={() => setView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <main
        className={view === "slideshow" ? styles.mainSlideshow : styles.main}
      >
        {view === "grid" && (
          <GridView
            images={images}
            onImageClick={setLightboxImage}
            freeAspect={freeAspect}
          />
        )}
        {view === "cards" && (
          <CardView
            images={images}
            onImageClick={setLightboxImage}
            freeAspect={freeAspect}
          />
        )}
        {view === "slideshow" && (
          <Slideshow images={images} onImageClick={setLightboxImage} />
        )}
      </main>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
