import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, MessageCircle, Mail, ArrowRight, ArrowUpRight, Menu, X,
  ChevronDown, MapPin, Clock, Send, GraduationCap, Users, Laptop,
  PartyPopper, CheckCircle2, AlertCircle, Dumbbell, Trophy, Star,
  Zap, Globe, Heart, BookOpen, Target, Play,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const T = {
  // Dunkle Basis
  bg:       "#06060f",
  bg1:      "#0d0d1a",
  bg2:      "#12122a",
  surface:  "rgba(255,255,255,0.04)",
  surfaceHi:"rgba(255,255,255,0.08)",
  border:   "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.16)",

  // Primärfarben
  violet:   "#7c3aed",
  violetLi: "#a78bfa",
  violetDk: "#5b21b6",
  cyan:     "#06b6d4",
  cyanLi:   "#67e8f9",
  pink:     "#ec4899",
  pinkLi:   "#f9a8d4",
  gold:     "#f59e0b",
  goldLi:   "#fcd34d",
  green:    "#10b981",

  // Text
  text:     "#e2e8f0",
  textDim:  "#94a3b8",
  textDimmer:"#64748b",
  white:    "#ffffff",
};

const FF = {
  display: '"Inter", system-ui, sans-serif',
  body:    '"Inter", system-ui, sans-serif',
};

/* ============================================================
   GLOBAL CSS
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${T.bg};
    color: ${T.text};
    font-family: ${FF.body};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  input, select, textarea { font-family: inherit; }
  ::selection { background: ${T.violet}; color: #fff; }
  :focus-visible { outline: 2px solid ${T.violet}; outline-offset: 3px; border-radius: 4px; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { background: ${T.violet}; border-radius: 3px; }

  @keyframes meshMove {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(40px,-30px) scale(1.08); }
    66%  { transform: translate(-30px,20px) scale(0.95); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes meshMove2 {
    0%   { transform: translate(0,0) scale(1) rotate(0deg); }
    50%  { transform: translate(-50px,40px) scale(1.12) rotate(8deg); }
    100% { transform: translate(0,0) scale(1) rotate(0deg); }
  }
  @keyframes meshMove3 {
    0%   { transform: translate(0,0) scale(1); }
    40%  { transform: translate(30px,50px) scale(0.9); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  .glass {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .glass:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.14);
  }

  .card-hover {
    transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 32px 64px -16px rgba(124,58,237,0.25);
    border-color: rgba(124,58,237,0.4) !important;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 12px;
    font-weight: 700; font-size: 15px;
    background: linear-gradient(135deg, ${T.violet}, ${T.cyan});
    color: #fff;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 0 0 0 rgba(124,58,237,0);
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -8px rgba(124,58,237,0.6); }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 12px;
    font-weight: 600; font-size: 15px;
    background: rgba(255,255,255,0.06);
    color: ${T.text};
    border: 1px solid rgba(255,255,255,0.12);
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); transform: translateY(-1px); }

  .gradient-text {
    background: linear-gradient(135deg, ${T.violetLi}, ${T.cyanLi});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-text-gold {
    background: linear-gradient(135deg, ${T.gold}, ${T.pink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .shimmer-text {
    background: linear-gradient(90deg, ${T.violetLi} 0%, ${T.cyanLi} 25%, ${T.white} 50%, ${T.cyanLi} 75%, ${T.violetLi} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .nav-link {
    font-size: 14px; font-weight: 500; color: ${T.textDim};
    transition: color 0.2s; padding: 8px 0; position: relative;
    background: none; border: none; cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { color: ${T.white}; }
  .nav-link.active::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, ${T.violet}, ${T.cyan});
    border-radius: 2px;
  }

  .tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 999px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  }

  .stat-card {
    border-radius: 20px; padding: 28px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.3s ease;
  }
  .stat-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(124,58,237,0.3); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
    .reveal { opacity: 1; transform: none; }
  }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
  }
  @media (min-width: 769px) {
    .hide-desktop { display: none !important; }
  }
`;

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useIsMobile() {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

/* ============================================================
   MESH GRADIENT BACKGROUND
   ============================================================ */
function MeshGradient({ variant = "hero" }) {
  const configs = {
    hero: [
      { color: "124,58,237", size: 700, top: "-10%", left: "-5%", anim: "meshMove 18s ease-in-out infinite", opacity: 0.35 },
      { color: "6,182,212", size: 600, top: "20%", right: "-10%", anim: "meshMove2 22s ease-in-out infinite", opacity: 0.25 },
      { color: "236,72,153", size: 500, bottom: "-5%", left: "30%", anim: "meshMove3 16s ease-in-out infinite", opacity: 0.2 },
      { color: "245,158,11", size: 400, top: "40%", left: "15%", anim: "meshMove 24s ease-in-out infinite reverse", opacity: 0.12 },
    ],
    section: [
      { color: "124,58,237", size: 500, top: "-20%", right: "10%", anim: "meshMove 20s ease-in-out infinite", opacity: 0.2 },
      { color: "6,182,212", size: 400, bottom: "-10%", left: "5%", anim: "meshMove2 18s ease-in-out infinite", opacity: 0.15 },
    ],
  };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {configs[variant].map((b, i) => (
        <div key={i} style={{
          position: "absolute",
          width: b.size, height: b.size,
          top: b.top, left: b.left, right: b.right, bottom: b.bottom,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${b.color},${b.opacity}) 0%, transparent 70%)`,
          filter: "blur(40px)",
          animation: b.anim,
        }} />
      ))}
    </div>
  );
}

/* ============================================================
   LAYOUT
   ============================================================ */
function Container({ children, style }) {
  return (
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, ...style }}>
      {children}
    </div>
  );
}

function Section({ children, style, id }) {
  return (
    <section id={id} style={{ position: "relative", overflow: "hidden", ...style }}>
      {children}
    </section>
  );
}

/* ============================================================
   NAV
   ============================================================ */
const NAV_ITEMS = [
  { key: "home", label: "Start" },
  { key: "learning", label: "Learning" },
  { key: "elearning", label: "eLearning" },
  { key: "sport", label: "Sport & Freizeit" },
  { key: "preise", label: "Preise" },
  { key: "kontakt", label: "Kontakt" },
];

function Nav({ page, setPage, isMobile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (key) => { setPage(key); setOpen(false); window.scrollTo({ top: 0, behavior: "auto" }); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(6,6,15,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    }}>
      <Container>
        <div style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 18, color: "#fff",
            }}>b</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: T.white, letterSpacing: "-0.02em" }}>
              beck<span style={{ color: T.violetLi }}>-</span>up
            </span>
          </button>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {NAV_ITEMS.map(n => (
                <button key={n.key} className={`nav-link${page === n.key ? " active" : ""}`} onClick={() => go(n.key)}>
                  {n.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <button className="btn-primary" onClick={() => go("kontakt")} style={{ padding: "10px 20px", fontSize: 14 }}>
                Kostenlos starten <ArrowRight size={16} />
              </button>
            )}
            {isMobile && (
              <button onClick={() => setOpen(o => !o)} style={{ color: T.white, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={{
          overflow: "hidden",
          maxHeight: open ? 500 : 0,
          transition: "max-height 0.35s ease",
          background: "rgba(6,6,15,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: open ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
          <Container>
            <div style={{ padding: "8px 0 20px" }}>
              {NAV_ITEMS.map(n => (
                <button key={n.key} onClick={() => go(n.key)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  color: page === n.key ? T.violetLi : T.text,
                  fontWeight: 600, fontSize: 16,
                }}>
                  {n.label} <ArrowRight size={18} style={{ color: T.textDimmer }} />
                </button>
              ))}
              <button className="btn-primary" onClick={() => go("kontakt")} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
                Kostenlos starten <ArrowRight size={16} />
              </button>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ setPage, isMobile }) {
  useReveal();
  const statsRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [2003, 500, 3, 20];
  const labels = ["Gegründet", "Schüler+", "Standorte", "Jahre Erfahrung"];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      targets.forEach((target, i) => {
        const start = Date.now();
        const duration = 1800;
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(prev => { const n = [...prev]; n[i] = Math.round(eased * target); return n; });
          if (progress < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), i * 150);
      });
      observer.disconnect();
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 68 }}>
      <MeshGradient variant="hero" />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <Container>
        <div style={{ paddingTop: isMobile ? 60 : 80, paddingBottom: isMobile ? 60 : 100 }}>
          {/* Badge */}
          <div className="reveal" style={{ marginBottom: 28 }}>
            <span className="tag" style={{
              background: "rgba(124,58,237,0.15)", color: T.violetLi,
              border: "1px solid rgba(124,58,237,0.3)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.violet, animation: "pulse 2s ease-in-out infinite" }} />
              Remscheid seit 2003
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal reveal-delay-1" style={{
            fontSize: isMobile ? "clamp(42px,10vw,56px)" : "clamp(64px,6vw,96px)",
            fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em",
            color: T.white, maxWidth: 900,
          }}>
            Bildung,{" "}
            <span className="gradient-text">die bewegt.</span>
            <br />
            <span style={{ color: T.textDim, fontWeight: 300 }}>Sport, der begeistert.</span>
          </h1>

          <p className="reveal reveal-delay-2" style={{
            marginTop: 28, maxWidth: 560,
            fontSize: isMobile ? 17 : 20, lineHeight: 1.65,
            color: T.textDim, fontWeight: 400,
          }}>
            beck-up ist Remscheids persönlichster Bildungs- und Sportanbieter.
            Nachhilfe Klasse 1–13, Online-Learning, Abi-Night, Tennis —
            alles an einem Ort.
          </p>

          <div className="reveal reveal-delay-3" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14 }}>
            <button className="btn-primary" onClick={() => setPage("learning")} style={{ fontSize: isMobile ? 15 : 16, padding: "15px 30px" }}>
              Zum Nachhilfe-Angebot <ArrowRight size={18} />
            </button>
            <button className="btn-ghost" onClick={() => setPage("kontakt")} style={{ fontSize: isMobile ? 15 : 16 }}>
              Kostenlose Probestunde
            </button>
          </div>

          {/* Floating cards */}
          {!isMobile && (
            <div className="reveal reveal-delay-4" style={{ marginTop: 64, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { icon: "⭐", text: "Super Nachhilfe! Abi-Night war top.", name: "Amelie", role: "Abiturientin" },
                { icon: "🏆", text: "Meine Note von 4 auf 2 — in 3 Monaten.", name: "Luis", role: "Klasse 10" },
                { icon: "💬", text: "Endlich jemand der meinem Kind zuhört.", name: "Familie D.", role: "Eltern" },
              ].map((r, i) => (
                <div key={i} className="glass card-hover" style={{
                  borderRadius: 16, padding: "18px 20px", maxWidth: 240,
                  animation: `float ${5 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{r.icon}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: T.textDim, fontStyle: "italic" }}>„{r.text}"</p>
                  <div style={{ marginTop: 10, fontWeight: 700, fontSize: 13, color: T.white }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: T.textDimmer }}>{r.role}</div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div ref={statsRef} className="reveal" style={{
            marginTop: isMobile ? 48 : 72,
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 2,
          }}>
            {targets.map((_, i) => (
              <div key={i} className="stat-card" style={{ borderRadius: i === 0 ? "20px 4px 4px 20px" : i === 3 ? "4px 20px 20px 4px" : "4px", textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? 32 : 40, fontWeight: 900, letterSpacing: "-0.03em" }}>
                  <span className="gradient-text">{counts[i].toLocaleString("de")}</span>
                </div>
                <div style={{ fontSize: 13, color: T.textDim, marginTop: 4, fontWeight: 500 }}>{labels[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   BEREICH-KARTE (Learning / eLearning / Sport)
   ============================================================ */
function BereichCard({ icon: Icon, title, sub, color, colorDk, items, cta, onClick, isMobile, delay = "" }) {
  return (
    <div className={`glass card-hover reveal ${delay}`} style={{
      borderRadius: 24, overflow: "hidden", cursor: "pointer",
      border: `1px solid rgba(255,255,255,0.08)`,
    }} onClick={onClick}>
      {/* Top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${colorDk})` }} />
      <div style={{ padding: isMobile ? 28 : 36 }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: `rgba(${hexToRgb(color)},0.15)`,
          border: `1px solid rgba(${hexToRgb(color)},0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center", color,
          marginBottom: 22,
        }}>
          <Icon size={28} />
        </div>
        <h3 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, color: T.white, letterSpacing: "-0.02em" }}>{title}</h3>
        <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.65, color: T.textDim }}>{sub}</p>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: T.textDim }}>{item}</span>
            </div>
          ))}
        </div>
        <button onClick={onClick} style={{
          marginTop: 28, display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, fontWeight: 700, color,
          background: "none", border: "none", cursor: "pointer",
          transition: "gap 0.2s ease",
        }}
          onMouseEnter={e => e.currentTarget.style.gap = "12px"}
          onMouseLeave={e => e.currentTarget.style.gap = "6px"}
        >
          {cta} <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ============================================================
   HOME — BEREICHE SECTION
   ============================================================ */
function BereicheSection({ setPage, isMobile }) {
  useReveal();
  return (
    <Section style={{ padding: isMobile ? "80px 0" : "120px 0", background: T.bg1 }}>
      <MeshGradient variant="section" />
      <Container>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span className="tag" style={{ background: "rgba(6,182,212,0.12)", color: T.cyanLi, border: "1px solid rgba(6,182,212,0.25)", marginBottom: 20, display: "inline-flex" }}>
            Alles unter einem Dach
          </span>
          <h2 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 900, letterSpacing: "-0.03em", color: T.white, lineHeight: 1.08 }}>
            Drei Bereiche.<br />
            <span className="gradient-text">Eine Adresse.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.65, color: T.textDim }}>
            beck-up ist mehr als Nachhilfe. Hier kannst du lernen, online studieren und Sport treiben — alles in Remscheid.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          <BereichCard
            icon={BookOpen} color={T.violet} colorDk={T.cyan}
            title="Learning" sub="Persönliche Nachhilfe von Klasse 1 bis 13. Einzel, Gruppe oder Abi-Night — du entscheidest."
            items={["Einzelunterricht", "Gruppenunterricht", "Abi-Vorbereitung", "Alle Fächer"]}
            cta="Mehr erfahren" onClick={() => setPage("learning")}
            isMobile={isMobile} delay="reveal-delay-1"
          />
          <BereichCard
            icon={Globe} color={T.cyan} colorDk="#0891b2"
            title="eLearning" sub="Dieselbe Qualität, ohne Anfahrt. Online-Unterricht der wirklich funktioniert — seit 2020."
            items={["Video-Unterricht", "Digitale Tafel", "Flexible Zeiten", "Alle Fächer"]}
            cta="Mehr erfahren" onClick={() => setPage("elearning")}
            isMobile={isMobile} delay="reveal-delay-2"
          />
          <BereichCard
            icon={Dumbbell} color={T.gold} colorDk="#d97706"
            title="Sport & Freizeit" sub="Tennis, Training, Bewegung. Unsere Coaches bringen dich auf das nächste Level."
            items={["Tennistraining", "Verbandslizenzen", "Für alle Altersgruppen", "Mehrere Standorte"]}
            cta="Mehr erfahren" onClick={() => setPage("sport")}
            isMobile={isMobile} delay="reveal-delay-3"
          />
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   HOME — ABOUT ANDREAS BECK
   ============================================================ */
function AboutSection({ isMobile }) {
  useReveal();
  return (
    <Section style={{ padding: isMobile ? "80px 0" : "120px 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "center" }}>
          <div className="reveal">
            <span className="tag" style={{ background: "rgba(245,158,11,0.12)", color: T.goldLi, border: "1px solid rgba(245,158,11,0.25)", marginBottom: 24, display: "inline-flex" }}>
              Über uns
            </span>
            <h2 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 900, letterSpacing: "-0.03em", color: T.white, lineHeight: 1.1 }}>
              Andreas Beck.<br />
              <span className="gradient-text-gold">Made in Remscheid.</span>
            </h2>
            <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.8, color: T.textDim }}>
              beck-up ist kein anonymes Franchise. Hinter allem steht Andreas Beck — seit 2003 in Remscheid, mit echtem Interesse an Menschen und echter Leidenschaft für Bildung.
            </p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.8, color: T.textDim }}>
              Stimmt die Atmosphäre, entwickeln Menschen Freude an dem was sie tun. Das ist unser Prinzip — in jedem Unterrichtsraum, auf jedem Tennisplatz.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {["Seit 2003", "Made in Remscheid", "Persönlich", "3 Standorte"].map(t => (
                <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: T.textDim, border: "1px solid rgba(255,255,255,0.08)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal reveal-delay-2">
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.6), rgba(6,182,212,0.6), transparent)" }} />
              {[
                { year: "2003", text: "Gründung: Bildung und Tennis in Remscheid", color: T.violet },
                { year: "2011", text: "Start beck-up eLearning — digitale Zukunft", color: T.cyan },
                { year: "2017", text: "Zweiter Standort Alleestraße", color: T.violet },
                { year: "2018", text: "Dritter Standort Remscheid-Lennep", color: T.cyan },
                { year: "2020", text: "Online-Teaching geht live", color: T.pink },
                { year: "2025", text: "Ausbildungsbetrieb + Standort Alleestr. 116", color: T.gold },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 20, marginBottom: 28, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -32, top: 4,
                    width: 16, height: 16, borderRadius: "50%",
                    background: e.color, boxShadow: `0 0 12px ${e.color}`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: e.color, letterSpacing: "1px", marginBottom: 4 }}>{e.year}</div>
                    <div style={{ fontSize: 14, color: T.textDim, lineHeight: 1.5 }}>{e.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   HOME — STIMMEN
   ============================================================ */
const REVIEWS = [
  { text: "Super gute Nachhilfe sowohl live als auch online! Vor allem die Abiturvorbereitung kann ich nur empfehlen. Danke Andy!", name: "Amelie", role: "Google-Rezension", stars: 5 },
  { text: "Die Aufgaben nochmals durchzugehen, war sehr gut für das Verständnis. Sehr gute Stunde.", name: "Luis", role: "Gruppennachhilfe online", stars: 5 },
  { text: "Ausführlich, nicht zu schnell und gut strukturiert.", name: "Daniel", role: "Einzel-Teaching online", stars: 5 },
  { text: "Gute Alternative in dieser Zeit! Hat mir sehr geholfen, danke 🙂", name: "Pia", role: "Einzel-Teaching online", stars: 5 },
  { text: "Es war sehr gut und hilfreich! Ich hoffe wir können es mehrmals wiederholen.", name: "Mohamad Yaman", role: "Abi-Night", stars: 5 },
];

function StimmenSection({ isMobile }) {
  useReveal();
  return (
    <Section style={{ padding: isMobile ? "80px 0" : "120px 0", background: T.bg1, overflow: "hidden" }}>
      <MeshGradient variant="section" />
      <Container>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="tag" style={{ background: "rgba(236,72,153,0.12)", color: T.pinkLi, border: "1px solid rgba(236,72,153,0.25)", marginBottom: 20, display: "inline-flex" }}>
            Echte Stimmen
          </span>
          <h2 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 900, letterSpacing: "-0.03em", color: T.white }}>
            Was unsere<br /><span className="gradient-text">Community sagt.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {REVIEWS.slice(0, isMobile ? 3 : 5).map((r, i) => (
            <div key={i} className={`glass card-hover reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{ borderRadius: 20, padding: 28, gridColumn: !isMobile && i === 3 ? "1 / 2" : !isMobile && i === 4 ? "2 / 3" : undefined }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {Array(r.stars).fill(0).map((_, s) => <Star key={s} size={15} fill={T.gold} color={T.gold} />)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: T.text, fontStyle: "italic" }}>„{r.text}"</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 15, color: "#fff", flexShrink: 0,
                }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.white }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: T.textDimmer }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   HOME — CTA
   ============================================================ */
function CtaSection({ setPage, isMobile }) {
  useReveal();
  return (
    <Section style={{ padding: isMobile ? "80px 0" : "120px 0" }}>
      <MeshGradient variant="hero" />
      <Container>
        <div className="reveal" style={{
          textAlign: "center", maxWidth: 700, margin: "0 auto",
          padding: isMobile ? "48px 28px" : "72px 48px",
          borderRadius: 32,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "float 4s ease-in-out infinite",
          }}>
            <Zap size={34} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? 34 : 52, fontWeight: 900, letterSpacing: "-0.03em", color: T.white, lineHeight: 1.1 }}>
            Bereit loszulegen?<br />
            <span className="shimmer-text">Die erste Stunde ist gratis.</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: T.textDim, maxWidth: 480, margin: "20px auto 0" }}>
            Kein Vertrag, kein Risiko. Lern die Lehrkraft kennen — und dann entscheide in Ruhe.
          </p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <button className="btn-primary" onClick={() => setPage("kontakt")} style={{ fontSize: isMobile ? 15 : 16, padding: "16px 32px" }}>
              Probestunde buchen <ArrowRight size={18} />
            </button>
            <a href="tel:+49219171683" className="btn-ghost" style={{ fontSize: isMobile ? 15 : 16 }}>
              <Phone size={18} /> +49 2191 71683
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   HOME
   ============================================================ */
function Home({ setPage, isMobile }) {
  return (
    <main>
      <Hero setPage={setPage} isMobile={isMobile} />
      <BereicheSection setPage={setPage} isMobile={isMobile} />
      <AboutSection isMobile={isMobile} />
      <StimmenSection isMobile={isMobile} />
      <CtaSection setPage={setPage} isMobile={isMobile} />
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   PAGE HEADER (für Unterseiten)
   ============================================================ */
function PageHeader({ tag, tagColor, title, titleAccent, sub, isMobile }) {
  useReveal();
  return (
    <Section style={{ paddingTop: isMobile ? 120 : 160, paddingBottom: isMobile ? 60 : 80 }}>
      <MeshGradient variant="hero" />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <Container>
        <span className={`reveal tag`} style={{ background: tagColor.bg, color: tagColor.text, border: `1px solid ${tagColor.border}`, marginBottom: 24, display: "inline-flex" }}>
          {tag}
        </span>
        <h1 className="reveal reveal-delay-1" style={{ fontSize: isMobile ? "clamp(40px,9vw,56px)" : "clamp(56px,5.5vw,80px)", fontWeight: 900, letterSpacing: "-0.03em", color: T.white, lineHeight: 1.05, maxWidth: 800 }}>
          {title}<br /><span className="gradient-text">{titleAccent}</span>
        </h1>
        {sub && <p className="reveal reveal-delay-2" style={{ marginTop: 22, maxWidth: 560, fontSize: isMobile ? 16 : 19, lineHeight: 1.65, color: T.textDim }}>{sub}</p>}
      </Container>
    </Section>
  );
}

/* ============================================================
   LEARNING PAGE
   ============================================================ */
const ANGEBOTE_LEARNING = [
  { icon: GraduationCap, color: T.violet, title: "Einzelunterricht", text: "Eine Lehrkraft, ein Kind. Der Stoff richtet sich nach deinem Tempo — nicht nach dem Lehrplan.", bullets: ["Volle Aufmerksamkeit", "Eigenes Tempo", "Ideal bei Lücken"] },
  { icon: Users, color: T.cyan, title: "Gruppenunterricht", text: "Kleine Gruppen auf gleichem Niveau. Günstiger, entspannter, oft genauso effektiv.", bullets: ["Maximal kleine Gruppen", "Voneinander lernen", "Günstiger als Einzel"] },
  { icon: Target, color: T.pink, title: "Abi-Vorbereitung", text: "Gezielt auf die Prüfungen. Alte Klausuren, Lücken schließen, Sicherheit gewinnen.", bullets: ["Alte Prüfungen durchgehen", "Gezielte Lückenfüllung", "Weniger Nervosität"] },
  { icon: PartyPopper, color: T.gold, title: "Abi-Night", text: "Die Nacht vor der Prüfung gemeinsam durch. Unser Klassiker — anstrengend, aber es wirkt.", bullets: ["Intensiv in der Gruppe", "Letzte Fragen klären", "Snacks inklusive"] },
];

const FAECHER = ["Mathematik","Deutsch","Englisch","Französisch","Latein","Spanisch","Physik","Chemie","Biologie","Informatik","Geschichte","Erdkunde","Politik/SoWi","Wirtschaft","Rechnungswesen","BWL/VWL"];

function LearningPage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile}
        tag="beck-up Learning" tagColor={{ bg: "rgba(124,58,237,0.12)", text: T.violetLi, border: "rgba(124,58,237,0.3)" }}
        title="Nachhilfe die" titleAccent="wirklich wirkt."
        sub="Klasse 1 bis 13, alle Fächer, drei Standorte in Remscheid. Persönlich seit 2003." />

      <Section style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
            {ANGEBOTE_LEARNING.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`glass card-hover reveal reveal-delay-${i % 3 + 1}`} style={{ borderRadius: 24, overflow: "hidden" }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${a.color}, transparent)` }} />
                  <div style={{ padding: isMobile ? 28 : 36 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `rgba(${hexToRgb(a.color)},0.15)`, border: `1px solid rgba(${hexToRgb(a.color)},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color, marginBottom: 20 }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: T.white }}>{a.title}</h3>
                    <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.65, color: T.textDim }}>{a.text}</p>
                    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                      {a.bullets.map((b, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <CheckCircle2 size={16} color={a.color} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: T.textDim }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fächer */}
          <div className="reveal" style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: isMobile ? 32 : 42, fontWeight: 900, letterSpacing: "-0.02em", color: T.white, marginBottom: 32 }}>
              Alle <span className="gradient-text">Fächer</span>
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {FAECHER.map(f => (
                <span key={f} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: T.textDim, border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, letterSpacing: "0.5px", textTransform: "none", padding: "8px 16px" }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Preise + CTA */}
          <div className="reveal" style={{ marginTop: 80, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            <div className="glass" style={{ borderRadius: 24, padding: isMobile ? 28 : 36 }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: T.white }}>Preise</h3>
              <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: T.textDim }}>
                Was Nachhilfe kostet, hängt von Einzel- oder Gruppenunterricht und Häufigkeit ab. Wir sagen dir ehrlich, was für dein Kind Sinn macht — und was nicht.<br /><br />
                Falls ein <strong style={{ color: T.goldLi }}>BuT-Anspruch</strong> besteht, kann der Unterricht komplett kostenlos sein.
              </p>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 24, padding: isMobile ? 28 : 36, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: isMobile ? "flex-start" : "center", textAlign: isMobile ? "left" : "center" }}>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: T.white }}>Erste Stunde gratis.</h3>
              <p style={{ marginTop: 12, fontSize: 15, color: T.textDim, maxWidth: 320 }}>Lern die Lehrkraft kennen — ohne Risiko, ohne Vertrag.</p>
              <button className="btn-primary" onClick={() => setPage("kontakt")} style={{ marginTop: 24 }}>
                Probestunde buchen <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   ELEARNING PAGE
   ============================================================ */
function ELearningPage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile}
        tag="beck-up eLearning" tagColor={{ bg: "rgba(6,182,212,0.12)", text: T.cyanLi, border: "rgba(6,182,212,0.3)" }}
        title="Online lernen." titleAccent="Kein Kompromiss."
        sub="Seit 2020 erprobt. Dieselben Lehrkräfte, dieselbe Qualität — von zuhause." />

      <Section style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 60 }}>
            {[
              { icon: Laptop, color: T.cyan, title: "Video-Unterricht", text: "Live mit deiner Lehrkraft — klar, interaktiv, ohne Rauschen." },
              { icon: Globe, color: T.violet, title: "Digitale Tafel", text: "Aufgaben, Erklärungen und Notizen — gemeinsam sichtbar auf einem Screen." },
              { icon: Clock, color: T.pink, title: "Flexible Zeiten", text: "Morgens, abends, am Wochenende. Du bestimmst wann." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`glass card-hover reveal reveal-delay-${i + 1}`} style={{ borderRadius: 20, padding: 28 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: `rgba(${hexToRgb(f.color)},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: 18 }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: T.white }}>{f.title}</h3>
                  <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, color: T.textDim }}>{f.text}</p>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 900, letterSpacing: "-0.02em", color: T.white, lineHeight: 1.1 }}>
                Online ist kein<br /><span className="gradient-text">Notbehelf.</span>
              </h2>
              <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: T.textDim }}>
                Wir haben 2020 nicht improvisiert — wir haben investiert. Seitdem ist Online-Teaching bei uns genauso gut wie Präsenz. Viele Schüler bevorzugen es sogar, weil die Anfahrt wegfällt und die Konzentration besser ist.
              </p>
              <button className="btn-primary" onClick={() => setPage("kontakt")} style={{ marginTop: 28 }}>
                Online-Probestunde buchen <ArrowRight size={16} />
              </button>
            </div>
            <div className="glass reveal reveal-delay-2" style={{ borderRadius: 24, padding: isMobile ? 28 : 36 }}>
              {["Alle Fächer auch online", "Kein Extra-Equipment nötig", "Aufzeichnung möglich", "Dieselben Lehrkräfte wie vor Ort", "Für alle Klassen"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <CheckCircle2 size={18} color={T.cyan} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: T.text }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SPORT PAGE
   ============================================================ */
function SportPage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile}
        tag="Sport & Freizeit" tagColor={{ bg: "rgba(245,158,11,0.12)", text: T.goldLi, border: "rgba(245,158,11,0.3)" }}
        title="Bewegen." titleAccent="Gewinnen. Wachsen."
        sub="Tennis und Training in Remscheid. Für Einsteiger und Fortgeschrittene." />

      <Section style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 80 }}>
            <div className="reveal">
              <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 900, letterSpacing: "-0.02em", color: T.white, lineHeight: 1.1 }}>
                Tennis mit<br /><span className="gradient-text-gold">Verbandslizenz.</span>
              </h2>
              <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: T.textDim }}>
                Unsere Coaches haben Verbandslizenzen und bringen dich technisch wirklich weiter — nicht nur Rally schlagen. Wir trainieren am Hastener Turnverein und beim INJOY Remscheid.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                {["Tennistraining für alle Altersgruppen", "Lizenzierte Trainer", "Einzel- und Gruppentraining", "Hastener TV + INJOY Remscheid"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <Trophy size={17} color={T.gold} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: T.textDim }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setPage("kontakt")} style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.gold}, ${T.pink})` }}>
                Kontakt aufnehmen <ArrowRight size={16} />
              </button>
            </div>
            <div className="reveal reveal-delay-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: Dumbbell, title: "Technik", text: "Von Grundschlag bis Turnierniveau" },
                { icon: Users, title: "Gruppe", text: "Miteinander trainieren, voneinander lernen" },
                { icon: Trophy, title: "Wettkampf", text: "Vorbereitung auf Turniere und Matches" },
                { icon: Heart, title: "Fitness", text: "Sport der Spaß macht und fit hält" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="glass" style={{ borderRadius: 18, padding: 22, textAlign: "center" }}>
                    <Icon size={28} color={T.gold} style={{ marginBottom: 12 }} />
                    <div style={{ fontWeight: 700, fontSize: 15, color: T.white }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: T.textDim, marginTop: 6, lineHeight: 1.5 }}>{c.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   PREISE PAGE
   ============================================================ */
function PreisePage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile}
        tag="Preise" tagColor={{ bg: "rgba(16,185,129,0.12)", text: "#6ee7b7", border: "rgba(16,185,129,0.3)" }}
        title="Transparent." titleAccent="Auf Anfrage."
        sub="Was Nachhilfe kostet, hängt von deiner Situation ab. Wir sagen dir's ehrlich." />

      <Section style={{ padding: isMobile ? "60px 0" : "100px 0" }}>
        <Container style={{ maxWidth: 800 }}>
          <div className="reveal glass" style={{ borderRadius: 28, padding: isMobile ? 32 : 48, marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: T.white }}>Warum kein Festpreis auf der Website?</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.8, color: T.textDim }}>
              Weil Einzel- und Gruppenunterricht unterschiedlich kosten. Weil Klasse 1 und Klasse 13 verschiedene Anforderungen haben. Und weil wir dir keinen Preis nennen wollen, der dann doch nicht stimmt.
            </p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.8, color: T.textDim }}>
              Ruf an oder schreib uns — wir sagen dir in 2 Minuten was auf dich zukommt. Ohne Kleingedrucktes.
            </p>
          </div>

          <div className="reveal reveal-delay-1" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(236,72,153,0.1))", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 28, padding: isMobile ? 32 : 48, marginBottom: 32 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: T.goldLi }}>BuT — Bildungs- und Teilhabepaket</h2>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.8, color: T.textDim }}>
              Falls du Bürgergeld, Wohngeld, Kinderzuschlag oder ähnliche Leistungen beziehst, kann der Staat die Nachhilfe komplett übernehmen. Viele Familien wissen das nicht. Wir helfen beim Antrag.
            </p>
            <button className="btn-ghost" onClick={() => setPage("kontakt")} style={{ marginTop: 24 }}>
              BuT-Beratung anfragen <ArrowRight size={16} />
            </button>
          </div>

          <div className="reveal reveal-delay-2" style={{ textAlign: "center", padding: "40px 0" }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: T.white }}>Erste Stunde: kostenlos.</h3>
            <p style={{ marginTop: 12, fontSize: 16, color: T.textDim }}>Immer. Für alle Angebote.</p>
            <button className="btn-primary" onClick={() => setPage("kontakt")} style={{ marginTop: 24 }}>
              Jetzt anfragen <ArrowRight size={16} />
            </button>
          </div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
const inputSt = {
  width: "100%", padding: "13px 16px", borderRadius: 12,
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  color: T.white, fontSize: 15, outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

function ContactForm() {
  const empty = { parent: "", student: "", klasse: "", fach: "", phone: "", email: "", message: "", source: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (status === "sending") return;
    if (!form.parent || !form.email || !form.message) { setStatus("validation"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "DEIN_WEB3FORMS_KEY", from_name: "beck-up Website", subject: "Neue Anfrage", ...form }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setForm(empty); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <CheckCircle2 size={48} color={T.green} style={{ margin: "0 auto 20px" }} />
      <h3 style={{ fontSize: 24, fontWeight: 800, color: T.white }}>Danke — wir melden uns!</h3>
      <p style={{ marginTop: 10, color: T.textDim }}>Meistens noch am selben Tag.</p>
      <button className="btn-ghost" onClick={() => setStatus("idle")} style={{ marginTop: 24 }}>Noch eine Anfrage</button>
    </div>
  );

  const FAECHER_OPT = ["Mathematik","Deutsch","Englisch","Französisch","Latein","Physik","Chemie","Biologie","Informatik","Geschichte","Sonstiges"];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[["parent","Name (Erziehungsberechtigte/r) *","Vor- und Nachname","text"],["student","Name des Kindes","optional","text"],
          ["phone","Telefon","Für den Rückruf","tel"],["email","E-Mail *","name@beispiel.de","email"]].map(([k,l,p,t]) => (
          <div key={k}>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>{l}</label>
            <input type={t} style={inputSt} value={form[k]} onChange={set(k)} placeholder={p}
              onFocus={e => e.target.style.borderColor = T.violet}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>Klasse</label>
          <select style={{ ...inputSt, cursor: "pointer" }} value={form.klasse} onChange={set("klasse")}>
            <option value="">Bitte wählen</option>
            {Array.from({ length: 13 }, (_, i) => <option key={i + 1} value={`${i + 1}`}>{i + 1}. Klasse</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>Fach</label>
          <select style={{ ...inputSt, cursor: "pointer" }} value={form.fach} onChange={set("fach")}>
            <option value="">Bitte wählen</option>
            {FAECHER_OPT.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: "0.5px", display: "block", marginBottom: 7 }}>Dein Anliegen *</label>
        <textarea style={{ ...inputSt, minHeight: 120, resize: "vertical" }} value={form.message} onChange={set("message")} placeholder="Was kann beck-up für euch tun?"
          onFocus={e => e.target.style.borderColor = T.violet}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
      </div>
      {status === "validation" && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, padding: "12px 16px", borderRadius: 10, background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)" }}>
          <AlertCircle size={18} color={T.pink} /> <span style={{ fontSize: 14, color: T.pinkLi }}>Bitte Name, E-Mail und Anliegen ausfüllen.</span>
        </div>
      )}
      <button className="btn-primary" onClick={submit} style={{ marginTop: 18, opacity: status === "sending" ? 0.7 : 1, minWidth: 200, justifyContent: "center" }}>
        {status === "sending" ? "Wird gesendet…" : <><Send size={16} /> Anfrage senden</>}
      </button>
      <p style={{ marginTop: 12, fontSize: 12, color: T.textDimmer }}>Unverbindlich. Wir melden uns persönlich.</p>
    </div>
  );
}

/* ============================================================
   KONTAKT PAGE
   ============================================================ */
function KontaktPage({ setPage, isMobile }) {
  useReveal();
  const STANDORTE = [
    { tag: "Hauptstandort", street: "Alleestr. 116", city: "42853 Remscheid" },
    { tag: "Zweiter Standort", street: "Alleestr. 29", city: "Remscheid" },
    { tag: "Remscheid-Lennep", street: "Bahnhofstr. 3", city: "42897 Remscheid" },
  ];
  return (
    <main>
      <PageHeader isMobile={isMobile}
        tag="Kontakt" tagColor={{ bg: "rgba(124,58,237,0.12)", text: T.violetLi, border: "rgba(124,58,237,0.3)" }}
        title="Lass uns" titleAccent="reden."
        sub="Ruf an, schreib oder komm vorbei. Erste Stunde gratis." />

      <Section style={{ padding: isMobile ? "60px 0 100px" : "80px 0 120px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 40 : 60, alignItems: "start" }}>
            <div>
              <h3 className="reveal" style={{ fontSize: 22, fontWeight: 800, color: T.white, marginBottom: 24 }}>Direkt erreichbar</h3>
              {[
                { icon: Phone, label: "Telefon", value: "+49 2191 71683", href: "tel:+49219171683" },
                { icon: MessageCircle, label: "WhatsApp", value: "+49 177 424 6555", href: "https://wa.me/491774246555" },
                { icon: Mail, label: "E-Mail", value: "info@beck-up.com", href: "mailto:info@beck-up.com" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 20px", borderRadius: 16, marginBottom: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: T.violetLi, flexShrink: 0 }}>
                      <Icon size={21} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: T.textDimmer }}>{c.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: T.white, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </a>
                );
              })}

              <h3 className="reveal" style={{ fontSize: 20, fontWeight: 800, color: T.white, margin: "36px 0 16px" }}>Standorte</h3>
              {STANDORTE.map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", borderRadius: 14, marginBottom: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <MapPin size={18} color={T.violetLi} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: T.textDimmer }}>{s.tag}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 3 }}>{s.street}, {s.city}</div>
                  </div>
                </div>
              ))}

              <div className="reveal" style={{ marginTop: 28, padding: "16px 20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.textDim, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <Clock size={15} /> Öffnungszeiten
                </div>
                {[["Mo – Fr", "09:00 – 19:00 Uhr"], ["Samstag", "10:00 – 14:00 Uhr"], ["Sonntag", "geschlossen"]].map(([d, h]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", color: T.textDim }}>
                    <span>{d}</span><span style={{ fontWeight: 600, color: h === "geschlossen" ? T.textDimmer : T.text }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2 glass" style={{ borderRadius: 28, padding: isMobile ? 28 : 44 }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: T.white, marginBottom: 8 }}>Schreib uns</h3>
              <p style={{ fontSize: 15, color: T.textDim, marginBottom: 28 }}>Füll aus was du weißt — den Rest klären wir im Gespräch.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ setPage, isMobile }) {
  const go = key => { setPage(key); window.scrollTo({ top: 0, behavior: "auto" }); };
  return (
    <footer style={{ background: T.bg1, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: isMobile ? 56 : 80, paddingBottom: isMobile ? 100 : 56 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? 36 : 48 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, color: "#fff" }}>b</div>
              <span style={{ fontWeight: 800, fontSize: 19, color: T.white }}>beck<span style={{ color: T.violetLi }}>-</span>up</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: T.textDimmer, maxWidth: 260 }}>Bildung, Sport und mehr in Remscheid. Persönlich seit 2003.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[[Phone, "tel:+49219171683", undefined],[MessageCircle, "https://wa.me/491774246555", "_blank"],[Mail, "mailto:info@beck-up.com", undefined]].map(([Icon, href, target], i) => (
                <a key={i} href={href} target={target} rel={target ? "noopener noreferrer" : undefined} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: T.textDim, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.2)"; e.currentTarget.style.color = T.violetLi; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = T.textDim; }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Angebote", links: [["learning","Learning"],["elearning","eLearning"],["sport","Sport & Freizeit"],["preise","Preise"]] },
            { title: "Unternehmen", links: [["kontakt","Kontakt"],["kontakt","Jobs"],["home","Über uns"]] },
            { title: "Rechtliches", links: [["impressum","Impressum"],["datenschutz","Datenschutz"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: T.textDimmer, marginBottom: 16 }}>{col.title}</div>
              {col.links.map(([key, label]) => (
                <button key={label} onClick={() => go(key)} style={{ display: "block", fontSize: 14, color: T.textDim, marginBottom: 10, fontWeight: 500, transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = T.white}
                  onMouseLeave={e => e.currentTarget.style.color = T.textDim}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: T.textDimmer }}>© {new Date().getFullYear()} beck-up · Remscheid</span>
          <span style={{ fontSize: 13, color: T.textDimmer }}>Live, online und mit der richtigen Atmosphäre.</span>
        </div>
      </Container>
    </footer>
  );
}

/* ============================================================
   MOBILE BOTTOM BAR
   ============================================================ */
function MobileBar({ setPage }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, height: "calc(60px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)", background: "rgba(6,6,15,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      <a href="tel:+49219171683" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: T.textDim, minWidth: 64 }}>
        <Phone size={21} /><span style={{ fontSize: 10, fontWeight: 700 }}>Anrufen</span>
      </a>
      <a href="https://wa.me/491774246555" target="_blank" rel="noopener noreferrer"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 52, height: 52, marginTop: -10, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff", justifyContent: "center", boxShadow: "0 8px 24px -4px rgba(124,58,237,0.6)" }}>
        <MessageCircle size={22} /><span style={{ fontSize: 9, fontWeight: 800 }}>WhatsApp</span>
      </a>
      <button onClick={() => setPage("kontakt")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: T.textDim, minWidth: 64 }}>
        <Mail size={21} /><span style={{ fontSize: 10, fontWeight: 700 }}>Schreiben</span>
      </button>
    </div>
  );
}

/* ============================================================
   IMPRESSUM & DATENSCHUTZ (Minimal)
   ============================================================ */
function LegalPage({ title, children, setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <Section style={{ paddingTop: 120, paddingBottom: 40 }}>
        <Container style={{ maxWidth: 760 }}>
          <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 900, letterSpacing: "-0.03em", color: T.white }}>{title}</h1>
        </Container>
      </Section>
      <Section style={{ paddingBottom: 100 }}>
        <Container style={{ maxWidth: 760 }}>
          <div style={{ color: T.textDim, fontSize: 15, lineHeight: 1.85 }}>{children}</div>
        </Container>
      </Section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

const lH = { fontSize: 20, fontWeight: 800, color: T.white, margin: "32px 0 10px 0" };

function ImpressumPage({ setPage, isMobile }) {
  return (
    <LegalPage title="Impressum" setPage={setPage} isMobile={isMobile}>
      <h2 style={lH}>Angaben gemäß § 5 DDG</h2>
      <p><span style={{ background: "rgba(236,72,153,0.2)", color: T.pinkLi, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>[Inhaber:in / Firmenname einsetzen]</span><br />beck-up<br />Alleestraße 116<br /><span style={{ background: "rgba(236,72,153,0.2)", color: T.pinkLi, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>[PLZ]</span> Remscheid</p>
      <h2 style={lH}>Kontakt</h2>
      <p>Tel: +49 2191 71683<br />E-Mail: info@beck-up.com</p>
      <h2 style={lH}>Verantwortlich nach § 18 Abs. 2 MStV</h2>
      <p><span style={{ background: "rgba(236,72,153,0.2)", color: T.pinkLi, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>[Vor- und Nachname, Anschrift]</span></p>
      <h2 style={lH}>Streitschlichtung</h2>
      <p>Die EU-Kommission stellt eine Plattform zur OS bereit: <a href="https://ec.europa.eu/consumers/odr/" style={{ color: T.violetLi }}>ec.europa.eu/consumers/odr</a>. Wir nehmen nicht an Streitbeilegungsverfahren teil.</p>
    </LegalPage>
  );
}

function DatenschutzPage({ setPage, isMobile }) {
  return (
    <LegalPage title="Datenschutz" setPage={setPage} isMobile={isMobile}>
      <h2 style={lH}>1. Verantwortlicher</h2>
      <p><span style={{ background: "rgba(236,72,153,0.2)", color: T.pinkLi, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>[Name]</span>, beck-up, Alleestraße 116, <span style={{ background: "rgba(236,72,153,0.2)", color: T.pinkLi, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>[PLZ]</span> Remscheid · info@beck-up.com</p>
      <h2 style={lH}>2. Hosting</h2>
      <p>Diese Website wird bei Vercel Inc. gehostet. Dabei werden technische Daten (u. a. IP-Adresse) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
      <h2 style={lH}>3. Kontaktformular</h2>
      <p>Formulardaten werden über Web3Forms (Hoodox Innovations) übermittelt und an unsere E-Mail weitergeleitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO. Datenschutz Web3Forms: <a href="https://web3forms.com/privacy" style={{ color: T.violetLi }}>web3forms.com/privacy</a></p>
      <h2 style={lH}>4. Schriftarten</h2>
      <p>Diese Seite lädt Schriftarten von Google Fonts. Dabei wird deine IP-Adresse an Google übertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
      <h2 style={lH}>5. Cookies & Tracking</h2>
      <p>Keine Cookies, kein Tracking, kein Profiling.</p>
      <h2 style={lH}>6. Deine Rechte</h2>
      <p>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Übertragbarkeit (Art. 20), Widerspruch (Art. 21 DSGVO). Beschwerden: LDI NRW.</p>
    </LegalPage>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [page]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav page={page} setPage={setPage} isMobile={isMobile} />

      {page === "home"        && <Home setPage={setPage} isMobile={isMobile} />}
      {page === "learning"    && <LearningPage setPage={setPage} isMobile={isMobile} />}
      {page === "elearning"   && <ELearningPage setPage={setPage} isMobile={isMobile} />}
      {page === "sport"       && <SportPage setPage={setPage} isMobile={isMobile} />}
      {page === "preise"      && <PreisePage setPage={setPage} isMobile={isMobile} />}
      {page === "kontakt"     && <KontaktPage setPage={setPage} isMobile={isMobile} />}
      {page === "impressum"   && <ImpressumPage setPage={setPage} isMobile={isMobile} />}
      {page === "datenschutz" && <DatenschutzPage setPage={setPage} isMobile={isMobile} />}

      {isMobile && <MobileBar setPage={setPage} />}
    </>
  );
}
