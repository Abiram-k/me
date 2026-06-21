import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  {
    icon: <Github size={18} />,
    label: "GitHub",
    href: "https://github.com/Abiram-k",
    color: "#EAEAF0",
    accent: "rgba(234,234,240,0.15)",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/abiram-k",
    color: "#0A66C2",
    accent: "rgba(10,102,194,0.18)",
  },
  {
    icon: <Twitter size={18} />,
    label: "Twitter",
    href: "https://twitter.com/abiram_k",
    color: "#1DA1F2",
    accent: "rgba(29,161,242,0.18)",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    href: "mailto:abiramk0107@gmail.com",
    color: "#7B6EF6",
    accent: "rgba(123,110,246,0.18)",
  },
];

export default function Footer() {
  return (
    <footer className="ft-section">
      <style>{`
        .ft-section {
          position: relative;
          padding: 72px 24px 32px;
          background: #060608;
          color: #EAEAF0;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .ft-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(500px 250px at 50% 0%, rgba(123,110,246,0.06), transparent 60%);
          pointer-events: none;
        }
        .ft-top-border {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 80%; max-width: 800px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }
        .ft-container {
          max-width: 1000px; margin: 0 auto; position: relative;
          display: flex; flex-direction: column; align-items: center;
        }

        .ft-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem; font-weight: 700;
          color: #fff; letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .ft-tagline {
          font-size: 14px;
          color: rgba(234,234,240,0.45);
          margin-bottom: 28px;
        }

        .ft-socials {
          display: flex; gap: 12px;
          margin-bottom: 40px;
        }
        .ft-social {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(234,234,240,0.65);
          text-decoration: none;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          overflow: hidden;
        }
        .ft-social::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(120px circle at 50% 50%, var(--accent), transparent 65%);
          opacity: 0; transition: opacity .3s ease;
          pointer-events: none;
        }
        .ft-social:hover {
          border-color: color-mix(in srgb, var(--color) 45%, transparent);
          color: var(--color);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 28px -8px var(--accent);
        }
        .ft-social:hover::before { opacity: 1; }
        .ft-social svg {
          position: relative; z-index: 1;
          transition: transform .3s ease;
        }
        .ft-social:hover svg { transform: scale(1.1); }

        .ft-links {
          display: flex; flex-wrap: wrap; gap: 24px;
          margin-bottom: 40px;
          justify-content: center;
        }
        .ft-link {
          font-size: 13px;
          color: rgba(234,234,240,0.45);
          text-decoration: none;
          transition: color .25s ease;
          position: relative;
        }
        .ft-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #7B6EF6;
          transition: width .3s ease;
        }
        .ft-link:hover {
          color: rgba(234,234,240,0.85);
        }
        .ft-link:hover::after {
          width: 100%;
        }

        .ft-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          color: rgba(234,234,240,0.3);
          letter-spacing: 0.05em;
        }
        .ft-copy span { color: #7B6EF6; }
      `}</style>

      <div className="ft-top-border" />

      <div className="ft-container">
        <div className="ft-brand">Abiram</div>
        <p className="ft-tagline">Building digital experiences</p>

        <div className="ft-socials">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="ft-social"
              style={
                {
                  ["--color" as string]: s.color,
                  ["--accent" as string]: s.accent,
                } as React.CSSProperties
              }
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="ft-links">
          <a href="#timeline" className="ft-link">Experience</a>
          <a href="#projects" className="ft-link">Projects</a>
          <a href="/me/Abiram_K_Resume_updated.pdf" target="_blank" rel="noopener noreferrer" className="ft-link">Resume</a>
          <a href="#contact" className="ft-link">Contact</a>
        </div>

        <div className="ft-copy">
          © {new Date().getFullYear()} <span>Abiram K.</span> All rights reserved.
        </div>
      </div>
    </footer>
  );
}
