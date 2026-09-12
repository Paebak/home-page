// src/components/GameCard.jsx
import React, { useState } from "react";
import SnakeCard from "./SnakeCard.jsx";
import MinesweeperCard from "./MinesweeperCard.jsx";

const GAMES = [
  { key: "minesweeper", label: "Minesweeper 💣" },
  { key: "snake", label: "Snake 🐍" },
];

/**
 * Carousel-style tile that flips between the site's mini-games.
 * Both games stay mounted at all times (just hidden/shown) so switching
 * back and forth preserves in-progress state — a game only resets when
 * its own "New Game" / reset control is used.
 */
export default function GameCard() {
  const [index, setIndex] = useState(0); // Minesweeper is the featured/default game

  const switcher = {
    index,
    count: GAMES.length,
    onChange: setIndex,
    labels: GAMES.map((g) => g.label),
  };

  return (
    <>
      <div className="h-100" hidden={index !== 0}>
        <MinesweeperCard switcher={switcher} />
      </div>
      <div className="h-100" hidden={index !== 1}>
        <SnakeCard switcher={switcher} active={index === 1} />
      </div>
    </>
  );
}
