import { Button } from "react-bootstrap";
import ThemeToggle from "./components/ThemeToggle.jsx";
import memoji from "./assets/memoji.png";


export default function App() {
  return (
    <>
      <section className="tiles-root">
        <div className="container-fluid page-wrap px-3 px-sm-4 px-lg-5">
          <div className="row g-3 g-lg-4 align-items-stretch">

            {/* LEFT: hero spans 2/3 on md+ */}
            <div className="col-12 col-md-8">
  <div className="tile tile--hero tile--cta h-100 d-flex flex-column flex-md-row align-items-center justify-content-between text-md-start text-center">
    <div className="flex-grow-1 pe-md-4">
      <h1 className="hero-title mb-2">
        Hi! I'm <span style={{ color: "#22c55e" }}>Matt</span> - I'm a Cybersecurity Engineer!
      </h1>
      <p className="hero-blurb mb-3">
        I build <strong>people-first</strong> ingestion pipelines & automations in TDLM—
        making internal & external risks visible early and actionable for stakeholders.
      </p>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
        <Button href="#about" size="sm">About</Button>
        <Button variant="outline-primary" href="https://github.com/Paebak" size="sm">GitHub</Button>
        <Button variant="outline-secondary" href="/matt-downs-resume.pdf" size="sm">Resume</Button>
      </div>
    </div>

    <div className="mt-4 mt-md-0 text-center">
      <img
        src={memoji}
        alt="Matt Memoji"
        className="hero-img"
      />
    </div>
  </div>
</div>


            {/* RIGHT: two stacked tiles */}
            <div className="col-12 col-md-4 d-flex flex-column gap-3">
              {/* Top: theme toggle (smaller box) */}
              <div className="tile tile--right tile--cta d-flex align-items-center justify-content-center" style={{ minHeight: "8rem" }}>
                <ThemeToggle />
              </div>

              {/* Bottom: neofound */}
              <div className="tile tile--right tile--cta d-flex align-items-center justify-content-center" style={{ minHeight: "8rem" }}>
                <div className="fw-semibold">neofound</div>
              </div>
            </div>

            {/* BELOW: the rest of your tiles in a 2x2 grid */}
            <div className="col-12 col-md-6">
              <div id="about" className="tile tile--cta h-100">
                <h5 className="mb-1">About 👋</h5>
                <div className="text-secondary small mb-2">
                  Who I am and how I turn telemetry into proactive defense.
                </div>
                <Button href="#about-full" size="sm">About me</Button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <a
                id="github"
                href="https://github.com/Paebak"
                target="_blank"
                rel="noopener noreferrer"
                className="tile tile--github tile--link tile--cta text-decoration-none text-reset position-relative overflow-hidden d-block h-100"
                aria-label="Open Matt's GitHub profile"
              >
                <div className="tile-content position-relative">
                  <h5 className="fw-bold mb-1">GitHub 💻</h5>
                  <p className="mb-0 github-blurb">
                    Check my code — it’s open source and available to judge!
                  </p>
                </div>
                <div className="tile-icon position-absolute top-0 end-0 m-3">
                  <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H9M17 7v8"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6">
              <div id="experience" className="tile tile--cta h-100">
                <h5 className="mb-1">Experience 🧰</h5>
                <div className="text-secondary small mb-2">
                  TDLM engineering, XSOAR runbooks, CMDB context.
                </div>
                <Button href="#experience-full" size="sm">See roles</Button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div id="contact" className="tile tile--cta h-100">
                <h5 className="mb-1">Contact 📝</h5>
                <div className="text-secondary small mb-2">Email / GitHub — let’s collaborate.</div>
                <div className="d-flex gap-2">
                  <Button href="mailto:matt@neofound.org" size="sm">Email</Button>
                  <Button href="https://github.com/Paebak" variant="outline-secondary" size="sm">GitHub</Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
