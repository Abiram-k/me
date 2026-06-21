import { useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    num: "1+",
    label: "Years Experience",
    color: "#7B6EF6",
    accent: "rgba(123,110,246,0.18)",
  },
  {
    num: "AI-First",
    label: "Full Stack",
    color: "#4ECDC4",
    accent: "rgba(78,205,196,0.18)",
  },
  {
    num: "NestJS",
    label: "& React Native",
    color: "#FF8A4C",
    accent: "rgba(255,138,76,0.18)",
  },
  {
    num: "∞",
    label: "Curiosity",
    color: "#06B6D4",
    accent: "rgba(6,182,212,0.18)",
  },
];

function StatCard({ item, index }: { item: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="ab-stat-card"
      style={
        {
          ["--color" as string]: item.color,
          ["--accent" as string]: item.accent,
          animationDelay: `${index * 80}ms`,
        } as React.CSSProperties
      }
    >
      <div className="ab-stat-glow" />
      <h3 className="ab-stat-num" style={{ color: item.color }}>
        {item.num}
      </h3>
      <p className="ab-stat-label">{item.label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="ab-section">
      <style>{`
        .ab-section {
          position: relative;
          padding: 96px 24px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .ab-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(700px 350px at 15% 30%, var(--orb-1), transparent 60%),
            radial-gradient(600px 350px at 85% 70%, var(--orb-2), transparent 60%);
          pointer-events: none;
        }
        .ab-container { max-width: 1100px; margin: 0 auto; position: relative; }
 
        .ab-head { text-align: center; margin-bottom: 56px; }
        .ab-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: var(--accent-1);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ab-eyebrow::before { content: '// '; opacity: 0.7; }
        .ab-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.05;
          margin: 0;
        }
        .ab-heading .grad {
          background: linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3), var(--accent-1));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: abGradFlow 8s linear infinite;
        }
        @keyframes abGradFlow { to { background-position: 200% center; } }
 
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 800px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; }
        }
 
        /* Image side */
        .ab-visual {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          border: 1px solid var(--card-border);
          opacity: 0;
          animation: abFadeUp .7s .1s cubic-bezier(.2,.7,.2,1) forwards;
        }
        .ab-visual-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--card-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--card-border) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
        }
        .ab-visual-grad {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--orb-1), var(--orb-2), transparent);
        }
        .ab-visual-letter {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .ab-visual-letter span {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 140px;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent-1) 30%, var(--accent-2) 70%, var(--accent-3));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 8px 30px var(--orb-1));
        }
 
        /* Text side */
        .ab-body {
          opacity: 0;
          animation: abFadeUp .7s .25s cubic-bezier(.2,.7,.2,1) forwards;
        }
        .ab-body p {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text-secondary);
          margin: 0 0 18px;
        }
        .ab-body p:last-of-type { margin-bottom: 0; }
        .ab-highlight {
          color: var(--text-primary);
          font-weight: 500;
        }
        .ab-quote {
          position: relative;
          padding: 18px 22px;
          margin: 24px 0;
          border-left: 2px solid var(--accent-1);
          background: var(--orb-1);
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: var(--text-secondary);
          font-size: 14.5px;
          line-height: 1.7;
        }
 
        /* Stats */
        .ab-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.65rem 1.5rem;
          border-radius: 10px;
          background: var(--card-bg);
          border: 1px solid var(--accent-1);
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .ab-resume-btn:hover {
          background: color-mix(in srgb, var(--accent-1) 12%, transparent);
          border-color: var(--accent-1);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--accent-1) 25%, transparent);
        }
 
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 32px;
        }
        .ab-stat-card {
          position: relative;
          padding: 20px 18px;
          border-radius: 14px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          overflow: hidden;
          transition: border-color .35s ease, box-shadow .35s ease, transform .25s ease;
          opacity: 0;
          animation: abFadeUp .6s cubic-bezier(.2,.7,.2,1) forwards;
          cursor: default;
        }
        .ab-stat-card:hover {
          border-color: color-mix(in srgb, var(--color) 45%, transparent);
          box-shadow: 0 16px 40px -12px var(--accent);
          transform: translateY(-2px);
        }
        .ab-stat-glow {
          position: absolute; inset: 0;
          background: radial-gradient(250px circle at var(--mx,50%) var(--my,50%), var(--accent), transparent 55%);
          opacity: 0; transition: opacity .35s ease;
          pointer-events: none;
        }
        .ab-stat-card:hover .ab-stat-glow { opacity: 1; }
        .ab-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 4px;
          position: relative; z-index: 1;
        }
        .ab-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
          position: relative; z-index: 1;
        }
 
        @keyframes abFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
 
        @media (max-width: 800px) {
          .ab-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="ab-container">
        <div className="ab-head">
          <p className="ab-eyebrow">Who I Am</p>
          <h2 className="ab-heading">
            <span className="grad">About Me</span>
          </h2>
        </div>

        <div className="ab-grid">
          {/* Visual */}
          <motion.div
            className="ab-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="ab-visual-grad" />
            <div className="ab-visual-grid" />
            <div className="ab-visual-letter">
              <span>A</span>
            </div>
          </motion.div>

          {/* Text */}
          <div className="ab-body">
            <div className="ab-quote">
              An independent, self-driven, and hardworking Software Developer with a strong work ethic
              and a bias toward shipping.
            </div>

            <p>
              Hi, I'm <span className="ab-highlight">Abiram K</span>, a Software Developer at{" "}
              <span className="ab-highlight">Annam.AI</span>, building AI-first platforms,
              enterprise-grade cloud architectures, and highly scalable backend solutions.
            </p>

            <p>
              I specialize in system design, legacy architecture optimization, advanced LLM/RAG
              pipelines, and production DevOps. I'm currently building{" "}
              <span className="ab-highlight">Ajrasakha</span> — an AI-powered agricultural advisory
              platform — alongside cross-platform mobile apps with React Native (Expo) and robust
              NestJS/FastAPI backends.
            </p>

            <p>
              My journey spans Brototype (MERN Stack Development) and a BSc in Computer Science from
              Chinmaya Mission College, Thrissur. I focus on clean architecture, SOLID principles, and
              shipping reliable production systems.
            </p>

            <div style={{ marginTop: "24px" }}>
              <a
                href="/me/Abiram_K_Resume_updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ab-resume-btn"
              >
                <span>View Resume</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>

            <div className="ab-stats">
              {stats.map((s, i) => (
                <StatCard key={i} item={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
