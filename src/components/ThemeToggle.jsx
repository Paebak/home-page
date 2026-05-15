import React from "react";
import { Around } from "@theme-toggles/react";
import "@theme-toggles/react/css/Around.css";
import useColorMode from "../hooks/useColorMode.js";

export default function ThemeToggle() {
  const { mode, toggle } = useColorMode();

  return (
    <Around
      className="theme-toggle"
      duration={750}
      toggled={mode === "dark"}
      onToggle={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    />
  );
}
