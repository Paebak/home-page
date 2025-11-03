// src/components/SnakeCard.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Card, Button, ButtonGroup, Badge } from "react-bootstrap";

/**
 * <SnakeCard /> — drop this inside any React-Bootstrap layout.
 * Arrow keys / WASD to move. Space = pause. R = reset.
 */
export default function SnakeCard() {
  // Tunables
  const COLS = 20;
  const ROWS = 20;
  const TILE = 18;
  const STEP_MS_INITIAL = 120;

  // Refs & state
  const canvasRef = useRef(null);
  const loopRef = useRef(null);
  const lastTickRef = useRef(0);
  const stepMsRef = useRef(STEP_MS_INITIAL);
  const dirRef = useRef({ x: 1, y: 0 });
  const pendingDirRef = useRef({ x: 1, y: 0 });
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(() => Number(localStorage.getItem("snake.high") || 0));
  const [speedLabel, setSpeedLabel] = useState("Normal");

  const snakeRef = useRef([]);
  const foodRef = useRef({ x: 5, y: 5 });

  const randomEmptyCell = useCallback(() => {
    const taken = new Set(snakeRef.current.map(p => `${p.x},${p.y}`));
    let x, y;
    do {
      x = Math.floor(Math.random() * COLS);
      y = Math.floor(Math.random() * ROWS);
    } while (taken.has(`${x},${y}`));
    return { x, y };
  }, [COLS, ROWS]);

  const resetGame = useCallback(() => {
    const cx = Math.floor(COLS / 2);
    const cy = Math.floor(ROWS / 2);
    snakeRef.current = [
      { x: cx - 1, y: cy },
      { x: cx - 2, y: cy },
      { x: cx - 3, y: cy },
    ];
    dirRef.current = { x: 1, y: 0 };
    pendingDirRef.current = { x: 1, y: 0 };
    foodRef.current = randomEmptyCell();
    setScore(0);
  }, [COLS, ROWS, randomEmptyCell]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const logicalW = COLS * TILE;
    const logicalH = ROWS * TILE;

    // Responsive backing store
    const cssWidth = canvas.clientWidth;
    const scale = cssWidth / logicalW;
    canvas.width = Math.floor(logicalW * dpr * scale);
    canvas.height = Math.floor(logicalH * dpr * scale);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);

    // Background
    ctx.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue("--bs-body-bg") || "#0b0d0f";
    ctx.fillRect(0, 0, logicalW, logicalH);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath(); ctx.moveTo(i * TILE, 0); ctx.lineTo(i * TILE, logicalH); ctx.stroke();
    }
    for (let j = 1; j < ROWS; j++) {
      ctx.beginPath(); ctx.moveTo(0, j * TILE); ctx.lineTo(logicalW, j * TILE); ctx.stroke();
    }

    // Food
    const f = foodRef.current;
    ctx.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue("--bs-success") || "#4ade80";
    ctx.fillRect(f.x * TILE + 2, f.y * TILE + 2, TILE - 4, TILE - 4);

    // Snake
    const snake = snakeRef.current;
    ctx.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue("--bs-primary") || "#38bdf8";
    snake.forEach((p, idx) => {
      const r = idx === 0 ? 3 : 2;
      ctx.beginPath();
      // roundRect is widely supported in modern browsers
      ctx.roundRect(p.x * TILE + 1, p.y * TILE + 1, TILE - 2, TILE - 2, r);
      ctx.fill();
    });
  }, [COLS, ROWS, TILE]);

  const gameOver = useCallback(() => {
    setRunning(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#dc3545";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, []);

  const step = useCallback((t) => {
    if (!running) return;
    if (!lastTickRef.current) lastTickRef.current = t;
    const elapsed = t - lastTickRef.current;
    if (elapsed < stepMsRef.current) {
      loopRef.current = requestAnimationFrame(step);
      return;
    }
    lastTickRef.current = t;

    const cur = dirRef.current; const next = pendingDirRef.current;
    if (next.x !== -cur.x || next.y !== -cur.y) dirRef.current = next;

    const snake = snakeRef.current.slice();
    const head = { ...snake[0] };
    head.x += dirRef.current.x;
    head.y += dirRef.current.y;

    // Walls
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) return gameOver();
    // Self
    if (snake.some(p => p.x === head.x && p.y === head.y)) return gameOver();

    snake.unshift(head);
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(s => {
        const ns = s + 1;
        if (ns > high) {
          localStorage.setItem("snake.high", String(ns));
          setHigh(ns);
        }
        return ns;
      });
      foodRef.current = randomEmptyCell();
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
    loopRef.current = requestAnimationFrame(step);
  }, [COLS, ROWS, draw, gameOver, high, randomEmptyCell, running]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      const map = {
        arrowup: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      if (map[k]) {
        pendingDirRef.current = map[k];
        e.preventDefault();
      } else if (k === " ") {
        setRunning(prev => !prev);
        e.preventDefault();
      } else if (k === "r") {
        resetGame(); draw();
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [draw, resetGame]);

  // Loop start/stop
  useEffect(() => {
    if (running) {
      lastTickRef.current = 0;
      loopRef.current = requestAnimationFrame(step);
    } else if (loopRef.current) {
      cancelAnimationFrame(loopRef.current);
    }
    return () => loopRef.current && cancelAnimationFrame(loopRef.current);
  }, [running, step]);

  // Init + responsive redraw
  useEffect(() => {
    resetGame();
    const ro = new ResizeObserver(() => draw());
    if (canvasRef.current) ro.observe(canvasRef.current);
    draw();
    return () => ro.disconnect();
  }, [draw, resetGame]);

  const setSpeed = (label, ms) => {
    setSpeedLabel(label);
    stepMsRef.current = ms;
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span><strong>Play Snake! 🐍</strong> <Badge bg="secondary" className="ms-2">{COLS}×{ROWS}</Badge></span>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="info" title="Current score">Score: {score}</Badge>
          <Badge bg="success" title="Best on this browser">High Score!: {high}</Badge>
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="ratio ratio-1x1 border rounded" style={{ overflow: "hidden" }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <ButtonGroup>
            <Button variant={running ? "warning" : "primary"} onClick={() => setRunning(p => !p)}>
              {running ? "Pause (Space)" : "Start (Space)"}
            </Button>
            <Button variant="outline-secondary" onClick={() => { resetGame(); draw(); }}>
              Reset (R)
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant={speedLabel === "Slow" ? "success" : "outline-success"} onClick={() => setSpeed("Slow", 160)}>Slow</Button>
            <Button variant={speedLabel === "Normal" ? "success" : "outline-success"} onClick={() => setSpeed("Normal", 120)}>Normal</Button>
            <Button variant={speedLabel === "Fast" ? "success" : "outline-success"} onClick={() => setSpeed("Fast", 80)}>Fast</Button>
          </ButtonGroup>
        </div>

        <small className="text-muted mt-2">
          Controls: Arrow keys / WASD. Space to pause/resume. R to restart.
        </small>
      </Card.Body>
    </Card>
  );
}
