import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "abiramk0107@gmail.com",
    href: "mailto:abiramk0107@gmail.com",
    color: "#7B6EF6",
    accent: "rgba(123,110,246,0.18)",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "+91 6282004572",
    href: "tel:+916282004572",
    color: "#FF8A4C",
    accent: "rgba(255,138,76,0.18)",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Kerala, India",
    href: null,
    color: "#4ECDC4",
    accent: "rgba(78,205,196,0.18)",
  },
];

function InfoCard({ item, index }: { item: typeof contactInfo[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${(x / r.width) * 100}%`);
    el.style.setProperty("--my", `${(y / r.height) * 100}%`);
  };

  const content = (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMove}
      className="ct-info-card"
      style={
        {
          ["--accent" as string]: item.accent,
          ["--color" as string]: item.color,
          animationDelay: `${index * 100}ms`,
        } as React.CSSProperties
      }
    >
      <div className="ct-info-glow" />
      <div className="ct-info-icon">{item.icon}</div>
      <div>
        <p className="ct-info-label">{item.label}</p>
        <p className="ct-info-value">{item.value}</p>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={item.href}
        className="ct-info-link"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      formData.append("access_key", "a052d102-3ab1-4558-b663-076b09530515");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        formRef.current.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="ct-section">
      <style>{`
        .ct-section {
          position: relative;
          padding: 96px 24px;
          background: #060608;
          color: #EAEAF0;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .ct-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(600px 300px at 10% 20%, rgba(123,110,246,0.07), transparent 60%),
            radial-gradient(500px 300px at 90% 80%, rgba(78,205,196,0.05), transparent 60%);
          pointer-events: none;
        }
        .ct-container { max-width: 1100px; margin: 0 auto; position: relative; }
        .ct-head { text-align: center; margin-bottom: 56px; }
        .ct-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #7B6EF6;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ct-eyebrow::before { content: '// '; opacity: 0.7; }
        .ct-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.05;
          margin: 0 0 16px;
        }
        .ct-heading .grad {
          background: linear-gradient(90deg, #7B6EF6, #4ECDC4, #FF8A4C, #7B6EF6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: ctGradFlow 8s linear infinite;
        }
        @keyframes ctGradFlow { to { background-position: 200% center; } }
        .ct-subtitle {
          font-size: 15px;
          color: rgba(234,234,240,0.55);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .ct-grid { grid-template-columns: 1fr; }
        }

        /* Info cards */
        .ct-info-link { text-decoration: none; display: block; }
        .ct-info-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-radius: 16px;
          background: rgba(255,255,255,0.032);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color .35s ease, box-shadow .35s ease, transform .25s ease;
          overflow: hidden;
          opacity: 0;
          animation: ctFadeUp .6s cubic-bezier(.2,.7,.2,1) forwards;
          cursor: pointer;
        }
        .ct-info-card + .ct-info-card { margin-top: 16px; }
        .ct-info-card:hover {
          border-color: color-mix(in srgb, var(--color) 45%, transparent);
          box-shadow: 0 16px 40px -12px var(--accent);
          transform: translateY(-2px);
        }
        .ct-info-glow {
          position: absolute; inset: 0;
          background: radial-gradient(300px circle at var(--mx,50%) var(--my,50%), var(--accent), transparent 55%);
          opacity: 0; transition: opacity .35s ease;
          pointer-events: none;
        }
        .ct-info-card:hover .ct-info-glow { opacity: 1; }
        .ct-info-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent);
          color: var(--color);
          flex-shrink: 0;
          border: 1px solid color-mix(in srgb, var(--color) 25%, transparent);
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .ct-info-card:hover .ct-info-icon { transform: scale(1.1); }
        .ct-info-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(234,234,240,0.45);
          margin: 0 0 4px;
        }
        .ct-info-value {
          font-size: 15px;
          font-weight: 500;
          color: rgba(234,234,240,0.9);
          margin: 0;
        }

        /* Form */
        .ct-form-wrap {
          position: relative;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 36px;
          opacity: 0;
          animation: ctFadeUp .7s .2s cubic-bezier(.2,.7,.2,1) forwards;
        }
        .ct-form-wrap::before {
          content: '';
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(123,110,246,0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .ct-form { position: relative; z-index: 1; }
        .ct-field + .ct-field { margin-top: 20px; }
        .ct-field label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(234,234,240,0.5);
          margin-bottom: 8px;
        }
        .ct-field input,
        .ct-field textarea {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #EAEAF0;
          font-size: 14.5px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color .25s ease, box-shadow .25s ease, background .25s ease;
        }
        .ct-field input::placeholder,
        .ct-field textarea::placeholder {
          color: rgba(234,234,240,0.3);
        }
        .ct-field input:focus,
        .ct-field textarea:focus {
          border-color: color-mix(in srgb, #7B6EF6 50%, transparent);
          box-shadow: 0 0 0 3px rgba(123,110,246,0.1);
          background: rgba(255,255,255,0.055);
        }
        .ct-field textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }
        .ct-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 24px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          border-radius: 12px;
          border: 1px solid rgba(123,110,246,0.45);
          background: rgba(123,110,246,0.12);
          color: #7B6EF6;
          cursor: pointer;
          transition: all .3s ease;
          position: relative;
          overflow: hidden;
        }
        .ct-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(123,110,246,0.2), transparent 60%);
          opacity: 0; transition: opacity .3s ease;
          pointer-events: none;
        }
        .ct-btn:hover {
          background: rgba(123,110,246,0.2);
          border-color: rgba(123,110,246,0.7);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px -10px rgba(123,110,246,0.25);
        }
        .ct-btn:hover::before { opacity: 1; }
        .ct-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .ct-btn svg { transition: transform .3s ease; }
        .ct-btn:hover svg { transform: translateX(2px); }

        @keyframes ctFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 800px) {
          .ct-form-wrap { padding: 24px; }
        }
      `}</style>

      <div className="ct-container">
        <div className="ct-head">
          <p className="ct-eyebrow">Contact</p>
          <h2 className="ct-heading">
            <span className="grad">Get In Touch</span>
          </h2>
          <p className="ct-subtitle">
            Let&apos;s talk about everything! Feel free to reach out for collaborations, opportunities, or just a friendly chat.
          </p>
        </div>

        <div className="ct-grid">
          {/* Left — contact info */}
          <div>
            {contactInfo.map((item, i) => (
              <InfoCard key={i} item={item} index={i} />
            ))}
          </div>

          {/* Right — form */}
          <motion.div
            className="ct-form-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="ct-form">
              <div className="ct-field">
                <label htmlFor="ct-name">Name</label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message"
                  name="message"
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="ct-btn"
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
