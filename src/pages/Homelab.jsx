import React from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Footer from "../components/layout/Footer.jsx";

const STACK = {
  Hardware: {
    emoji: "🔧",
    items: [
      { name: "Lenovo Mini PC", note: "Primary compute node" },
      { name: "Raspberry Pi 5", note: "Lightweight services & DNS" },
      { name: "Cisco Switch", note: "Managed network switching" },
      { name: "Synology NAS", note: "Network-attached storage" },
      { name: "Mac Mini", note: "Coming soon" },
    ],
  },
  Services: {
    emoji: "⚙️",
    items: [
      { name: "Proxmox", note: "Hypervisor / VM host" },
      { name: "TrueNAS", note: "Storage OS" },
      { name: "Docker", note: "All services containerised" },
      { name: "Jellyfin", note: "Media server" },
      { name: "*ARR Stack", note: "Media automation" },
      { name: "Pi-hole", note: "Network-wide DNS & ad blocking" },
      { name: "Vaultwarden", note: "Self-hosted password manager" },
      { name: "BookStack", note: "Internal wiki & docs" },
      { name: "Grafana", note: "Dashboards & visualisation" },
      { name: "Prometheus", note: "Server health metrics" },
    ],
  },
  "Security & OS": {
    emoji: "🛡️",
    items: [
      { name: "Security Onion", note: "Network security monitoring" },
      { name: "Windows Server", note: "AD & centralised PC management" },
      { name: "Ubuntu", note: "" },
      { name: "Debian", note: "" },
      { name: "Kali Linux", note: "Security tooling" },
    ],
  },
};

export default function Homelab() {
  return (
    <>
      <div className="container-fluid page-wrap px-3 px-sm-4 px-lg-5 py-4">
        <PageHeader title="Homelab" />

        <p className="text-secondary mb-4" style={{ maxWidth: 640 }}>
          Everything runs in Docker on a Proxmox + TrueNAS base. The Lenovo Mini PC handles the
          heavy lifting, the Pi 5 manages DNS and lightweight tasks, and a Cisco switch ties it all
          together on a managed network. A Mac Mini is next in the queue.
        </p>

        <div className="row g-3">
          {Object.entries(STACK).map(([section, { emoji, items }]) => (
            <div key={section} className="col-12 col-md-4">
              <div className="tile tile--cta h-100 d-flex flex-column gap-3">
                <h5 className="mb-0">{emoji} {section}</h5>
                <div className="d-flex flex-column gap-2">
                  {items.map(({ name, note }) => (
                    <div key={name} className="homelab-item">
                      <span className="homelab-item__name">{name}</span>
                      {note && <span className="homelab-item__note">{note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
