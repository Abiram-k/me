import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

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
  details?: {
    problem?: string;
    solution?: string;
    features?: string[];
    impact?: string;
  };
};

interface ProjectModalProps {
  project: ProjectItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="pm-modal"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ ["--color" as string]: project.color } as React.CSSProperties}
          >
            <button className="pm-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            {/* Hero */}
            <div className="pm-hero">
              <img
                src={projectImageUrl(project.image)}
                alt={project.title}
                className="pm-img"
              />
              <div className="pm-overlay-gradient" />
              <div className="pm-grid" />
            </div>

            {/* Body */}
            <div className="pm-body">
              <h3 className="pm-title">{project.title}</h3>
              <p className="pm-desc">{project.description}</p>

              {/* Tech tags */}
              <div className="pm-tags">
                {project.tech.map((t) => (
                  <span key={t} className="pm-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Details sections */}
              {project.details && (
                <div className="pm-details">
                  {project.details.problem && (
                    <div className="pm-detail-block">
                      <h4 className="pm-detail-title">Problem</h4>
                      <p className="pm-detail-text">{project.details.problem}</p>
                    </div>
                  )}
                  {project.details.solution && (
                    <div className="pm-detail-block">
                      <h4 className="pm-detail-title">Solution</h4>
                      <p className="pm-detail-text">{project.details.solution}</p>
                    </div>
                  )}
                  {project.details.features && (
                    <div className="pm-detail-block">
                      <h4 className="pm-detail-title">Key Features</h4>
                      <ul className="pm-detail-list">
                        {project.details.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.details.impact && (
                    <div className="pm-detail-block">
                      <h4 className="pm-detail-title">Impact</h4>
                      <p className="pm-detail-text">{project.details.impact}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pm-actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-btn"
                  >
                    <Github size={15} />
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-btn pm-btn-primary"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <style>{`
              .pm-overlay {
                position: fixed; inset: 0;
                background: rgba(6,6,8,0.85);
                backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                padding: 20px;
                z-index: 100;
              }
              .pm-modal {
                position: relative;
                max-width: 640px; width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                background: #0b0b10;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                color: #EAEAF0;
                font-family: 'Inter', system-ui, sans-serif;
              }
              .pm-modal::-webkit-scrollbar { width: 6px; }
              .pm-modal::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
              }

              .pm-close {
                position: absolute; top: 14px; right: 14px; z-index: 10;
                width: 36px; height: 36px; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.1);
                color: rgba(234,234,240,0.7);
                cursor: pointer;
                transition: all .25s ease;
              }
              .pm-close:hover {
                background: rgba(255,255,255,0.1);
                color: #fff;
                transform: rotate(90deg);
              }

              .pm-hero {
                position: relative;
                height: 220px;
                background: #0b0b10;
                overflow: hidden;
                border-bottom: 1px solid rgba(255,255,255,0.06);
                border-radius: 20px 20px 0 0;
              }
              .pm-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
                display: block;
              }
              .pm-overlay-gradient {
                position: absolute; inset: 0;
                background: linear-gradient(
                  180deg,
                  transparent 30%,
                  rgba(11,11,16,0.7) 100%
                );
                pointer-events: none;
              }
              .pm-grid {
                position: absolute; inset: 0;
                background-image:
                  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
                background-size: 24px 24px;
                mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
                pointer-events: none;
              }

              .pm-body { padding: 28px; }
              .pm-title {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.5rem; font-weight: 700;
                color: #fff; margin: 0 0 10px;
                line-height: 1.25;
              }
              .pm-desc {
                font-size: 14.5px; line-height: 1.65;
                color: rgba(234,234,240,0.6); margin: 0 0 18px;
              }
              .pm-tags {
                display: flex; flex-wrap: wrap; gap: 6px;
                margin-bottom: 22px;
              }
              .pm-tag {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                padding: 5px 10px;
                border-radius: 6px;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.08);
                color: rgba(234,234,240,0.75);
              }

              .pm-details { margin-bottom: 24px; }
              .pm-detail-block + .pm-detail-block { margin-top: 18px; }
              .pm-detail-title {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--color);
                margin: 0 0 8px;
              }
              .pm-detail-text {
                font-size: 14px; line-height: 1.65;
                color: rgba(234,234,240,0.55);
                margin: 0;
              }
              .pm-detail-list {
                list-style: none;
                padding: 0; margin: 0;
              }
              .pm-detail-list li {
                position: relative;
                padding-left: 18px;
                font-size: 14px; line-height: 1.65;
                color: rgba(234,234,240,0.55);
                margin-bottom: 6px;
              }
              .pm-detail-list li::before {
                content: '';
                position: absolute; left: 0; top: 8px;
                width: 6px; height: 6px; border-radius: 50%;
                background: var(--color);
                opacity: 0.6;
              }

              .pm-actions {
                display: flex; gap: 10px;
                padding-top: 20px;
                border-top: 1px solid rgba(255,255,255,0.07);
              }
              .pm-btn {
                display: inline-flex; align-items: center; gap: 7px;
                padding: 10px 18px;
                font-size: 13.5px; font-weight: 500;
                font-family: 'Inter', sans-serif;
                border-radius: 10px;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: #EAEAF0;
                text-decoration: none;
                transition: all .25s ease;
              }
              .pm-btn:hover {
                background: rgba(255,255,255,0.09);
                border-color: rgba(255,255,255,0.2);
                transform: translateY(-1px);
              }
              .pm-btn-primary {
                background: color-mix(in srgb, var(--color) 18%, transparent);
                border-color: color-mix(in srgb, var(--color) 45%, transparent);
                color: var(--color);
              }
              .pm-btn-primary:hover {
                background: color-mix(in srgb, var(--color) 28%, transparent);
              }

              @media (max-width: 520px) {
                .pm-overlay { padding: 12px; }
                .pm-body { padding: 20px; }
                .pm-hero { height: 140px; }
                .pm-emblem { font-size: 60px; }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
