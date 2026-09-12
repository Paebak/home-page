// src/components/MinesweeperCard.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Button, ButtonGroup, Badge } from "react-bootstrap";
import GameSwitcher from "./GameSwitcher.jsx";

/**
 * <MinesweeperCard /> — intermediate difficulty (16x16, 40 mines), the
 * classic Windows Minesweeper "Intermediate" configuration.
 * Left-click / tap to reveal. Right-click to flag. On mobile, toggle
 * Flag Mode to flag with a tap instead of a long-press.
 */
export default function MinesweeperCard({ switcher }) {
  const ROWS = 16;
  const COLS = 16;
  const MINES = 40;
  const TOTAL_SAFE = ROWS * COLS - MINES;

  const makeEmptyBoard = () =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        mine: false,
        adjacent: 0,
        revealed: false,
        flagged: false,
      }))
    );

  const [board, setBoard] = useState(makeEmptyBoard);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost
  const [revealedCount, setRevealedCount] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const [best, setBest] = useState(() => Number(localStorage.getItem("minesweeper.best") || 0));
  const [pressing, setPressing] = useState(false);

  const minedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (status !== "playing") return;
    timerRef.current = setInterval(() => setSeconds((s) => Math.min(s + 1, 999)), 1000);
    return () => clearInterval(timerRef.current);
  }, [status]);

  // Classic Minesweeper: the face goes "surprised" while a reveal press
  // (single left-click or the two-button chord) is held down, wherever
  // the release ends up happening.
  useEffect(() => {
    const onUp = () => setPressing(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const resetGame = useCallback(() => {
    clearInterval(timerRef.current);
    minedRef.current = false;
    setBoard(makeEmptyBoard());
    setStatus("idle");
    setRevealedCount(0);
    setFlagCount(0);
    setSeconds(0);
    setFlagMode(false);
  }, []);

  const placeMines = (grid, avoidR, avoidC) => {
    const candidates = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.abs(r - avoidR) <= 1 && Math.abs(c - avoidC) <= 1) continue;
        candidates.push([r, c]);
      }
    }
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    for (let i = 0; i < MINES; i++) {
      const [r, c] = candidates[i];
      grid[r][c].mine = true;
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c].mine) continue;
        let n = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && grid[rr][cc].mine) n++;
          }
        }
        grid[r][c].adjacent = n;
      }
    }
  };

  const floodReveal = (grid, startR, startC) => {
    const stack = [[startR, startC]];
    let count = 0;
    while (stack.length) {
      const [r, c] = stack.pop();
      const cell = grid[r][c];
      if (cell.revealed || cell.flagged) continue;
      cell.revealed = true;
      count++;
      if (cell.adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && !grid[rr][cc].revealed) {
              stack.push([rr, cc]);
            }
          }
        }
      }
    }
    return count;
  };

  const revealCell = (r, c) => {
    if (status === "won" || status === "lost") return;
    if (board[r][c].flagged) return;

    const grid = board.map((row) => row.map((cell) => ({ ...cell })));

    if (!minedRef.current) {
      placeMines(grid, r, c);
      minedRef.current = true;
      setStatus("playing");
    }

    if (grid[r][c].mine) {
      for (let rr = 0; rr < ROWS; rr++) {
        for (let cc = 0; cc < COLS; cc++) {
          if (grid[rr][cc].mine) grid[rr][cc].revealed = true;
        }
      }
      grid[r][c].boom = true;
      clearInterval(timerRef.current);
      setBoard(grid);
      setStatus("lost");
      return;
    }

    const gained = floodReveal(grid, r, c);
    const newRevealedCount = revealedCount + gained;
    setBoard(grid);
    setRevealedCount(newRevealedCount);

    if (newRevealedCount >= TOTAL_SAFE) {
      clearInterval(timerRef.current);
      setStatus("won");
      setBest((prevBest) => {
        if (prevBest === 0 || seconds < prevBest) {
          localStorage.setItem("minesweeper.best", String(seconds));
          return seconds;
        }
        return prevBest;
      });
    }
  };

  const toggleFlag = (r, c) => {
    if (status === "won" || status === "lost") return;
    if (board[r][c].revealed) return;
    const grid = board.map((row) => row.map((cell) => ({ ...cell })));
    grid[r][c].flagged = !grid[r][c].flagged;
    setBoard(grid);
    setFlagCount((f) => f + (grid[r][c].flagged ? 1 : -1));
  };

  // "Chording": pressing both mouse buttons on an already-revealed number
  // auto-reveals its unflagged neighbors once enough of them are flagged,
  // matching classic Minesweeper behavior.
  const chordReveal = (r, c) => {
    if (status === "won" || status === "lost") return;
    const cell = board[r][c];
    if (!cell.revealed || cell.adjacent === 0) return;

    let flaggedNeighbors = 0;
    const targets = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
        const n = board[rr][cc];
        if (n.flagged) flaggedNeighbors++;
        else if (!n.revealed) targets.push([rr, cc]);
      }
    }
    if (flaggedNeighbors !== cell.adjacent || targets.length === 0) return;

    const grid = board.map((row) => row.map((c2) => ({ ...c2 })));
    let hitMine = false;
    let gained = 0;
    for (const [rr, cc] of targets) {
      if (grid[rr][cc].revealed || grid[rr][cc].flagged) continue;
      if (grid[rr][cc].mine) {
        hitMine = true;
        grid[rr][cc].revealed = true;
        grid[rr][cc].boom = true;
      } else {
        gained += floodReveal(grid, rr, cc);
      }
    }

    if (hitMine) {
      for (let rr = 0; rr < ROWS; rr++) {
        for (let cc = 0; cc < COLS; cc++) {
          if (grid[rr][cc].mine) grid[rr][cc].revealed = true;
        }
      }
      clearInterval(timerRef.current);
      setBoard(grid);
      setStatus("lost");
      return;
    }

    const newRevealedCount = revealedCount + gained;
    setBoard(grid);
    setRevealedCount(newRevealedCount);
    if (newRevealedCount >= TOTAL_SAFE) {
      clearInterval(timerRef.current);
      setStatus("won");
      setBest((prevBest) => {
        if (prevBest === 0 || seconds < prevBest) {
          localStorage.setItem("minesweeper.best", String(seconds));
          return seconds;
        }
        return prevBest;
      });
    }
  };

  const onCellClick = (r, c) => {
    if (flagMode) toggleFlag(r, c);
    else revealCell(r, c);
  };

  const onCellContextMenu = (e, r, c) => {
    e.preventDefault();
    toggleFlag(r, c);
  };

  const onCellMouseDown = (e, r, c) => {
    // e.buttons is a bitmask of currently-held buttons (1 = left, 2 = right).
    // Any left involvement (alone or chorded) triggers the "surprised" face.
    if (e.buttons & 1) setPressing(true);
    // 3 means both are down at once — the classic chord gesture.
    if (e.buttons === 3) {
      e.preventDefault();
      chordReveal(r, c);
    }
  };

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minesLeft = Math.max(MINES - flagCount, 0);

  const NUM_COLORS = {
    1: "#3b82f6",
    2: "#22c55e",
    3: "#ef4444",
    4: "#7c3aed",
    5: "#b45309",
    6: "#0d9488",
    7: "#111827",
    8: "#6b7280",
  };

  const faceEmoji =
    status === "won" ? "😎" : status === "lost" ? "😵" : pressing ? "😮" : "🙂";

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="game-card-header">
        <div className="game-card-header__info">
          <span>
            <strong>Play Minesweeper! 💣</strong>{" "}
            <Badge bg="secondary" className="ms-2">Intermediate {COLS}×{ROWS}</Badge>
          </span>
          <div className="d-flex align-items-center gap-2">
            <Badge bg="warning" text="dark" title="Mines remaining">🚩 {minesLeft}</Badge>
            <Badge bg="info" title="Time elapsed">⏱ {seconds}s</Badge>
            {best > 0 && <Badge bg="success" title="Best time on this browser">Best: {best}s</Badge>}
          </div>
        </div>
        {switcher && (
          <div className="game-card-header__switcher">
            <GameSwitcher {...switcher} />
          </div>
        )}
      </Card.Header>

      <Card.Body className="d-flex flex-column align-items-center">
        {status === "lost" && (
          <div className="alert alert-danger py-1 px-3 mb-2 w-100 text-center">💥 Boom! You hit a mine.</div>
        )}
        {status === "won" && (
          <div className="alert alert-success py-1 px-3 mb-2 w-100 text-center">🎉 Cleared it in {seconds}s!</div>
        )}

        <div className="d-flex justify-content-center align-items-center gap-3 mb-2 flex-wrap">
          <Button size="sm" variant="outline-secondary" onClick={resetGame} aria-label="New game">
            {faceEmoji} New Game
          </Button>
          <ButtonGroup className="d-sm-none">
            <Button
              size="sm"
              variant={flagMode ? "warning" : "outline-warning"}
              onClick={() => setFlagMode((f) => !f)}
            >
              🚩 Flag Mode {flagMode ? "On" : "Off"}
            </Button>
          </ButtonGroup>
        </div>

        <div
          className="minesweeper-board"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const revealedClass = cell.revealed ? "minesweeper-cell--revealed" : "";
              const boomClass = cell.boom ? "minesweeper-cell--boom" : "";
              let content = "";
              let color;
              if (cell.revealed) {
                if (cell.mine) content = "💣";
                else if (cell.adjacent > 0) {
                  content = cell.adjacent;
                  color = NUM_COLORS[cell.adjacent];
                }
              } else if (cell.flagged) {
                content = "🚩";
              }
              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  className={`minesweeper-cell ${revealedClass} ${boomClass}`}
                  style={color ? { color } : undefined}
                  onClick={() => onCellClick(r, c)}
                  onContextMenu={(e) => onCellContextMenu(e, r, c)}
                  onMouseDown={(e) => onCellMouseDown(e, r, c)}
                  aria-label={`Cell row ${r + 1}, column ${c + 1}`}
                >
                  {content}
                </button>
              );
            })
          )}
        </div>

        <small className="text-muted mt-2 d-none d-sm-block">
          Left-click to reveal. Right-click to flag a suspected mine.
        </small>
        <small className="text-muted mt-2 d-sm-none">
          Tap to reveal. Turn on Flag Mode above to tap-flag instead.
        </small>
      </Card.Body>
    </Card>
  );
}
