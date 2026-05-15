import React, { useState, useEffect, useCallback } from "react";

const PHOTOS = [
  { src: "/photos/p01.jpg",  label: "Street Portrait" },
  { src: "/photos/p02.jpg",  label: "Banker's Towing" },
  { src: "/photos/p03.jpg",  label: "Radio Tower" },
  { src: "/photos/p04.jpg",  label: "MG Roadster" },
  { src: "/photos/p05.jpg",  label: "Alley, Portland" },
  { src: "/photos/p06.jpg",  label: "Truck Portrait" },
  { src: "/photos/p07.jpg",  label: "Fire Escape" },
  { src: "/photos/p08.jpg",  label: "Farm Truck" },
  { src: "/photos/p09.jpg",  label: "Open Sign" },
  { src: "/photos/p10.jpg",  label: "Found Shoes" },
  { src: "/photos/p11.jpg",  label: "Shoreline" },
  { src: "/photos/p12.jpg",  label: "Deliveries" },
  { src: "/photos/p13.jpg",  label: "Gothic Hall" },
  { src: "/photos/p14.jpg",  label: "Seattle Skyline" },
];

export default function PhotoCard() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((next) => {
    setFading(true);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      goTo((index + 1) % PHOTOS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [index, goTo]);

  const prev = () => goTo((index - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => goTo((index + 1) % PHOTOS.length);

  const photo = PHOTOS[index];

  return (
    <div className="photo-card">
      {/* Background image */}
      <div
        className={`photo-card__bg ${fading ? "photo-card__bg--fading" : ""}`}
        style={{ backgroundImage: `url(${photo.src})` }}
      />

      {/* Gradient overlay */}
      <div className="photo-card__overlay" />

      {/* Top label */}
      <div className="photo-card__top">
        <span className="photo-card__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M20.94 13A8.006 8.006 0 1 1 11 3.06" /><path d="M22 2L11.17 12.83" />
          </svg>
          Film Photography
        </span>
      </div>

      {/* Bottom info + controls */}
      <div className="photo-card__bottom">
        <div className="photo-card__info">
          <span className="photo-card__label">{photo.label}</span>
          <span className="photo-card__counter">{index + 1} / {PHOTOS.length}</span>
        </div>
        <div className="photo-card__controls" onClick={e => e.preventDefault()}>
          <button className="photo-card__btn" onClick={prev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="photo-card__dots">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                className={`photo-card__dot ${i === index ? "photo-card__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
          <button className="photo-card__btn" onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
