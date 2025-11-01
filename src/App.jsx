import { Button } from "react-bootstrap";
import ThemeToggle from "./components/ThemeToggle.jsx"; // comment this line + tile if you want to add later

export default function App() {
  return (
    <>
      {/* Centered full-viewport tile grid */}
      <section className="tiles-root">
        <div className="tile-grid container-fluid px-3 px-sm-4 px-lg-5">

          {/* HERO tile (2x2) */}
          <div className="tile tile--hero tile--cta">
            <h1 className="hero-title mb-2">
              Cybersecurity engineer turning telemetry into proactive defense </h1>  
            <p className="hero-blurb mb-3">
              I build <strong>people-first</strong> ingestion pipelines & automations in TDLM—making
              internal & external risks visible early and actionable for stakeholders.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button href="#about" size="sm">About</Button>
              <Button variant="outline-primary" href="https://github.com/Paebak" size="sm">GitHub</Button>
              <Button variant="outline-secondary" href="/matt-downs-resume.pdf" size="sm">Resume</Button>
            </div>
          </div>

          {/* small utility tiles */}
          <div className="tile tile--right tile--cta">
            <div className="fw-semibold">neofound</div>
          </div>

          <div className="tile tile--right tile--cta">
            <div className="d-flex flex-column align-items-center text-center">
              <div className="mb-2 fw-semibold">Appearance</div>
              <ThemeToggle />
            </div>
          </div>

          {/* About */}
          <div id="about" className="tile tile--cta">
            <h5 className="mb-1">About</h5>
            <div className="text-secondary small mb-2">
              Who I am and how I turn telemetry into proactive defense.
            </div>
            <Button href="#about-full" size="sm">About me</Button>
          </div>

          {/* GitHub: whole tile is the link */}
          <a
            id="github"
            href="https://github.com/Paebak"
            target="_blank"
            rel="noopener noreferrer"
            className="tile tile--github tile--link tile--cta text-decoration-none text-reset position-relative overflow-hidden"
            aria-label="Open Matt's GitHub profile"
          >
            <div className="tile-content position-relative">
              <h5 className="fw-bold mb-1">GitHub</h5>
              <p className="mb-0 github-blurb">
                Check my code — it’s open source and available to judge!
              </p>
            </div>
            <div className="tile-icon position-absolute top-0 end-0 m-3">
              <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>

          {/* Experience */}
          <div id="experience" className="tile tile--cta">
            <h5 className="mb-1">Experience</h5>
            <div className="text-secondary small mb-2">
              TDLM engineering, XSOAR runbooks, CMDB context.
            </div>
            <Button href="#experience-full" size="sm">See roles</Button>
          </div>

          {/* Contact */}
          <div id="contact" className="tile tile--cta">
            <h5 className="mb-1">Contact</h5>
            <div className="text-secondary small mb-2">Email / GitHub — let’s collaborate.</div>
            <div className="d-flex gap-2">
              <Button href="mailto:matt@neofound.org" size="sm">Email</Button>
              <Button href="https://github.com/Paebak" variant="outline-secondary" size="sm">GitHub</Button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
