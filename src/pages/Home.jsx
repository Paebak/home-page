import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import SnakeCard from "../components/SnakeCard.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import NowPlaying from "../components/NowPlaying.jsx";
import Footer from "../components/layout/Footer.jsx";
import memoji from "../assets/memoji.png";
import ttcLogo from "../assets/ttc-logo.png";

export default function Home() {
  return (
    <>
      <main className="bento-wrap">
        <div className="bento">

          {/* HERO */}
          <div className="tile bento-hero">
            <div className="hero-content">
              <p className="hero-eyebrow mb-0">Hey there! My name's</p>
              <h1 className="hero-name mb-2">Matt 👾</h1>
              <p className="hero-blurb mb-3">
                Cybersecurity Engineer @ T-Mobile. I build <strong>people-first</strong> ingestion
                pipelines &amp; automations in Threat Detection and Log Management, making risks
                visible early and producing actionable insights for key stakeholders.
              </p>
              <p className="hero-blurb mb-0">
                When I'm not building pipelines, I'm tinkering on my homelab, shooting film, or
                exploring the Pacific Northwest.
              </p>
            </div>
            <img src={memoji} alt="Matt Downs" className="hero-img" />
          </div>

          {/* SOCIAL */}
          <div className="tile tile--social bento-sm">
            <div className="social-icons-wrap">
              <a
                href="https://github.com/Paebak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon-btn social-icon-btn--github"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/matthew-downs2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn social-icon-btn--linkedin"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* THEME */}
          <div className="tile bento-sm d-flex align-items-center justify-content-center">
            <ThemeToggle />
          </div>

          {/* TDLM */}
          <Link to="/work" className="tile tile--cta tile--link bento-md text-decoration-none d-flex flex-column">
            <div className="d-flex align-items-center gap-2 mb-1">
              <h5 className="mb-0">Experience 🧰</h5>
              <span className="stack-badge stack-badge--active">Current</span>
            </div>
            <p className="text-secondary small mb-3">
              Cybersecurity Engineer — Program Lead. Petabyte-scale security telemetry pipelines
              for one of the largest Splunk &amp; Cribl environments in the industry.
            </p>
            <div className="d-flex flex-wrap gap-2 mt-auto">
              {["Cribl", "Splunk", "Sentinel", "Anvilogic", "XSOAR"].map(t => (
                <span key={t} className="stack-badge">{t}</span>
              ))}
              <span className="stack-badge stack-badge--more">+6 →</span>
            </div>
          </Link>

          {/* RESUME */}
          <a
            href="/Matthew_Downs_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="tile bento-sm bento-util bento-util--green"
            aria-label="Resume"
          >
            <span className="util-label">Resume</span>
            <svg className="util-icon" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </a>

          {/* TTC */}
          <a
            href="https://www.tridenttech.edu/programs/divisions/bt/cybersecurity.html"
            target="_blank"
            rel="noopener noreferrer"
            className="tile bento-sm bento-util bento-util--ttc p-0"
            aria-label="Trident Technical College — Cybersecurity Program"
          >
            <img src={ttcLogo} alt="Trident Technical College" className="ttc-tile-img" />
          </a>

          {/* EMAIL */}
          <a
            href="mailto:matthewdowns225@gmail.com"
            className="tile bento-sm img-tile p-0 text-decoration-none"
            aria-label="Email Me"
          >
            <img src="/email-icon.gif" alt="Email Me" className="img-tile__bg" />
            <div className="img-tile__overlay" />
            <div className="img-tile__label">Email Me</div>
          </a>

          {/* NOW PLAYING */}
          <div className="tile bento-sm">
            <NowPlaying />
          </div>

          {/* HOMELAB */}
          <Link to="/homelab" className="tile tile--cta tile--link bento-md img-tile text-decoration-none p-0">
            <img src="/homelab-vaporwave.webp" alt="Homelab" className="img-tile__bg" />
            <div className="img-tile__overlay" />
            <div className="img-tile__content">
              <h5 className="mb-2 text-white">Homelab 🖥️</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Proxmox", "Docker", "Pi-hole", "Grafana"].map(t => (
                  <span key={t} className="stack-badge stack-badge--light">{t}</span>
                ))}
                <span className="stack-badge stack-badge--light">View stack →</span>
              </div>
            </div>
          </Link>

          {/* PHOTO */}
          <div className="bento-md bento-photo">
            <PhotoCard />
          </div>

          {/* SNAKE */}
          <div className="tile bento-md p-0 overflow-hidden">
            <SnakeCard />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
