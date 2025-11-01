
import React from "react";
import { Button } from "react-bootstrap";
import useColorMode from "../hooks/useColorMode";

export default function ThemeToggle() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <Button
      variant={mode === "dark" ? "outline-light" : "outline-dark"}
      size="sm"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}
