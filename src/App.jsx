import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, MessageCircle, Mail, ArrowRight, ArrowUpRight, Menu, X,
  ChevronDown, MapPin, Clock, Send, GraduationCap, Users, Laptop,
  PartyPopper, CheckCircle2, AlertCircle, Dumbbell, Trophy, Star,
  Zap, Globe, Heart, BookOpen, Target, Play, Monitor, Wifi,
  Calendar, Award, Shield, TrendingUp, Coffee, Lightbulb,
  ChevronRight, ExternalLink, CheckCheck, MousePointer,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS — WARM HELL
   ============================================================ */
const C = {
  // Hintergründe warm
  bg:        "#FDFAF6",
  bgWarm:    "#F9F4EE",
  bgCard:    "#FFFFFF",
  bgAccent:  "#F0EBE3",

  // Primär
  violet:    "#6D28D9",
  violetLi:  "#8B5CF6",
  violetTint:"#EDE9FE",
  violetDk:  "#4C1D95",

  // Akzent warm
  amber:     "#D97706",
  amberLi:   "#F59E0B",
  amberTint: "#FEF3C7",
  amberDk:   "#92400E",

  // Coral/Rosa
  coral:     "#DC6B6B",
  coralTint: "#FEE2E2",

  // Grün
  green:     "#059669",
  greenTint: "#D1FAE5",

  // Text
  text:      "#1C1917",
  textDim:   "#78716C",
  textDimmer:"#A8A29E",
  white:     "#FFFFFF",

  // Border
  border:    "#E7E0D8",
  borderHi:  "#D4C9BC",
};

const FF = {
  display: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
  body:    '"Inter", system-ui, sans-serif',
};

/* ============================================================
   GLOBAL CSS
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: ${FF.body};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  input, select, textarea { font-family: inherit; }
  ::selection { background: ${C.violetTint}; color: ${C.violet}; }
  :focus-visible { outline: 2px solid ${C.violet}; outline-offset: 3px; border-radius: 4px; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bgWarm}; }
  ::-webkit-scrollbar-thumb { background: ${C.violetLi}; border-radius: 3px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(100%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes orbA {
    0%   { transform: translate(0px, 0px) scale(1); }
    25%  { transform: translate(30px, -25px) scale(1.1); }
    50%  { transform: translate(-20px, 30px) scale(0.92); }
    75%  { transform: translate(25px, 15px) scale(1.05); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes orbB {
    0%   { transform: translate(0px, 0px) scale(1) rotate(0deg); }
    33%  { transform: translate(-35px, 20px) scale(1.15) rotate(6deg); }
    66%  { transform: translate(20px, -30px) scale(0.88) rotate(-4deg); }
    100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
  }
  @keyframes orbC {
    0%   { transform: translate(0px, 0px) scale(1); }
    40%  { transform: translate(40px, 25px) scale(0.9); }
    80%  { transform: translate(-15px, -20px) scale(1.12); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes orbSmall {
    0%   { transform: translate(0,0) scale(1); }
    50%  { transform: translate(15px,-18px) scale(1.15); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes riseUp {
    0%   { transform: translateY(20px) translateX(0); opacity: 0; }
    15%  { opacity: 0.9; }
    85%  { opacity: 0.9; }
    100% { transform: translateY(-380px) translateX(20px); opacity: 0; }
  }
  @keyframes ripple {
    0%   { transform: scale(0.4); opacity: 0.55; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes shimmerLine {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(300%) skewX(-12deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(0.95); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes drawerSlideIn {
    from { transform: translateX(100%); box-shadow: none; }
    to   { transform: translateX(0); box-shadow: -24px 0 80px rgba(0,0,0,0.18); }
  }
  @keyframes drawerSlideOut {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
  @keyframes warmGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(109,40,217,0.15); }
    50%       { box-shadow: 0 0 0 12px rgba(109,40,217,0); }
  }

  /* Reveal on scroll */
  .reveal {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  .reveal-delay-3 { transition-delay: 0.24s; }
  .reveal-delay-4 { transition-delay: 0.32s; }

  /* Clickable card */
  .clickable {
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(.4,0,.2,1),
                box-shadow 0.25s ease,
                border-color 0.25s ease,
                background 0.25s ease;
  }
  .clickable:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 56px -16px rgba(28,25,23,0.22);
    border-color: ${C.borderHi} !important;
  }
  .clickable:active { transform: translateY(-1px); }

  /* Foto-Karten */
  .photo-card .card-img {
    transition: transform 0.6s cubic-bezier(.22,.61,.36,1);
  }
  .photo-card:hover .card-img {
    transform: scale(1.06);
  }
  .banner-img {
    transition: transform 0.7s cubic-bezier(.22,.61,.36,1);
  }
  .clickable:hover .banner-img {
    transform: scale(1.05);
  }

  /* Chip hint */
  .chip-hint {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 999px;
    background: ${C.violetTint}; color: ${C.violet};
    font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
    opacity: 0.85;
    transition: opacity 0.2s;
  }
  .clickable:hover .chip-hint { opacity: 1; }

  /* Nav link */
  .nav-link {
    font-size: 14px; font-weight: 600; color: ${C.textDim};
    transition: color 0.2s; padding: 6px 0;
    background: none; border: none; cursor: pointer;
    position: relative;
  }
  .nav-link:hover { color: ${C.violet}; }
  .nav-link.active { color: ${C.violet}; }
  .nav-link.active::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0; height: 2px;
    background: ${C.violet}; border-radius: 2px;
  }

  /* Gradient text */
  .g-text {
    background: linear-gradient(135deg, ${C.violet}, ${C.amberLi});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 12px;
    font-weight: 700; font-size: 15px;
    background: ${C.violet}; color: #fff;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    border: none; cursor: pointer;
  }
  .btn-primary:hover { background: ${C.violetDk}; transform: translateY(-2px); box-shadow: 0 14px 36px -8px rgba(109,40,217,0.55); }
  .btn-primary:active { transform: translateY(0); }

  .btn-amber {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 12px;
    font-weight: 700; font-size: 15px;
    background: ${C.amber}; color: #fff;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    border: none; cursor: pointer;
  }
  .btn-amber:hover { background: ${C.amberDk}; transform: translateY(-2px); box-shadow: 0 14px 36px -8px rgba(217,119,6,0.55); }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 12px;
    font-weight: 600; font-size: 15px;
    background: transparent; color: ${C.violet};
    border: 2px solid ${C.violet};
    transition: background 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .btn-outline:hover { background: ${C.violetTint}; transform: translateY(-1px); }

  /* Tag */
  .tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 999px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  }

  /* Modal backdrop */
  .drawer-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(28,25,23,0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: backdropFadeIn 0.25s ease forwards;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .drawer-backdrop.closing {
    animation: backdropFadeIn 0.2s ease reverse forwards;
  }

  /* Modal panel — centered */
  .drawer-panel {
    position: relative;
    width: min(680px, 100%);
    max-height: min(88vh, 860px);
    background: ${C.bgCard};
    z-index: 201;
    overflow-y: auto;
    border-radius: 28px;
    box-shadow: 0 40px 120px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
    animation: modalPopIn 0.35s cubic-bezier(.32,.72,0,1) forwards;
  }
  .drawer-panel.closing {
    animation: modalPopOut 0.22s cubic-bezier(.4,0,1,1) forwards;
  }
  @keyframes modalPopIn {
    from { opacity: 0; transform: scale(0.92) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes modalPopOut {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to   { opacity: 0; transform: scale(0.94) translateY(8px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
    .drawer-panel { animation: none; }
    .drawer-backdrop { animation: none; }
    * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
  }
`;

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
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
   DRAWER COMPONENT
   ============================================================ */
/* ============================================================
   DRAWER CTA — Mini-Buchung direkt im Modal
   ============================================================ */
const CAL_EMBED_URL = "https://cal.com/beck-up/probestunde";

function DrawerCTA({ onClose }) {
  const [mode, setMode] = useState("options"); // options | cal | contact
  const [calLoaded, setCalLoaded] = useState(false);

  if (mode === "cal") {
    return (
      <div style={{ marginTop: 28 }}>
        <button onClick={() => setMode("options")} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textDim, fontWeight: 600, marginBottom: 14, background: "none", border: "none", cursor: "pointer" }}>
          ← Zurück
        </button>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgWarm, position: "relative" }}>
          {!calLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: C.bgWarm, zIndex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${C.violetTint}`, borderTopColor: C.violet, animation: "rotate 0.8s linear infinite" }} />
              <span style={{ fontSize: 14, color: C.textDim }}>Kalender wird geladen…</span>
            </div>
          )}
          <iframe
            src={CAL_EMBED_URL}
            width="100%"
            height="520"
            frameBorder="0"
            title="Termin buchen"
            onLoad={() => setCalLoaded(true)}
            style={{ display: "block", opacity: calLoaded ? 1 : 0, transition: "opacity 0.4s" }}
          />
        </div>
        <p style={{ marginTop: 10, fontSize: 12, color: C.textDimmer, textAlign: "center" }}>
          Probleme? <a href="tel:+49219171683" style={{ color: C.violet, fontWeight: 700 }}>+49 2191 71683</a>
        </p>
      </div>
    );
  }

  if (mode === "contact") {
    return (
      <div style={{ marginTop: 28 }}>
        <button onClick={() => setMode("options")} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textDim, fontWeight: 600, marginBottom: 14, background: "none", border: "none", cursor: "pointer" }}>
          ← Zurück
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="tel:+49219171683" style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 18px", borderRadius: 14, background: C.bgWarm, border: `1.5px solid ${C.border}`, transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.violet}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, flexShrink: 0 }}>
              <Phone size={21} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textDimmer, letterSpacing: "0.5px", textTransform: "uppercase" }}>Anrufen</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>+49 2191 71683</div>
            </div>
          </a>
          <a href="https://wa.me/491774246555" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 18px", borderRadius: 14, background: C.bgWarm, border: `1.5px solid ${C.border}`, transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#25D366"}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E8FBF0", display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366", flexShrink: 0 }}>
              <MessageCircle size={21} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textDimmer, letterSpacing: "0.5px", textTransform: "uppercase" }}>WhatsApp</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>+49 177 424 6555</div>
            </div>
          </a>
          <a href="mailto:info@beck-up.com"
            style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 18px", borderRadius: 14, background: C.bgWarm, border: `1.5px solid ${C.border}`, transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.amber}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.amberTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.amber, flexShrink: 0 }}>
              <Mail size={21} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textDimmer, letterSpacing: "0.5px", textTransform: "uppercase" }}>E-Mail</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>info@beck-up.com</div>
            </div>
          </a>
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: C.textDimmer, textAlign: "center" }}>Mo–Fr 09–19 · Sa 10–14 Uhr</p>
      </div>
    );
  }

  // Default: options
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ height: 1, background: C.border, marginBottom: 24 }} />
      <div style={{ fontSize: 13, fontWeight: 700, color: C.textDimmer, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 14 }}>
        Nächster Schritt
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {/* Hauptoption: Termin buchen */}
        <button onClick={() => setMode("cal")}
          style={{ display: "flex", gap: 14, alignItems: "center", padding: "18px 20px", borderRadius: 16, background: C.violet, border: "none", cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}
          onMouseEnter={e => e.currentTarget.style.background = C.violetDk}
          onMouseLeave={e => e.currentTarget.style.background = C.violet}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
            <Calendar size={23} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: "#fff" }}>Termin buchen</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>Freie Slots im Kalender wählen · Erste Stunde gratis</div>
          </div>
          <ArrowRight size={18} color="rgba(255,255,255,0.7)" />
        </button>

        {/* Sekundäroption: direkt Kontakt */}
        <button onClick={() => setMode("contact")}
          style={{ display: "flex", gap: 14, alignItems: "center", padding: "15px 20px", borderRadius: 14, background: C.bgWarm, border: `1.5px solid ${C.border}`, cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.violetLi; e.currentTarget.style.background = C.violetTint; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgWarm; }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, flexShrink: 0 }}>
            <Phone size={19} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Direkt Kontakt aufnehmen</div>
            <div style={{ fontSize: 13, color: C.textDim, marginTop: 1 }}>Telefon · WhatsApp · E-Mail</div>
          </div>
          <ArrowRight size={16} color={C.textDimmer} />
        </button>
      </div>
      <p style={{ marginTop: 12, fontSize: 12, color: C.textDimmer, textAlign: "center" }}>Erste Stunde kostenlos · Kein Vertrag · Unverbindlich</p>
    </div>
  );
}

function Drawer({ item, onClose }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 280);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [close]);

  if (!item) return null;

  return (
    <>
      {/* Backdrop wraps panel so click-outside works */}
      <div className={`drawer-backdrop${closing ? " closing" : ""}`} onClick={close}>
      {/* Panel — stopPropagation prevents closing when clicking inside */}
      <div className={`drawer-panel${closing ? " closing" : ""}`} ref={panelRef} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.tint, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
              <item.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.textDimmer }}>{item.parent}</div>
              <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: C.text, letterSpacing: "-0.01em" }}>{item.title}</div>
            </div>
          </div>
          <button onClick={close} style={{ width: 40, height: 40, borderRadius: "50%", background: C.bgWarm, display: "flex", alignItems: "center", justifyContent: "center", color: C.textDim, transition: "background 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.coralTint; e.currentTarget.style.color = C.coral; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.bgWarm; e.currentTarget.style.color = C.textDim; }}>
            <X size={20} />
          </button>
        </div>

        {/* Hero image area */}
        <div style={{ height: 180, background: `linear-gradient(135deg, ${item.tint}, ${item.tintAlt || C.bgAccent})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: C.bgCard, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: item.color, boxShadow: `0 8px 32px rgba(0,0,0,0.12)`, animation: "float 3s ease-in-out infinite" }}>
              <item.icon size={36} />
            </div>
            <div style={{ marginTop: 14, fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: item.color }}>{item.title}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 28px 48px" }}>
          {/* Tagline */}
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.textDim, fontWeight: 400 }}>{item.description}</p>

          {/* Was ist das */}
          {item.what && (
            <div style={{ marginTop: 34 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 9 }}>
                <Lightbulb size={20} color={item.color} /> Was ist das?
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: C.textDim }}>{item.what}</p>
            </div>
          )}

          {/* Vorteile */}
          {item.benefits && (
            <div style={{ marginTop: 34 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 9 }}>
                <TrendingUp size={20} color={item.color} /> Vorteile
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 12, background: C.bgWarm, border: `1px solid ${C.border}` }}>
                    <CheckCheck size={18} color={item.color} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 15.5, lineHeight: 1.6, color: C.text, fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ablauf */}
          {item.steps && (
            <div style={{ marginTop: 34 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 9 }}>
                <Target size={20} color={item.color} /> So läuft's ab
              </h3>
              <div style={{ position: "relative", paddingLeft: 28 }}>
                <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${item.color}, transparent)` }} />
                {item.steps.map((s, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                    <div style={{ position: "absolute", left: -28, top: 2, width: 18, height: 18, borderRadius: "50%", background: item.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{i + 1}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: C.text, fontFamily: FF.display }}>{s.title}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.65, color: C.textDim, marginTop: 4 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Was wird benötigt */}
          {item.requirements && (
            <div style={{ marginTop: 34 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 9 }}>
                <Shield size={20} color={item.color} /> Was wird benötigt?
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {item.requirements.map((r, i) => (
                  <span key={i} style={{ padding: "7px 14px", borderRadius: 999, background: item.tint, color: item.color, fontSize: 13, fontWeight: 600, border: `1px solid ${item.color}20` }}>{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* Für wen */}
          {item.forWhom && (
            <div style={{ marginTop: 28, padding: "18px 20px", borderRadius: 16, background: item.tint, border: `1px solid ${item.color}20` }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: item.color, marginBottom: 8 }}>Für wen?</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: C.text }}>{item.forWhom}</p>
            </div>
          )}

          {/* CTA — Termin + Kontakt */}
          <DrawerCTA onClose={close} />
        </div>
      </div>
      </div>
    </>
  );
}

/* ============================================================
   DRAWER DATA — alle Inhalte
   ============================================================ */
const DRAWER_DATA = {
  /* ── LEARNING ── */
  einzelunterricht: {
    icon: GraduationCap, color: C.violet, tint: C.violetTint, tintAlt: "#DDD6FE",
    parent: "beck-up Learning", title: "Einzelunterricht",
    description: "Eine Lehrkraft, ein Kind — die ganze Stunde dreht sich nur um das was dein Kind gerade braucht.",
    what: "Im Einzelunterricht arbeitet dein Kind allein mit einer persönlichen Lehrkraft. Kein Warten, kein Mitschwimmen. Tempo, Themen und Schwerpunkte richten sich ausschließlich nach dem Kind — nicht nach einem Lehrplan.",
    benefits: [
      "Volle Aufmerksamkeit — jede Minute zählt",
      "Eigenes Tempo, keine Vergleiche mit anderen",
      "Ideal bei größeren Lücken oder vor Prüfungen",
      "Direkte Rückmeldung auf jede Frage",
      "Lehrkraft passt den Stil an das Kind an",
    ],
    steps: [
      { title: "Kostenlose Probestunde", text: "Dein Kind lernt die Lehrkraft kennen — ohne Druck, ohne Kosten." },
      { title: "Bedarfsanalyse", text: "Wir schauen gemeinsam wo's hakt und setzen realistische Ziele." },
      { title: "Regelmäßige Termine", text: "Feste Zeiten, dieselbe Lehrkraft — Verlässlichkeit macht den Unterschied." },
      { title: "Fortschritt sehen", text: "Noten verbessern sich, Selbstvertrauen wächst." },
    ],
    requirements: ["Schulbücher / Hefte", "Hausaufgaben zum Besprechen", "Ggf. Laptop für Online"],
    forWhom: "Kinder mit größeren Wissenslücken, Prüfungsangst, besonderen Bedürfnissen oder einfach dem Wunsch nach persönlicher Begleitung. Von Klasse 1 bis Abitur.",
  },

  gruppenunterricht: {
    icon: Users, color: "#0891B2", tint: "#CFFAFE", tintAlt: "#A5F3FC",
    parent: "beck-up Learning", title: "Gruppenunterricht",
    description: "Kleine Gruppen auf gleichem Niveau. Voneinander lernen, zusammen besser werden — und günstiger als Einzelunterricht.",
    what: "In kleinen Gruppen (max. 4–6 Schüler auf ähnlichem Stand) wird gemeinsam geübt. Das soziale Lernen motiviert, und man merkt schnell: andere haben dieselben Fragen.",
    benefits: [
      "Günstiger als Einzelunterricht",
      "Motivierend durch Gruppeneffekt",
      "Schüler helfen einander — das festigt Wissen",
      "Trotzdem persönlich: kleine Gruppen, keine Klasse",
      "Regelmäßiger Austausch mit Gleichgesinnten",
    ],
    steps: [
      { title: "Einstufung", text: "Wir schauen in welche Gruppe dein Kind am besten passt — nach Klasse und Niveau." },
      { title: "Probestunde", text: "Einmal reinschnuppern — kostenlos." },
      { title: "Feste Gruppe", text: "Gleiche Kinder, gleiche Zeiten. Routine ist gut fürs Lernen." },
    ],
    requirements: ["Schulbücher", "Schreibmaterial"],
    forWhom: "Schüler die nicht zu weit zurückliegen, Motivation in der Gruppe schöpfen und dabei Kosten sparen wollen. Klasse 1–13.",
  },

  abivorbereitung: {
    icon: Target, color: "#BE185D", tint: "#FCE7F3", tintAlt: "#FBCFE8",
    parent: "beck-up Learning", title: "Abi-Vorbereitung",
    description: "Gezielt auf die Prüfungen — fachlich und mental. Alte Klausuren, echte Aufgaben, echte Sicherheit.",
    what: "In den Wochen vor dem Abitur geht's ums Eingemachte. Wir gehen alte Prüfungen durch, schließen die letzten Lücken und sorgen dafür, dass Schüler mit Selbstvertrauen in die Prüfung gehen — nicht mit Panik.",
    benefits: [
      "Fokus auf prüfungsrelevante Themen",
      "Echte Abituraufgaben als Training",
      "Stressreduktion durch Vorbereitung",
      "Individuelle Schwachstellenanalyse",
      "Für Einzel- und Gruppenformat verfügbar",
    ],
    steps: [
      { title: "Bestandsaufnahme", text: "Welche Themen sind sicher, wo sind die Lücken?" },
      { title: "Intensivplan", text: "Klarer Fahrplan für die verbleibende Zeit." },
      { title: "Prüfungssimulation", text: "Unter Zeitdruck echte Aufgaben lösen — so wird's real." },
      { title: "Letzte Fragen klären", text: "Bis kurz vor der Prüfung erreichbar." },
    ],
    requirements: ["Abiturthemen der Schule", "Alte Klausuren wenn vorhanden", "Formelsammlungen"],
    forWhom: "Schüler in Klasse 12 und 13 vor den Abiturprüfungen — egal ob leichte Auffrischung oder intensive Vorbereitung.",
  },

  abinight: {
    icon: PartyPopper, color: "#D97706", tint: "#FEF3C7", tintAlt: "#FDE68A",
    parent: "beck-up Learning", title: "Abi-Night",
    description: "Die Nacht vor der Prüfung gemeinsam durcharbeiten. Unser Klassiker seit Jahren — anstrengend, legendär, es wirkt.",
    what: "Die Abi-Night ist ein intensiver Lernmarathon am Abend vor der Prüfung. In der Gruppe, mit unseren Lehrkräften, werden letzte offene Punkte geklärt, Aufgaben gerechnet und Nerven beruhigt. Mit Snacks.",
    benefits: [
      "Letzte Wissenslücken schließen",
      "Gruppenenergie wirkt gegen Prüfungsangst",
      "Professionelle Begleitung bis in die Nacht",
      "Snacks und Getränke inklusive",
      "Danach schläft man ruhiger",
    ],
    steps: [
      { title: "Anmeldung", text: "Rechtzeitig anmelden — die Plätze sind begrenzt." },
      { title: "Abend des Vortags", text: "Treffen bei beck-up, alle Unterlagen mitbringen." },
      { title: "Intensive Arbeit", text: "Themen durchgehen, Aufgaben lösen, Fragen stellen." },
      { title: "Prüfung bestehen", text: "Mit Vorbereitung und Selbstvertrauen." },
    ],
    requirements: ["Lernmaterialien", "Eigener Stift / Taschenrechner", "Ausdauer"],
    forWhom: "Alle Abiturienten — egal welches Fach, egal wie gut vorbereitet. Die Abi-Night ist für jeden der noch einmal Gas geben will.",
  },

  /* ── ELEARNING ── */
  videounterricht: {
    icon: Monitor, color: "#0891B2", tint: "#CFFAFE", tintAlt: "#BAE6FD",
    parent: "beck-up eLearning", title: "Video-Unterricht",
    description: "Live mit deiner Lehrkraft — direkt von zuhause. Echte Interaktion, keine voraufgezeichneten Videos.",
    what: "Der Video-Unterricht bei beck-up ist kein YouTube. Du lernst live, siehst die Lehrkraft, kannst jederzeit fragen, und die Lehrkraft sieht ob du verstanden hast. Alles in Echtzeit, in einem geschützten Raum.",
    benefits: [
      "Live — nicht voraufgezeichnet",
      "Dieselbe Lehrkraft wie im Präsenz-Unterricht",
      "Kein Schulweg, kein Parkplatzstress",
      "Flexibel auch für kranke oder verhinderte Kinder",
      "Aufzeichnung auf Anfrage möglich",
    ],
    steps: [
      { title: "Einladungslink erhalten", text: "Du bekommst einen einfachen Link per E-Mail oder WhatsApp." },
      { title: "Pünktlich einloggen", text: "Kein Download nötig — läuft im Browser." },
      { title: "Lernstunde wie immer", text: "Fragen stellen, Aufgaben lösen, Feedback bekommen." },
    ],
    requirements: ["Computer, Tablet oder Smartphone", "Stabile Internetverbindung", "Kamera + Mikrofon (eingebaut reicht)", "Browser (Chrome oder Firefox empfohlen)"],
    forWhom: "Für alle die lieber von zuhause lernen, die keinen Anfahrtsweg möchten, oder die flexiblere Zeiten brauchen.",
  },

  digitaletafel: {
    icon: Wifi, color: C.violet, tint: C.violetTint, tintAlt: "#DDD6FE",
    parent: "beck-up eLearning", title: "Digitale Tafel",
    description: "Aufgaben, Erklärungen, Formeln — alle sehen dasselbe. So als wäre man im selben Raum.",
    what: "Über die digitale Tafel kann die Lehrkraft Aufgaben aufschreiben, Schaubilder zeigen und Rechnungen vorführen — in Echtzeit. Schüler können auch selbst auf der Tafel schreiben. Erklärt sich besser als über Sprache allein.",
    benefits: [
      "Gleiches Bild für Lehrkraft und Schüler",
      "Formeln, Zeichnungen und Texte direkt eintippbar",
      "Schüler kann selbst mitschreiben",
      "Wie eine echte Tafel — nur digital",
      "Inhalte können gespeichert werden",
    ],
    requirements: ["Stabiles Internet", "Endgerät mit Bildschirm", "Optional: Touchscreen oder Stift"],
    forWhom: "Besonders hilfreich für Mathe, Physik, Chemie und alle Fächer mit Formeln oder Zeichnungen.",
  },

  flexiblezeiten: {
    icon: Calendar, color: "#059669", tint: "#D1FAE5", tintAlt: "#A7F3D0",
    parent: "beck-up eLearning", title: "Flexible Zeiten",
    description: "Morgens, abends, am Wochenende. Beim eLearning bestimmst du wann — nicht der Stundenplan.",
    what: "Online-Unterricht fällt nicht immer in die klassischen Öffnungszeiten. Weil kein Anfahrtsweg anfällt, können wir auch früh morgens, spät abends oder samstags Unterricht anbieten — abgestimmt auf deinen Alltag.",
    benefits: [
      "Termine auch außerhalb der Öffnungszeiten",
      "Kein Schulweg kostet keine Zeit",
      "Auch für Schüler mit langen Schultagen",
      "Schnelle Terminverschiebung möglich",
    ],
    forWhom: "Schüler mit vollen Nachmittagen, Vereine, Sportler, Familien mit aufwendiger Logistik.",
  },

  /* ── SPORT ── */
  tennistraining: {
    icon: Trophy, color: "#D97706", tint: "#FEF3C7", tintAlt: "#FDE68A",
    parent: "Sport & Freizeit", title: "Tennistraining",
    description: "Tennis von der Pike auf — oder dein Spiel auf das nächste Level bringen. Mit lizenzierten Trainern.",
    what: "Unser Tennistraining findet am Hastener Turnverein und beim INJOY Remscheid statt. Die Trainer haben Verbandslizenzen und bringen dich technisch wirklich weiter — nicht nur Rally schlagen, sondern echtes Tennis verstehen.",
    benefits: [
      "Lizenzierte Verbandsathleten als Trainer",
      "Einzel- und Gruppentraining verfügbar",
      "Für Einsteiger und Fortgeschrittene",
      "Mehrere Standorte in Remscheid",
      "Turnierbegleitung auf Wunsch",
    ],
    steps: [
      { title: "Schnupperstunde", text: "Einmal reinschnuppern — wir schauen gemeinsam aufs aktuelle Niveau." },
      { title: "Trainingsplan", text: "Abgestimmt auf Ziele und verfügbare Zeit." },
      { title: "Regelmäßiges Training", text: "Technik, Taktik, Fitness — alles zusammen." },
    ],
    requirements: ["Sportkleidung", "Tennisschläger (kann auch ausgeliehen werden)", "Sportschuhe"],
    forWhom: "Kinder, Jugendliche und Erwachsene — vom absoluten Anfänger bis zum Turnierspieler.",
  },

  gruppentraining: {
    icon: Users, color: "#DC6B6B", tint: "#FEE2E2", tintAlt: "#FECACA",
    parent: "Sport & Freizeit", title: "Gruppentraining",
    description: "Sport macht in der Gruppe mehr Spaß. Unsere Gruppeneinheiten sind motivierend, abwechslungsreich und für alle Niveaus.",
    what: "Im Gruppentraining trainiert man gemeinsam — das erzeugt Motivation, Wettkampfgeist und Spaß. Unsere Trainer achten darauf dass alle mitkommen und trotzdem gefordert werden.",
    benefits: [
      "Günstiger als Einzeltraining",
      "Mehr Spaß durch Gemeinschaft",
      "Wettkampfsimulation möglich",
      "Soziale Komponente stärkt Motivation",
    ],
    forWhom: "Alle die Sport lieber gemeinsam treiben — Kinder, Jugendliche, Erwachsene.",
  },

  fitness: {
    icon: Dumbbell, color: "#7C3AED", tint: "#EDE9FE", tintAlt: "#DDD6FE",
    parent: "Sport & Freizeit", title: "Fitness & Bewegung",
    description: "Bewegung die Spaß macht. Kein Gym-Zwang, kein Leistungsdruck — einfach fit werden und bleiben.",
    what: "Neben Tennis bieten wir allgemeine Fitness- und Bewegungsangebote an — abgestimmt auf Alter und Ziel. Ob Ausdauer, Koordination oder einfach mehr Bewegung im Alltag.",
    benefits: [
      "Spaß steht im Vordergrund",
      "Für alle Fitnesslevel",
      "Professionelle Begleitung",
      "Flexibel buchbar",
    ],
    forWhom: "Alle die sich mehr bewegen wollen — unabhängig vom aktuellen Fitnesslevel.",
  },
};

/* ============================================================
   CLICKABLE CARD — universell
   ============================================================ */
/* ============================================================
   FOTO-MAP — echte Unsplash-Bilder pro Bereich
   ============================================================ */
const uimg = (id, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const CARD_IMAGES = {
  einzelunterricht:  "photo-1509062522246-3755977927d7",
  gruppenunterricht: "photo-1531545514256-b1400bc00f31",
  abivorbereitung:   "photo-1730234030296-4d1c4037a872",
  abinight:          "photo-1501504905252-473c47e087f8",
  videounterricht:   "photo-1588873281272-14886ba1f737",
  digitaletafel:     "photo-1565598621680-94ac0c22b148",
  flexiblezeiten:    "photo-1531545514256-b1400bc00f31",
  tennistraining:    "photo-1545151414-8a948e1ea54f",
  gruppentraining:   "photo-1583275478661-1c31970669fa",
  fitness:           "photo-1571019613454-1cb2f99b2d8b",
};

function ClickCard({ drawerKey, icon: Icon, color, tint, title, sub, hint = "Mehr erfahren", onOpen, children, style, className }) {
  const photo = CARD_IMAGES[drawerKey];
  return (
    <div
      className={`clickable photo-card${className ? ` ${className}` : ""}`}
      onClick={() => onOpen(drawerKey)}
      style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", ...style }}
    >
      {children || (
        <>
          {/* Foto */}
          <div style={{ position: "relative", height: 184, overflow: "hidden", background: tint }}>
            {photo && (
              <img src={uimg(photo)} alt={title} loading="lazy"
                className="card-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}
            {/* Farb-Tönung unten für Übergang */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 55%, ${C.bgCard})` }} />
            {/* Icon-Badge schwebend */}
            <div style={{ position: "absolute", bottom: 14, left: 18, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color, boxShadow: "0 6px 18px -4px rgba(0,0,0,0.25)" }}>
              <Icon size={22} />
            </div>
          </div>
          {/* Text */}
          <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 20, color: C.text, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</h3>
            <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.6, color: C.textDim, flex: 1 }}>{sub}</p>
            <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 7, color, fontWeight: 700, fontSize: 13.5 }}>
              {hint} <ArrowRight size={15} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   LAYOUT HELPERS
   ============================================================ */
function Container({ children, style }) {
  return <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", ...style }}>{children}</div>;
}

/* ============================================================
   NAV
   ============================================================ */
const NAV_ITEMS = [
  { key: "home", label: "Start" },
  { key: "learning", label: "Learning" },
  { key: "elearning", label: "eLearning" },
  { key: "sport", label: "Sport & Freizeit" },
  { key: "but", label: "Bildung & Teilhabe" },
  { key: "preise", label: "Preise" },
  { key: "buchen",  label: "Termin buchen" },
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
  const go = key => { setPage(key); setOpen(false); window.scrollTo({ top: 0, behavior: "auto" }); };

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(253,250,246,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.3s ease" }}>
      <Container>
        <div style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.violet, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 900, fontSize: 19, color: "#fff" }}>b</div>
            <span style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 20, color: C.text, letterSpacing: "-0.02em" }}>beck<span style={{ color: C.violet }}>-</span>up</span>
          </button>

          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {NAV_ITEMS.map(n => (
                <button key={n.key} className={`nav-link${page === n.key ? " active" : ""}`} onClick={() => go(n.key)}>{n.label}</button>
              ))}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <button className="btn-primary" onClick={() => go("buchen")} style={{ padding: "10px 20px", fontSize: 14 }}>
                Probestunde <ArrowRight size={15} />
              </button>
            )}
            {isMobile && (
              <button onClick={() => setOpen(o => !o)} style={{ color: C.text, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </Container>

      {isMobile && (
        <div style={{ overflow: "hidden", maxHeight: open ? 500 : 0, transition: "max-height 0.35s ease", background: C.bgCard, borderTop: open ? `1px solid ${C.border}` : "none" }}>
          <Container>
            <div style={{ padding: "8px 0 20px" }}>
              {NAV_ITEMS.map(n => (
                <button key={n.key} onClick={() => go(n.key)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "15px 0", borderBottom: `1px solid ${C.border}`, fontFamily: FF.display, fontWeight: 700, fontSize: 16, color: page === n.key ? C.violet : C.text }}>
                  {n.label} <ChevronRight size={18} style={{ color: C.textDimmer }} />
                </button>
              ))}
              <button className="btn-primary" onClick={() => go("buchen")} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
                Kostenlose Probestunde <ArrowRight size={16} />
              </button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   PAGE HEADER
   ============================================================ */
function PageHeader({ tag, title, accent, sub, isMobile }) {
  useReveal();
  return (
    <section style={{ paddingTop: isMobile ? 110 : 148, paddingBottom: isMobile ? 48 : 64, background: `linear-gradient(180deg, ${C.bgWarm} 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}` }}>
      <Container>
        <span className="reveal tag" style={{ background: C.violetTint, color: C.violet, border: `1px solid rgba(109,40,217,0.2)`, marginBottom: 20, display: "inline-flex" }}>{tag}</span>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? "clamp(36px,8vw,48px)" : "clamp(48px,5vw,68px)", letterSpacing: "-0.03em", color: C.text, lineHeight: 1.07, maxWidth: 780 }}>
          {title} <span className="g-text">{accent}</span>
        </h1>
        {sub && <p className="reveal reveal-delay-2" style={{ marginTop: 18, maxWidth: 540, fontSize: isMobile ? 16 : 18, lineHeight: 1.7, color: C.textDim }}>{sub}</p>}
      </Container>
    </section>
  );
}

/* ============================================================
   HOME
   ============================================================ */
/* ============================================================
   REVIEW CAROUSEL — rotierendes Auto-Slideshow
   ============================================================ */
const ALL_REVIEWS = [
  { name: "Amelie", role: "Google-Rezension ⭐⭐⭐⭐⭐", text: "Super gute Nachhilfe sowohl live als auch online! Vor allem die Abiturvorbereitung kann ich nur empfehlen. Danke Andy!", color: C.violet, tint: C.violetTint },
  { name: "Luis", role: "Gruppennachhilfe online", text: "Die Aufgaben nochmals durchzugehen, war sehr gut für das Verständnis. Sehr gute Stunde.", color: "#0891B2", tint: "#CFFAFE" },
  { name: "Daniel", role: "Einzel-Teaching online", text: "Ausführlich, nicht zu schnell und gut strukturiert.", color: C.amber, tint: C.amberTint },
  { name: "Pia", role: "Einzel-Teaching online", text: "Gute Alternative in dieser Zeit! Hat mir sehr geholfen, danke 🙂", color: C.coral, tint: C.coralTint },
  { name: "Mohamad Y.", role: "Abi-Night", text: "Es war sehr gut und hilfreich! Ich hoffe wir können es mehrmals wiederholen.", color: "#059669", tint: "#D1FAE5" },
];

function ReviewCarousel({ isMobile }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Manuelles Wechseln (Pfeile / Dots)
  const goTo = (idx) => {
    setAnimating(true);
    setTimeout(() => {
      setActive((idx + ALL_REVIEWS.length) % ALL_REVIEWS.length);
      setAnimating(false);
    }, 280);
  };

  // Auto-Rotation — funktionales setState, immun gegen stale closure & StrictMode
  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % ALL_REVIEWS.length);
        setAnimating(false);
      }, 280);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const r = ALL_REVIEWS[active];

  return (
    <section style={{ padding: isMobile ? "64px 0" : "96px 0", background: C.bgWarm, overflow: "hidden" }}>
      <Container>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 32 : 44, letterSpacing: "-0.03em", color: C.text }}>
            Was unsere <span className="g-text">Community sagt.</span>
          </h2>
        </div>

        {/* Main card */}
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          {/* Decorative bg cards */}
          <div style={{ position: "absolute", top: 12, left: "5%", right: "5%", bottom: -12, background: C.bgCard, borderRadius: 24, border: `1px solid ${C.border}`, opacity: 0.6, transform: "rotate(-1.5deg)" }} />
          <div style={{ position: "absolute", top: 6, left: "2%", right: "2%", bottom: -6, background: C.bgCard, borderRadius: 24, border: `1px solid ${C.border}`, opacity: 0.8, transform: "rotate(0.8deg)" }} />

          {/* Active card */}
          <div style={{
            position: "relative", background: C.bgCard, borderRadius: 24, padding: isMobile ? "28px 24px" : "40px 44px",
            border: `1.5px solid ${r.color}30`,
            boxShadow: `0 20px 60px -16px ${r.color}25`,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px) scale(0.98)" : "translateY(0) scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
              {Array(5).fill(0).map((_, i) => <Star key={i} size={18} fill={C.amber} color={C.amber} />)}
            </div>
            {/* Quote */}
            <p style={{ fontFamily: FF.display, fontSize: isMobile ? 18 : 22, fontWeight: 600, lineHeight: 1.55, color: C.text, fontStyle: "italic" }}>
              „{r.text}"
            </p>
            {/* Person */}
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.tint, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 900, fontSize: 20, color: r.color, flexShrink: 0 }}>
                {r.name[0]}
              </div>
              <div>
                <div style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: C.text }}>{r.name}</div>
                <div style={{ fontSize: 13, color: C.textDim }}>{r.role}</div>
              </div>
              <div style={{ marginLeft: "auto", padding: "5px 12px", borderRadius: 999, background: r.tint, color: r.color, fontSize: 11, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>
                Verifiziert
              </div>
            </div>
          </div>
        </div>

        {/* Dots + nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 32 }}>
          <button onClick={() => goTo(active - 1)} style={{ width: 36, height: 36, borderRadius: "50%", background: C.bgCard, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textDim, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.violet; e.currentTarget.style.color = C.violet; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>
            ‹
          </button>
          {ALL_REVIEWS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 999, background: i === active ? C.violet : C.border, border: "none", cursor: "pointer", transition: "all 0.35s ease", padding: 0 }} />
          ))}
          <button onClick={() => goTo(active + 1)} style={{ width: 36, height: 36, borderRadius: "50%", background: C.bgCard, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textDim, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.violet; e.currentTarget.style.color = C.violet; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>
            ›
          </button>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   STRIPE-STYLE BEREICHE BANNER — animierte Feature-Karten
   ============================================================ */
/* ── Animationstyp 1: viele kleine Orbs (nur Learning-Banner) ── */
const SMALL_ORB_ANIMS = ["orbA 13s", "orbB 16s", "orbC 11s", "orbSmall 9s", "orbA 18s", "orbB 14s"];

function OrbField() {
  // 10 kleine Orbs, gestreut
  const orbs = [
    { c: "rgba(196,181,253,0.55)", s: 70, t: "10%", l: "8%" },
    { c: "rgba(167,139,250,0.5)",  s: 50, t: "55%", l: "20%" },
    { c: "rgba(221,214,254,0.45)", s: 90, t: "25%", l: "65%" },
    { c: "rgba(139,92,246,0.4)",   s: 45, t: "70%", l: "78%" },
    { c: "rgba(196,181,253,0.5)",  s: 60, t: "5%",  l: "45%" },
    { c: "rgba(167,139,250,0.45)", s: 38, t: "80%", l: "40%" },
    { c: "rgba(221,214,254,0.4)",  s: 55, t: "45%", l: "88%" },
    { c: "rgba(139,92,246,0.5)",   s: 42, t: "35%", l: "30%" },
    { c: "rgba(196,181,253,0.4)",  s: 65, t: "88%", l: "62%" },
    { c: "rgba(167,139,250,0.5)",  s: 48, t: "60%", l: "55%" },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.s, height: o.s, borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%, ${o.c} 0%, transparent 68%)`,
          top: o.t, left: o.l, filter: "blur(1px)",
          animation: `${SMALL_ORB_ANIMS[i % SMALL_ORB_ANIMS.length]} ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`, pointerEvents: "none", willChange: "transform",
        }} />
      ))}
    </>
  );
}

/* ── Animationstyp 2: aufsteigende Partikel (eLearning-Banner) ── */
function ParticleField() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 5.5 + 3) % 96}%`,
    size: 4 + (i % 4) * 2,
    delay: `${(i * 0.5) % 7}s`,
    dur: `${7 + (i % 5)}s`,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", bottom: 0, left: p.left,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(165,243,252,0.85)",
          boxShadow: "0 0 8px rgba(103,232,249,0.6)",
          animation: `riseUp ${p.dur} linear infinite`,
          animationDelay: p.delay, willChange: "transform, opacity",
        }} />
      ))}
    </div>
  );
}

/* ── Animationstyp 3: pulsierende Ringe (Sport-Banner) ── */
function RippleField() {
  const rings = [
    { t: "30%", l: "25%", delay: "0s" },
    { t: "60%", l: "70%", delay: "1.3s" },
    { t: "20%", l: "75%", delay: "2.6s" },
    { t: "75%", l: "30%", delay: "3.4s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {rings.map((r, i) => (
        <div key={i} style={{ position: "absolute", top: r.t, left: r.l, width: 160, height: 160, marginLeft: -80, marginTop: -80 }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            border: "2px solid rgba(253,230,138,0.6)",
            animation: "ripple 4s ease-out infinite",
            animationDelay: r.delay, willChange: "transform, opacity",
          }} />
        </div>
      ))}
    </div>
  );
}

function StripeBereiche({ setPage, isMobile }) {
  const cards = [
    {
      key: "learning", title: "Learning", sub: "Nachhilfe Klasse 1–13",
      gradient: "linear-gradient(135deg, rgba(109,40,217,0.92) 0%, rgba(76,29,149,0.95) 55%, rgba(45,26,110,0.97) 100%)",
      photo: "photo-1509062522246-3755977927d7",
      anim: "orbs",
      items: ["Einzelunterricht", "Gruppenunterricht", "Abi-Vorbereitung", "Abi-Night"],
      icon: BookOpen, cta: () => setPage("learning"),
    },
    {
      key: "elearning", title: "eLearning", sub: "Online-Unterricht seit 2020",
      gradient: "linear-gradient(135deg, rgba(12,74,110,0.92) 0%, rgba(8,145,178,0.92) 55%, rgba(6,182,212,0.9) 100%)",
      photo: "photo-1588873281272-14886ba1f737",
      anim: "particles",
      items: ["Video-Unterricht", "Digitale Tafel", "Flexible Zeiten", "Alle Fächer"],
      icon: Monitor, cta: () => setPage("elearning"),
    },
    {
      key: "sport", title: "Sport & Freizeit", sub: "Tennis & Training",
      gradient: "linear-gradient(135deg, rgba(120,53,15,0.9) 0%, rgba(217,119,6,0.9) 55%, rgba(245,158,11,0.88) 100%)",
      photo: "photo-1545151414-8a948e1ea54f",
      anim: "ripple",
      items: ["Tennistraining", "Lizenzierte Trainer", "Gruppentraining", "Mehrere Standorte"],
      icon: Trophy, cta: () => setPage("sport"),
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
      {cards.map((card, ci) => {
        const Icon = card.icon;
        return (
          <div key={card.key}
            className={`clickable reveal reveal-delay-${ci + 1}`}
            onClick={card.cta}
            style={{ borderRadius: 24, overflow: "hidden", cursor: "pointer", minHeight: isMobile ? 320 : 420 }}>
            <div style={{ position: "relative", height: "100%", minHeight: "inherit", overflow: "hidden" }}>
              {/* Foto-Hintergrund */}
              {card.photo && (
                <img src={uimg(card.photo, 900)} alt="" aria-hidden="true" className="banner-img"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              )}
              {/* Farb-Overlay */}
              <div style={{ position: "absolute", inset: 0, background: card.gradient }} />
              {/* Hintergrund-Animation je nach Typ */}
              {card.anim === "orbs" && <OrbField />}
              {card.anim === "particles" && <ParticleField />}
              {card.anim === "ripple" && <RippleField />}

              {/* Dot grid overlay */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1, padding: isMobile ? 28 : 32, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: 20 }}>
                  <Icon size={26} />
                </div>
                <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 34, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{card.title}</div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginTop: 8, fontWeight: 500 }}>{card.sub}</div>

                <div style={{ marginTop: "auto", paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {card.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <CheckCircle2 size={12} color="#fff" />
                      </div>
                      <span style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", fontWeight: 800, fontSize: 15, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "11px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)", alignSelf: "flex-start" }}>
                  Mehr erfahren <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   HERO REVIEW CARD — rotierende Rezension in der Hero-Karte
   ============================================================ */
const HERO_REVIEWS = [
  { name: "Amelie", role: "Google-Rezension", text: "Super gute Nachhilfe sowohl live als auch online! Vor allem die Abiturvorbereitung kann ich nur empfehlen. Danke Andy!", tags: ["Mathe", "Deutsch", "Englisch", "Abitur"] },
  { name: "Luis", role: "Gruppennachhilfe online", text: "Die Aufgaben nochmals durchzugehen, war sehr gut für das Verständnis. Sehr gute Stunde.", tags: ["Mathe", "Gruppe", "Online"] },
  { name: "Daniel", role: "Einzel-Teaching online", text: "Ausführlich, nicht zu schnell und gut strukturiert. Genau so muss Nachhilfe sein.", tags: ["Einzel", "Online", "Struktur"] },
  { name: "Pia", role: "Einzel-Teaching online", text: "Gute Alternative in dieser Zeit! Hat mir sehr geholfen, danke 🙂", tags: ["Einzel", "Online"] },
  { name: "Mohamad Y.", role: "Abi-Night", text: "Es war sehr gut und hilfreich! Ich hoffe wir können es mehrmals wiederholen.", tags: ["Abi-Night", "Prüfung"] },
];

function HeroReviewCard() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % HERO_REVIEWS.length);
        setFade(false);
      }, 280);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const r = HERO_REVIEWS[active];

  return (
    <div style={{ position: "relative", background: C.bgCard, borderRadius: 24, padding: 28, border: `1px solid ${C.border}`, boxShadow: "0 24px 64px -16px rgba(0,0,0,0.12)", minHeight: 280 }}>
      <div style={{ opacity: fade ? 0 : 1, transform: fade ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.28s ease, transform 0.28s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, fontFamily: FF.display, fontWeight: 900, fontSize: 17 }}>{r.name[0]}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{r.name}</div>
            <div style={{ fontSize: 12, color: C.textDim }}>{r.role} ⭐⭐⭐⭐⭐</div>
          </div>
        </div>
        <p style={{ fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: C.textDim, minHeight: 80 }}>„{r.text}"</p>
        <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {r.tags.map(t => (
            <span key={t} style={{ padding: "5px 12px", borderRadius: 999, background: C.violetTint, color: C.violet, fontSize: 12, fontWeight: 700 }}>{t}</span>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 20, justifyContent: "center" }}>
        {HERO_REVIEWS.map((_, i) => (
          <div key={i} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 999, background: i === active ? C.violet : C.border, transition: "all 0.3s ease" }} />
        ))}
      </div>
    </div>
  );
}

function Home({ setPage, isMobile, onOpenDrawer }) {
  useReveal();

  // Animated count-up for stats
  const statsRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [2003, 500, 3, 20];
  const labels = ["Gegründet", "Schüler+", "Standorte", "Jahre"];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      targets.forEach((target, i) => {
        const start = Date.now(), dur = 1600;
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCounts(prev => { const n = [...prev]; n[i] = Math.round(e * target); return n; });
          if (p < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), i * 120);
      });
      observer.disconnect();
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{ paddingTop: isMobile ? 100 : 140, paddingBottom: isMobile ? 60 : 100, background: `linear-gradient(160deg, ${C.bgWarm} 0%, ${C.bg} 60%)`, position: "relative", overflow: "hidden" }}>
        {/* Warm orbs */}
        <div style={{ position: "absolute", top: -80, right: -60, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: isMobile ? 36 : 60, alignItems: "center" }}>
            <div>
              <div className="reveal" style={{ marginBottom: 22 }}>
                <span className="tag" style={{ background: C.violetTint, color: C.violet, border: `1px solid rgba(109,40,217,0.2)` }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.violet, animation: "pulse 2s infinite" }} />
                  Remscheid · seit 2003
                </span>
              </div>

              <h1 className="reveal reveal-delay-1" style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? "clamp(38px,9vw,52px)" : "clamp(52px,5.5vw,76px)", letterSpacing: "-0.03em", lineHeight: 1.04, color: C.text }}>
                Bildung die{" "}
                <span className="g-text">begeistert.</span>
                <br />
                <span style={{ color: C.textDim, fontWeight: 500, fontSize: isMobile ? "clamp(28px,6vw,38px)" : "clamp(36px,3.8vw,52px)" }}>Sport der verbindet.</span>
              </h1>

              <p className="reveal reveal-delay-2" style={{ marginTop: 24, maxWidth: 500, fontSize: isMobile ? 16 : 18, lineHeight: 1.7, color: C.textDim }}>
                beck-up ist Remscheids persönlichster Bildungs- und Sportanbieter. Nachhilfe Klasse 1–13, Online-Learning und Tennis — alles an einem Ort, seit über 20 Jahren.
              </p>

              <div className="reveal reveal-delay-3" style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button className="btn-primary" onClick={() => setPage("learning")}>Zum Nachhilfe-Angebot <ArrowRight size={17} /></button>
                <button className="btn-outline" onClick={() => setPage("buchen")}>Kostenlose Probestunde</button>
              </div>
            </div>

            {/* Hero card stack */}
            <div className="reveal reveal-delay-2" style={{ position: "relative", minHeight: isMobile ? "auto" : 340 }}>
              {!isMobile && (
                <>
                  {/* Foto-Hintergrund */}
                  <div style={{ position: "absolute", top: 14, right: -10, width: "95%", height: 300, borderRadius: 24, overflow: "hidden", transform: "rotate(2.5deg)", boxShadow: "0 24px 60px -18px rgba(28,25,23,0.35)" }}>
                    <img src={uimg("photo-1509062522246-3755977927d7", 800)} alt="Nachhilfe bei beck-up" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(109,40,217,0.22), rgba(217,119,6,0.12))" }} />
                  </div>
                  {/* Main card — rotierend */}
                  <div style={{ position: "relative", marginTop: 36 }}>
                    <HeroReviewCard />
                  </div>
                </>
              )}
              {isMobile && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { n: "500+", l: "Schüler", c: C.violet, t: C.violetTint },
                    { n: "20+", l: "Jahre", c: C.amber, t: C.amberTint },
                    { n: "3", l: "Standorte", c: "#0891B2", t: "#CFFAFE" },
                    { n: "100%", l: "Persönlich", c: "#059669", t: "#D1FAE5" },
                  ].map(s => (
                    <div key={s.n} style={{ background: s.t, borderRadius: 16, padding: "18px 16px", textAlign: "center" }}>
                      <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 28, color: s.c }}>{s.n}</div>
                      <div style={{ fontSize: 13, color: C.textDim, fontWeight: 500 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)` }}>
            {targets.map((_, i) => (
              <div key={i} style={{ padding: isMobile ? "28px 16px" : "36px 24px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 32 : 44, color: C.violet, letterSpacing: "-0.03em" }}>{counts[i].toLocaleString("de")}</div>
                <div style={{ fontSize: 13, color: C.textDim, fontWeight: 600, marginTop: 4 }}>{labels[i]}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── BEREICHE PREVIEW ── */}
      <section style={{ padding: isMobile ? "64px 0" : "96px 0", background: C.bgWarm }}>
        <Container>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <span className="tag" style={{ background: C.amberTint, color: C.amber, border: `1px solid rgba(217,119,6,0.2)`, marginBottom: 16, display: "inline-flex" }}>Unsere Bereiche</span>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 32 : 44, letterSpacing: "-0.03em", color: C.text }}>
              Alles unter einem Dach.<br /><span className="g-text">Klick rein und entdecke.</span>
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, color: C.textDim, maxWidth: 480 }}>Jede Karte öffnet einen Bereich mit allen Details — einfach antippen.</p>
          </div>

          <StripeBereiche setPage={setPage} isMobile={isMobile} />
        </Container>
      </section>

      {/* ── ÜBER UNS ── */}
      <section style={{ padding: isMobile ? "64px 0" : "96px 0", background: C.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 72, alignItems: "center" }}>
            <div className="reveal">
              <span className="tag" style={{ background: C.amberTint, color: C.amber, border: `1px solid rgba(217,119,6,0.2)`, marginBottom: 20, display: "inline-flex" }}>Über beck-up</span>
              <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 32 : 44, letterSpacing: "-0.03em", color: C.text, lineHeight: 1.1 }}>
                Andreas Beck.<br /><span className="g-text">Seit 2003 in Remscheid.</span>
              </h2>
              <p style={{ marginTop: 18, fontSize: 15.5, lineHeight: 1.8, color: C.textDim }}>beck-up ist kein anonymes Unternehmen. Hinter allem steht Andreas Beck — mit echter Leidenschaft für Menschen und Bildung. Stimmt die Atmosphäre, entwickeln Menschen Freude an dem was sie tun. Das ist unser Prinzip.</p>
              <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.8, color: C.textDim }}>Seit 2025 sind wir auch Ausbildungsbetrieb.</p>
            </div>
            <div className="reveal reveal-delay-2" style={{ display: "grid", gap: 12 }}>
              {[
                { year: "2003", text: "Gründung: Bildung und Tennis in Remscheid", color: C.violet },
                { year: "2011", text: "beck-up eLearning — die digitale Zukunft", color: "#0891B2" },
                { year: "2017–18", text: "Zwei neue Standorte in Remscheid", color: C.amber },
                { year: "2020", text: "Online-Teaching geht live", color: "#059669" },
                { year: "2025", text: "Ausbildungsbetrieb + Standort Alleestr. 116", color: C.coral },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 18px", background: C.bgWarm, borderRadius: 14, border: `1px solid ${C.border}` }}>
                  <span style={{ flexShrink: 0, fontFamily: FF.display, fontWeight: 800, fontSize: 13, color: e.color, minWidth: 52 }}>{e.year}</span>
                  <span style={{ fontSize: 14, color: C.textDim, lineHeight: 1.5 }}>{e.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── STIMMEN — rotierend ── */}
      <ReviewCarousel isMobile={isMobile} />

      {/* ── CTA ── */}
      <section style={{ padding: isMobile ? "64px 0" : "96px 0", background: C.violet }}>
        <Container>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 34 : 52, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1 }}>
              Erste Stunde.<br />Gratis. Unverbindlich.
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.8)" }}>Ruf an, schreib oder komm vorbei. Wir freuen uns.</p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <button className="btn-amber" onClick={() => { setPage("kontakt"); window.scrollTo({ top: 0, behavior: "auto" }); }}>Probestunde buchen <ArrowRight size={17} /></button>
              <a href="tel:+49219171683" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
                <Phone size={17} /> +49 2191 71683
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   LEARNING PAGE
   ============================================================ */
function LearningPage({ setPage, isMobile, onOpenDrawer }) {
  useReveal();
  const offers = [
    { key: "einzelunterricht", icon: GraduationCap, color: C.violet, tint: C.violetTint, title: "Einzelunterricht", sub: "Eine Lehrkraft, ein Kind. Volle Aufmerksamkeit, dein Tempo." },
    { key: "gruppenunterricht", icon: Users, color: "#0891B2", tint: "#CFFAFE", title: "Gruppenunterricht", sub: "Klein, effektiv, günstiger. Zusammen besser werden." },
    { key: "abivorbereitung", icon: Target, color: "#BE185D", tint: "#FCE7F3", title: "Abi-Vorbereitung", sub: "Gezielt auf die Prüfungen. Fachlich und mental." },
    { key: "abinight", icon: PartyPopper, color: C.amber, tint: C.amberTint, title: "Abi-Night", sub: "Die Nacht vor der Prüfung. Unser Klassiker — es wirkt." },
  ];
  const FAECHER = ["Mathematik","Deutsch","Englisch","Französisch","Latein","Spanisch","Physik","Chemie","Biologie","Informatik","Geschichte","Erdkunde","Politik/SoWi","Wirtschaft","Rechnungswesen","BWL/VWL"];
  return (
    <main>
      <PageHeader isMobile={isMobile} tag="beck-up Learning" title="Nachhilfe die" accent="wirklich wirkt." sub="Klasse 1–13, alle Fächer, drei Standorte. Persönlich seit 2003. Klick auf ein Angebot für alle Details." />
      <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: C.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 18 }}>
            {offers.map((o, i) => (
              <ClickCard key={o.key} drawerKey={o.key} icon={o.icon} color={o.color} tint={o.tint} title={o.title} sub={o.sub} onOpen={onOpenDrawer}
                className={`reveal reveal-delay-${(i % 3) + 1}`} />
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 64 }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 28 : 36, color: C.text, marginBottom: 24 }}>Alle Fächer</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {FAECHER.map(f => (
                <span key={f} style={{ padding: "8px 16px", borderRadius: 999, background: C.bgWarm, color: C.textDim, fontSize: 14, fontWeight: 600, border: `1px solid ${C.border}` }}>{f}</span>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 64, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
            <div style={{ background: C.bgWarm, borderRadius: 20, padding: 28, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: C.text }}>Preise</h3>
              <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.75, color: C.textDim }}>
                Was Nachhilfe kostet, hängt von Einzel-/Gruppenunterricht und Häufigkeit ab. Wir nennen dir den Preis ehrlich im Gespräch — ohne Kleingedrucktes.<br /><br />
                Falls ein <strong style={{ color: C.amber }}>BuT-Anspruch</strong> besteht, kann der Unterricht komplett kostenlos sein.
              </p>
            </div>
            <div style={{ background: C.violet, borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 28, color: "#fff" }}>Erste Stunde: gratis.</div>
              <p style={{ marginTop: 10, fontSize: 15, color: "rgba(255,255,255,0.8)" }}>Für alle Angebote, ohne Vertrag.</p>
              <button className="btn-amber" onClick={() => { setPage("kontakt"); window.scrollTo({ top: 0, behavior: "auto" }); }} style={{ marginTop: 20, alignSelf: "flex-start" }}>
                Jetzt buchen <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* BuT-Hinweis Banner */}
          <div className="reveal clickable" onClick={() => setPage("but")} style={{ marginTop: 18, background: `linear-gradient(135deg, ${C.amberTint}, ${C.bgWarm})`, borderRadius: 20, padding: isMobile ? 24 : 30, border: `1.5px solid ${C.amber}40`, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 15, background: C.amber, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Heart size={28} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 19 : 22, color: C.text }}>Beziehst du Bürgergeld, Wohngeld oder Kinderzuschlag?</h3>
              <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.6, color: C.textDim }}>Dann zahlt das Amt die komplette Nachhilfe — über das Bildungs- und Teilhabepaket. Wir zeigen dir wie.</p>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.amberDk, fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
              Mehr erfahren <ArrowRight size={17} />
            </div>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   ELEARNING PAGE
   ============================================================ */
function ELearningPage({ setPage, isMobile, onOpenDrawer }) {
  useReveal();
  const offers = [
    { key: "videounterricht", icon: Monitor, color: "#0891B2", tint: "#CFFAFE", title: "Video-Unterricht", sub: "Live mit deiner Lehrkraft — direkt von zuhause. Keine voraufgezeichneten Videos." },
    { key: "digitaletafel", icon: Wifi, color: C.violet, tint: C.violetTint, title: "Digitale Tafel", sub: "Formeln, Zeichnungen, Erklärungen — alle sehen dasselbe in Echtzeit." },
    { key: "flexiblezeiten", icon: Calendar, color: "#059669", tint: "#D1FAE5", title: "Flexible Zeiten", sub: "Morgens, abends, am Wochenende. Du bestimmst wann." },
  ];
  return (
    <main>
      <PageHeader isMobile={isMobile} tag="beck-up eLearning" title="Online lernen." accent="Kein Kompromiss." sub="Seit 2020 erprobt — dieselbe Qualität wie vor Ort, von zuhause. Tippe auf eine Karte für alle Details." />
      <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: C.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 18 }}>
            {offers.map((o, i) => (
              <ClickCard key={o.key} drawerKey={o.key} icon={o.icon} color={o.color} tint={o.tint} title={o.title} sub={o.sub} onOpen={onOpenDrawer}
                className={`reveal reveal-delay-${i + 1}`} />
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 56, background: C.bgWarm, borderRadius: 24, padding: isMobile ? 28 : 40, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 24, color: C.text }}>Online ist kein Notbehelf.</h3>
            <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.8, color: C.textDim, maxWidth: 620 }}>
              Wir haben 2020 nicht improvisiert — wir haben investiert. Seitdem ist Online-Teaching bei uns genauso gut wie Präsenz. Viele Schüler bevorzugen es sogar, weil die Anfahrt wegfällt.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Alle Fächer online", "Dieselben Lehrkräfte", "Kein Extra-Equipment nötig", "Für alle Klassen"].map(f => (
                <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999, background: "#CFFAFE", color: "#0891B2", fontSize: 13, fontWeight: 700 }}>
                  <CheckCircle2 size={14} /> {f}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SPORT PAGE
   ============================================================ */
function SportPage({ setPage, isMobile, onOpenDrawer }) {
  useReveal();
  const offers = [
    { key: "tennistraining", icon: Trophy, color: C.amber, tint: C.amberTint, title: "Tennistraining", sub: "Mit lizenzierten Trainern am Hastener TV und INJOY Remscheid." },
    { key: "gruppentraining", icon: Users, color: C.coral, tint: C.coralTint, title: "Gruppentraining", sub: "Sport macht in der Gruppe mehr Spaß. Motivierend und abwechslungsreich." },
    { key: "fitness", icon: Dumbbell, color: C.violet, tint: C.violetTint, title: "Fitness & Bewegung", sub: "Bewegen, wachsen, Spaß haben — für alle Fitnesslevel." },
  ];
  return (
    <main>
      <PageHeader isMobile={isMobile} tag="Sport & Freizeit" title="Bewegen." accent="Gewinnen. Wachsen." sub="Tennis und Training in Remscheid. Tippe auf ein Angebot für alle Details." />
      <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: C.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 18 }}>
            {offers.map((o, i) => (
              <ClickCard key={o.key} drawerKey={o.key} icon={o.icon} color={o.color} tint={o.tint} title={o.title} sub={o.sub} onOpen={onOpenDrawer}
                className={`reveal reveal-delay-${i + 1}`} />
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 56, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 18 }}>
            {[
              { icon: MapPin, title: "Hastener Turnverein 1871 e.V.", text: "Unser Hauptstandort für Tennistraining. Traditionell und gut ausgestattet.", color: C.amber },
              { icon: Trophy, title: "INJOY Remscheid", text: "Modernes Sportcenter mit top Infrastruktur für Fitness und Tennis.", color: C.violet },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: 24, background: C.bgWarm, borderRadius: 18, border: `1px solid ${C.border}` }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color === C.amber ? C.amberTint : C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}><Icon size={24} /></div>
                  <div>
                    <div style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 16, color: C.text }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: C.textDim, marginTop: 6, lineHeight: 1.55 }}>{s.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
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
      <PageHeader isMobile={isMobile} tag="Preise" title="Transparent." accent="Auf Anfrage." sub="Wir nennen dir den Preis ehrlich — kein Kleingedrucktes." />
      <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: C.bg }}>
        <Container style={{ maxWidth: 760 }}>
          <div className="reveal" style={{ background: C.bgWarm, borderRadius: 24, padding: isMobile ? 28 : 40, marginBottom: 24, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 24, color: C.text }}>Warum kein Festpreis?</h2>
            <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.8, color: C.textDim }}>
              Einzel- und Gruppenunterricht kosten unterschiedlich. Klasse 1 und Klasse 13 haben verschiedene Anforderungen. Wir nennen dir einen Preis der stimmt — nach einem kurzen Gespräch.
            </p>
          </div>
          <div className="reveal reveal-delay-1" style={{ background: `linear-gradient(135deg, ${C.amberTint}, #FDE68A)`, borderRadius: 24, padding: isMobile ? 28 : 40, marginBottom: 24, border: `1px solid rgba(217,119,6,0.2)` }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 24, color: C.amberDk }}>BuT — kostenlose Nachhilfe</h2>
            <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.8, color: C.text }}>
              Bürgergeld, Wohngeld oder Kinderzuschlag? Dann hat dein Kind möglicherweise Anspruch auf staatlich finanzierte Nachhilfe. Wir helfen beim Antrag.
            </p>
            <button className="btn-amber" onClick={() => { setPage("kontakt"); window.scrollTo({ top: 0, behavior: "auto" }); }} style={{ marginTop: 20 }}>
              BuT-Beratung anfragen <ArrowRight size={16} />
            </button>
          </div>
          <div className="reveal reveal-delay-2" style={{ background: C.violet, borderRadius: 24, padding: isMobile ? 28 : 40, textAlign: "center" }}>
            <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 36, color: "#fff" }}>Erste Stunde immer gratis.</div>
            <p style={{ marginTop: 12, fontSize: 16, color: "rgba(255,255,255,0.8)" }}>Für alle Angebote, ohne Vertrag, ohne Risiko.</p>
            <button className="btn-amber" onClick={() => { setPage("kontakt"); window.scrollTo({ top: 0, behavior: "auto" }); }} style={{ marginTop: 24 }}>
              Jetzt anfragen <ArrowRight size={16} />
            </button>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   KONTAKT PAGE
   ============================================================ */
const inputSt = {
  width: "100%", padding: "12px 16px", borderRadius: 12,
  background: C.bgWarm, border: `1.5px solid ${C.border}`,
  color: C.text, fontSize: 15, outline: "none",
  transition: "border-color 0.2s",
};
const FAECHER_OPT = ["Mathematik","Deutsch","Englisch","Französisch","Latein","Physik","Chemie","Biologie","Informatik","Geschichte","Sonstiges"];

function ContactForm() {
  const empty = { parent: "", student: "", klasse: "", fach: "", phone: "", email: "", message: "" };
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
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <CheckCircle2 size={48} color={C.green} style={{ margin: "0 auto 16px" }} />
      <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: C.text }}>Danke — wir melden uns!</h3>
      <p style={{ marginTop: 8, color: C.textDim }}>Meistens noch am selben Tag.</p>
      <button className="btn-outline" onClick={() => setStatus("idle")} style={{ marginTop: 20 }}>Noch eine Anfrage</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[["parent","Name (Erziehungsberechtigte/r) *","Vor- und Nachname","text"],
          ["student","Name des Kindes","optional","text"],
          ["phone","Telefon","Für den Rückruf","tel"],
          ["email","E-Mail *","name@beispiel.de","email"]].map(([k,l,p,t]) => (
          <div key={k}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>{l}</label>
            <input type={t} style={inputSt} value={form[k]} onChange={set(k)} placeholder={p}
              onFocus={e => e.target.style.borderColor = C.violet} onBlur={e => e.target.style.borderColor = C.border} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>Klasse</label>
          <select style={{ ...inputSt, cursor: "pointer" }} value={form.klasse} onChange={set("klasse")}>
            <option value="">Bitte wählen</option>
            {Array.from({ length: 13 }, (_, i) => <option key={i + 1} value={`${i + 1}`}>{i + 1}. Klasse</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>Fach</label>
          <select style={{ ...inputSt, cursor: "pointer" }} value={form.fach} onChange={set("fach")}>
            <option value="">Bitte wählen</option>
            {FAECHER_OPT.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>Dein Anliegen *</label>
        <textarea style={{ ...inputSt, minHeight: 120, resize: "vertical" }} value={form.message} onChange={set("message")} placeholder="Was kann beck-up für euch tun?"
          onFocus={e => e.target.style.borderColor = C.violet} onBlur={e => e.target.style.borderColor = C.border} />
      </div>
      {status === "validation" && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, padding: "12px 16px", borderRadius: 10, background: C.coralTint, border: `1px solid ${C.coral}` }}>
          <AlertCircle size={17} color={C.coral} /> <span style={{ fontSize: 14, color: C.coral, fontWeight: 600 }}>Bitte Name, E-Mail und Anliegen ausfüllen.</span>
        </div>
      )}
      {status === "error" && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, padding: "12px 16px", borderRadius: 10, background: C.coralTint }}>
          <AlertCircle size={17} color={C.coral} /> <span style={{ fontSize: 14, color: C.coral, fontWeight: 600 }}>Etwas hat nicht geklappt — ruf uns gerne direkt an.</span>
        </div>
      )}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={submit} style={{ minWidth: 180, justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}>
          {status === "sending" ? "Wird gesendet…" : <><Send size={16} /> Anfrage senden</>}
        </button>
        <span style={{ fontSize: 12, color: C.textDimmer }}>Unverbindlich · Wir antworten persönlich</span>
      </div>
    </div>
  );
}

function KontaktPage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile} tag="Kontakt" title="Lass uns" accent="reden." sub="Ruf an, schreib oder komm vorbei. Erste Stunde gratis." />
      <section style={{ padding: isMobile ? "56px 0 80px" : "72px 0 100px", background: C.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 56, alignItems: "start" }}>
            <div>
              <h3 className="reveal" style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 20, color: C.text, marginBottom: 20 }}>Direkt erreichbar</h3>
              {[
                { icon: Phone, label: "Telefon", value: "+49 2191 71683", href: "tel:+49219171683" },
                { icon: MessageCircle, label: "WhatsApp", value: "+49 177 424 6555", href: "https://wa.me/491774246555" },
                { icon: Mail, label: "E-Mail", value: "info@beck-up.com", href: "mailto:info@beck-up.com" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 18px", borderRadius: 14, marginBottom: 10, background: C.bgWarm, border: `1.5px solid ${C.border}`, transition: "border-color 0.2s, background 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.violet; e.currentTarget.style.background = C.violetTint; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgWarm; }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, flexShrink: 0 }}><Icon size={20} /></div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.textDimmer }}>{c.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </a>
                );
              })}

              <h3 className="reveal" style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 18, color: C.text, margin: "28px 0 14px" }}>Standorte</h3>
              {[
                { tag: "Hauptstandort", street: "Alleestr. 116", city: "42853 Remscheid" },
                { tag: "Zweiter Standort", street: "Alleestr. 29", city: "Remscheid" },
                { tag: "Lennep", street: "Bahnhofstr. 3", city: "42897 Remscheid" },
              ].map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", background: C.bgWarm, borderRadius: 12, marginBottom: 8, border: `1px solid ${C.border}` }}>
                  <MapPin size={17} color={C.violet} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.textDimmer }}>{s.tag}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginTop: 3 }}>{s.street}, {s.city}</div>
                  </div>
                </div>
              ))}

              <div className="reveal" style={{ marginTop: 20, padding: "16px 18px", background: C.bgWarm, borderRadius: 14, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}><Clock size={14} /> Öffnungszeiten</div>
                {[["Mo – Fr","09:00 – 19:00 Uhr"],["Samstag","10:00 – 14:00 Uhr"],["Sonntag","geschlossen"]].map(([d,h]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: d !== "Sonntag" ? `1px solid ${C.border}` : "none", fontSize: 14, color: C.textDim }}>
                    <span>{d}</span><span style={{ fontWeight: 700, color: h === "geschlossen" ? C.textDimmer : C.text }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2" style={{ background: C.bgCard, borderRadius: 24, padding: isMobile ? 24 : 40, border: `1.5px solid ${C.border}`, boxShadow: "0 8px 40px -12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 6 }}>Schreib uns</h3>
              <p style={{ fontSize: 14.5, color: C.textDim, marginBottom: 24 }}>Füll aus was du weißt — den Rest klären wir persönlich.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   LEGAL PAGES
   ============================================================ */
function LegalPage({ title, children, setPage, isMobile }) {
  return (
    <main>
      <section style={{ paddingTop: 120, paddingBottom: 40, background: C.bgWarm, borderBottom: `1px solid ${C.border}` }}>
        <Container><h1 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 36 : 52, color: C.text, letterSpacing: "-0.03em" }}>{title}</h1></Container>
      </section>
      <section style={{ paddingTop: 48, paddingBottom: 80, background: C.bg }}>
        <Container style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 15, lineHeight: 1.85, color: C.textDim }}>{children}</div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

const lH = { fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.text, margin: "30px 0 10px" };
const PH = ({ children }) => <span style={{ background: C.coralTint, color: C.coral, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{children}</span>;

function ImpressumPage({ setPage, isMobile }) {
  return (
    <LegalPage title="Impressum" setPage={setPage} isMobile={isMobile}>
      <h2 style={lH}>Angaben gemäß § 5 DDG</h2>
      <p><PH>[Inhaber:in / Firmenname]</PH><br />beck-up · Alleestraße 116 · <PH>[PLZ]</PH> Remscheid</p>
      <h2 style={lH}>Kontakt</h2>
      <p>Tel: +49 2191 71683 · E-Mail: info@beck-up.com</p>
      <h2 style={lH}>Verantwortlich nach § 18 Abs. 2 MStV</h2>
      <p><PH>[Vor- und Nachname, Anschrift]</PH></p>
      <h2 style={lH}>Streitschlichtung</h2>
      <p>EU-OS-Plattform: <a href="https://ec.europa.eu/consumers/odr/" style={{ color: C.violet }}>ec.europa.eu/consumers/odr</a>. Wir nehmen nicht an Schlichtungsverfahren teil.</p>
    </LegalPage>
  );
}

function DatenschutzPage({ setPage, isMobile }) {
  return (
    <LegalPage title="Datenschutz" setPage={setPage} isMobile={isMobile}>
      <h2 style={lH}>1. Verantwortlicher</h2>
      <p><PH>[Name]</PH> · beck-up · Alleestraße 116 · <PH>[PLZ]</PH> Remscheid · info@beck-up.com</p>
      <h2 style={lH}>2. Hosting</h2>
      <p>Diese Website wird bei Vercel Inc. gehostet. Dabei werden technische Daten (u.a. IP-Adresse) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
      <h2 style={lH}>3. Kontaktformular</h2>
      <p>Formulardaten werden über Web3Forms übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO. Mehr: <a href="https://web3forms.com/privacy" style={{ color: C.violet }}>web3forms.com/privacy</a></p>
      <h2 style={lH}>4. Google Fonts</h2>
      <p>Diese Seite lädt Schriftarten von Google Fonts. Dabei wird die IP-Adresse übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
      <h2 style={lH}>5. Cookies & Tracking</h2>
      <p>Keine Cookies, kein Tracking, kein Profiling.</p>
      <h2 style={lH}>6. Deine Rechte</h2>
      <p>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Übertragbarkeit (Art. 20), Widerspruch (Art. 21 DSGVO). Beschwerden: LDI NRW.</p>
    </LegalPage>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ setPage, isMobile }) {
  const go = key => { setPage(key); window.scrollTo({ top: 0, behavior: "auto" }); };
  return (
    <footer style={{ background: C.text, color: "rgba(255,255,255,0.7)", paddingTop: isMobile ? 48 : 64, paddingBottom: isMobile ? 96 : 48 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? 32 : 48 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "1" }}>
            <div style={{ fontFamily: FF.display, fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 12 }}>
              beck<span style={{ color: C.violetLi }}>-</span>up
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", maxWidth: 250 }}>Bildung, Sport und mehr in Remscheid. Persönlich seit 2003.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[[Phone,"tel:+49219171683",undefined],[MessageCircle,"https://wa.me/491774246555","_blank"],[Mail,"mailto:info@beck-up.com",undefined]].map(([Icon,href,target],i) => (
                <a key={i} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
                  style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.violet; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                  <Icon size={17} />
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
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>{col.title}</div>
              {col.links.map(([key,label]) => (
                <button key={label} onClick={() => go(key)} style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 9, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} beck-up · Remscheid</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Live, online und mit der richtigen Atmosphäre.</span>
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
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, height: "calc(60px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)", background: "rgba(253,250,246,0.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      <a href="tel:+49219171683" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: C.textDim, minWidth: 64 }}>
        <Phone size={21} /><span style={{ fontSize: 10, fontWeight: 700 }}>Anrufen</span>
      </a>
      <a href="https://wa.me/491774246555" target="_blank" rel="noopener noreferrer"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 52, height: 52, marginTop: -10, borderRadius: "50%", background: C.violet, color: "#fff", justifyContent: "center", boxShadow: "0 8px 20px -4px rgba(109,40,217,0.5)" }}>
        <MessageCircle size={22} /><span style={{ fontSize: 9, fontWeight: 800 }}>WhatsApp</span>
      </a>
      <button onClick={() => setPage("kontakt")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: C.textDim, minWidth: 64 }}>
        <Mail size={21} /><span style={{ fontSize: 10, fontWeight: 700 }}>Schreiben</span>
      </button>
    </div>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const [drawer, setDrawer] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [page]);

  const openDrawer = useCallback(key => {
    const data = DRAWER_DATA[key];
    if (data) setDrawer(data);
  }, []);

  const closeDrawer = useCallback(() => setDrawer(null), []);

  const props = { setPage, isMobile, onOpenDrawer: openDrawer };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav page={page} setPage={setPage} isMobile={isMobile} />

      {page === "home"        && <Home {...props} />}
      {page === "learning"    && <LearningPage {...props} />}
      {page === "elearning"   && <ELearningPage {...props} />}
      {page === "sport"       && <SportPage {...props} />}
      {page === "preise"      && <PreisePage {...props} />}
      {page === "kontakt"     && <KontaktPage {...props} />}
      {page === "impressum"   && <ImpressumPage {...props} />}
      {page === "datenschutz" && <DatenschutzPage {...props} />}
      {page === "buchen"      && <BuchungPage {...props} />}
      {page === "but"         && <ButPage {...props} />}

      {drawer && <Drawer item={drawer} onClose={closeDrawer} />}
      {isMobile && <MobileBar setPage={setPage} />}
    </>
  );
}

/* ============================================================
   BUCHUNGSSEITE — Terminbuchung (Cal.com Integration)
   ============================================================ */

// Cal.com Platzhalter-URL — hier echten Link eintragen:
const CAL_URL = "https://cal.com/beck-up/probestunde";

const BUCHUNGS_BEREICHE = [
  {
    id: "learning",
    icon: BookOpen,
    color: C.violet,
    tint: C.violetTint,
    title: "Learning",
    sub: "Nachhilfe vor Ort",
    faecher: ["Mathematik","Deutsch","Englisch","Physik","Chemie","Biologie","Geschichte","Latein","Französisch","Spanisch","Informatik","Sonstiges"],
  },
  {
    id: "elearning",
    icon: Monitor,
    color: "#0891B2",
    tint: "#CFFAFE",
    title: "eLearning",
    sub: "Online-Unterricht",
    faecher: ["Mathematik","Deutsch","Englisch","Physik","Chemie","Biologie","Geschichte","Latein","Französisch","Spanisch","Informatik","Sonstiges"],
  },
  {
    id: "sport",
    icon: Trophy,
    color: C.amber,
    tint: C.amberTint,
    title: "Sport & Freizeit",
    sub: "Tennis & Training",
    faecher: ["Tennistraining Einzel","Tennistraining Gruppe","Fitness","Sonstiges"],
  },
];

function BuchungStep({ n, label, active, done }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: active || done ? 1 : 0.4, transition: "opacity 0.3s" }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        background: done ? C.green : active ? C.violet : C.border,
        color: done || active ? "#fff" : C.textDim,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 14,
        transition: "background 0.3s",
      }}>
        {done ? <CheckCircle2 size={18} /> : n}
      </div>
      <span style={{ fontSize: 13, fontWeight: done || active ? 700 : 500, color: active ? C.violet : done ? C.green : C.textDim }}>
        {label}
      </span>
    </div>
  );
}

function BuchungPage({ setPage, isMobile }) {
  const [step, setStep] = useState(1); // 1=Bereich, 2=Fach, 3=Kalender
  const [bereich, setBereich] = useState(null);
  const [fach, setFach] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [launched, setLaunched] = useState(false);

  const selectedBereich = BUCHUNGS_BEREICHE.find(b => b.id === bereich);

  const goToCalendly = () => {
    setLaunched(true);
    const params = new URLSearchParams({ name, email, notes: `Bereich: ${bereich}, Fach: ${fach}` });
    window.open(`${CAL_URL}?${params.toString()}`, "_blank");
  };

  return (
    <main>
      {/* Header */}
      <section style={{ paddingTop: isMobile ? 100 : 136, paddingBottom: isMobile ? 36 : 48, background: `linear-gradient(180deg, ${C.bgWarm} 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <Container>
          <span className="tag" style={{ background: C.violetTint, color: C.violet, border: `1px solid rgba(109,40,217,0.2)`, marginBottom: 18, display: "inline-flex" }}>
            Kostenlose Probestunde
          </span>
          <h1 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 36 : 56, letterSpacing: "-0.03em", color: C.text, lineHeight: 1.07 }}>
            Termin wählen.<br /><span className="g-text">Einfach & schnell.</span>
          </h1>
          <p style={{ marginTop: 16, maxWidth: 480, fontSize: 17, lineHeight: 1.65, color: C.textDim }}>
            Wähle deinen Bereich, dein Fach und deinen Wunschtermin. Die erste Stunde ist komplett kostenlos.
          </p>
        </Container>
      </section>

      <section style={{ padding: isMobile ? "40px 0 80px" : "64px 0 100px", background: C.bg }}>
        <Container style={{ maxWidth: 820 }}>

          {/* Stepper */}
          <div style={{ display: "flex", gap: isMobile ? 16 : 32, alignItems: "center", marginBottom: 40, flexWrap: "wrap" }}>
            <BuchungStep n={1} label="Bereich wählen" active={step === 1} done={step > 1} />
            <div style={{ flex: 1, height: 2, background: step > 1 ? C.green : C.border, minWidth: 20, transition: "background 0.5s", borderRadius: 2 }} />
            <BuchungStep n={2} label="Fach & Infos" active={step === 2} done={step > 2} />
            <div style={{ flex: 1, height: 2, background: step > 2 ? C.green : C.border, minWidth: 20, transition: "background 0.5s", borderRadius: 2 }} />
            <BuchungStep n={3} label="Termin buchen" active={step === 3} done={launched} />
          </div>

          {/* ── SCHRITT 1: Bereich wählen ── */}
          {step === 1 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 28, color: C.text, marginBottom: 8 }}>
                Für welchen Bereich interessierst du dich?
              </h2>
              <p style={{ fontSize: 15, color: C.textDim, marginBottom: 28 }}>Tippe auf eine Karte um weiterzugehen.</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                {BUCHUNGS_BEREICHE.map(b => {
                  const Icon = b.icon;
                  return (
                    <div key={b.id}
                      className="clickable"
                      onClick={() => { setBereich(b.id); setStep(2); }}
                      style={{ background: C.bgCard, border: `2px solid ${bereich === b.id ? b.color : C.border}`, borderRadius: 20, overflow: "hidden" }}
                    >
                      <div style={{ height: 5, background: b.color }} />
                      <div style={{ padding: 24 }}>
                        <div style={{ width: 50, height: 50, borderRadius: 14, background: b.tint, display: "flex", alignItems: "center", justifyContent: "center", color: b.color, marginBottom: 16 }}>
                          <Icon size={26} />
                        </div>
                        <div style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 20, color: C.text }}>{b.title}</div>
                        <div style={{ fontSize: 14, color: C.textDim, marginTop: 4 }}>{b.sub}</div>
                        <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, color: b.color, fontWeight: 700, fontSize: 13 }}>
                          Auswählen <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SCHRITT 2: Fach + Name/Email ── */}
          {step === 2 && selectedBereich && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <button onClick={() => setStep(1)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: C.textDim, fontWeight: 600, marginBottom: 28, background: "none", border: "none", cursor: "pointer" }}>
                ← Zurück
              </button>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 28, color: C.text, marginBottom: 8 }}>
                Welches Fach? Und wer bist du?
              </h2>
              <p style={{ fontSize: 15, color: C.textDim, marginBottom: 28 }}>
                Diese Angaben helfen uns, den richtigen Tutor für dich zu finden.
              </p>

              <div style={{ display: "grid", gap: 16 }}>
                {/* Fach */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 10 }}>
                    Fach / Bereich *
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selectedBereich.faecher.map(f => (
                      <button key={f}
                        onClick={() => setFach(f)}
                        style={{
                          padding: "9px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
                          background: fach === f ? selectedBereich.color : C.bgWarm,
                          color: fach === f ? "#fff" : C.textDim,
                          border: `2px solid ${fach === f ? selectedBereich.color : C.border}`,
                          transition: "all 0.2s",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginTop: 8 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>Dein Name *</label>
                    <input
                      style={{ ...{width:"100%",padding:"12px 16px",borderRadius:12,background:C.bgWarm,border:`1.5px solid ${C.border}`,color:C.text,fontSize:15,outline:"none"} }}
                      placeholder="Vor- und Nachname"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={e => e.target.style.borderColor = C.violet}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: C.textDim, display: "block", marginBottom: 6 }}>E-Mail *</label>
                    <input
                      type="email"
                      style={{ ...{width:"100%",padding:"12px 16px",borderRadius:12,background:C.bgWarm,border:`1.5px solid ${C.border}`,color:C.text,fontSize:15,outline:"none"} }}
                      placeholder="name@beispiel.de"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={e => e.target.style.borderColor = C.violet}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>
                </div>

                {/* Info-Box */}
                <div style={{ padding: "14px 18px", borderRadius: 14, background: C.violetTint, border: `1px solid rgba(109,40,217,0.2)`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={18} color={C.violet} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.violet, fontWeight: 500 }}>
                    Die erste Stunde ist <strong>100% kostenlos</strong> — kein Vertrag, kein Risiko. Du wählst im nächsten Schritt deinen Wunschtermin direkt im Kalender.
                  </p>
                </div>

                <button
                  className="btn-primary"
                  disabled={!fach || !name || !email}
                  onClick={() => setStep(3)}
                  style={{ alignSelf: "flex-start", opacity: (!fach || !name || !email) ? 0.5 : 1, cursor: (!fach || !name || !email) ? "not-allowed" : "pointer" }}
                >
                  Weiter zum Termin <ArrowRight size={17} />
                </button>
              </div>
            </div>
          )}

          {/* ── SCHRITT 3: Termin buchen ── */}
          {step === 3 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: C.textDim, fontWeight: 600, marginBottom: 28, background: "none", border: "none", cursor: "pointer" }}>
                ← Zurück
              </button>

              {/* Zusammenfassung */}
              <div style={{ background: C.bgWarm, borderRadius: 20, padding: 24, border: `1px solid ${C.border}`, marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.textDimmer, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 14 }}>Deine Auswahl</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { label: "Bereich", value: selectedBereich?.title },
                    { label: "Fach", value: fach },
                    { label: "Name", value: name },
                  ].map(i => (
                    <div key={i.label}>
                      <div style={{ fontSize: 12, color: C.textDimmer, fontWeight: 600 }}>{i.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 3 }}>{i.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kalender-Mockup */}
              {!launched ? (
                <div style={{ textAlign: "center", padding: isMobile ? "36px 20px" : "56px 40px", background: C.bgCard, borderRadius: 24, border: `2px dashed ${C.border}` }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", animation: "float 3s ease-in-out infinite" }}>
                    <Calendar size={36} color={C.violet} />
                  </div>
                  <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 28, color: C.text }}>
                    Jetzt freien Termin wählen
                  </h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.65, color: C.textDim, maxWidth: 400, margin: "12px auto 0" }}>
                    Der Kalender öffnet in einem neuen Fenster. Du siehst sofort welche Zeiten frei sind und kannst direkt buchen.
                  </p>

                  {/* Fake Slot-Vorschau */}
                  <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {["Mo 09:00","Mo 14:00","Di 10:00","Di 16:00","Mi 09:00","Mi 15:00","Do 11:00","Fr 14:00"].map((slot, i) => (
                      <div key={slot} style={{
                        padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                        background: i % 3 === 0 ? C.violetTint : i % 3 === 1 ? C.amberTint : C.greenTint,
                        color: i % 3 === 0 ? C.violet : i % 3 === 1 ? C.amber : C.green,
                        border: `1px solid ${i % 3 === 0 ? "rgba(109,40,217,0.2)" : i % 3 === 1 ? "rgba(217,119,6,0.2)" : "rgba(5,150,105,0.2)"}`,
                        animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}>
                        {slot} ✓
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: 12, fontSize: 12, color: C.textDimmer }}>Beispiel-Vorschau · echte Termine im Kalender</p>

                  <button className="btn-primary" onClick={goToCalendly} style={{ marginTop: 28, fontSize: 16, padding: "15px 32px" }}>
                    <Calendar size={18} /> Kalender öffnen & Termin wählen
                  </button>
                  <p style={{ marginTop: 10, fontSize: 12, color: C.textDimmer }}>Öffnet in einem neuen Fenster</p>
                </div>
              ) : (
                /* Nach dem Klick */
                <div style={{ textAlign: "center", padding: isMobile ? "36px 20px" : "56px 40px", background: C.greenTint, borderRadius: 24, border: `2px solid rgba(5,150,105,0.3)` }}>
                  <CheckCircle2 size={52} color={C.green} style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 26, color: C.text }}>Fast geschafft!</h3>
                  <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.65, color: C.textDim, maxWidth: 400, margin: "10px auto 0" }}>
                    Der Kalender sollte sich geöffnet haben. Wähle dort deinen Wunschtermin aus — du bekommst eine Bestätigung per E-Mail.
                  </p>
                  <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" onClick={goToCalendly}>
                      Kalender nochmal öffnen <ArrowRight size={16} />
                    </button>
                    <button className="btn-outline" onClick={() => setPage("home")} style={{ color: C.green, borderColor: C.green }}>
                      Zur Startseite
                    </button>
                  </div>
                  <p style={{ marginTop: 16, fontSize: 13, color: C.textDimmer }}>
                    Probleme? Ruf uns an: <a href="tel:+49219171683" style={{ color: C.violet, fontWeight: 700 }}>+49 2191 71683</a>
                  </p>
                </div>
              )}
            </div>
          )}

        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   BUT PAGE — Bildung & Teilhabe
   ============================================================ */
const BUT_BERECHTIGTE = [
  { icon: Heart, title: "Bürgergeld", text: "Empfänger von Bürgergeld (SGB II). Hier gilt das Bildungspaket über den Hauptantrag automatisch als mitbeantragt.", stelle: "Jobcenter Remscheid" },
  { icon: Users, title: "Wohngeld", text: "Familien, die Wohngeld beziehen. Der Antrag läuft über die Wohngeldstelle der Stadt.", stelle: "Stadt Remscheid" },
  { icon: GraduationCap, title: "Kinderzuschlag", text: "Wer Kinderzuschlag bekommt, hat ebenfalls Anspruch — beantragt wird bei der Stadt.", stelle: "Stadt Remscheid" },
  { icon: Shield, title: "Sozialhilfe & AsylbLG", text: "Empfänger von Sozialhilfe (SGB XII) oder Leistungen nach dem Asylbewerberleistungsgesetz.", stelle: "Fachdienst Soziales" },
];

const BUT_SCHRITTE = [
  { n: 1, title: "Anspruch prüfen", text: "Beziehst du eine der oben genannten Leistungen? Dann steht deinem Kind die Lernförderung zu. Im Zweifel: einfach bei uns nachfragen, wir helfen beim Einordnen." },
  { n: 2, title: "Schule bestätigt den Bedarf", text: "Die Schule füllt die Anlage D aus und bestätigt, dass zusätzliche Förderung nötig ist — etwa weil die Versetzung wackelt oder eine Lese-Rechtschreib-Schwäche vorliegt." },
  { n: 3, title: "Antrag bei der richtigen Stelle", text: "Bei Bürgergeld läuft alles übers Jobcenter Remscheid. Bei Wohngeld oder Kinderzuschlag gehst du zur Stadt. Welche Stelle für dich gilt, steht oben bei den Leistungen." },
  { n: 4, title: "Wir übernehmen den Rest", text: "Ist der Antrag bewilligt, rechnen wir direkt mit dem Amt ab. Für dich entstehen keine Kosten — dein Kind bekommt einfach die Nachhilfe, die es braucht." },
];

// Echte Remscheid-Formulare
const BUT_FORMULARE = [
  { name: "Grundantrag Bildung & Teilhabe", desc: "Das Hauptformular — hiermit beantragst du alle Leistungen.", url: "https://www.remscheid.de/vv/produkte/1.44/146380100000024009.php.media/9002/Grundantrag.pdf", typ: "PDF" },
  { name: "Info-Seite Stadt Remscheid", desc: "Alle Anlagen, Ansprechpartner und aktuelle Hinweise der Stadt.", url: "https://www.remscheid.de/vv/produkte/2.50/146380100000024309.php", typ: "Web" },
  { name: "Jobcenter Remscheid — BuT", desc: "Für Bürgergeld-Empfänger: Infos und Nachweise des Jobcenters.", url: "https://www.jobcenter-remscheid.de/bildung-und-teilhabe.html", typ: "Web" },
];

function ButPage({ setPage, isMobile }) {
  useReveal();
  return (
    <main>
      <PageHeader isMobile={isMobile} tag="Bildung & Teilhabe" title="Nachhilfe, die der Staat bezahlt." accent="Wirklich." sub="Viele Familien wissen nicht, dass ihnen Lernförderung zusteht — komplett kostenlos. Wir zeigen dir, wie du rankommst, und helfen beim Antrag." />

      {/* Was ist BuT */}
      <section style={{ padding: isMobile ? "48px 0" : "72px 0", background: C.bg }}>
        <Container>
          <div className="reveal" style={{ maxWidth: 760 }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 38, letterSpacing: "-0.02em", color: C.text, lineHeight: 1.15 }}>
              Was steckt dahinter?
            </h2>
            <p style={{ marginTop: 18, fontSize: isMobile ? 16 : 17.5, lineHeight: 1.8, color: C.textDim }}>
              Das Bildungs- und Teilhabepaket — kurz BuT — sorgt dafür, dass kein Kind benachteiligt wird, nur weil zuhause das Geld knapp ist. Dazu gehört auch Nachhilfe. Wenn dein Kind in der Schule hängt und ihr Anspruch habt, übernimmt das Amt die Kosten für die Lernförderung. Vollständig.
            </p>
            <p style={{ marginTop: 14, fontSize: isMobile ? 16 : 17.5, lineHeight: 1.8, color: C.textDim }}>
              Das Beste daran: Wir sind anerkannter Anbieter. Du musst nichts vorstrecken, nichts einreichen, nichts zurückfordern. Der Antrag ist gestellt, wir machen den Rest.
            </p>
          </div>
        </Container>
      </section>

      {/* Wer hat Anspruch */}
      <section style={{ padding: isMobile ? "48px 0" : "72px 0", background: C.bgWarm }}>
        <Container>
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="tag" style={{ background: C.violetTint, color: C.violet, border: `1px solid rgba(109,40,217,0.2)`, marginBottom: 16, display: "inline-flex" }}>Anspruch</span>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 38, letterSpacing: "-0.02em", color: C.text }}>
              Wer bekommt die Förderung?
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: C.textDim, maxWidth: 600 }}>
              Beziehst du eine dieser Leistungen, hat dein Kind Anspruch. Die Lernförderung gilt für Schüler bis 25 Jahre, solange sie zur Schule gehen.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {BUT_BERECHTIGTE.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 26, display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, flexShrink: 0 }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.text }}>{b.title}</h3>
                    <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.65, color: C.textDim }}>{b.text}</p>
                    <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: C.bgWarm, border: `1px solid ${C.border}`, fontSize: 12.5, fontWeight: 700, color: C.violet }}>
                      <MapPin size={13} /> {b.stelle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* So beantragst du es */}
      <section style={{ padding: isMobile ? "48px 0" : "72px 0", background: C.bg }}>
        <Container>
          <div className="reveal" style={{ marginBottom: 40 }}>
            <span className="tag" style={{ background: C.amberTint, color: C.amber, border: `1px solid rgba(217,119,6,0.2)`, marginBottom: 16, display: "inline-flex" }}>In 4 Schritten</span>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 38, letterSpacing: "-0.02em", color: C.text }}>
              So kommst du an die Lernförderung.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 18 }}>
            {BUT_SCHRITTE.map((s, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`} style={{ background: C.bgWarm, borderRadius: 20, padding: 28, border: `1px solid ${C.border}`, position: "relative" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.violet, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 900, fontSize: 20, marginBottom: 16 }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.text }}>{s.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.7, color: C.textDim }}>{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulare Download */}
      <section style={{ padding: isMobile ? "48px 0" : "72px 0", background: C.bgWarm }}>
        <Container>
          <div className="reveal" style={{ marginBottom: 32 }}>
            <span className="tag" style={{ background: C.greenTint, color: C.green, border: `1px solid rgba(5,150,105,0.2)`, marginBottom: 16, display: "inline-flex" }}>Download</span>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 28 : 38, letterSpacing: "-0.02em", color: C.text }}>
              Formulare & Anträge.
            </h2>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: C.textDim, maxWidth: 600 }}>
              Hier kommst du direkt zu den offiziellen Unterlagen der Stadt Remscheid. Lad sie dir runter, druck sie aus — oder bring sie mit, wir füllen sie zusammen aus.
            </p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {BUT_FORMULARE.map((f, i) => (
              <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ display: "flex", gap: 18, alignItems: "center", padding: isMobile ? "18px 20px" : "22px 26px", borderRadius: 18, background: C.bgCard, border: `1.5px solid ${C.border}`, transition: "border-color 0.2s, transform 0.2s", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.violet; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: f.typ === "PDF" ? C.coralTint : C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: f.typ === "PDF" ? C.coral : C.violet, flexShrink: 0 }}>
                  {f.typ === "PDF" ? <BookOpen size={24} /> : <Globe size={24} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 16 : 18, color: C.text }}>{f.name}</h3>
                    <span style={{ padding: "3px 9px", borderRadius: 6, background: f.typ === "PDF" ? C.coralTint : C.violetTint, color: f.typ === "PDF" ? C.coral : C.violet, fontSize: 11, fontWeight: 800, letterSpacing: "0.5px" }}>{f.typ}</span>
                  </div>
                  <p style={{ marginTop: 4, fontSize: 14, lineHeight: 1.5, color: C.textDim }}>{f.desc}</p>
                </div>
                <div style={{ flexShrink: 0, color: C.violet }}>
                  <ArrowUpRight size={22} />
                </div>
              </a>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: C.textDimmer, lineHeight: 1.6 }}>
            Hinweis: Die Formulare werden von der Stadt Remscheid bereitgestellt. Welche genau du brauchst, hängt von deiner Leistung ab — frag uns einfach, wir kennen den Weg.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "56px 0" : "88px 0", background: C.violet }}>
        <Container>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 30 : 46, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.12 }}>
              Unsicher, ob's bei euch klappt?
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.82)" }}>
              Ruf an oder schreib uns. Wir schauen gemeinsam, ob ihr Anspruch habt, und begleiten dich durch den ganzen Antrag — ohne Behörden-Kauderwelsch.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <a href="tel:+49219171683" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "#fff", color: C.violet, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
                <Phone size={18} /> +49 2191 71683
              </a>
              <a href="https://wa.me/491774246555" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 16, border: "1.5px solid rgba(255,255,255,0.4)", textDecoration: "none" }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer setPage={setPage} isMobile={isMobile} />
    </main> 
  );
}
