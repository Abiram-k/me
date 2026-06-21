import { useState, useEffect, useRef } from 'react';

const themes = [
  { id: 'midnight', name: 'Midnight Purple', preview: 'linear-gradient(135deg, #7B6EF6, #E879F9)' },
  { id: 'cyberpunk', name: 'Cyberpunk', preview: 'linear-gradient(135deg, #ff0055, #00ffcc)' },
  { id: 'ocean', name: 'Ocean Breeze', preview: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
  { id: 'forest', name: 'Forest Moss', preview: 'linear-gradient(135deg, #10b981, #84cc16)' },
  { id: 'sunset', name: 'Sunset Amber', preview: 'linear-gradient(135deg, #f59e0b, #f97316)' },
  { id: 'rose', name: 'Rose Quartz', preview: 'linear-gradient(135deg, #f43f5e, #d946ef)' },
  { id: 'light', name: 'Clean Light', preview: 'linear-gradient(135deg, #4f46e5, #7c3aed)' },
  { id: 'nordic', name: 'Nordic Frost', preview: 'linear-gradient(135deg, #2b6cb0, #319795)' },
  { id: 'cream', name: 'Warm Cream', preview: 'linear-gradient(135deg, #c05621, #7b341e)' },
  { id: 'sakura', name: 'Sakura Blossom', preview: 'linear-gradient(135deg, #d53f8c, #97266d)' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'midnight');
  const [showPicker, setShowPicker] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const bgAnimRef = useRef<number>(0);

  useEffect(() => {
    const classes = document.documentElement.className.split(' ').filter(c => !c.startsWith('theme-'));
    classes.push(`theme-${activeTheme}`);
    document.documentElement.className = classes.join(' ').trim();
    localStorage.setItem('portfolio-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor ring
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(123,110,246,', 'rgba(232,121,249,', 'rgba(6,182,212,'];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      c: colors[Math.floor(Math.random() * 3)],
      a: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + p.a + ')';
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(123,110,246,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      bgAnimRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(bgAnimRef.current);
    };
  }, []);

  const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(200px) rotateY(${x * 0.15}deg) rotateX(${-y * 0.15}deg) translateZ(4px)`;
  };
  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'perspective(200px) rotateY(0) rotateX(0) translateZ(0)';
  };

  const navLinks = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --c1: var(--accent-1);
          --c2: var(--accent-2);
          --c3: var(--accent-3);
          --glass: var(--glass-bg);
          --glow1: var(--orb-1);
          --glow2: var(--orb-2);
        }

        .nb-canvas {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0; pointer-events: none;
        }

        .nb-cursor-ring {
          position: fixed; width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid rgba(123, 110, 246, 0.6);
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }

        .nb-nav {
          position: fixed; top: 0; left: 0; right: 0;
          height: 70px; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          background: var(--glass);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--glass-border);
          transition: height 0.4s ease, border-color 0.4s ease;
          font-family: 'Inter', sans-serif;
        }
        .nb-nav.scrolled {
          height: 58px;
          border-bottom-color: var(--accent-1);
        }
        .nb-nav::before {
          content: '';position: absolute;inset: 0;
          background: linear-gradient(90deg, var(--glow1), transparent 40%, var(--glow2), transparent);
          opacity: 0; transition: opacity 0.6s ease; pointer-events: none;
        }
        .nb-nav:hover::before { opacity: 1; }

        .nb-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 1.35rem; letter-spacing: -0.5px;
          text-decoration: none;
          display: flex; align-items: center; gap: 10px;
          perspective: 400px;
        }
        .nb-logo-icon {
          width: 34px; height: 34px;
          animation: nb-logoSpin 8s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes nb-logoSpin {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          25%       { transform: rotateY(180deg) rotateX(10deg); }
          50%       { transform: rotateY(360deg) rotateX(0deg); }
          75%       { transform: rotateY(180deg) rotateX(-10deg); }
        }
        .nb-logo-icon svg { filter: drop-shadow(0 0 8px var(--c1)); }
        .nb-logo-text {
          background: linear-gradient(135deg, #fff 0%, var(--c1) 50%, var(--c2) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% auto;
          animation: nb-gradShift 4s linear infinite;
        }
        @keyframes nb-gradShift {
          0%   { background-position: 0%; }
          100% { background-position: 200%; }
        }

        .nb-links { display: flex; align-items: center; gap: 0.2rem; }

        .nb-link {
          position: relative; padding: 0.5rem 1.1rem;
          font-size: 0.875rem; font-weight: 500; letter-spacing: 0.02em;
          color: var(--text-secondary); text-decoration: none;
          transition: color 0.3s ease; border-radius: 8px; overflow: hidden;
        }
        .nb-link::before {
          content: attr(data-text);
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.875rem; font-weight: 500; letter-spacing: 0.02em;
          background: linear-gradient(135deg, var(--c1), var(--c2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: translateY(110%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nb-link::after {
          content: ''; position: absolute; bottom: 4px;
          left: 50%; transform: translateX(-50%) scaleX(0);
          width: 60%; height: 1.5px; border-radius: 2px;
          background: linear-gradient(90deg, var(--c1), var(--c2));
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 0 8px var(--c1);
        }
        .nb-link:hover { color: transparent; }
        .nb-link:hover::before { transform: translateY(0); }
        .nb-link:hover::after { transform: translateX(-50%) scaleX(1); }

        .nb-socials {
          display: flex; align-items: center; gap: 0.5rem;
          margin-left: 0.75rem; padding-left: 0.75rem;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }
        .nb-social {
          width: 34px; height: 34px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); text-decoration: none;
          border: 1px solid var(--card-border);
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .nb-social::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at center, var(--accent-1) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .nb-social:hover {
          color: var(--text-primary);
          border-color: var(--accent-1);
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-1) 25%, transparent);
        }
        .nb-social:hover::before { opacity: 0.15; }
        .nb-social svg { width: 15px; height: 15px; position: relative; z-index: 1; }

        .nb-cta {
          margin-left: 0.75rem; padding: 0.45rem 1.1rem;
          background: linear-gradient(135deg, var(--c1), var(--c2));
          border: none; border-radius: 8px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
          color: #fff; letter-spacing: 0.03em; text-decoration: none;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          display: flex; align-items: center; gap: 6px;
        }
        .nb-cta::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--c2), var(--c3));
          opacity: 0; transition: opacity 0.3s ease;
        }
        .nb-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(123, 110, 246, 0.4); }
        .nb-cta:hover::before { opacity: 1; }
        .nb-cta span { position: relative; z-index: 1; }

        .nb-resume-btn {
          margin-left: 0.75rem; padding: 0.45rem 1.1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(123, 110, 246, 0.35); border-radius: 8px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
          color: rgba(255, 255, 255, 0.85); letter-spacing: 0.03em; text-decoration: none;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          display: flex; align-items: center; gap: 6px;
          backdrop-filter: blur(8px);
        }
        .nb-resume-btn:hover {
          background: rgba(123, 110, 246, 0.1);
          border-color: rgba(123, 110, 246, 0.6);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(123, 110, 246, 0.25);
        }
        .nb-resume-btn span { position: relative; z-index: 1; }

        .nb-mobile-btn {
          display: none; background: none;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px; width: 36px; height: 36px; cursor: pointer;
          align-items: center; justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }
        .nb-mobile-btn:hover {
          border-color: var(--c1); color: #fff;
          box-shadow: 0 0 12px var(--glow1);
        }

        .nb-mobile-menu {
          position: fixed; top: 70px; left: 0; right: 0;
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--glass-border);
          padding: 1.5rem 2.5rem 2rem;
          z-index: 99;
          transform: translateY(-8px); opacity: 0; pointer-events: none;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nb-mobile-menu.open {
          transform: translateY(0); opacity: 1; pointer-events: all;
        }
        .nb-mobile-link {
          display: block; padding: 0.75rem 0;
          font-size: 1.1rem; font-weight: 500;
          color: var(--text-secondary); text-decoration: none;
          border-bottom: 1px solid var(--card-border);
          transition: all 0.3s ease;
        }
        .nb-mobile-link:hover { color: var(--text-primary); padding-left: 8px; }
        .nb-mobile-socials { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

        .nb-palette-btn {
          width: 34px; height: 34px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--card-border);
          transition: all 0.3s ease; position: relative; cursor: pointer;
        }
        .nb-palette-btn:hover, .nb-palette-btn.active {
          color: var(--text-primary);
          border-color: var(--accent-1);
          transform: scale(1.08);
          box-shadow: 0 4px 15px color-mix(in srgb, var(--accent-1) 25%, transparent);
        }
        .nb-theme-dropdown {
          position: absolute;
          top: 80px; right: 2.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0.75rem;
          width: 240px;
          z-index: 1000;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          animation: nb-fadeIn 0.25s ease-out;
        }
        @keyframes nb-fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nb-theme-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .nb-theme-item:hover {
          background: rgba(255,255,255,0.06);
          color: var(--text-primary);
          padding-left: 16px;
        }
        .nb-theme-item.active {
          background: color-mix(in srgb, var(--accent-1) 15%, transparent);
          color: var(--accent-1);
        }
        .nb-theme-dot {
          width: 12px; height: 12px; border-radius: 50%;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .nb-links { display: none; }
          .nb-mobile-btn { display: flex; }
          .nb-nav { padding: 0 1.5rem; }
        }
      `}</style>

      <canvas ref={canvasRef} className="nb-canvas" />
      <div ref={ringRef} className="nb-cursor-ring" />

      <nav className={`nb-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nb-logo">
          <div className="nb-logo-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="nb-lg1" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7B6EF6" />
                  <stop offset="100%" stopColor="#E879F9" />
                </linearGradient>
              </defs>
              <polygon points="17,2 32,10 32,24 17,32 2,24 2,10" fill="none" stroke="url(#nb-lg1)" strokeWidth="1.5" />
              <polygon points="17,8 26,13 26,21 17,26 8,21 8,13" fill="url(#nb-lg1)" opacity="0.25" />
              <circle cx="17" cy="17" r="3" fill="url(#nb-lg1)" />
              <line x1="17" y1="2" x2="17" y2="8" stroke="url(#nb-lg1)" strokeWidth="1.5" />
              <line x1="17" y1="26" x2="17" y2="32" stroke="url(#nb-lg1)" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="nb-logo-text">Abiram K</span>
        </a>

        <div className="nb-links">
          {navLinks.map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="nb-link"
              data-text={label}
              onMouseMove={handleLinkMouseMove}
              onMouseLeave={handleLinkMouseLeave}
            >
              {label}
            </a>
          ))}

          <div className="nb-socials">
            <a href="https://github.com/Abiram-k" target="_blank" rel="noopener noreferrer" className="nb-social" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/abiram-k-711358248/" target="_blank" rel="noopener noreferrer" className="nb-social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:abiramk0107@gmail.com" className="nb-social" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            <button
              className={`nb-palette-btn${showPicker ? ' active' : ''}`}
              onClick={() => setShowPicker(!showPicker)}
              aria-label="Switch Theme"
              title="Switch Theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.3784 19.5198 5.42445 20.3552 5.02237 20.9316C4.85338 21.1739 4.89679 21.5034 5.12151 21.6961C5.35266 21.8943 5.68884 21.9961 6 22H12Z" />
                <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
                <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>

          {showPicker && (
            <div className="nb-theme-dropdown">
              {themes.map(t => (
                <button
                  key={t.id}
                  className={`nb-theme-item${activeTheme === t.id ? ' active' : ''}`}
                  onClick={() => {
                    setActiveTheme(t.id);
                    setShowPicker(false);
                  }}
                >
                  <span className="nb-theme-dot" style={{ background: t.preview }} />
                  {t.name}
                </button>
              ))}
            </div>
          )}

          <a href="/me/Abiram_K_Resume_updated.pdf" target="_blank" rel="noopener noreferrer" className="nb-resume-btn">
            <span>Resume</span><span>↗</span>
          </a>

          <a href="#contact" className="nb-cta">
            <span>Hire me</span><span>↗</span>
          </a>
        </div>

        <button className="nb-mobile-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          }
        </button>
      </nav>

      <div className={`nb-mobile-menu${isOpen ? ' open' : ''}`}>
        {navLinks.map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="nb-mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="/me/Abiram_K_Resume_updated.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-mobile-link"
          style={{ color: '#7B6EF6' }}
          onClick={() => setIsOpen(false)}
        >
          Resume ↗
        </a>
        <div className="nb-mobile-socials">
          <a href="https://github.com/Abiram-k" target="_blank" rel="noopener noreferrer" className="nb-social" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/abiram-k-711358248/" target="_blank" rel="noopener noreferrer" className="nb-social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:abiramk0107@gmail.com" className="nb-social" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Themes</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: t.preview,
                  border: activeTheme === t.id ? '2px solid var(--text-primary)' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: activeTheme === t.id ? 'scale(1.15)' : 'none',
                  boxShadow: activeTheme === t.id ? '0 0 10px var(--accent-1)' : 'none'
                }}
                title={t.name}
                aria-label={t.name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}