import { useEffect, useState } from "react";

const getInitialMode = () => {
  const saved = localStorage.getItem("color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function useColorMode(){
  const [mode, setMode] = useState(getInitialMode);
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
    localStorage.setItem("color-mode", mode);
  }, [mode]);
  return { mode, setMode, toggle: () => setMode(m => (m === "dark" ? "light" : "dark")) };
}
