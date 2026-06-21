import { useEffect, useRef } from 'react';

type SkillCategory = {
  category: string;
  icon: React.ReactNode;
  accent: string;
  color: string;
  tags: string[];
  proficiency: number;
};

const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    accent: 'rgba(251,191,36,0.18)', color: '#FBBF24',
    tags: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    proficiency: 88,
  },
  {
    category: 'Frontend & Mobile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    accent: 'rgba(123,110,246,0.18)', color: '#7B6EF6',
    tags: ['React.js', 'Next.js', 'React Native (Expo)', 'Redux', 'Vite', 'Zustand', 'Tailwind CSS'],
    proficiency: 90,
  },
  {
    category: 'Backend & APIs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    accent: 'rgba(232,121,249,0.18)', color: '#E879F9',
    tags: ['NestJS', 'Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
    proficiency: 85,
  },
  {
    category: 'Databases & ORM',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    accent: 'rgba(6,182,212,0.18)', color: '#06B6D4',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TypeORM', 'Prisma ORM'],
    proficiency: 82,
  },
  {
    category: 'Architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    accent: 'rgba(255,138,76,0.18)', color: '#FF8A4C',
    tags: ['Hexagonal Architecture', 'Repository Pattern', 'SOLID', 'Clean Architecture'],
    proficiency: 80,
  },
  {
    category: 'DevOps & Cloud',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    accent: 'rgba(16,185,129,0.18)', color: '#10B981',
    tags: ['Docker', 'AWS (EC2, S3)', 'Google Cloud', 'Azure', 'NGINX', 'Cloudflare', 'PM2', 'GitHub Actions'],
    proficiency: 75,
  },
  {
    category: 'AI & Integrations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M6 10h12v2a6 6 0 0 1-12 0v-2z" />
        <path d="M8 22h8" />
        <path d="M12 18v4" />
      </svg>
    ),
    accent: 'rgba(168,85,247,0.18)', color: '#A855F7',
    tags: ['LLM Agents', 'RAG Pipelines', 'Whisper AI', 'WebRTC', 'Socket.IO', 'JWT', 'OAuth', 'Razorpay', 'Stripe'],
    proficiency: 78,
  },
  {
    category: 'Tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    accent: 'rgba(249,115,22,0.18)', color: '#F97316',
    tags: ['Git', 'Postman', 'Figma', 'Data Structures & Algorithms'],
    proficiency: 85,
  },
];

function SkillCard({ skill, index }: { skill: SkillCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--rx', `${(y - 0.5) * -14}deg`);
    card.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className="sk-card"
      style={{ '--accent': skill.accent, animationDelay: `${0.15 + index * 0.1}s` } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sk-card-shine" />
      <div className="sk-card-num">0{index + 1}</div>

      <div
        className="sk-icon-ring"
        style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30`, color: skill.color }}
      >
        {skill.icon}
      </div>

      <div className="sk-cat">{skill.category}</div>
      <div className="sk-count">{skill.tags.length} technologies</div>
      <div className="sk-divider" />

      <div className="sk-tags">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="sk-tag"
            style={{ color: skill.color, borderColor: `${skill.color}40`, background: `${skill.color}0e` }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="sk-bar-wrap">
        <div className="sk-bar-label">
          <span>Proficiency</span>
          <span>{skill.proficiency}%</span>
        </div>
        <div className="sk-bar-track">
          <div
            className="sk-bar-fill"
            style={{
              width: `${skill.proficiency}%`,
              background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
              animationDelay: `${0.4 + index * 0.1}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400&display=swap');

        #skills {
          background: #060608;
          padding: 5rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .sk-head {
          text-align: center;
          margin-bottom: 3.5rem;
          opacity: 0;
          animation: skFadeUp .7s .1s forwards;
        }
        .sk-eyebrow {
          font-size: .72rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
          margin-bottom: .75rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .sk-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }
        .sk-title-white { color: rgba(255,255,255,.92); }
        .sk-title-grad {
          background: linear-gradient(135deg, #7B6EF6, #E879F9 50%, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: skGradFlow 4s linear infinite;
        }
        @keyframes skGradFlow { 0% { background-position: 0%; } 100% { background-position: 200%; } }

        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
          perspective: 1200px;
        }

        .sk-card {
          position: relative;
          border-radius: 16px;
          padding: 1.75rem;
          background: rgba(255,255,255,.032);
          border: 1px solid rgba(255,255,255,.07);
          transform-style: preserve-3d;
          transition: transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s, border-color .4s;
          cursor: default;
          opacity: 0;
          animation: skFadeUp .6s forwards;
        }
        .sk-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 16px;
          background: radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), var(--accent, .15) 0%, transparent 65%);
          opacity: 0; transition: opacity .4s; pointer-events: none;
        }
        .sk-card:hover::before { opacity: 1; }
        .sk-card:hover {
          transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(12px);
          box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.08);
        }

        .sk-card-shine {
          position: absolute; inset: 0; border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .sk-card-num {
          position: absolute; top: 1.25rem; right: 1.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: .7rem; color: rgba(255,255,255,.12); letter-spacing: .05em;
        }

        .sk-icon-ring {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .sk-card:hover .sk-icon-ring { transform: rotateY(360deg) scale(1.1); }

        .sk-cat {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem; font-weight: 600; color: #fff;
          margin-bottom: .25rem; letter-spacing: -.3px;
        }
        .sk-count {
          font-size: .72rem; color: rgba(255,255,255,.3);
          margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace;
        }
        .sk-divider { height: 1px; background: rgba(255,255,255,.07); margin-bottom: 1rem; }

        .sk-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
        .sk-tag {
          padding: .28rem .7rem; border-radius: 100px;
          font-size: .72rem; font-weight: 500; letter-spacing: .01em;
          border: 1px solid; transition: all .25s; cursor: default;
          font-family: 'JetBrains Mono', monospace;
        }
        .sk-tag:hover { transform: translateY(-2px) scale(1.06); filter: brightness(1.2); }

        .sk-bar-wrap { margin-top: 1.25rem; }
        .sk-bar-label {
          display: flex; justify-content: space-between;
          font-size: .7rem; margin-bottom: .35rem; color: rgba(255,255,255,.4);
        }
        .sk-bar-track { height: 3px; background: rgba(255,255,255,.06); border-radius: 99px; overflow: hidden; }
        .sk-bar-fill {
          height: 100%; border-radius: 99px;
          transform: scaleX(0); transform-origin: left;
          animation: skBarGrow .9s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes skBarGrow { to { transform: scaleX(1); } }
        @keyframes skFadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

        .sk-footer {
          text-align: center; margin-top: 3rem;
          opacity: 0; animation: skFadeUp .6s 1.2s forwards;
        }
        .sk-footer-text {
          font-size: .8rem; color: rgba(255,255,255,.2);
          font-family: 'JetBrains Mono', monospace;
        }
        .sk-footer-text span { color: #7B6EF6; }
      `}</style>

      <section id="skills">
        <div className="sk-head">
          <div className="sk-eyebrow">// Technical Arsenal</div>
          <div className="sk-title">
            <span className="sk-title-white">Skills &amp; </span>
            <span className="sk-title-grad">Expertise</span>
          </div>
        </div>

        <div className="sk-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} index={i} />
          ))}
        </div>

        <div className="sk-footer">
          <div className="sk-footer-text">
            Always learning · <span>+</span> more being added
          </div>
        </div>
      </section>
    </>
  );
}