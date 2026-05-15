import React from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Footer from "../components/layout/Footer.jsx";

const STACK = {
  Hardware: {
    emoji: "🔧",
    items: [
      { name: "Lenovo Mini PC", note: "Primary compute node", href: "https://www.lenovo.com/us/en/d/mini-pcs/" },
      { name: "Raspberry Pi 5", note: "Lightweight services & DNS", href: "https://www.raspberrypi.com/products/raspberry-pi-5/" },
      { name: "Cisco Switch", note: "Managed network switching", href: "https://www.cisco.com/c/en/us/products/switches/index.html" },
      { name: "Synology NAS", note: "Network-attached storage", href: "https://www.synology.com/" },
      { name: "Mac Mini", note: "Coming soon", href: "https://www.apple.com/mac-mini/" },
    ],
  },
  Services: {
    emoji: "⚙️",
    items: [
      { name: "Proxmox", note: "Hypervisor / VM host", href: "https://www.proxmox.com/" },
      { name: "TrueNAS", note: "Storage OS", href: "https://www.truenas.com/" },
      { name: "Docker", note: "All services containerised", href: "https://www.docker.com/" },
      { name: "Jellyfin", note: "Media server", href: "https://jellyfin.org/" },
      { name: "*ARR Stack", note: "Media automation", href: "https://wiki.servarr.com/" },
      { name: "Pi-hole", note: "Network-wide DNS & ad blocking", href: "https://pi-hole.net/" },
      { name: "Vaultwarden", note: "Self-hosted password manager", href: "https://github.com/dani-garcia/vaultwarden" },
      { name: "BookStack", note: "Internal wiki & docs", href: "https://www.bookstackapp.com/" },
      { name: "Grafana", note: "Dashboards & visualisation", href: "https://grafana.com/" },
      { name: "Prometheus", note: "Server health metrics", href: "https://prometheus.io/" },
    ],
  },
  "Security & OS": {
    emoji: "🛡️",
    items: [
      { name: "Security Onion", note: "Network security monitoring", href: "https://securityonionsolutions.com/" },
      { name: "Windows Server", note: "AD & centralised PC management", href: "https://www.microsoft.com/en-us/windows-server" },
      { name: "Ubuntu", note: "", href: "https://ubuntu.com/" },
      { name: "Debian", note: "", href: "https://www.debian.org/" },
      { name: "Kali Linux", note: "Security tooling", href: "https://www.kali.org/" },
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
              <div className="tile tile--cta h-100 d-flex flex-column gap-3 justify-content-start">
                <h5 className="mb-0">{emoji} {section}</h5>
                <div className="d-flex flex-column gap-2">
                  {items.map(({ name, note, href }) => (
                    <div key={name} className="homelab-item">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="homelab-item__name homelab-item__link"
                        >
                          {name}
                        </a>
                      ) : (
                        <span className="homelab-item__name">{name}</span>
                      )}
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
