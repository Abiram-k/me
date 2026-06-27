import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphsRef = useRef<HTMLDivElement>(null);
  const twRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const pills = [
    { label: 'Full-Stack Development', color: '#7B6EF6' },
    { label: 'Mobile Apps',            color: '#E879F9' },
    { label: 'AI Integrations',        color: '#06B6D4' },
    { label: 'Cloud Deployment',       color: '#10B981' },
    { label: 'API Integrations',       color: '#FBBF24' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, mx = 0.5, my = 0.5, t = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX / W;
      my = e.clientY / H;
    };
    document.addEventListener('mousemove', onMouseMove);

    const drawGrid = () => {
      ctx.clearRect(0, 0, W, H);
      const cols = 28, rows = 18;
      const cw = W / cols, ch = H / rows;
      const ox = (mx - 0.5) * 60, oy = (my - 0.5) * 40;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const bx = c * cw, by = r * ch;
          const wave = Math.sin(c * 0.4 + t) * Math.cos(r * 0.5 + t * 0.7) * 18;
          const dx = (mx - 0.5) * 2, dy = (my - 0.5) * 2;
          const dist = Math.sqrt(Math.pow(c / cols - mx, 2) + Math.pow(r / rows - my, 2));
          const lift = Math.max(0, 1 - dist * 2.5) * 30;
          const z = wave + lift;
          const px = bx + ox * (1 - c / cols) + z * dx * 0.5;
          const py = by + oy * (1 - r / rows) + z * dy * 0.5;
          const alpha = 0.04 + Math.max(0, z / 30) * 0.18 + Math.max(0, 1 - dist * 2.5) * 0.12;

          if (c < cols && r < rows) {
            const nx = (c + 1) * cw + ox * (1 - (c + 1) / cols);
            const ny = r * ch + oy * (1 - r / rows);
            const bx2 = bx + ox * (1 - c / cols);
            const by2 = (r + 1) * ch + oy * (1 - (r + 1) / rows);
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx + z * dx * 0.5, ny + z * dy * 0.5);
            ctx.strokeStyle = `rgba(123,110,246,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx2 + z * dx * 0.5, by2 + z * dy * 0.5);
            ctx.strokeStyle = `rgba(123,110,246,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
          if (lift > 5) {
            ctx.beginPath(); ctx.arc(px, py, 1.5 + lift / 20, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(123,110,246,${lift / 60})`; ctx.fill();
          }
        }
      }
      t += 0.012;
      animRef.current = requestAnimationFrame(drawGrid);
    };
    drawGrid();

    return () => {
      ro.disconnect();
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    const container = glyphsRef.current;
    if (!container) return;
    const codeChars = ['<', '>', '/', '{', '}', '()', '=>', '&&', '||', '++', '!==', '===', 'const', 'fn', 'async', '[]', '∞'];
    const colors = ['rgba(123,110,246,.4)', 'rgba(232,121,249,.3)', 'rgba(6,182,212,.3)', 'rgba(16,185,129,.25)'];
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'hero-glyph';
      el.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
      el.style.cssText = `left:${Math.random() * 100}%;color:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${8 + Math.random() * 14}s;animation-delay:${Math.random() * 10}s`;
      container.appendChild(el);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  useEffect(() => {
    const el = twRef.current;
    if (!el) return;
    const phrases = [
      'Scalable System Design',
      'Cloud Deployment & DevOps',
      'AI-Powered Product Development',
      'Full-Stack Engineering',
      'Performance-Driven Architecture',
    ];    
    let pi = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const typeWrite = () => {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        el.innerHTML = phrase.slice(0, ci) + '<span class="hero-cursor"></span>';
        if (ci === phrase.length) { deleting = true; timer = setTimeout(typeWrite, 1800); return; }
        timer = setTimeout(typeWrite, 65 + Math.random() * 40);
      } else {
        ci--;
        el.innerHTML = phrase.slice(0, ci) + '<span class="hero-cursor"></span>';
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; timer = setTimeout(typeWrite, 300); return; }
        timer = setTimeout(typeWrite, 35);
      }
    };
    timer = setTimeout(typeWrite, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const countUp = (el: HTMLDivElement | null, target: number, suffix: string, dur: number) => {
      if (!el) return;
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const t = setTimeout(() => {
      countUp(s1Ref.current, 60, '+', 1200);
      countUp(s2Ref.current, 30, '+', 1000);
      countUp(s3Ref.current, 2000, '+', 1400);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        #hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-primary);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-orb1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--orb-1), transparent 70%);
          top: -120px; left: -100px;
          animation: heroOrbFloat1 10s ease-in-out infinite;
        }
        .hero-orb2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, var(--orb-2), transparent 70%);
          bottom: -80px; right: -80px;
          animation: heroOrbFloat2 12s ease-in-out infinite;
        }
        .hero-orb3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, var(--orb-3), transparent 70%);
          top: 50%; left: 60%;
          animation: heroOrbFloat1 14s ease-in-out infinite reverse;
        }
        @keyframes heroOrbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(30px, -40px); }
          66%       { transform: translate(-20px, 20px); }
        }
        @keyframes heroOrbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-40px, -30px); }
        }
        .hero-glyphs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hero-glyph {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          opacity: 0;
          animation: heroGlyphFloat linear infinite;
        }
        @keyframes heroGlyphFloat {
          0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.5; }
          90%  { opacity: 0.25; }
          100% { transform: translateY(-20px) rotate(720deg); opacity: 0; }
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: .35rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--accent-1);
          background: var(--card-bg);
          font-size: .75rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          opacity: 0;
          animation: heroFadeUp .7s .2s forwards;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: heroBadgePulse 2s infinite;
        }
        @keyframes heroBadgePulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
        .hero-h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 1.75rem;
        }
        .hero-h1-line { display: block; overflow: hidden; }
        .hero-h1-inner {
          display: block;
          font-size: clamp(3rem, 7vw, 5.5rem);
          color: var(--text-primary);
          opacity: .92;
          transform: translateY(100%);
          animation: heroLineReveal .8s cubic-bezier(.22,1,.36,1) forwards;
        }
        .hero-h1-line:nth-child(1) .hero-h1-inner { animation-delay: .4s; }
        .hero-h1-line:nth-child(2) .hero-h1-inner { animation-delay: .55s; }
        .hero-h1-line:nth-child(3) .hero-h1-inner { animation-delay: .7s; }
        .hero-h1-grad {
          background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 50%, var(--accent-3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: heroLineReveal .8s cubic-bezier(.22,1,.36,1) .55s forwards, heroGradFlow 4s linear 1.35s infinite;
        }
        @keyframes heroGradFlow { 0% { background-position: 0%; } 100% { background-position: 200%; } }
        @keyframes heroLineReveal { to { transform: translateY(0); } }
        @keyframes heroFadeUp { to { opacity: 1; transform: none; } }
 
        .hero-typewriter-wrap {
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: heroFadeUp .6s .9s forwards;
        }
        .hero-typewriter {
          font-size: clamp(.95rem, 2vw, 1.1rem);
          color: var(--text-secondary);
          letter-spacing: .03em;
          font-weight: 300;
          min-height: 1.6em;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent-1);
          margin-left: 3px;
          vertical-align: middle;
          animation: heroBlink .8s infinite;
        }
        @keyframes heroBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
 
        .hero-pills {
          display: flex;
          gap: .5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1.25rem;
          opacity: 0;
          animation: heroFadeUp .6s 1.2s forwards;
        }
        .hero-pill {
          padding: .25rem .75rem;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .7rem;
          border: 1px solid;
          transition: all .3s;
          cursor: default;
        }
        .hero-pill:hover { transform: translateY(-2px) scale(1.05); }
 
        .hero-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
          opacity: 0;
          animation: heroFadeUp .6s 1.1s forwards;
        }
        .hero-btn-primary {
          position: relative;
          padding: .8rem 2rem;
          border-radius: 100px;
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
          color: #fff;
          font-weight: 600;
          font-size: .92rem;
          letter-spacing: .02em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .hero-btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
          opacity: 0;
          transition: opacity .3s;
        }
        .hero-btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 40px color-mix(in srgb, var(--accent-1) 35%, transparent); }
        .hero-btn-primary:hover::before { opacity: 1; }
        .hero-btn-primary span { position: relative; z-index: 1; }
        .hero-btn-secondary {
          padding: .8rem 2rem;
          border-radius: 100px;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: .92rem;
          letter-spacing: .02em;
          text-decoration: none;
          transition: all .25s;
          backdrop-filter: blur(8px);
        }
        .hero-btn-secondary:hover { background: color-mix(in srgb, var(--accent-1) 12%, transparent); border-color: var(--accent-1); transform: translateY(-3px); color: var(--text-primary); }
 
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          margin-top: 3rem;
          opacity: 0;
          animation: heroFadeUp .6s 1.3s forwards;
          flex-wrap: wrap;
        }
        .hero-stat-item { text-align: center; }
        .hero-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: .72rem;
          color: var(--text-muted);
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-top: .25rem;
        }
        .hero-stat-div { width: 1px; height: 40px; background: var(--card-border); }
 
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .5rem;
          opacity: 0;
          animation: heroFadeUp .6s 1.6s forwards;
        }
        .hero-scroll-line {
          width: 1px; height: 50px;
          background: linear-gradient(to bottom, var(--accent-1), transparent);
          animation: heroScrollPulse 2s ease-in-out infinite;
        }
        @keyframes heroScrollPulse {
          0%, 100% { transform: scaleY(1); opacity: .6; }
          50%       { transform: scaleY(1.3); opacity: 1; }
        }
        .hero-scroll-text {
          font-size: .65rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
      `}</style>

      <section id="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-orb hero-orb1" />
        <div className="hero-orb hero-orb2" />
        <div className="hero-orb hero-orb3" />
        <div ref={glyphsRef} className="hero-glyphs" />

        <div className="hero-content">
          

          <h1 className="hero-h1">
            <span className="hero-h1-line">
            <span className="hero-h1-inner">Architecting Scalable</span>
            </span>
            <span className="hero-h1-line">
              <span className="hero-h1-inner hero-h1-grad">Software Solutions</span>
            </span>

            <span className="hero-h1-line">
              <span className="hero-h1-inner">Accelerated by AI</span>
            </span>
          </h1>

          <div className="hero-typewriter-wrap">
            <div ref={twRef} className="hero-typewriter">
              <span className="hero-cursor" />
            </div>
          </div>

          <div className="hero-pills">
            {pills.map(({ label, color }) => (
              <span
                key={label}
                className="hero-pill"
                style={{
                  color,
                  borderColor: `${color}55`,
                  background: `${color}12`,
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="hero-btns">
            <a href="#projects" className="hero-btn-primary">
              <span>View My Work</span>
              <span>↗</span>
            </a>
            <a
              href="/me/Abiram_K_Resume_updated.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Resume</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateY(-1px)' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a href="#contact" className="hero-btn-secondary">Let's Talk</a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-item">
              <div ref={s1Ref} className="hero-stat-num">0+</div>
              <div className="hero-stat-label">Projects Built</div>
            </div>
            <div className="hero-stat-item">
              <div ref={s2Ref} className="hero-stat-num">0+</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
            <div className="hero-stat-item">
              <div ref={s3Ref} className="hero-stat-num">0+</div>
              <div className="hero-stat-label">Contributions</div>
            </div>
          </div>
        </div>

        
      </section>
    </>
  );
}