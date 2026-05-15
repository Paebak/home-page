import React from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Footer from "../components/layout/Footer.jsx";
import ttcLogo from "../assets/ttc-logo.png";

const ROLES = [
  {
    title: "Cybersecurity Engineer — Program Lead, TDLM",
    company: "T-Mobile",
    location: "Bellevue, WA",
    dates: "Mar 2025 – Present",
    current: true,
    bullets: [
      "Supporting telemetry ingestion pipelines processing petabytes of security log data daily across telecom infrastructure — one of the largest Splunk and Cribl environments in the industry.",
      "Assisting with architecture and operational health of petabyte-scale telemetry pipelines powering enterprise detection engineering and SIEM analytics.",
      "Designing and operating ingestion pipelines using Cribl and Vector to route and normalize telemetry.",
      "Integrating telemetry into Splunk, Microsoft Sentinel, Anvilogic, Cortex XSOAR, and Snowflake.",
      "Contributing to telemetry governance frameworks including OCSF normalization, ingestion validation, and log onboarding standards.",
    ],
    tools: ["Cribl", "Splunk", "Sentinel", "Anvilogic", "XSOAR", "Snowflake", "Vector", "OCSF", "Python", "KQL", "SPL"],
  },
  {
    title: "Cybersecurity Analyst",
    company: "T-Mobile",
    location: "Bellevue, WA",
    dates: "May 2024 – Mar 2025",
    current: false,
    bullets: [
      "Operated within Blue Team security operations protecting telecom infrastructure.",
      "Participated in defensive operations against advanced persistent threats and nation-state-aligned actors.",
      "Investigated enterprise incidents using ServiceNow CMDB correlation and SIEM telemetry.",
      "Developed automation and enrichment workflows in Cortex XSOAR.",
      "Mentored junior analysts while serving as senior overnight analyst.",
    ],
    tools: ["Splunk", "XSOAR", "ServiceNow", "Python", "Bash"],
  },
  {
    title: "Associate Enterprise Information Security Analyst",
    company: "T-Mobile",
    location: "Bellevue, WA",
    dates: "Dec 2023 – May 2024",
    current: false,
    bullets: [
      "Supported Blue Team monitoring and response protecting telecom infrastructure.",
      "Managed security incidents using ServiceNow and Cortex XSOAR workflows.",
      "Performed CMDB-driven investigations correlating alerts with enterprise assets.",
      "Assisted threat intelligence teams during nation-state-aligned activity.",
      "Identified opportunities to automate data ingestion and response processes.",
    ],
    tools: ["Splunk", "XSOAR", "ServiceNow"],
  },
];

const CORE_EXPERTISE = [
  { label: "Security Telemetry & Data Platforms", items: "TDLM, Enterprise Log Ingestion Architecture, OCSF Normalization" },
  { label: "Security Analytics Platforms", items: "Splunk, Microsoft Sentinel, Anvilogic, Snowflake, Cortex XSOAR" },
  { label: "Data Pipeline Technologies", items: "Cribl, Vector, Syslog/API integrations, Streaming telemetry pipelines" },
  { label: "Cloud & Infrastructure", items: "Azure, AWS, Linux, macOS, Hybrid cloud logging architectures" },
  { label: "Automation & Analytics", items: "Python, PowerShell, Bash, SPL, KQL, SQL" },
];

export default function Work() {
  return (
    <>
      <div className="container-fluid page-wrap px-3 px-sm-4 px-lg-5 py-4">
        <PageHeader title="Work Experience" />

        {/* Core expertise */}
        <div className="tile tile--cta mb-4">
          <h5 className="mb-3">Core Expertise</h5>
          <div className="row g-2">
            {CORE_EXPERTISE.map(({ label, items }) => (
              <div key={label} className="col-12 col-md-6">
                <div className="expertise-row">
                  <span className="expertise-label">{label}</span>
                  <span className="text-secondary small">{items}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="work-timeline">
          {ROLES.map((role, i) => (
            <div key={i} className="tile tile--cta mb-3 d-flex flex-column gap-3">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-1">
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <h5 className="mb-0">{role.title}</h5>
                    {role.current && <span className="stack-badge stack-badge--active">Current</span>}
                  </div>
                  <div className="text-secondary small">{role.company} — {role.location}</div>
                </div>
                <span className="text-secondary small text-sm-end text-nowrap">{role.dates}</span>
              </div>

              <ul className="work-bullets">
                {role.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>

              <div className="d-flex flex-wrap gap-2">
                {role.tools.map(t => <span key={t} className="stack-badge">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="tile tile--cta">
          <h5 className="mb-3">Education</h5>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <a href="https://www.tridenttech.edu" target="_blank" rel="noopener noreferrer" className="ttc-logo-link">
              <img src={ttcLogo} alt="Trident Technical College" className="ttc-logo" />
            </a>
            <div>
              <div className="fw-semibold mb-1">Trident Technical College</div>
              <div className="text-secondary small">Charleston, SC</div>
              <div className="text-secondary small mt-1">Associate Degree, Cybersecurity (In Progress) — GPA 4.0</div>
              <div className="text-secondary small mt-2">Working toward SANS GIAC certifications.</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
