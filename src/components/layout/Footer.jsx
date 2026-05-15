import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-3 text-secondary small">
      © {new Date().getFullYear()} Matt Downs. All rights reserved.
    </footer>
  );
}
