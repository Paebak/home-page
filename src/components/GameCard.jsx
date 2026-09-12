// src/components/GameCard.jsx
import React, { useState } from "react";
import SnakeCard from "./SnakeCard.jsx";
import MinesweeperCard from "./MinesweeperCard.jsx";

const GAMES = [
  { key: "snake", label: "Snake 🐍", Component: SnakeCard },
  { key: "minesweeper", label: "Minesweeper 💣", Component: MinesweeperCard },
];

/**
 * Carousel-style tile that flips between the site's mini-games,
 * one card at a time, using <GameSwitcher /> in each game's header.
 */
export default function GameCard() {
  const [index, setIndex] = useState(0);

  const switcher = {
    index,
    count: GAMES.length,
    onChange: setIndex,
    labels: GAMES.map((g) => g.label),
  };

  const { Component } = GAMES[index];
  return <Component switcher={switcher} />;
}
