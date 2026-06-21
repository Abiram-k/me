import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

type TimelineItem = {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: "work" | "education";
  accent: string;
  color: string;
};

const timelineData: TimelineItem[] = [
  {
    year: "2021 - 2024",
    title: "BSc Computer Science",
    company: "Chinmaya Mission College, Thrissur",
    description:
      "Completed with CGPA: 7. Focused on software development, algorithms, and web technologies.",
    icon: "education",
    accent: "rgba(251,191,36,0.18)",
    color: "#FBBF24",
  },
  {
    year: "2024 - Present",
    title: "MERN Stack Development",
    company: "Brototype, Ernakulam",
    description:
      "Intensive full-stack training building production-grade applications with React, Node.js, MongoDB, and modern web technologies.",
    icon: "work",
    accent: "rgba(123,110,246,0.18)",
    color: "#7B6EF6",
  },
  {
    year: "June 2025 - Present",
    title: "Software Developer",
    company: "Annam.AI",
    description:
      "Optimizing legacy codebases and building production web/mobile apps with AI agents, LLM/RAG workflows, and React Native (Expo). Leading development on Ajrasakha — an AI-powered agricultural advisory platform handling 25k+ domain-specific queries.",
    icon: "work",
    accent: "rgba(16,185,129,0.18)",
    color: "#10B981",
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--rx", `${(y - 0.5) * -14}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.transform = "";
  };

  const isLeft = index % 2 === 0;

  return (
    <div
      className={`tl-row flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{ opacity: 0, animation: `tlFadeUp .6s ${0.2 + index * 0.15}s forwards` }}
    >
      {/* Content side */}
      <div className={`tl-content w-full md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div
          ref={cardRef}
          className="tl-card"
          style={{ "--accent": item.accent } as React.CSSProperties}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="tl-card-shine" />
          <span className="tl-card-num">0{index + 1}</span>

          <div className="flex items-center gap-3 mb-3" style={{ flexDirection: isLeft ? "row-reverse" : "row" }}>
            <div
              className="tl-icon-ring"
              style={{
                background: item.accent,
                border: `1px solid ${item.color}30`,
              }}
            >
              {item.icon === "work" ? (
                <Briefcase size={20} color={item.color} />
              ) : (
                <GraduationCap size={20} color={item.color} />
              )}
            </div>
            <span
              className="tl-year"
              style={{
                border: `1px solid ${item.color}35`,
                color: item.color,
              }}
            >
              {item.year}
            </span>
          </div>

          <h3 className="tl-title">{item.title}</h3>
          <p className="tl-company" style={{ color: item.color }}>
            {item.company}
          </p>
          <div className="tl-divider" />
          <p className="tl-desc">{item.description}</p>
        </div>
      </div>

      {/* Center node */}
      <div className="tl-node-wrap flex items-center justify-center my-2 md:my-0">
        <div className="tl-node" style={{ borderColor: item.color, boxShadow: `0 0 0 4px ${item.accent}` }}>
          <div className="tl-node-inner" style={{ background: item.color }}>
            {item.icon === "work" ? (
              <Briefcase size={14} color="#060608" />
            ) : (
              <GraduationCap size={14} color="#060608" />
            )}
          </div>
        </div>
      </div>

      {/* Empty side */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

export default function Timeline() {
  return (
    <>
      <style>{`
        #timeline {
          background: var(--bg-primary);
          padding: 5rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }
        .tl-head {
          text-align: center;
          margin-bottom: 3.5rem;
          opacity: 0;
          animation: tlFadeUp .7s .1s forwards;
        }
        .tl-eyebrow {
          font-size: .72rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: .75rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .tl-title-main {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }
        .tl-title-white { color: var(--text-primary); }
        .tl-title-grad {
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2) 50%, var(--accent-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: tlGradFlow 4s linear infinite;
        }
        @keyframes tlGradFlow { 0% { background-position: 0%; } 100% { background-position: 200%; } }

        .tl-track {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }
        .tl-track::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: var(--card-border);
          transform: translateX(-50%);
        }
        @media (max-width: 768px) {
          .tl-track::before { display: none; }
        }

        .tl-card {
          position: relative;
          border-radius: 16px;
          padding: 1.75rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          transform-style: preserve-3d;
          transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s, border-color .4s;
          cursor: default;
        }
        .tl-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 16px;
          background: radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), var(--accent, .15) 0%, transparent 65%);
          opacity: 0; transition: opacity .4s; pointer-events: none;
        }
        .tl-card:hover::before { opacity: 1; }
        .tl-card:hover {
          transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(12px);
          box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.08);
        }

        .tl-card-shine {
          position: absolute; inset: 0; border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .tl-card-num {
          position: absolute; top: 1.25rem; right: 1.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: .7rem; color: var(--text-muted); letter-spacing: .05em;
        }

        .tl-icon-ring {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .tl-card:hover .tl-icon-ring { transform: rotateY(360deg) scale(1.1); }

        .tl-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: .65rem;
          padding: .2rem .55rem;
          border-radius: 100px;
          letter-spacing: .03em;
          white-space: nowrap;
        }

        .tl-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem; font-weight: 600; color: var(--text-primary);
          letter-spacing: -.3px; margin-bottom: .2rem;
        }
        .tl-company {
          font-size: .78rem; font-weight: 500;
          margin-bottom: .75rem;
        }
        .tl-divider { height: 1px; background: var(--card-border); margin-bottom: .75rem; }
        .tl-desc {
          font-size: .82rem; color: var(--text-muted);
          line-height: 1.65;
        }

        .tl-node-wrap {
          position: relative;
          z-index: 2;
          min-width: 48px;
        }
        .tl-node {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid;
          background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
          transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;
        }
        .tl-node-inner {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .tl-row:hover .tl-node {
          transform: scale(1.15);
        }

        @keyframes tlFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .tl-content { padding: 0 !important; }
          .tl-node-wrap { order: -1; }
        }
      `}</style>

      <section id="timeline">
        <div className="tl-head">
          <p className="tl-eyebrow">Career Path</p>
          <h2 className="tl-title-main">
            <span className="tl-title-white">Experience &amp; </span>
            <span className="tl-title-grad">Education</span>
          </h2>
        </div>

        <div className="tl-track">
          <div className="flex flex-col gap-12">
            {timelineData.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
