import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title }) {
  return (
    <header className="page-header">
      <Link to="/" className="page-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        Home
      </Link>
      <h1 className="page-title">{title}</h1>
    </header>
  );
}
