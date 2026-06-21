import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, X } from "lucide-react";

const projectImageUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}${filename}`;

type ProjectItem = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  accent: string;
  color: string;
};

const projectsData: ProjectItem[] = [

  {
    title: "StackNest – AI-Powered Social Platform for Developers",
    description:
      "A social platform for developers with real-time voice, video, and collaboration rooms. Architected with Node.js and Express using the Repository Pattern and SOLID principles, featuring Socket.IO, WebRTC, AI-powered feeds, and media delivery via Cloudinary.",
    image: "stacknest.png",
    tech: [
      "React.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "WebRTC",
      "Cloudinary",
      "OAuth",
      "Stripe",
      "Razorpay",
    ],
    github: "https://github.com/Abiram-k/StackNest",
    live: "https://stacknest.abiram.website",
    accent: "rgba(123,110,246,0.18)",
    color: "#7B6EF6",
  },
  {
    title: "Skill Pulse – E-Commerce Platform",
    description:
      "A high-throughput e-commerce application featuring product listings, cart management, wishlists, and order pipelines. Integrated Razorpay, COD, and wallet payments, deployed on AWS EC2 and Azure with PM2 and NGINX.",
    image: "firstProject.png",
    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Tailwind",
      "Razorpay",
      "Stripe",
      "JWT",
      "Cloudinary",
      "NGINX",
      "AWS EC2",
    ],
    github: "https://github.com/Abiram-k/SkillPulse",
    live: "https://skillpulse.abiram.website",
    accent: "rgba(78,205,196,0.18)",
    color: "#4ECDC4",
  },
  {
    title: "Leave Management System",
    description:
      "A role-based leave management application with secure authentication and approval workflows. Includes employee management, leave type configuration, and admin approval.",
    image: "404.gif",
    tech: ["React", "Node.js", "MySQL", "JWT"],
    github: "https://github.com/Abiram-k/leave-management-system.git",
    live: "",
    accent: "rgba(255,138,76,0.18)",
    color: "#FF8A4C",
  },
  {
    title: "Task Management System",
    description:
      "A real-time task management application that enables users to track, manage, and visualize tasks efficiently. Features secure auth, live updates with Socket.IO, and interactive charts.",
    image: "taskManagement.png",
    tech: ["React", "Node.js", "MongoDB", "TypeScript", "Socket.IO"],
    github: "https://lnkd.in/gA8W43fu",
    live: "",
    accent: "rgba(236,72,153,0.18)",
    color: "#EC4899",
  },
  {
    title: "OCR – Aadhaar",
    description:
      "An intelligent OCR system that extracts and validates Aadhaar card details using Google Cloud Vision API. Built with React, TypeScript, and Express.",
    image: "ocr-adhaar.png",
    tech: ["React", "TypeScript", "Google Cloud Vision", "Express"],
    github: "https://github.com/Abiram-k/OCR-System",
    live: "https://ocr-system-476z.onrender.com/",
    accent: "rgba(56,189,248,0.18)",
    color: "#38BDF8",
  },
  {
    title: "Mapty",
    description:
      "A mini project built with vanilla JavaScript, HTML, and CSS — leveraging the power of ES6 classes for clean OOP design.",
    image: "mapty.png",
    tech: ["JavaScript (ES6)", "HTML", "CSS"],
    github: "https://github.com/Abiram-k/mapty",
    live: "https://abiram-k.github.io/mapty/",
    accent: "rgba(250,204,21,0.18)",
    color: "#FACC15",
  },
  {
    title: "Smolink – URL Shortener",
    description:
      "A minimalistic and efficient URL shortener that generates unique short links with QR code support and clipboard copying. Built with React, Express, and MongoDB.",
    image: "url-shortner.jpeg",
    tech: ["React", "Express", "MongoDB", "ShortID", "QR Code"],
    github: "https://github.com/Abiram-k/URL_Shortner",
    live: "",
    accent: "rgba(168,85,247,0.18)",
    color: "#A855F7",
  },
  {
    title: "Student Portal",
    description:
      "A comprehensive portal for students built with the MERN stack — supporting user roles, real-time updates, and responsive design.",
    image: "student-portal.jpeg",
    tech: ["React", "Redux", "Node.js", "Express", "SQL", "TypeScript"],
    github: "https://github.com/Abiram-k/student_mangment",
    live: "",
    accent: "rgba(34,197,94,0.18)",
    color: "#22C55E",
  },
  {
    title: "Blue Sky Service Hub – Workforce & Service Management",
    description:
      "A scalable full-stack platform for operations, staff onboarding, and service delivery coordination. Built with NestJS using Hexagonal Architecture (Ports & Adapters), a Next.js (App Router) frontend, and PostgreSQL/MySQL with Prisma ORM for job tracking, ESI support calculations, and role-based access control.",
    image: "404.gif",
    tech: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "JWT",
      "RBAC",
    ],
    github: "https://github.com/Abiram-k/blue-sky-service-hub",
    live: "",
    accent: "rgba(56,189,248,0.18)",
    color: "#38BDF8",
  },
];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${(x / r.width) * 100}%`);
    el.style.setProperty("--my", `${(y / r.height) * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      className="pj-card"
      style={
        {
          animationDelay: `${index * 80}ms`,
          ["--accent" as string]: project.accent,
          ["--color" as string]: project.color,
        } as React.CSSProperties
      }
    >
      <div className="pj-glow" />
      <div className="pj-num">{String(index + 1).padStart(2, "0")}</div>

      <div className="pj-thumb">
        <img
          src={projectImageUrl(project.image)}
          alt={project.title}
          className="pj-thumb-img"
          loading="lazy"
        />
        <div className="pj-thumb-overlay" />
        <div className="pj-thumb-grid" />
      </div>

      <div className="pj-body">
        <h3 className="pj-title">{project.title}</h3>
        <p className="pj-desc">{project.description}</p>

        <div className="pj-tags">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="pj-tag">
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="pj-tag pj-tag-more">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="pj-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pj-btn"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pj-btn pj-btn-primary"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pj-modal-overlay" onClick={onClose}>
      <div
        className="pj-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ ["--color" as string]: project.color } as React.CSSProperties}
      >
        <button className="pj-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="pj-modal-hero">
          <img
            src={projectImageUrl(project.image)}
            alt={project.title}
            className="pj-modal-img"
          />
          <div className="pj-thumb-overlay" />
          <div className="pj-thumb-grid" />
        </div>
        <div className="pj-modal-body">
          <h3 className="pj-title" style={{ fontSize: "1.6rem" }}>
            {project.title}
          </h3>
          <p className="pj-desc" style={{ marginTop: 12 }}>
            {project.description}
          </p>
          <div className="pj-tags" style={{ marginTop: 16 }}>
            {project.tech.map((t) => (
              <span key={t} className="pj-tag">
                {t}
              </span>
            ))}
          </div>
          <div className="pj-actions" style={{ marginTop: 20 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-btn"
              >
                <Github size={14} /> View Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-btn pj-btn-primary"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="pj-section">
      <style>{`
        .pj-section {
          position: relative;
          padding: 96px 24px;
          background: #060608;
          color: #EAEAF0;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .pj-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(800px 400px at 20% 0%, rgba(123,110,246,0.08), transparent 60%),
            radial-gradient(700px 400px at 80% 100%, rgba(78,205,196,0.06), transparent 60%);
          pointer-events: none;
        }
        .pj-container { max-width: 1200px; margin: 0 auto; position: relative; }
        .pj-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #7B6EF6;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .pj-eyebrow::before { content: '// '; opacity: 0.7; }
        .pj-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.05;
          margin: 0 0 56px;
        }
        .pj-heading .grad {
          background: linear-gradient(90deg, #7B6EF6, #4ECDC4, #FF8A4C, #7B6EF6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: pjGradFlow 8s linear infinite;
        }
        @keyframes pjGradFlow {
          to { background-position: 200% center; }
        }
        .pj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .pj-card {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          transform: perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0));
          transition: border-color .35s ease, transform .15s ease, box-shadow .35s ease;
          opacity: 0;
          animation: pjFadeUp .7s cubic-bezier(.2,.7,.2,1) forwards;
          backdrop-filter: blur(8px);
        }
        @keyframes pjFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: perspective(900px) rotateX(0) rotateY(0); }
        }
        .pj-card:hover {
          border-color: color-mix(in srgb, var(--color) 45%, transparent);
          box-shadow: 0 20px 60px -20px var(--accent);
        }
        .pj-glow {
          position: absolute; inset: 0;
          background: radial-gradient(400px circle at var(--mx,50%) var(--my,50%), var(--accent), transparent 50%);
          opacity: 0; transition: opacity .35s ease;
          pointer-events: none;
        }
        .pj-card:hover .pj-glow { opacity: 1; }
        .pj-num {
          position: absolute; top: 16px; right: 18px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          z-index: 2;
        }
        .pj-thumb {
          position: relative;
          height: 180px;
          background: #0b0b10;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pj-thumb-img,
        .pj-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .pj-thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            180deg,
            transparent 35%,
            rgba(6,6,8,0.55) 100%
          );
          pointer-events: none;
        }
        .pj-thumb-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          pointer-events: none;
        }
        .pj-body { padding: 22px; position: relative; z-index: 1; }
        .pj-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0 0 8px;
          color: #fff;
          line-height: 1.3;
        }
        .pj-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(234,234,240,0.62);
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .pj-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          padding: 4px 9px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(234,234,240,0.75);
        }
        .pj-tag-more { color: var(--color); border-color: color-mix(in srgb, var(--color) 30%, transparent); }
        .pj-actions { display: flex; gap: 10px; }
        .pj-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #EAEAF0;
          text-decoration: none;
          transition: all .25s ease;
        }
        .pj-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .pj-btn-primary {
          background: color-mix(in srgb, var(--color) 18%, transparent);
          border-color: color-mix(in srgb, var(--color) 45%, transparent);
          color: var(--color);
        }
        .pj-btn-primary:hover {
          background: color-mix(in srgb, var(--color) 28%, transparent);
        }
        .pj-footer {
          margin-top: 56px;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(234,234,240,0.4);
        }
        .pj-footer span { color: #4ECDC4; }

        /* Modal */
        .pj-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(6,6,8,0.8);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          z-index: 100;
          animation: pjFadeIn .25s ease;
        }
        @keyframes pjFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pj-modal {
          position: relative;
          max-width: 640px; width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          background: #0b0b10;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          animation: pjModalIn .35s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes pjModalIn {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pj-modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #EAEAF0;
          cursor: pointer;
          z-index: 2;
          transition: background .2s ease;
        }
        .pj-modal-close:hover { background: rgba(255,255,255,0.12); }
        .pj-modal-hero {
          position: relative;
          height: 240px;
          background: #0b0b10;
          overflow: hidden;
        }
        .pj-modal-body { padding: 28px; }
      `}</style>

      <div className="pj-container">
        <div className="pj-eyebrow">Featured Work</div>
        <h2 className="pj-heading">
          Selected <span className="grad">Projects</span>
        </h2>

        <div className="pj-grid">
          {projectsData.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpen={() => setSelected(p)}
            />
          ))}
        </div>

        <div className="pj-footer">
          <span>{projectsData.length}</span> projects · more shipping soon
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
