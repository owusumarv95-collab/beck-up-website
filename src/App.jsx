import React, { useState, useEffect, useRef } from "react";
import {
  Phone, MessageCircle, Mail, ArrowRight, ArrowUp, Menu, X, Check,
  ChevronDown, MapPin, Clock, Send, GraduationCap, Users, User, Laptop,
  Sparkles, PartyPopper, CheckCircle2, AlertCircle, Quote,
} from "lucide-react";

/* ============================================================
   DESIGN-SYSTEM
   ============================================================ */
const C = {
  bg: "#FFFFFF",        bgAlt: "#F8F9FC",
  surface: "#FFFFFF",   border: "#E2E8F0",   borderHi: "#CBD5E0",

  primary: "#1A1A2E",   primaryDk: "#0D0D1A", primaryLi: "#2D2D4E",
  primaryTint: "#EEEEF5",

  accent: "#E94560",    accentDk: "#C73050",  accentLi: "#FF6B84",
  accentTint: "#FDEEF1",

  gold: "#F5A623",      goldDk: "#D4891A",    goldLi: "#FFB94A",
  goldTint: "#FEF3DC",

  text: "#2D3748",      textDim: "#718096",   textVeryDim: "#A0AEC0",
  textHi: "#1A202C",
};

const FF = {
  display: '"Bricolage Grotesque", system-ui, sans-serif',
  body: '"Manrope", system-ui, sans-serif',
  serif: '"Fraunces", Georgia, serif',
};

const MAXW = 1180;
const SHADOW_SM = "0 2px 10px -3px rgba(26,26,46,0.10)";
const SHADOW_MD = "0 14px 32px -12px rgba(26,26,46,0.18)";
const SHADOW_LG = "0 28px 54px -18px rgba(26,26,46,0.26)";
const CLIP = "polygon(0 0, 100% 3%, 100% 100%, 0 97%)";

/* ---- Kontaktdaten (zentral) ---- */
const TEL = "+49 2191 71683";
const TEL_HREF = "tel:+49219171683";
const MOBIL = "+49 177 424 6555";
const WA_HREF = "https://wa.me/491774246555";
const MAIL = "info@beck-up.com";
const MAIL_HREF = "mailto:info@beck-up.com";
const WEB3FORMS_KEY = "DEIN_WEB3FORMS_KEY";

const STANDORTE = [
  { tag: "Hauptstandort", street: "Alleestr. 116", city: "Remscheid" },
  { tag: "Standort", street: "Alleestr. 29", city: "Remscheid" },
  { tag: "Remscheid-Lennep", street: "Bahnhofstr. 3", city: "Remscheid" },
];

const FAECHER = [
  "Mathematik", "Deutsch", "Englisch", "Französisch", "Latein", "Spanisch",
  "Physik", "Chemie", "Biologie", "Informatik", "Geschichte", "Erdkunde",
  "Politik / SoWi", "Wirtschaft", "Rechnungswesen", "BWL / VWL",
];

const FADEN = [
  { id: "hero", label: "Start", target: "scroll-hero" },
  { id: "warum", label: "Warum wir?", target: "scroll-warum" },
  { id: "angebote", label: "Angebote", target: "scroll-angebote" },
  { id: "but", label: "Förderung", target: "scroll-but" },
  { id: "ablauf", label: "So geht's", target: "scroll-ablauf" },
  { id: "kontakt", label: "Kontakt", target: "scroll-kontakt" },
];

/* ============================================================
   GLOBAL CSS (Reset + Keyframes + Hover-Utilities)
   ============================================================ */
const GLOBAL_CSS = `
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; padding: 0;
  background: ${C.bg}; color: ${C.text};
  font-family: ${FF.body};
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
a { text-decoration: none; color: inherit; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
input, select, textarea { font-family: inherit; }
::selection { background: ${C.accent}; color: #fff; }
:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; border-radius: 3px; }

.bu-btn { transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease, color .2s ease; }
.bu-btn:hover { transform: translateY(-2px); }
.bu-btn:active { transform: translateY(0); }

.bu-card { transition: transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s ease, border-color .25s ease; }
.bu-card:hover { transform: translateY(-6px); box-shadow: ${SHADOW_LG}; border-color: ${C.borderHi}; }

.bu-link { display: inline-flex; align-items: center; gap: 6px; transition: gap .2s ease, color .2s ease; }
.bu-link:hover { gap: 12px; }

.bu-navlink { position: relative; transition: color .2s ease; }
.bu-navlink:hover { color: ${C.accent}; }

.bu-row { transition: background .15s ease; }
.bu-row:hover { background: ${C.bgAlt}; }

.bu-tilt { transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease; }
.bu-tilt:hover { transform: rotate(0deg) translateY(-12px) scale(1.02) !important; box-shadow: ${SHADOW_LG} !important; z-index: 6; }

.bu-marker:hover { background: ${C.accent}; }

@keyframes floatA {
  0%   { transform: translate(0,0) rotate(0deg); }
  33%  { transform: translate(15px,-20px) rotate(3deg); }
  66%  { transform: translate(-10px,15px) rotate(-2deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}
@keyframes floatB {
  0%   { transform: translate(0,0) rotate(0deg); }
  33%  { transform: translate(-18px,12px) rotate(-3deg); }
  66%  { transform: translate(12px,-16px) rotate(2deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}
@keyframes floatC {
  0%   { transform: translate(0,0) rotate(0deg); }
  50%  { transform: translate(20px,18px) rotate(4deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulseFab {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.45); }
  50%      { box-shadow: 0 0 0 10px rgba(245,166,35,0); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
`;

function GlobalStyles() {
  // Fonts kommen aus main.jsx (fontsource) – kein Google-Request.
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

/* ============================================================
   HOOKS
   ============================================================ */
function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function useScrollSpy(active) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const els = FADEN
      .map((s) => document.querySelector(`[data-scroll-id="${s.id}"]`))
      .filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-scroll-id");
            const idx = FADEN.findIndex((s) => s.id === id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-12% 0px -12% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);
  return activeIndex;
}

function useScrolled(offset = 400) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

function jumpTo(targetId) {
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================================================
   LAYOUT-BAUSTEINE
   ============================================================ */
function Container({ children, style }) {
  return (
    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px", position: "relative", ...style }}>
      {children}
    </div>
  );
}

const sectionPad = (isMobile, top = 0, bottom = 0) => ({
  paddingTop: (isMobile ? 56 : 100) + top,
  paddingBottom: (isMobile ? 56 : 100) + bottom,
});

/* Pill-Label über Headlines */
function Pill({ children, color = C.accent }) {
  const tint = color === C.gold ? C.goldTint : color === C.primary ? C.primaryTint : C.accentTint;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "6px 12px", borderRadius: 999, background: tint, color,
        fontFamily: FF.body, fontSize: 9, fontWeight: 800,
        letterSpacing: "2.5px", textTransform: "uppercase",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}

/* Zweizeilige gemischte Headline */
function Headline({ line1, line2, size = "clamp(34px, 5vw, 56px)", style }) {
  return (
    <h2 style={{ margin: 0, lineHeight: 1.04, ...style }}>
      <span style={{ display: "block", fontFamily: FF.display, fontWeight: 800, fontSize: size, color: C.primary, letterSpacing: "-0.02em" }}>
        {line1}
      </span>
      <span style={{ display: "block", fontFamily: FF.serif, fontStyle: "italic", fontWeight: 500, fontSize: size, color: C.accent, letterSpacing: "-0.01em" }}>
        {line2}
      </span>
    </h2>
  );
}

/* Farbiger Marker statt Bullet */
function Marker({ children, color = C.accent }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
      <span style={{ flexShrink: 0, width: 4, height: 24, borderRadius: 2, background: color, marginTop: 3 }} />
      <span style={{ fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.6, color: C.text }}>{children}</span>
    </div>
  );
}

/* Große dekorative Hintergrundzahl */
function DecoNumber({ n }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute", top: -20, right: -10, lineHeight: 1,
        fontSize: "clamp(120px, 20vw, 200px)", fontFamily: FF.display, fontWeight: 800,
        color: C.primary, opacity: 0.04, userSelect: "none", pointerEvents: "none", zIndex: 0,
      }}
    >
      {n}
    </span>
  );
}

/* Animierte Blobs */
function Blobs({ mobile }) {
  const s = mobile ? 0.6 : 1;
  const base = {
    position: "absolute", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
    filter: "blur(6px)", pointerEvents: "none",
  };
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{ ...base, width: 360 * s, height: 360 * s, background: C.accent, opacity: 0.12, top: "2%", right: "6%", animation: "floatA 12s ease-in-out infinite" }} />
      <div style={{ ...base, width: 300 * s, height: 300 * s, background: C.gold, opacity: 0.1, bottom: "4%", left: "4%", animation: "floatB 14s ease-in-out infinite" }} />
      {!mobile && (
        <div style={{ ...base, width: 260, height: 260, background: C.primary, opacity: 0.08, top: "34%", left: "42%", animation: "floatC 16s ease-in-out infinite" }} />
      )}
    </div>
  );
}

/* Button */
function Button({ as = "button", variant = "primary", size = "md", href, target, onClick, children, style, fab }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: FF.body, fontWeight: 700, borderRadius: 12,
    minHeight: 48, minWidth: 44,
    padding: size === "lg" ? "16px 28px" : "13px 20px",
    fontSize: size === "lg" ? 16 : 14.5, lineHeight: 1,
    border: "2px solid transparent", textAlign: "center", whiteSpace: "nowrap",
  };
  const variants = {
    primary: { background: C.primary, color: "#fff" },
    gold: { background: C.gold, color: C.primaryDk, boxShadow: "0 10px 24px -8px rgba(245,166,35,0.55)" },
    accent: { background: C.accent, color: "#fff", boxShadow: "0 10px 24px -8px rgba(233,69,96,0.5)" },
    ghost: { background: "transparent", color: C.primary, borderColor: C.borderHi },
    light: { background: "#fff", color: C.primary, borderColor: C.border, boxShadow: SHADOW_SM },
  };
  const st = { ...base, ...variants[variant], ...style };
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;
  if (as === "a") {
    return <a className="bu-btn" href={href} target={target} rel={rel} onClick={onClick} style={st}>{children}</a>;
  }
  return <button className="bu-btn" onClick={onClick} style={st}>{children}</button>;
}

/* Fächer-Tag */
function Tag({ children, color = C.primary }) {
  const tint = color === C.gold ? C.goldTint : color === C.accent ? C.accentTint : C.primaryTint;
  return (
    <span style={{ display: "inline-block", padding: "7px 13px", borderRadius: 999, fontFamily: FF.body, fontSize: 13, fontWeight: 600, color, background: tint, border: `1px solid ${color === C.primary ? C.border : "transparent"}` }}>
      {children}
    </span>
  );
}
/* ============================================================
   NAVIGATION
   ============================================================ */
function Logo({ onClick }) {
  const [err, setErr] = useState(false);
  return (
    <button onClick={onClick} aria-label="beck-up – zur Startseite" style={{ display: "flex", alignItems: "center", gap: 10, padding: 0, minHeight: 44 }}>
      {!err ? (
        <img src="/logo.png" alt="beck-up" onError={() => setErr(true)} style={{ height: 40, width: "auto", display: "block" }} />
      ) : (
        <span style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 25, color: C.primary, letterSpacing: "-0.02em" }}>
          beck<span style={{ color: C.accent }}>-</span>up
        </span>
      )}
    </button>
  );
}

const NAV_LINKS = [
  { key: "home", label: "Start" },
  { key: "angebote", label: "Angebote" },
  { key: "but", label: "Förderung" },
  { key: "jobs", label: "Jobs" },
  { key: "faq", label: "FAQ" },
  { key: "kontakt", label: "Kontakt" },
];

function Nav({ page, setPage, isMobile }) {
  const [open, setOpen] = useState(false);
  const go = (key) => { setPage(key); setOpen(false); };
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
      <Container>
        <div style={{ height: isMobile ? 56 : 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo onClick={() => go("home")} />

          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
              {NAV_LINKS.map((l) => (
                <button key={l.key} className="bu-navlink" onClick={() => go(l.key)}
                  style={{ fontFamily: FF.body, fontSize: 15, fontWeight: page === l.key ? 700 : 500, color: page === l.key ? C.accent : C.text, padding: "8px 0" }}>
                  {l.label}
                  {page === l.key && <span style={{ position: "absolute", left: 0, right: 0, bottom: 2, height: 2, background: C.accent, borderRadius: 2 }} />}
                </button>
              ))}
              <Button variant="gold" onClick={() => go("kontakt")} style={{ minHeight: 44, padding: "11px 18px" }}>
                Probestunde
              </Button>
            </nav>
          )}

          {isMobile && (
            <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open}
              style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}
        </div>
      </Container>

      {isMobile && (
        <div style={{ overflow: "hidden", maxHeight: open ? 560 : 0, transition: "max-height .3s ease", background: C.bg, borderBottom: open ? `1px solid ${C.border}` : "none" }}>
          <Container>
            <div style={{ padding: "8px 0 18px" }}>
              {NAV_LINKS.map((l) => (
                <button key={l.key} onClick={() => go(l.key)} className="bu-row"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "16px 4px", borderBottom: `1px solid ${C.border}`, fontFamily: FF.body, fontSize: 17, fontWeight: page === l.key ? 700 : 600, color: page === l.key ? C.accent : C.text, minHeight: 44 }}>
                  {l.label}
                  <ArrowRight size={18} style={{ color: C.textVeryDim }} />
                </button>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <Button as="a" href={TEL_HREF} variant="ghost" style={{ flex: 1 }}><Phone size={18} />Anrufen</Button>
                <Button as="a" href={WA_HREF} target="_blank" variant="gold" style={{ flex: 1 }}><MessageCircle size={18} />WhatsApp</Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   SCROLL-FADEN
   ============================================================ */
function ScrollThread({ activeIndex }) {
  const progress = (activeIndex / (FADEN.length - 1)) * 100;
  return (
    <div style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 40, height: 280 }}>
      <div style={{ position: "relative", width: 2, height: "100%", background: C.border }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: `${progress}%`, background: C.accent, transition: "height .6s cubic-bezier(.4,0,.2,1)" }} />
        {FADEN.map((s, i) => {
          const isActive = i === activeIndex;
          const top = (i / (FADEN.length - 1)) * 100;
          return (
            <div key={s.id} style={{ position: "absolute", top: `${top}%`, left: "50%", transform: "translate(-50%,-50%)", display: "flex", alignItems: "center" }}>
              <button onClick={() => jumpTo(s.target)} aria-label={s.label}
                style={{ width: 12, height: 12, borderRadius: 2, background: isActive ? C.accent : C.border, transform: `rotate(45deg) scale(${isActive ? 1.3 : 1})`, transition: "all .3s ease", boxShadow: isActive ? "0 0 0 4px rgba(233,69,96,0.15)" : "none", padding: 0 }} />
              <span style={{ position: "absolute", left: 24, whiteSpace: "nowrap", fontFamily: FF.body, fontSize: 12, fontWeight: 700, color: C.primary, opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-8px)", transition: "all .3s ease", pointerEvents: "none" }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScrollProgressMobile({ activeIndex }) {
  const progress = (activeIndex / (FADEN.length - 1)) * 100;
  return (
    <div style={{ position: "sticky", top: 56, zIndex: 39 }}>
      <div style={{ position: "relative", height: 3, background: C.border, width: "100%" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 3, width: `${progress}%`, background: `linear-gradient(90deg, ${C.accent}, ${C.gold})`, transition: "width .4s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, padding: "8px 0", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        {FADEN.map((s, i) => (
          <button key={s.id} onClick={() => jumpTo(s.target)} aria-label={s.label}
            style={{ width: 8, height: 8, borderRadius: "50%", background: i === activeIndex ? C.accent : C.border, transform: `scale(${i === activeIndex ? 1.4 : 1})`, transition: "all .3s ease", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE BOTTOM-BAR + SCROLL-TO-TOP
   ============================================================ */
const barBtn = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, minWidth: 64, minHeight: 44, color: C.primary };
const barLbl = { fontSize: 10, fontWeight: 700, fontFamily: FF.body };

function MobileBottomBar({ setPage }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 45, height: "calc(64px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, boxShadow: "0 -8px 24px -4px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      <a href={TEL_HREF} style={barBtn}>
        <Phone size={22} /><span style={barLbl}>Anrufen</span>
      </a>
      <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, width: 56, height: 56, marginTop: -12, borderRadius: "50%", background: C.gold, color: C.primaryDk, boxShadow: "0 8px 20px -4px rgba(245,166,35,0.6)", animation: "pulseFab 2.6s ease-in-out infinite" }}>
        <MessageCircle size={23} /><span style={{ fontSize: 9, fontWeight: 800, fontFamily: FF.body }}>WhatsApp</span>
      </a>
      <button onClick={() => setPage("kontakt")} style={barBtn}>
        <Mail size={22} /><span style={barLbl}>Schreiben</span>
      </button>
    </div>
  );
}

function ScrollToTop({ isMobile }) {
  const show = useScrolled(400);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Nach oben scrollen"
      style={{ position: "fixed", right: 20, bottom: isMobile ? 84 : 24, zIndex: 44, width: 48, height: 48, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOW_MD, animation: "fadeUp .3s ease" }}>
      <ArrowUp size={22} />
    </button>
  );
}
/* ============================================================
   HOME-DATEN
   ============================================================ */
const WARUM = [
  { tag: "01", title: "Seit 2003 in Remscheid", text: "Über 20 Jahre Nachhilfe an einem Ort. Wir kennen die Schulen hier, die Lehrpläne und die typischen Stolperstellen." },
  { tag: "02", title: "Präsenz & Online", text: "Vor Ort an drei Standorten oder per Video von zuhause. Du entscheidest, was in deinen Alltag passt." },
  { tag: "03", title: "Alle Klassen 1–13", text: "Vom Lesenlernen in der Grundschule bis zum Abitur. Eine Anlaufstelle, die mitwächst." },
  { tag: "04", title: "Persönlich, kein Konzern", text: "Du sprichst mit Menschen, die deinen Namen kennen — nicht mit einer Hotline. Das macht den Unterschied." },
];

const ANGEBOTE = [
  { icon: User, color: C.accent, title: "Einzelunterricht", text: "Eine Lehrkraft, ein Kind, volle Aufmerksamkeit. Der Stoff richtet sich nach deinem Tempo — nicht umgekehrt." },
  { icon: Users, color: C.gold, title: "Gruppenunterricht", text: "Kleine Gruppen auf gleichem Niveau. Gemeinsam lernen, voneinander abschauen, und günstiger als Einzelunterricht." },
  { icon: GraduationCap, color: C.primary, title: "Abi-Vorbereitung", text: "Gezielt auf die Prüfung. Wir gehen alte Klausuren durch, schließen Lücken und nehmen dir die Nervosität." },
  { icon: Laptop, color: C.accent, title: "Online-Teaching", text: "Von zuhause, mit derselben Lehrkraft wie vor Ort. Seit 2020 erprobt — kein Notbehelf, sondern eine echte Option." },
  { icon: PartyPopper, color: C.gold, title: "Abi-Night", text: "Die Nacht vor der Prüfung gemeinsam durcharbeiten. Unser Klassiker. Anstrengend, aber es wirkt." },
];

const ABLAUF = [
  { n: "1", title: "Kontakt aufnehmen", text: "Ruf an, schreib per WhatsApp oder füll das Formular aus. Unverbindlich." },
  { n: "2", title: "Beratungsgespräch", text: "Wir schauen zusammen, wo es hakt und was wirklich Sinn macht. Kostenlos." },
  { n: "3", title: "Probestunde", text: "Dein Kind lernt die Lehrkraft kennen — ohne dass es etwas kostet." },
  { n: "4", title: "Förderplan", text: "Passt die Chemie, machen wir einen Plan. Dann geht's los." },
];

const STIMMEN = [
  { name: "Amelie", role: "Mutter, 8. Klasse", text: "Ehrlich, ich war skeptisch — zwei andere Anbieter hatten wir schon durch. Hier hat's zum ersten Mal geklickt. Meine Tochter geht freiwillig hin, und die Mathenote ist von 4 auf 2 hoch.", rot: -1.5, dy: 0 },
  { name: "Luis", role: "Schüler, Abitur", text: "Ohne die Abi-Vorbereitung hätte ich den Mathe-LK nicht gepackt. Sie haben mir genau die Sachen erklärt, bei denen ich in der Schule komplett ausgestiegen bin. Ruhig, ohne Druck.", rot: 0.5, dy: -8 },
  { name: "Daniel", role: "Vater, 6. Klasse", text: "Was ich gut finde: Man bekommt eine ehrliche Rückmeldung. Kein Schönreden. Mein Sohn weiß jetzt, wo er steht — und es wird besser.", rot: 2, dy: 4 },
];

/* ============================================================
   HERO
   ============================================================ */
function HeroCard({ isMobile }) {
  return (
    <div className="bu-card" style={{ position: "relative", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: isMobile ? 24 : 30, boxShadow: SHADOW_LG }}>
      <div style={{ position: "absolute", top: -14, right: 22 }}>
        <span style={{ padding: "7px 13px", borderRadius: 999, background: C.primary, color: "#fff", fontFamily: FF.body, fontSize: 12, fontWeight: 700 }}>Seit 2003</span>
      </div>
      <Quote size={34} style={{ color: C.gold }} />
      <p style={{ marginTop: 12, fontFamily: FF.serif, fontStyle: "italic", fontSize: isMobile ? 17 : 19, lineHeight: 1.5, color: C.textHi }}>
        „Meine Tochter geht freiwillig hin — und die Mathenote ist von 4 auf 2 hoch.“
      </p>
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.accentTint, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800, color: C.accent }}>A</div>
        <div>
          <div style={{ fontFamily: FF.body, fontSize: 14, fontWeight: 700, color: C.textHi }}>Amelie</div>
          <div style={{ fontFamily: FF.body, fontSize: 12.5, color: C.textDim }}>Mutter, 8. Klasse</div>
        </div>
      </div>
      <div style={{ height: 1, background: C.border, margin: "20px 0" }} />
      <div style={{ fontFamily: FF.body, fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: C.textVeryDim, marginBottom: 10 }}>Beliebte Fächer</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Mathe", "Deutsch", "Englisch", "Physik", "Chemie", "Latein"].map((f, i) => (
          <Tag key={f} color={i % 3 === 0 ? C.accent : i % 3 === 1 ? C.gold : C.primary}>{f}</Tag>
        ))}
      </div>
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 14, background: C.bgAlt }}>
        <Sparkles size={18} style={{ color: C.gold, flexShrink: 0 }} />
        <span style={{ fontFamily: FF.body, fontSize: 13.5, fontWeight: 600, color: C.text }}>
          <b style={{ color: C.primary }}>500+</b> Schüler haben hier schon gelernt
        </span>
      </div>
    </div>
  );
}

function HeroSection({ setPage, isMobile }) {
  const big = isMobile ? "clamp(36px,9vw,52px)" : "clamp(48px,5.5vw,72px)";
  return (
    <section id="scroll-hero" data-scroll-id="hero" style={{ position: "relative", background: C.bg, overflow: "hidden", ...sectionPad(isMobile, isMobile ? 0 : 20, 0) }}>
      <Blobs mobile={isMobile} />
      <Container>
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: isMobile ? 32 : 48, alignItems: "center" }}>
          <div>
            <Pill color={C.accent}>Nachhilfe in Remscheid · seit 2003</Pill>
            <div style={{ height: 20 }} />
            <h1 style={{ margin: 0, lineHeight: 1.02 }}>
              <span style={{ display: "block", fontFamily: FF.display, fontWeight: 800, fontSize: big, color: C.primary, letterSpacing: "-0.025em" }}>Dein Weg nach oben —</span>
              <span style={{ display: "block", fontFamily: FF.serif, fontStyle: "italic", fontWeight: 500, fontSize: big, color: C.accent, letterSpacing: "-0.01em" }}>mit beck-up.</span>
            </h1>
            <p style={{ marginTop: 20, maxWidth: 520, fontFamily: FF.body, fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: C.textDim }}>
              Nachhilfe Klasse 1–13, Abi-Vorbereitung und Online-Teaching in Remscheid. Persönlich. Wirkungsvoll.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <Button variant="gold" size="lg" onClick={() => setPage("kontakt")}>Kostenlose Probestunde <ArrowRight size={18} /></Button>
              <Button variant="ghost" size="lg" onClick={() => setPage("angebote")}>Angebote</Button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "10px 18px" : "12px 24px", marginTop: 32 }}>
              {["Seit 2003", "Alle Klassen", "Präsenz & Online", "Persönlich"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FF.body, fontSize: 13.5, fontWeight: 600, color: C.text }}>
                  <Check size={15} strokeWidth={3} style={{ color: C.gold }} />{t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: isMobile ? 0 : -30 }}>
            <HeroCard isMobile={isMobile} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   WARUM
   ============================================================ */
function WarumSection({ isMobile }) {
  return (
    <section id="scroll-warum" data-scroll-id="warum" style={{ position: "relative", background: C.bgAlt, clipPath: isMobile ? undefined : CLIP, overflow: "hidden", ...sectionPad(isMobile, isMobile ? 0 : 40, isMobile ? 0 : 40) }}>
      <Container>
        <DecoNumber n="02" />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <Pill color={C.gold}>Warum beck-up</Pill>
          <div style={{ height: 18 }} />
          <Headline line1="Gute Gründe," line2="hier zu lernen." size={isMobile ? "clamp(30px,7vw,40px)" : "clamp(36px,4vw,52px)"} />
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: isMobile ? 32 : 48, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: isMobile ? 16 : 20 }}>
          {WARUM.map((w, i) => (
            <div key={w.tag} className="bu-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: isMobile ? 22 : 24, boxShadow: SHADOW_SM, marginTop: !isMobile && i % 2 === 1 ? 28 : 0 }}>
              <div style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 30, color: i % 2 === 0 ? C.accent : C.gold }}>{w.tag}</div>
              <h3 style={{ marginTop: 12, fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: C.primary, lineHeight: 1.25 }}>{w.title}</h3>
              <p style={{ marginTop: 10, fontFamily: FF.body, fontSize: 14, lineHeight: 1.6, color: C.textDim }}>{w.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   ANGEBOTE-TEASER
   ============================================================ */
function AngeboteTeaser({ setPage, isMobile }) {
  return (
    <section id="scroll-angebote" data-scroll-id="angebote" style={{ position: "relative", background: C.bg, overflow: "hidden", ...sectionPad(isMobile) }}>
      <Container>
        <DecoNumber n="03" />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div style={{ maxWidth: 560 }}>
            <Pill color={C.accent}>Unser Angebot</Pill>
            <div style={{ height: 18 }} />
            <Headline line1="Für jedes Fach," line2="für jede Klasse." size={isMobile ? "clamp(30px,7vw,40px)" : "clamp(36px,4vw,52px)"} />
          </div>
          {!isMobile && <Button variant="ghost" onClick={() => setPage("angebote")}>Alle Angebote <ArrowRight size={18} /></Button>}
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: isMobile ? 32 : 48, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(210px, 1fr))", gap: isMobile ? 16 : 20 }}>
          {ANGEBOTE.map((a) => {
            const Icon = a.icon;
            const tint = a.color === C.gold ? C.goldTint : a.color === C.primary ? C.primaryTint : C.accentTint;
            return (
              <div key={a.title} className="bu-card" style={{ position: "relative", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", boxShadow: SHADOW_SM }}>
                <div style={{ height: 5, background: a.color }} />
                <div style={{ padding: isMobile ? 22 : 24 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: tint, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ marginTop: 16, fontFamily: FF.display, fontWeight: 700, fontSize: 19, color: C.primary }}>{a.title}</h3>
                  <p style={{ marginTop: 8, fontFamily: FF.body, fontSize: 14, lineHeight: 1.6, color: C.textDim }}>{a.text}</p>
                  <button onClick={() => setPage("angebote")} className="bu-link" style={{ marginTop: 14, fontFamily: FF.body, fontSize: 14, fontWeight: 700, color: a.color }}>
                    Mehr erfahren <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {isMobile && (
          <div style={{ marginTop: 24 }}>
            <Button variant="ghost" onClick={() => setPage("angebote")} style={{ width: "100%" }}>Alle Angebote <ArrowRight size={18} /></Button>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ============================================================
   BUT-TEASER
   ============================================================ */
function ButTeaser({ setPage, isMobile }) {
  return (
    <section id="scroll-but" data-scroll-id="but" style={{ position: "relative", background: C.bgAlt, clipPath: isMobile ? undefined : CLIP, overflow: "hidden", ...sectionPad(isMobile, isMobile ? 0 : 40, isMobile ? 0 : 40) }}>
      <Container>
        <DecoNumber n="04" />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 48, alignItems: "center" }}>
          <div>
            <Pill color={C.gold}>Bildung & Teilhabe</Pill>
            <div style={{ height: 18 }} />
            <Headline line1="Nachhilfe kostet —" line2="für viele aber nichts." size={isMobile ? "clamp(27px,6.2vw,36px)" : "clamp(32px,3.4vw,44px)"} />
            <p style={{ marginTop: 20, fontFamily: FF.body, fontSize: 16, lineHeight: 1.65, color: C.textDim, maxWidth: 480 }}>
              Über das Bildungs- und Teilhabepaket (BuT) übernimmt der Staat die Kosten für Lernförderung — wenn bestimmte Voraussetzungen erfüllt sind. Viele Familien wissen gar nicht, dass ihnen das zusteht.
            </p>
            <div style={{ marginTop: 22 }}>
              <Marker color={C.gold}>Wir prüfen mit dir, ob ein Anspruch besteht.</Marker>
              <Marker color={C.gold}>Wir helfen beim Antrag bei der Stadt Remscheid.</Marker>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDk})`, borderRadius: 24, padding: isMobile ? 28 : 36, color: "#fff", boxShadow: "0 24px 48px -18px rgba(212,137,26,0.5)" }}>
            <div style={{ fontFamily: FF.body, fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.85 }}>Gut zu wissen</div>
            <h3 style={{ marginTop: 12, fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 24 : 28, lineHeight: 1.2 }}>Nachhilfe kann staatlich gefördert werden.</h3>
            <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.6, opacity: 0.95 }}>Wir beraten kostenlos und unverbindlich. Ein Anruf reicht.</p>
            <div style={{ marginTop: 24 }}>
              <Button variant="light" onClick={() => setPage("but")} style={{ background: "#fff", color: C.goldDk }}>Mehr zur Förderung <ArrowRight size={18} /></Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   ABLAUF
   ============================================================ */
function AblaufSection({ isMobile }) {
  return (
    <section id="scroll-ablauf" data-scroll-id="ablauf" style={{ position: "relative", background: C.bg, overflow: "hidden", ...sectionPad(isMobile) }}>
      <Container>
        <div style={{ maxWidth: 560 }}>
          <Pill color={C.accent}>So einfach geht's</Pill>
          <div style={{ height: 18 }} />
          <Headline line1="In vier Schritten" line2="zur ersten Stunde." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(34px,3.6vw,48px)"} />
        </div>
        {isMobile ? (
          <div style={{ marginTop: 36, position: "relative", paddingLeft: 4 }}>
            <div style={{ position: "absolute", left: 23, top: 12, bottom: 12, width: 2, background: `repeating-linear-gradient(${C.borderHi} 0 6px, transparent 6px 12px)` }} />
            {ABLAUF.map((s) => (
              <div key={s.n} style={{ position: "relative", display: "flex", gap: 18, marginBottom: 28 }}>
                <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800, fontSize: 18, zIndex: 1 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: C.primary }}>{s.title}</h3>
                  <p style={{ marginTop: 6, fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.6, color: C.textDim }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 56, position: "relative", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            <div style={{ position: "absolute", left: "12%", right: "12%", top: 31, height: 2, background: `repeating-linear-gradient(90deg, ${C.borderHi} 0 8px, transparent 8px 16px)` }} />
            {ABLAUF.map((s) => (
              <div key={s.n} style={{ position: "relative", textAlign: "center" }}>
                <div style={{ margin: "0 auto", width: 64, height: 64, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800, fontSize: 26, position: "relative", zIndex: 1, boxShadow: SHADOW_MD }}>{s.n}</div>
                <h3 style={{ marginTop: 18, fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: C.primary }}>{s.title}</h3>
                <p style={{ marginTop: 8, fontFamily: FF.body, fontSize: 14, lineHeight: 1.6, color: C.textDim, maxWidth: 220, marginLeft: "auto", marginRight: "auto" }}>{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function TestimonialsSection({ isMobile }) {
  return (
    <section style={{ position: "relative", background: C.bgAlt, overflow: "hidden", ...sectionPad(isMobile) }}>
      <Container>
        <span aria-hidden="true" style={{ position: "absolute", top: -34, left: 6, fontFamily: FF.serif, fontWeight: 600, fontSize: "clamp(160px,26vw,300px)", color: C.gold, opacity: 0.1, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>„</span>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <Pill color={C.gold}>Echte Stimmen</Pill>
          <div style={{ height: 18 }} />
          <Headline line1="Was Schüler und Eltern" line2="über uns sagen." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(34px,3.6vw,48px)"} />
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: isMobile ? 32 : 64, display: isMobile ? "block" : "grid", gridTemplateColumns: isMobile ? undefined : "repeat(3,1fr)", gap: isMobile ? 0 : 28, alignItems: "start" }}>
          {STIMMEN.map((s) => (
            <div key={s.name} className={isMobile ? "bu-card" : "bu-tilt"} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 22, padding: isMobile ? 26 : 28, boxShadow: SHADOW_MD, marginBottom: isMobile ? 18 : 0, transform: isMobile ? "none" : `rotate(${s.rot}deg) translateY(${s.dy}px)` }}>
              <Quote size={30} style={{ color: C.gold }} />
              <p style={{ marginTop: 12, fontFamily: FF.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.55, color: C.textHi }}>{s.text}</p>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.accentTint, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800 }}>{s.name[0]}</div>
                <div>
                  <div style={{ fontFamily: FF.body, fontSize: 14.5, fontWeight: 700, color: C.textHi }}>{s.name}</div>
                  <div style={{ fontFamily: FF.body, fontSize: 12.5, color: C.textDim }}>{s.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isMobile && <div style={{ marginTop: 8, fontFamily: FF.body, fontSize: 11, color: C.textDim }}>← Mehr Stimmen findest du auf Google</div>}
      </Container>
    </section>
  );
}

/* ============================================================
   CTA-BANNER
   ============================================================ */
function CtaBanner({ setPage, isMobile }) {
  const big = isMobile ? "clamp(30px,8vw,44px)" : "clamp(40px,4.5vw,60px)";
  return (
    <section id="scroll-kontakt" data-scroll-id="kontakt" style={{ position: "relative", background: C.primary, clipPath: isMobile ? undefined : CLIP, overflow: "hidden", ...sectionPad(isMobile, isMobile ? 10 : 40, isMobile ? 10 : 40) }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%", background: C.accent, opacity: 0.18, top: "-10%", right: "6%", filter: "blur(8px)", animation: "floatA 13s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%", background: C.gold, opacity: 0.14, bottom: "-12%", left: "8%", filter: "blur(8px)", animation: "floatB 15s ease-in-out infinite" }} />
      </div>
      <Container>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <Pill color={C.gold}>Erste Stunde gratis</Pill>
          <div style={{ height: 20 }} />
          <h2 style={{ margin: 0, lineHeight: 1.05 }}>
            <span style={{ display: "block", fontFamily: FF.display, fontWeight: 800, fontSize: big, color: "#fff", letterSpacing: "-0.02em" }}>Bereit, besser</span>
            <span style={{ display: "block", fontFamily: FF.serif, fontStyle: "italic", fontWeight: 500, fontSize: big, color: C.goldLi }}>zu werden?</span>
          </h2>
          <p style={{ marginTop: 18, fontFamily: FF.body, fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>Die erste Stunde ist kostenlos. Wir freuen uns auf dich.</p>
          <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Button variant="gold" size="lg" onClick={() => setPage("kontakt")}>Probestunde buchen <ArrowRight size={18} /></Button>
            <Button as="a" href={TEL_HREF} variant="light" size="lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}><Phone size={18} />Anrufen</Button>
            <Button as="a" href={WA_HREF} target="_blank" variant="light" size="lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}><MessageCircle size={18} />WhatsApp</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   HOME
   ============================================================ */
function Home({ setPage, isMobile }) {
  const activeIndex = useScrollSpy(true);
  return (
    <main>
      {!isMobile && <ScrollThread activeIndex={activeIndex} />}
      {isMobile && <ScrollProgressMobile activeIndex={activeIndex} />}
      <HeroSection setPage={setPage} isMobile={isMobile} />
      <WarumSection isMobile={isMobile} />
      <AngeboteTeaser setPage={setPage} isMobile={isMobile} />
      <ButTeaser setPage={setPage} isMobile={isMobile} />
      <AblaufSection isMobile={isMobile} />
      <TestimonialsSection isMobile={isMobile} />
      <CtaBanner setPage={setPage} isMobile={isMobile} />
    </main>
  );
}
/* ============================================================
   FORMULAR-BAUSTEINE (Web3Forms, ohne <form>-Tag)
   ============================================================ */
const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`,
  fontFamily: FF.body, fontSize: 15, color: C.textHi, background: "#fff", outline: "none", minHeight: 48,
};
const labelStyle = { display: "block", fontFamily: FF.body, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 7 };

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent }}> *</span>}</label>
      {children}
    </div>
  );
}

function StatusNote({ type, children }) {
  const ok = type === "success";
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", borderRadius: 12, marginTop: 16, background: ok ? C.goldTint : C.accentTint, border: `1px solid ${ok ? C.gold : C.accent}` }}>
      {ok ? <CheckCircle2 size={20} style={{ color: C.goldDk, flexShrink: 0 }} /> : <AlertCircle size={20} style={{ color: C.accentDk, flexShrink: 0 }} />}
      <span style={{ fontFamily: FF.body, fontSize: 14, lineHeight: 1.5, color: ok ? C.goldDk : C.accentDk, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

function SuccessBox({ title, text, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "36px 22px", borderRadius: 20, background: C.bgAlt, border: `1px solid ${C.border}` }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.goldTint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
        <CheckCircle2 size={34} style={{ color: C.goldDk }} />
      </div>
      <h3 style={{ marginTop: 18, fontFamily: FF.display, fontWeight: 800, fontSize: 24, color: C.primary }}>{title}</h3>
      <p style={{ marginTop: 10, fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.6, color: C.textDim, maxWidth: 420, marginInline: "auto" }}>{text}</p>
      <button onClick={onReset} className="bu-link" style={{ marginTop: 18, fontFamily: FF.body, fontSize: 14, fontWeight: 700, color: C.accent }}>
        Noch eine Anfrage senden <ArrowRight size={16} />
      </button>
    </div>
  );
}

async function postWeb3Forms(payload) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: "beck-up Website", ...payload }),
  });
  return res.json();
}

function ContactForm({ compact }) {
  const empty = { parent: "", student: "", klasse: "", fach: "", phone: "", email: "", message: "", source: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (status === "sending") return;
    if (!form.parent || !form.email || !form.message) { setStatus("validation"); return; }
    setStatus("sending");
    try {
      const data = await postWeb3Forms({
        subject: "Neue Anfrage über beck-up.com",
        "Name Erziehungsberechtigte/r": form.parent,
        "Name des Kindes": form.student,
        Klasse: form.klasse, Fach: form.fach,
        Telefon: form.phone, "E-Mail": form.email,
        Anliegen: form.message, "Gefunden über": form.source,
      });
      if (data.success) { setStatus("success"); setForm(empty); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return <SuccessBox onReset={() => setStatus("idle")} title="Danke — deine Anfrage ist da." text="Wir melden uns so schnell wie möglich, meistens noch am selben Tag. Wenn's eilt, ruf einfach an." />;
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
        <Field label="Name (Erziehungsberechtigte/r)" required><input style={inputStyle} value={form.parent} onChange={set("parent")} placeholder="Vor- und Nachname" /></Field>
        <Field label="Name des Kindes"><input style={inputStyle} value={form.student} onChange={set("student")} placeholder="optional" /></Field>
        <Field label="Klasse">
          <select style={inputStyle} value={form.klasse} onChange={set("klasse")}>
            <option value="">Bitte wählen</option>
            {Array.from({ length: 13 }, (_, i) => i + 1).map((k) => <option key={k} value={`${k}. Klasse`}>{k}. Klasse</option>)}
          </select>
        </Field>
        <Field label="Fach">
          <select style={inputStyle} value={form.fach} onChange={set("fach")}>
            <option value="">Bitte wählen</option>
            {FAECHER.map((f) => <option key={f} value={f}>{f}</option>)}
            <option value="Mehrere Fächer">Mehrere Fächer</option>
          </select>
        </Field>
        <Field label="Telefon"><input style={inputStyle} type="tel" value={form.phone} onChange={set("phone")} placeholder="Für den Rückruf" /></Field>
        <Field label="E-Mail" required><input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="name@beispiel.de" /></Field>
      </div>
      <Field label="Dein Anliegen" required>
        <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} value={form.message} onChange={set("message")} placeholder="Worum geht's? Welches Fach, welche Klasse, was läuft gerade nicht rund?" />
      </Field>
      <Field label="Wie hast du von uns gehört?">
        <select style={inputStyle} value={form.source} onChange={set("source")}>
          <option value="">Bitte wählen</option>
          <option>Google-Suche</option>
          <option>Empfehlung</option>
          <option>Social Media</option>
          <option>Bin schon Kunde</option>
          <option>Sonstiges</option>
        </select>
      </Field>
      {status === "validation" && <StatusNote type="error">Bitte fülle mindestens Name, E-Mail und dein Anliegen aus.</StatusNote>}
      {status === "error" && <StatusNote type="error">Da ist leider etwas schiefgegangen. Versuch's nochmal oder ruf uns direkt an.</StatusNote>}
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <Button variant="accent" size="lg" onClick={submit} style={{ minWidth: 200, opacity: status === "sending" ? 0.7 : 1 }}>
          {status === "sending" ? "Wird gesendet…" : <>Anfrage senden <Send size={17} /></>}
        </Button>
        <span style={{ fontFamily: FF.body, fontSize: 12.5, color: C.textDim }}>Unverbindlich. Wir melden uns persönlich.</span>
      </div>
    </div>
  );
}

function JobForm() {
  const empty = { name: "", email: "", phone: "", subjects: "", grades: "", about: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (status === "sending") return;
    if (!form.name || !form.email || !form.subjects) { setStatus("validation"); return; }
    setStatus("sending");
    try {
      const data = await postWeb3Forms({
        subject: "Neue Bewerbung als Nachhilfelehrkraft – beck-up.com",
        Name: form.name, "E-Mail": form.email, Telefon: form.phone,
        Fächer: form.subjects, Klassenstufen: form.grades, "Über dich": form.about,
      });
      if (data.success) { setStatus("success"); setForm(empty); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return <SuccessBox onReset={() => setStatus("idle")} title="Danke für deine Bewerbung!" text="Wir schauen sie uns an und melden uns bei dir. Das kann ein paar Tage dauern — wir lesen aber wirklich jede." />;
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Field label="Dein Name" required><input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Vor- und Nachname" /></Field>
        <Field label="E-Mail" required><input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="name@beispiel.de" /></Field>
        <Field label="Telefon"><input style={inputStyle} type="tel" value={form.phone} onChange={set("phone")} placeholder="optional" /></Field>
        <Field label="Fächer" required><input style={inputStyle} value={form.subjects} onChange={set("subjects")} placeholder="z. B. Mathe, Physik" /></Field>
      </div>
      <Field label="Welche Klassenstufen traust du dir zu?"><input style={inputStyle} value={form.grades} onChange={set("grades")} placeholder="z. B. 5–10, oder Oberstufe" /></Field>
      <Field label="Erzähl uns kurz von dir">
        <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} value={form.about} onChange={set("about")} placeholder="Studierst du? Hast du schon Nachhilfe gegeben? Warum hast du Lust darauf?" />
      </Field>
      {status === "validation" && <StatusNote type="error">Bitte gib mindestens Name, E-Mail und deine Fächer an.</StatusNote>}
      {status === "error" && <StatusNote type="error">Das hat nicht geklappt. Versuch's nochmal oder schreib uns direkt an info@beck-up.com.</StatusNote>}
      <div style={{ marginTop: 8 }}>
        <Button variant="primary" size="lg" onClick={submit} style={{ minWidth: 200, opacity: status === "sending" ? 0.7 : 1 }}>
          {status === "sending" ? "Wird gesendet…" : <>Bewerbung absenden <Send size={17} /></>}
        </Button>
      </div>
    </div>
  );
}

/* ============================================================
   SEITEN-HEADER
   ============================================================ */
function PageHeader({ pill, pillColor = C.accent, line1, line2, sub, isMobile }) {
  return (
    <section style={{ position: "relative", background: C.bg, overflow: "hidden", paddingTop: isMobile ? 48 : 88, paddingBottom: isMobile ? 24 : 40 }}>
      <Blobs mobile={isMobile} />
      <Container>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <Pill color={pillColor}>{pill}</Pill>
          <div style={{ height: 18 }} />
          <Headline line1={line1} line2={line2} size={isMobile ? "clamp(34px,8vw,46px)" : "clamp(44px,5vw,62px)"} />
          {sub && <p style={{ marginTop: 20, maxWidth: 580, fontFamily: FF.body, fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: C.textDim }}>{sub}</p>}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   SEITE: ANGEBOTE
   ============================================================ */
const ANGEBOTE_DETAIL = [
  { icon: User, color: C.accent, title: "Einzelunterricht", text: "Eine Lehrkraft, ein Kind. Die ganze Stunde dreht sich nur um das, was dein Kind gerade braucht.", points: ["Volle Aufmerksamkeit, kein Mitschwimmen", "Tempo und Themen komplett individuell", "Ideal bei größeren Lücken oder vor Prüfungen"] },
  { icon: Users, color: C.gold, title: "Gruppenunterricht", text: "Kleine Gruppen auf ähnlichem Niveau. Lernen funktioniert oft besser, wenn man nicht allein davor sitzt.", points: ["Maximal kleine Gruppen, kein Frontalunterricht", "Voneinander lernen, gemeinsam dranbleiben", "Günstiger als Einzelunterricht"] },
  { icon: GraduationCap, color: C.primary, title: "Abi-Vorbereitung", text: "Gezielte Vorbereitung auf die Abiturprüfungen — fachlich und mental.", points: ["Alte Klausuren und Prüfungsaufgaben", "Lücken schließen, bevor sie zum Problem werden", "Weniger Nervosität durch echte Übung"] },
  { icon: Laptop, color: C.accent, title: "Online-Teaching", text: "Unterricht per Video, mit derselben Qualität wie vor Ort. Seit 2020 erprobt — kein Notbehelf.", points: ["Von zuhause, ohne Anfahrt", "Dieselben Lehrkräfte wie in Präsenz", "Digitale Tafel und geteilte Aufgaben"] },
  { icon: PartyPopper, color: C.gold, title: "Abi-Night", text: "Die Nacht vor der Prüfung gemeinsam durcharbeiten. Unser Klassiker — anstrengend, aber er wirkt.", points: ["Intensiv, in der Gruppe, mit Betreuung", "Letzte Fragen klären, Sicherheit gewinnen", "Snacks und Kaffee inklusive"] },
];

function AngebotePage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Unser Angebot" pillColor={C.accent}
        line1="Nachhilfe, die" line2="zu euch passt."
        sub="Vom Einzelunterricht bis zur Abi-Night — für die Grundschule genauso wie für die Oberstufe. Hier siehst du, was wir anbieten." />

      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container>
          <div style={{ display: "grid", gap: isMobile ? 18 : 22 }}>
            {ANGEBOTE_DETAIL.map((a, i) => {
              const Icon = a.icon;
              const tint = a.color === C.gold ? C.goldTint : a.color === C.primary ? C.primaryTint : C.accentTint;
              return (
                <div key={a.title} style={{ position: "relative", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: isMobile ? 16 : 28, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 22, padding: isMobile ? 24 : 30, boxShadow: SHADOW_SM, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: a.color }} />
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: tint, display: "flex", alignItems: "center", justifyContent: "center", color: a.color, flexShrink: 0 }}>
                    <Icon size={30} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 26, color: C.primary }}>{a.title}</h2>
                    <p style={{ marginTop: 10, fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.6, color: C.textDim, maxWidth: 620 }}>{a.text}</p>
                    <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "10px 20px" }}>
                      {a.points.map((p) => (
                        <div key={p} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                          <Check size={17} strokeWidth={3} style={{ color: a.color, flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontFamily: FF.body, fontSize: 14, lineHeight: 1.5, color: C.text }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section style={{ background: C.bgAlt, ...sectionPad(isMobile) }}>
        <Container>
          <div style={{ maxWidth: 560 }}>
            <Pill color={C.primary}>Fächer</Pill>
            <div style={{ height: 18 }} />
            <Headline line1="Diese Fächer" line2="decken wir ab." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(32px,3.6vw,46px)"} />
            <p style={{ marginTop: 16, fontFamily: FF.body, fontSize: 16, lineHeight: 1.6, color: C.textDim }}>
              Dein Fach ist nicht dabei? Frag trotzdem — die Liste ist nicht in Stein gemeißelt.
            </p>
          </div>
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
            {FAECHER.map((f) => (
              <div key={f} className="bu-card" style={{ display: "flex", alignItems: "center", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", boxShadow: SHADOW_SM }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: FF.body, fontSize: 14.5, fontWeight: 600, color: C.textHi }}>{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ background: C.bg, ...sectionPad(isMobile) }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40, alignItems: "center" }}>
            <div style={{ background: C.primaryTint, border: `1px solid ${C.border}`, borderRadius: 22, padding: isMobile ? 28 : 36 }}>
              <div style={{ fontFamily: FF.body, fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: C.accent }}>Preise</div>
              <h3 style={{ marginTop: 12, fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 26 : 32, color: C.primary }}>Auf Anfrage.</h3>
              <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.65, color: C.text }}>
                Was Nachhilfe kostet, hängt davon ab, ob's Einzel- oder Gruppenunterricht wird und wie oft ihr kommt. Wir sagen dir ehrlich, was Sinn macht — und was nicht. Und falls ein Anspruch auf <b>BuT-Förderung</b> besteht, kann der Unterricht für euch sogar kostenlos sein.
              </p>
            </div>
            <div style={{ textAlign: isMobile ? "left" : "center" }}>
              <Headline line1="Lass uns" line2="darüber reden." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(32px,3.4vw,46px)"} style={{ textAlign: isMobile ? "left" : "center" }} />
              <p style={{ marginTop: 16, fontFamily: FF.body, fontSize: 16, lineHeight: 1.6, color: C.textDim, maxWidth: 400, marginInline: isMobile ? 0 : "auto" }}>
                Die erste Stunde ist gratis. Danach entscheidet ihr in Ruhe.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "flex-start" : "center" }}>
                <Button variant="gold" size="lg" onClick={() => setPage("kontakt")}>Probestunde anfragen <ArrowRight size={18} /></Button>
                <Button as="a" href={TEL_HREF} variant="ghost" size="lg"><Phone size={18} />{TEL}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SEITE: BuT / FÖRDERUNG
   ============================================================ */
const BUT_ANSPRUCH = [
  "Bürgergeld (SGB II)",
  "Sozialhilfe (SGB XII)",
  "Wohngeld",
  "Kinderzuschlag",
  "Leistungen nach dem Asylbewerberleistungsgesetz",
];
const BUT_SCHRITTE = [
  { n: "1", title: "Anspruch klären", text: "Bezieht ihr eine der genannten Leistungen? Dann stehen die Chancen gut. Im Zweifel klären wir das gemeinsam." },
  { n: "2", title: "Antrag stellen", text: "Der Antrag läuft über die Stadt Remscheid bzw. das Jobcenter. Wir geben dir die nötigen Bestätigungen für die Lernförderung." },
  { n: "3", title: "Loslegen", text: "Ist der Antrag bewilligt, übernimmt das Amt die Kosten — und dein Kind kann ohne finanzielle Sorgen lernen." },
];

function ButPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Bildung & Teilhabe" pillColor={C.gold}
        line1="Nachhilfe, die" line2="der Staat zahlt."
        sub="Über das Bildungs- und Teilhabepaket (BuT) kann Lernförderung kostenlos sein. Viele Familien haben Anspruch, ohne es zu wissen. Hier erklären wir, wie es geht." />

      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 48 }}>
            <div>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 24 : 30, color: C.primary }}>Was ist das BuT?</h2>
              <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 16, lineHeight: 1.7, color: C.textDim }}>
                Das Bildungs- und Teilhabepaket ist eine staatliche Leistung, die Kindern und Jugendlichen aus Familien mit wenig Einkommen die Teilhabe an Bildung ermöglicht. Dazu gehört auch <b style={{ color: C.text }}>Lernförderung</b> — also Nachhilfe.
              </p>
              <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 16, lineHeight: 1.7, color: C.textDim }}>
                Das Ziel ist einfach: Bildung soll nicht am Geldbeutel der Eltern scheitern. Wenn die Voraussetzungen passen, übernimmt das Amt die Kosten für die Nachhilfe bei uns.
              </p>
            </div>
            <div style={{ background: C.goldTint, border: `1px solid ${C.gold}`, borderRadius: 22, padding: isMobile ? 26 : 32 }}>
              <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 21 : 24, color: C.goldDk }}>Wer hat Anspruch?</h3>
              <p style={{ marginTop: 12, fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.6, color: C.text }}>
                In der Regel Familien, die eine dieser Leistungen beziehen:
              </p>
              <div style={{ marginTop: 18 }}>
                {BUT_ANSPRUCH.map((a) => (
                  <div key={a} style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 12 }}>
                    <CheckCircle2 size={19} style={{ color: C.goldDk, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontFamily: FF.body, fontSize: 15, fontWeight: 600, color: C.textHi }}>{a}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 8, fontFamily: FF.body, fontSize: 13, lineHeight: 1.55, color: C.goldDk }}>
                Unsicher? Ruf uns an — wir schauen gemeinsam, ob's passt.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section style={{ background: C.bgAlt, ...sectionPad(isMobile) }}>
        <Container>
          <div style={{ maxWidth: 560 }}>
            <Pill color={C.gold}>In drei Schritten</Pill>
            <div style={{ height: 18 }} />
            <Headline line1="So kommt ihr" line2="an die Förderung." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(32px,3.6vw,46px)"} />
          </div>
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 22 }}>
            {BUT_SCHRITTE.map((s) => (
              <div key={s.n} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: isMobile ? 24 : 28, boxShadow: SHADOW_SM }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.gold, color: C.primaryDk, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FF.display, fontWeight: 800, fontSize: 21 }}>{s.n}</div>
                <h3 style={{ marginTop: 16, fontFamily: FF.display, fontWeight: 700, fontSize: 19, color: C.primary }}>{s.title}</h3>
                <p style={{ marginTop: 10, fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.6, color: C.textDim }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button as="a" href="https://www.remscheid.de" target="_blank" variant="primary" size="lg">
              Antrag bei der Stadt Remscheid <ArrowRight size={18} />
            </Button>
            <Button as="a" href="/downloads/but-info.pdf" target="_blank" variant="ghost" size="lg">
              Infoblatt herunterladen
            </Button>
          </div>
          <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 13, color: C.textVeryDim }}>
            Hinweis: Die genauen Voraussetzungen und Formulare legt die Stadt Remscheid fest. Wir unterstützen euch beim Teil zur Lernförderung.
          </p>
        </Container>
      </section>

      <section style={{ background: C.bg, ...sectionPad(isMobile) }}>
        <Container style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Headline line1="Fragen zur" line2="Förderung?" size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(32px,3.4vw,46px)"} style={{ textAlign: "center" }} />
            <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 16, lineHeight: 1.6, color: C.textDim, maxWidth: 480, marginInline: "auto" }}>
              Schreib uns — wir melden uns und klären mit dir, ob und wie's mit dem BuT klappt.
            </p>
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: isMobile ? 24 : 36, boxShadow: SHADOW_MD }}>
            <ContactForm compact />
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SEITE: JOBS
   ============================================================ */
const JOB_WIR = [
  { title: "Flexible Zeiten", text: "Du sagst, wann du kannst. Nachmittags, abends, am Wochenende — wir richten uns nach deinem Stundenplan." },
  { title: "Faire Bezahlung", text: "Pünktlich und transparent. Kein Kleingedrucktes." },
  { title: "Präsenz oder online", text: "Unterrichte vor Ort in Remscheid oder bequem per Video von zuhause." },
  { title: "Wir lassen dich nicht allein", text: "Materialien, Ansprechpartner und Tipps gibt's dazu. Gerade am Anfang." },
];

function JobsPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Jobs bei beck-up" pillColor={C.accent}
        line1="Gib dein Wissen" line2="weiter."
        sub="Du studierst, machst gerade dein Abi oder kennst dich einfach in einem Fach richtig gut aus? Dann werde Nachhilfelehrkraft bei uns." />

      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 48 }}>
            <div>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 24 : 30, color: C.primary }}>Wen wir suchen</h2>
              <p style={{ marginTop: 14, fontFamily: FF.body, fontSize: 16, lineHeight: 1.7, color: C.textDim }}>
                Du musst kein ausgebildeter Lehrer sein. Wichtiger ist, dass du dein Fach verstehst und es anderen erklären kannst, ohne dass sie sich dumm fühlen. Geduld zählt mehr als Perfektion.
              </p>
              <div style={{ marginTop: 22 }}>
                <Marker color={C.accent}>Sicher in mindestens einem Schulfach</Marker>
                <Marker color={C.accent}>Geduldig und zuverlässig</Marker>
                <Marker color={C.accent}>Lust, mit Kindern und Jugendlichen zu arbeiten</Marker>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {JOB_WIR.map((w) => (
                <div key={w.title} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 18, padding: isMobile ? 20 : 22 }}>
                  <Sparkles size={20} style={{ color: C.gold }} />
                  <h3 style={{ marginTop: 12, fontFamily: FF.display, fontWeight: 700, fontSize: 16.5, color: C.primary, lineHeight: 1.25 }}>{w.title}</h3>
                  <p style={{ marginTop: 8, fontFamily: FF.body, fontSize: 13.5, lineHeight: 1.55, color: C.textDim }}>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section style={{ background: C.bgAlt, ...sectionPad(isMobile) }}>
        <Container style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Pill color={C.accent}>Bewerbung</Pill>
            <div style={{ height: 16 }} />
            <Headline line1="Klingt gut?" line2="Dann bewirb dich." size={isMobile ? "clamp(28px,6.5vw,38px)" : "clamp(32px,3.4vw,46px)"} style={{ textAlign: "center" }} />
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: isMobile ? 24 : 36, boxShadow: SHADOW_MD }}>
            <JobForm />
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SEITE: FAQ
   ============================================================ */
const FAQS = [
  { q: "Ab welcher Klasse bietet ihr Nachhilfe an?", a: "Von der ersten Klasse bis zum Abitur — also Klasse 1 bis 13. Ob Grundschule, Mittelstufe oder Oberstufe, wir haben für jede Stufe die passenden Lehrkräfte." },
  { q: "Ist die Probestunde wirklich kostenlos?", a: "Ja, komplett. Dein Kind lernt die Lehrkraft kennen, ihr schaut, ob die Chemie stimmt — und das kostet nichts. Erst wenn ihr danach weitermachen wollt, reden wir über alles Weitere." },
  { q: "Was kostet die Nachhilfe?", a: "Das hängt davon ab: Einzel- oder Gruppenunterricht, wie oft pro Woche, welche Stufe. Deshalb nennen wir den Preis im Gespräch, wenn wir wissen, was ihr braucht. Und falls ihr Anspruch auf BuT-Förderung habt, kann es für euch sogar kostenlos sein." },
  { q: "Was ist das BuT und zahlt der Staat die Nachhilfe?", a: "Das Bildungs- und Teilhabepaket übernimmt unter bestimmten Voraussetzungen die Kosten für Lernförderung. Viele Familien haben Anspruch, ohne es zu wissen. Auf unserer Förderseite steht, wie das geht — und wir helfen beim Antrag." },
  { q: "Einzel- oder Gruppenunterricht — was ist besser?", a: "Kommt drauf an. Einzelunterricht ist intensiver und gut bei größeren Lücken. In der Gruppe lernt man günstiger und oft entspannter, weil man nicht allein im Fokus steht. Wir sagen dir ehrlich, was für dein Kind mehr Sinn macht." },
  { q: "Bietet ihr auch Online-Unterricht an?", a: "Ja. Seit 2020 läuft das bei uns rund — mit denselben Lehrkräften wie vor Ort, digitaler Tafel und geteilten Aufgaben. Für viele ist es praktischer, weil die Anfahrt wegfällt." },
  { q: "Was ist die Abi-Night?", a: "Unser Klassiker: In der Zeit vor den Prüfungen arbeiten wir intensiv und in der Gruppe den Stoff durch. Anstrengend, klar. Aber es gibt Sicherheit, und Snacks sind auch dabei." },
  { q: "Welche Fächer deckt ihr ab?", a: "Die gängigen Schulfächer — von Mathe, Deutsch und Englisch über die Naturwissenschaften bis zu Latein und den Gesellschaftsfächern. Wenn dein Fach nicht in der Liste steht, frag trotzdem einfach nach." },
  { q: "Wie schnell bekommen wir einen Termin?", a: "Meistens ziemlich kurzfristig. Ruf an oder schreib uns, dann finden wir oft schon in derselben Woche etwas. Gerade vor Prüfungen lohnt es sich, früh dran zu sein." },
  { q: "Wo sind eure Standorte?", a: "Wir sind dreimal in Remscheid: Alleestr. 116, Alleestr. 29 und in Remscheid-Lennep in der Bahnhofstr. 3. Welcher Standort für euch am besten passt, klären wir im Gespräch." },
  { q: "Was passiert, wenn eine Stunde ausfällt?", a: "Sagt rechtzeitig Bescheid, dann finden wir einen Nachholtermin. Krank werden alle mal — das ist kein Problem, solange ihr euch meldet." },
  { q: "Mein Kind hat keine Lust auf Nachhilfe. Bringt das was?", a: "Ehrliche Antwort: Motivation ist Teil unserer Arbeit. Viele kommen anfangs widerwillig und merken dann, dass es gar nicht so schlimm ist, wenn man Sachen endlich versteht. Die Probestunde ist genau dafür da — unverbindlich ausprobieren." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%", padding: "20px 4px", textAlign: "left", minHeight: 44 }}>
        <span style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 17, color: open ? C.accent : C.primary, lineHeight: 1.35, transition: "color .2s ease" }}>{q}</span>
        <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: open ? C.accent : C.bgAlt, color: open ? "#fff" : C.primary, display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s ease, background .2s ease, color .2s ease" }}>
          <ChevronDown size={18} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 320 : 0, transition: "max-height .35s ease" }}>
        <p style={{ padding: "0 4px 22px", fontFamily: FF.body, fontSize: 15, lineHeight: 1.7, color: C.textDim, maxWidth: 760 }}>{a}</p>
      </div>
    </div>
  );
}

function FaqPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Häufige Fragen" pillColor={C.primary}
        line1="Alles, was ihr" line2="wissen wollt."
        sub="Und falls deine Frage hier nicht steht: Ruf an oder schreib uns. Wir antworten gern persönlich." />

      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container style={{ maxWidth: 820 }}>
          <div>
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
          <div style={{ marginTop: 40, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 22, padding: isMobile ? 26 : 34, textAlign: "center" }}>
            <h3 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 26, color: C.primary }}>Frage nicht dabei?</h3>
            <p style={{ marginTop: 10, fontFamily: FF.body, fontSize: 15.5, lineHeight: 1.6, color: C.textDim, maxWidth: 420, marginInline: "auto" }}>
              Kein Problem. Stell sie uns direkt — am schnellsten per WhatsApp oder Anruf.
            </p>
            <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="gold" onClick={() => setPage("kontakt")}>Zum Kontakt <ArrowRight size={18} /></Button>
              <Button as="a" href={WA_HREF} target="_blank" variant="ghost"><MessageCircle size={18} />WhatsApp</Button>
            </div>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

/* ============================================================
   SEITE: KONTAKT
   ============================================================ */
const OEFFNUNG = [
  { d: "Montag – Freitag", h: "09:00 – 19:00 Uhr" },
  { d: "Samstag", h: "10:00 – 14:00 Uhr" },
  { d: "Sonntag", h: "geschlossen" },
];

function ContactRow({ icon: Icon, label, value, href, target }) {
  const inner = (
    <div className="bu-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 12px", borderRadius: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accentTint, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={21} />
      </div>
      <div>
        <div style={{ fontFamily: FF.body, fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: C.textVeryDim }}>{label}</div>
        <div style={{ fontFamily: FF.body, fontSize: 16, fontWeight: 700, color: C.textHi }}>{value}</div>
      </div>
    </div>
  );
  if (href) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} style={{ display: "block" }}>{inner}</a>;
  return inner;
}

function KontaktPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Kontakt" pillColor={C.accent}
        line1="Lass uns" line2="reden."
        sub="Schreib uns, ruf an oder komm vorbei. Die erste Stunde ist kostenlos — und ein Gespräch sowieso." />

      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr", gap: isMobile ? 36 : 56, alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 26, color: C.primary }}>So erreichst du uns</h2>
              <div style={{ marginTop: 18 }}>
                <ContactRow icon={Phone} label="Telefon" value={TEL} href={TEL_HREF} />
                <ContactRow icon={MessageCircle} label="WhatsApp" value={MOBIL} href={WA_HREF} target="_blank" />
                <ContactRow icon={Mail} label="E-Mail" value={MAIL} href={MAIL_HREF} />
              </div>

              <h3 style={{ marginTop: 30, fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.primary }}>Standorte in Remscheid</h3>
              <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                {STANDORTE.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: C.bgAlt, borderRadius: 14, border: `1px solid ${C.border}` }}>
                    <MapPin size={19} style={{ color: C.accent, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontFamily: FF.body, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: C.textVeryDim }}>{s.tag}</div>
                      <div style={{ fontFamily: FF.body, fontSize: 15, fontWeight: 600, color: C.textHi }}>{s.street}, {s.city}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ marginTop: 30, fontFamily: FF.display, fontWeight: 800, fontSize: 19, color: C.primary }}>Öffnungszeiten</h3>
              <div style={{ marginTop: 14, background: C.bgAlt, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {OEFFNUNG.map((o, i) => (
                  <div key={o.d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderTop: i ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FF.body, fontSize: 14.5, fontWeight: 600, color: C.text }}>
                      <Clock size={15} style={{ color: C.textVeryDim }} />{o.d}
                    </span>
                    <span style={{ fontFamily: FF.body, fontSize: 14.5, fontWeight: 700, color: o.h === "geschlossen" ? C.textVeryDim : C.textHi }}>{o.h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: isMobile ? 24 : 36, boxShadow: SHADOW_MD }}>
              <h2 style={{ fontFamily: FF.display, fontWeight: 800, fontSize: isMobile ? 22 : 26, color: C.primary }}>Schreib uns</h2>
              <p style={{ marginTop: 8, marginBottom: 22, fontFamily: FF.body, fontSize: 15, lineHeight: 1.6, color: C.textDim }}>
                Füll einfach aus, was du gerade weißt. Den Rest klären wir im Gespräch.
              </p>
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
   FOOTER
   ============================================================ */
function Footer({ setPage, isMobile }) {
  const col = { fontFamily: FF.body, fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.7)" };
  const head = { fontFamily: FF.body, fontSize: 12, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: C.goldLi, marginBottom: 14 };
  const linkBtn = { ...col, display: "block", textAlign: "left", color: "rgba(255,255,255,0.7)" };
  return (
    <footer style={{ background: C.primaryDk, color: "#fff", paddingTop: isMobile ? 48 : 72, paddingBottom: isMobile ? 96 : 40 }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr 1fr 1fr", gap: isMobile ? 32 : 40 }}>
          <div>
            <span style={{ fontFamily: FF.display, fontWeight: 800, fontSize: 26, color: "#fff" }}>beck<span style={{ color: C.accent }}>-</span>up</span>
            <p style={{ marginTop: 14, maxWidth: 280, fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>
              Persönliche Nachhilfe in Remscheid, Klasse 1–13. Präsenz und online, seit 2003.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href={TEL_HREF} aria-label="Anrufen" style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Phone size={19} /></a>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><MessageCircle size={19} /></a>
              <a href={MAIL_HREF} aria-label="E-Mail" style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Mail size={19} /></a>
            </div>
          </div>

          <div>
            <div style={head}>Seiten</div>
            {NAV_LINKS.map((l) => (
              <button key={l.key} className="bu-navlink" onClick={() => setPage(l.key)} style={linkBtn}>{l.label}</button>
            ))}
          </div>

          <div>
            <div style={head}>Standorte</div>
            {STANDORTE.map((s, i) => (
              <div key={i} style={col}>{s.street}<br /><span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s.city}</span></div>
            ))}
          </div>

          <div>
            <div style={head}>Kontakt</div>
            <a href={TEL_HREF} style={linkBtn}>{TEL}</a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" style={linkBtn}>{MOBIL}</a>
            <a href={MAIL_HREF} style={linkBtn}>{MAIL}</a>
            <div style={{ ...col, marginTop: 10, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Mo–Fr 09–19 · Sa 10–14 Uhr</div>
          </div>
        </div>

        <div style={{ marginTop: isMobile ? 36 : 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: FF.body, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>© {new Date().getFullYear()} beck-up · Nachhilfe in Remscheid</span>
          <div style={{ display: "flex", gap: 20 }}>
            <button onClick={() => setPage("impressum")} style={{ fontFamily: FF.body, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Impressum</button>
            <button onClick={() => setPage("datenschutz")} style={{ fontFamily: FF.body, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Datenschutz</button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
/* ============================================================
   RECHTLICHES: IMPRESSUM & DATENSCHUTZ
   Vorlagen mit markierten Platzhaltern – vor Livegang prüfen lassen.
   ============================================================ */
function FillIn({ children }) {
  return (
    <span style={{ background: C.accentTint, color: C.accentDk, padding: "1px 8px", borderRadius: 6, fontWeight: 700, fontSize: "0.93em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function LegalNote({ children }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "16px 18px", borderRadius: 14, background: C.goldTint, border: `1px solid ${C.gold}`, marginBottom: 28 }}>
      <AlertCircle size={20} style={{ color: C.goldDk, flexShrink: 0, marginTop: 1 }} />
      <p style={{ margin: 0, fontFamily: FF.body, fontSize: 14, lineHeight: 1.6, color: C.goldDk, fontWeight: 600 }}>{children}</p>
    </div>
  );
}

const lH2 = { fontFamily: FF.display, fontWeight: 800, fontSize: 22, color: C.primary, marginTop: 36, marginBottom: 0 };
const lH3 = { fontFamily: FF.display, fontWeight: 700, fontSize: 16.5, color: C.primary, marginTop: 22, marginBottom: 0 };
const lP = { fontFamily: FF.body, fontSize: 15, lineHeight: 1.75, color: C.text, marginTop: 10 };
const lDim = { ...lP, color: C.textDim };

function ImpressumPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Rechtliches" pillColor={C.primary} line1="Impressum" line2="& Angaben." />
      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container style={{ maxWidth: 760 }}>
          <LegalNote>
            Vorlage. Bitte alle <FillIn>rot markierten</FillIn> Felder ausfüllen und den Text vor dem Livegang rechtlich prüfen lassen. Die Angaben hängen u. a. von Rechtsform und Tätigkeit ab.
          </LegalNote>

          <h2 style={{ ...lH2, marginTop: 0 }}>Angaben gemäß § 5 DDG</h2>
          <p style={lP}>
            <FillIn>[Inhaber:in / Firmenname]</FillIn><br />
            <FillIn>[Rechtsform, z. B. Einzelunternehmen]</FillIn><br />
            beck-up<br />
            Alleestraße 116<br />
            <FillIn>[PLZ]</FillIn> Remscheid<br />
            Deutschland
          </p>

          <h2 style={lH2}>Kontakt</h2>
          <p style={lP}>
            Telefon: {TEL}<br />
            Mobil / WhatsApp: {MOBIL}<br />
            E-Mail: {MAIL}
          </p>

          <h2 style={lH2}>Umsatzsteuer-ID</h2>
          <p style={lP}>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            <FillIn>[USt-IdNr. einsetzen – oder diesen Abschnitt löschen, falls nicht vorhanden]</FillIn>
          </p>

          <h2 style={lH2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p style={lP}>
            <FillIn>[Vor- und Nachname]</FillIn><br />
            <FillIn>[Anschrift, falls abweichend]</FillIn>
          </p>

          <h2 style={lH2}>Streitschlichtung</h2>
          <p style={lDim}>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, fontWeight: 600 }}>ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse findest du oben.
          </p>
          <p style={lDim}>
            Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 style={lH2}>Haftung für Inhalte</h2>
          <p style={lDim}>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>

          <h2 style={lH2}>Haftung für Links</h2>
          <p style={lDim}>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.
          </p>

          <h2 style={lH2}>Urheberrecht</h2>
          <p style={lDim}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
          </p>

          <div style={{ marginTop: 36 }}>
            <Button variant="ghost" onClick={() => setPage("datenschutz")}>Zur Datenschutzerklärung <ArrowRight size={18} /></Button>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}

function DatenschutzPage({ setPage, isMobile }) {
  return (
    <main>
      <PageHeader isMobile={isMobile} pill="Rechtliches" pillColor={C.primary} line1="Daten" line2="schutz." />
      <section style={{ background: C.bg, ...sectionPad(isMobile, isMobile ? 0 : -20, 0) }}>
        <Container style={{ maxWidth: 760 }}>
          <LegalNote>
            Muster-Datenschutzerklärung. Sie deckt die aktuell auf dieser Seite eingesetzte Technik ab (Kontaktformular über Web3Forms, Schriftarten von Google). Bitte <FillIn>rot markierte</FillIn> Felder ergänzen und vor dem Livegang rechtlich prüfen lassen.
          </LegalNote>

          <h2 style={{ ...lH2, marginTop: 0 }}>1. Verantwortlicher</h2>
          <p style={lP}>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            <FillIn>[Name / Firmenname]</FillIn>, beck-up, Alleestraße 116, <FillIn>[PLZ]</FillIn> Remscheid<br />
            E-Mail: {MAIL} · Telefon: {TEL}
          </p>

          <h2 style={lH2}>2. Hosting</h2>
          <p style={lDim}>
            Diese Website wird bei <FillIn>[Hoster, z. B. Vercel Inc.]</FillIn> gehostet. Der Anbieter verarbeitet dabei in unserem Auftrag technische Daten, die dein Browser automatisch übermittelt (siehe Server-Logfiles). Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und stabilen Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO). Sofern erforderlich, besteht mit dem Anbieter ein Auftragsverarbeitungsvertrag.
          </p>

          <h2 style={lH2}>3. Server-Logfiles</h2>
          <p style={lDim}>
            Beim Aufruf der Seite werden automatisch Informationen erfasst, die dein Browser übermittelt: u. a. Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Uhrzeit der Anfrage und die IP-Adresse. Diese Daten dienen der technischen Auslieferung und Sicherheit und werden nicht mit anderen Datenquellen zusammengeführt.
          </p>

          <h2 style={lH2}>4. Kontaktformular</h2>
          <p style={lP}>
            Wenn du uns über das Formular eine Anfrage schickst, verarbeiten wir die von dir eingegebenen Daten (z. B. Name, E-Mail, Telefon, Klasse, Fach und dein Anliegen), um die Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. f DSGVO.
          </p>
          <p style={lDim}>
            Für den Versand nutzen wir den Dienst <b>Web3Forms</b> (Hoodox Innovations). Die Formulardaten werden dabei an die Server von Web3Forms übermittelt und von dort an unsere E-Mail-Adresse weitergeleitet. Mit dem Anbieter besteht – soweit erforderlich – ein Auftragsverarbeitungsvertrag. Details: <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, fontWeight: 600 }}>web3forms.com/privacy</a>. Deine Daten verbleiben bei uns, bis der Zweck entfällt oder du um Löschung bittest.
          </p>

          <h2 style={lH2}>5. Schriftarten</h2>
          <p style={lDim}>
            Diese Seite verwendet die Schriftarten Bricolage Grotesque, Manrope und Fraunces. Die Schriftdateien werden direkt vom eigenen Server ausgeliefert – es findet keine Verbindung zu externen Diensten statt, und es werden dabei keine personenbezogenen Daten übertragen.
          </p>

          <h2 style={lH2}>6. Cookies & Tracking</h2>
          <p style={lDim}>
            Diese Website setzt aktuell keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Es findet kein Profiling statt.
          </p>

          <h2 style={lH2}>7. Deine Rechte</h2>
          <p style={lP}>Du hast jederzeit das Recht auf:</p>
          <div style={{ marginTop: 8 }}>
            {["Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)", "Berichtigung unrichtiger Daten (Art. 16 DSGVO)", "Löschung (Art. 17 DSGVO)", "Einschränkung der Verarbeitung (Art. 18 DSGVO)", "Datenübertragbarkeit (Art. 20 DSGVO)", "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)"].map((r) => (
              <Marker key={r} color={C.primary}>{r}</Marker>
            ))}
          </div>
          <p style={lDim}>
            Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist in der Regel die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).
          </p>

          <h2 style={lH2}>8. Aktualität</h2>
          <p style={lDim}>
            Stand dieser Erklärung: <FillIn>[Monat / Jahr]</FillIn>. Bei Änderungen an der Website passen wir diese Erklärung entsprechend an.
          </p>

          <div style={{ marginTop: 36 }}>
            <Button variant="ghost" onClick={() => setPage("impressum")}>Zum Impressum <ArrowRight size={18} /></Button>
          </div>
        </Container>
      </section>
      <Footer setPage={setPage} isMobile={isMobile} />
    </main>
  );
}
/* ============================================================
   APP – ROOT & SEITEN-ROUTING
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const isMobile = useIsMobile(900);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  return (
    <>
      <GlobalStyles />
      <Nav page={page} setPage={setPage} isMobile={isMobile} />

      {page === "home" && (
        <>
          <Home setPage={setPage} isMobile={isMobile} />
          <Footer setPage={setPage} isMobile={isMobile} />
        </>
      )}
      {page === "angebote" && <AngebotePage setPage={setPage} isMobile={isMobile} />}
      {page === "but" && <ButPage setPage={setPage} isMobile={isMobile} />}
      {page === "jobs" && <JobsPage setPage={setPage} isMobile={isMobile} />}
      {page === "faq" && <FaqPage setPage={setPage} isMobile={isMobile} />}
      {page === "kontakt" && <KontaktPage setPage={setPage} isMobile={isMobile} />}
      {page === "impressum" && <ImpressumPage setPage={setPage} isMobile={isMobile} />}
      {page === "datenschutz" && <DatenschutzPage setPage={setPage} isMobile={isMobile} />}

      <ScrollToTop isMobile={isMobile} />
      {isMobile && <MobileBottomBar setPage={setPage} />}
    </>
  );
}
