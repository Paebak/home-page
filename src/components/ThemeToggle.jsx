import React from "react";
import { Around } from "@theme-toggles/react";
import "@theme-toggles/react/css/Around.css";

export default function ThemeToggle() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const handleToggle = () => setMode(m => (m === "dark" ? "light" : "dark"));

  return (
    <Around
      className="theme-toggle"
      duration={750}
      toggled={mode === "dark"}   // true = dark icon state
      onToggle={handleToggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    />
  );
}
