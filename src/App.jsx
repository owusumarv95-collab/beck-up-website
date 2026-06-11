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
    box-shadow: 0 20px 48px -12px rgba(109,40,217,0.18);
    border-color: ${C.violetLi} !important;
  }
  .clickable:active { transform: translateY(-1px); }

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
  .btn-primary:hover { background: ${C.violetDk}; transform: translateY(-2px); box-shadow: 0 12px 32px -6px rgba(109,40,217,0.45); }
  .btn-primary:active { transform: translateY(0); }

  .btn-amber {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 12px;
    font-weight: 700; font-size: 15px;
    background: ${C.amber}; color: #fff;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    border: none; cursor: pointer;
  }
  .btn-amber:hover { background: ${C.amberDk}; transform: translateY(-2px); box-shadow: 0 12px 32px -6px rgba(217,119,6,0.45); }

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

  /* Drawer backdrop */
  .drawer-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(28,25,23,0.45);
    backdrop-filter: blur(4px);
    animation: backdropFadeIn 0.3s ease forwards;
  }
  .drawer-backdrop.closing {
    animation: fadeIn 0.25s ease reverse forwards;
  }

  /* Drawer panel */
  .drawer-panel {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: min(560px, 100vw);
    background: ${C.bgCard};
    z-index: 201;
    overflow-y: auto;
    animation: drawerSlideIn 0.4s cubic-bezier(.32,.72,0,1) forwards;
  }
  .drawer-panel.closing {
    animation: drawerSlideOut 0.3s cubic-bezier(.4,0,1,1) forwards;
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
      {/* Backdrop — click to close */}
      <div className={`drawer-backdrop${closing ? " closing" : ""}`} onClick={close} />

      {/* Panel */}
      <div className={`drawer-panel${closing ? " closing" : ""}`} ref={panelRef}>
        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.tint, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
              <item.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.textDimmer }}>{item.parent}</div>
              <div style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 18, color: C.text }}>{item.title}</div>
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
          <p style={{ fontSize: 17, lineHeight: 1.75, color: C.textDim, fontWeight: 400 }}>{item.description}</p>

          {/* Was ist das */}
          {item.what && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <Lightbulb size={18} color={item.color} /> Was ist das?
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: C.textDim }}>{item.what}</p>
            </div>
          )}

          {/* Vorteile */}
          {item.benefits && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <TrendingUp size={18} color={item.color} /> Vorteile
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 12, background: C.bgWarm, border: `1px solid ${C.border}` }}>
                    <CheckCheck size={18} color={item.color} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14.5, lineHeight: 1.6, color: C.text }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ablauf */}
          {item.steps && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Target size={18} color={item.color} /> So läuft's ab
              </h3>
              <div style={{ position: "relative", paddingLeft: 28 }}>
                <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${item.color}, transparent)` }} />
                {item.steps.map((s, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                    <div style={{ position: "absolute", left: -28, top: 2, width: 18, height: 18, borderRadius: "50%", background: item.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{i + 1}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{s.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: C.textDim, marginTop: 4 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Was wird benötigt */}
          {item.requirements && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 16, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Shield size={18} color={item.color} /> Was wird benötigt?
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

          {/* CTA */}
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="tel:+49219171683" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              <Phone size={17} /> Jetzt anfragen
            </a>
            <a href="https://wa.me/491774246555" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ flex: 1, justifyContent: "center" }}>
              <MessageCircle size={17} /> WhatsApp
            </a>
          </div>
          <p style={{ marginTop: 12, fontSize: 12, color: C.textDimmer, textAlign: "center" }}>Erste Stunde kostenlos · Unverbindlich</p>
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
function ClickCard({ drawerKey, icon: Icon, color, tint, title, sub, hint = "Mehr erfahren", onOpen, children, style, className }) {
  return (
    <div
      className={`clickable${className ? ` ${className}` : ""}`}
      onClick={() => onOpen(drawerKey)}
      style={{ background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 20, overflow: "hidden", ...style }}
    >
      {children || (
        <div style={{ padding: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: tint, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 18 }}>
            <Icon size={26} />
          </div>
          <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.text, lineHeight: 1.25 }}>{title}</h3>
          <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65, color: C.textDim }}>{sub}</p>
          <div style={{ marginTop: 16 }}>
            <span className="chip-hint"><MousePointer size={12} />{hint}</span>
          </div>
        </div>
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
              <button className="btn-primary" onClick={() => go("kontakt")} style={{ padding: "10px 20px", fontSize: 14 }}>
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
              <button className="btn-primary" onClick={() => go("kontakt")} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
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
                <button className="btn-outline" onClick={() => setPage("kontakt")}>Kostenlose Probestunde</button>
              </div>
            </div>

            {/* Hero card stack */}
            <div className="reveal reveal-delay-2" style={{ position: "relative", minHeight: isMobile ? "auto" : 340 }}>
              {!isMobile && (
                <>
                  {/* Background card */}
                  <div style={{ position: "absolute", top: 20, right: 0, width: "92%", background: C.bgAccent, borderRadius: 24, height: 280, border: `1px solid ${C.border}`, transform: "rotate(2deg)" }} />
                  {/* Main card */}
                  <div style={{ position: "relative", background: C.bgCard, borderRadius: 24, padding: 28, border: `1px solid ${C.border}`, boxShadow: "0 24px 64px -16px rgba(0,0,0,0.12)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", color: C.violet, fontFamily: FF.display, fontWeight: 900, fontSize: 17 }}>A</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Amelie</div>
                        <div style={{ fontSize: 12, color: C.textDim }}>Google-Rezension ⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <p style={{ fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: C.textDim }}>„Super gute Nachhilfe sowohl live als auch online! Vor allem die Abiturvorbereitung kann ich nur empfehlen. Danke Andy!"</p>
                    <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Mathe", "Deutsch", "Englisch", "Abitur"].map(t => (
                        <span key={t} style={{ padding: "5px 12px", borderRadius: 999, background: C.violetTint, color: C.violet, fontSize: 12, fontWeight: 700 }}>{t}</span>
                      ))}
                    </div>
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

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {[
              { key: "learning", icon: BookOpen, color: C.violet, tint: C.violetTint, title: "Learning", sub: "Persönliche Nachhilfe Klasse 1–13. Einzel, Gruppe, Abi-Night.", cta: () => setPage("learning") },
              { key: "elearning", icon: Globe, color: "#0891B2", tint: "#CFFAFE", title: "eLearning", sub: "Dieselbe Qualität, von zuhause. Video-Unterricht seit 2020.", cta: () => setPage("elearning") },
              { key: "sport", icon: Dumbbell, color: C.amber, tint: C.amberTint, title: "Sport & Freizeit", sub: "Tennis, Gruppentraining und Fitness in Remscheid.", cta: () => setPage("sport") },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={b.key} className={`clickable reveal reveal-delay-${i + 1}`} onClick={b.cta}
                  style={{ background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 22, overflow: "hidden" }}>
                  <div style={{ height: 6, background: b.color }} />
                  <div style={{ padding: 28 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: b.tint, display: "flex", alignItems: "center", justifyContent: "center", color: b.color, marginBottom: 18 }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: C.text }}>{b.title}</h3>
                    <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.65, color: C.textDim }}>{b.sub}</p>
                    <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6, color: b.color, fontWeight: 700, fontSize: 14 }}>
                      Mehr erfahren <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* ── STIMMEN ── */}
      <section style={{ padding: isMobile ? "64px 0" : "96px 0", background: C.bgWarm }}>
        <Container>
          <div className="reveal" style={{ marginBottom: 40, textAlign: "center" }}>
            <h2 style={{ fontFamily: FF.display, fontWeight: 900, fontSize: isMobile ? 32 : 44, letterSpacing: "-0.03em", color: C.text }}>
              Was unsere <span className="g-text">Community sagt.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 18 }}>
            {[
              { name: "Amelie", role: "Google-Rezension", text: "Super gute Nachhilfe sowohl live als auch online! Vor allem die Abiturvorbereitung kann ich nur empfehlen. Danke Andy!" },
              { name: "Luis", role: "Gruppennachhilfe online", text: "Die Aufgaben nochmals durchzugehen, war sehr gut für das Verständnis. Sehr gute Stunde." },
              { name: "Daniel", role: "Einzel-Teaching online", text: "Ausführlich, nicht zu schnell und gut strukturiert." },
              { name: "Pia", role: "Einzel-Teaching online", text: "Gute Alternative in dieser Zeit! Hat mir sehr geholfen, danke 🙂" },
              { name: "Mohamad Y.", role: "Abi-Night", text: "Es war sehr gut und hilfreich! Ich hoffe wir können es mehrmals wiederholen." },
            ].slice(0, isMobile ? 3 : 5).map((r, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {Array(5).fill(0).map((_, s) => <Star key={s} size={15} fill={C.amber} color={C.amber} />)}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: C.textDim, fontStyle: "italic" }}>„{r.text}"</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.violetTint, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800, color: C.violet, fontSize: 15 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.textDimmer }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

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

      {drawer && <Drawer item={drawer} onClose={closeDrawer} />}
      {isMobile && <MobileBar setPage={setPage} />}
    </>
  );
}
