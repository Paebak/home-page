// src/components/GameSwitcher.jsx
import React from "react";

/**
 * Small carousel-style control for flipping between games in a shared tile.
 * Renders prev/next arrows plus a dot per game, mirroring <PhotoCard />'s controls.
 */
export default function GameSwitcher({ index, count, onChange, labels }) {
  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  return (
    <div className="game-switcher" role="tablist" aria-label="Choose game">
      <button
        type="button"
        className="game-switcher__btn"
        onClick={prev}
        aria-label="Previous game"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="game-switcher__dots">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`game-switcher__dot ${i === index ? "game-switcher__dot--active" : ""}`}
            onClick={() => onChange(i)}
            title={label}
            aria-label={label}
          />
        ))}
      </div>

      <button
        type="button"
        className="game-switcher__btn"
        onClick={next}
        aria-label="Next game"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
