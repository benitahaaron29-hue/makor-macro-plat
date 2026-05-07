"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Archive as ArchiveIcon,
  Library,
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Calendar,
  Sparkles,
  PenLine,
  Settings,
  ExternalLink,
  Quote,
  ChevronDown,
  Globe,
  Building2,
  Newspaper,
  LineChart,
  Flame,
  Scale,
  ShieldCheck,
  Printer,
  Download,
  Share2,
  Star,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
//   MAKOR SECURITIES — MORNING INTELLIGENCE PLATFORM
//   Internal prototype · v.1.1 (refined)
// ════════════════════════════════════════════════════════════════════════════

const C = {
  purple: "#413277",
  purpleDeep: "#2D2256",
  purpleNight: "#1F1842",
  purpleMid: "#5A4992",
  purpleSoft: "#7E6FB1",
  purpleMist: "#B5ABCE",
  purpleFog: "#E5E0EE",
  cream: "#F1EEE7",
  creamSoft: "#F7F5EE",
  paper: "#FBF9F4",
  white: "#FFFFFF",
  ink: "#1A1532",
  text: "#2A2545",
  text2: "#4F4865",
  muted: "#7A7290",
  soft: "#A099B5",
  rule: "#DDD7CB",
  hairline: "#E8E2D4",
  green: "#3D6647",
  greenSoft: "#6B8F73",
  red: "#963838",
  redSoft: "#B26565",
  amber: "#9C6B1A",
};

const fontSerif = `'Lora', Georgia, 'Times New Roman', serif`;
const fontSans = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

const LOGO_DATA_URI = "/logo-makor.jpg";


// ───────────── atoms ─────────────

const Eyebrow = ({ children, color = C.muted, mr = 12 }) => (
  <div
    style={{
      fontFamily: fontSans,
      fontSize: 9.5,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 1,
        background: color,
        opacity: 0.5,
        marginRight: mr,
      }}
    />
    {children}
  </div>
);

const SerifTitle = ({ children, size = 22, color = C.ink, italic = false, weight = 500 }) => (
  <div
    style={{
      fontFamily: fontSerif,
      fontSize: size,
      color,
      fontWeight: weight,
      letterSpacing: "-0.012em",
      lineHeight: 1.15,
      fontStyle: italic ? "italic" : "normal",
    }}
  >
    {children}
  </div>
);

const Pill = ({ children, tone = "purple", small }) => {
  const tones = {
    purple: { border: C.purple, color: C.purple, bg: "rgba(65,50,119,0.05)" },
    green: { border: C.green, color: C.green, bg: "rgba(61,102,71,0.05)" },
    red: { border: C.red, color: C.red, bg: "rgba(150,56,56,0.05)" },
    amber: { border: C.amber, color: C.amber, bg: "rgba(156,107,26,0.05)" },
    neutral: { border: C.soft, color: C.muted, bg: "rgba(160,153,181,0.05)" },
    dark: { border: C.purpleDeep, color: "#fff", bg: C.purpleDeep },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: fontSans,
        fontSize: small ? 8.5 : 9.5,
        padding: small ? "2px 7px" : "3px 9px",
        border: `1px solid ${t.border}`,
        color: t.color,
        background: t.bg,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

const LiveDot = ({ color = C.green, size = 7 }) => (
  <span style={{ position: "relative", display: "inline-block", width: size, height: size }}>
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: color,
        animation: "makorPulse 1.8s ease-in-out infinite",
      }}
    />
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: color,
        opacity: 0.95,
      }}
    />
  </span>
);

// ───────────── MAKOR LOGO ─────────────
// Uses the actual uploaded logo asset (black-on-white JPG) and adapts to
// surface colour via CSS blend modes — never recreated, only re-rendered.

const MakorLogo = ({ height = 30, surface = "light", style = {} }) => {
  // surface: 'light' (cream/white bg) or 'dark' (purple/black bg)
  const isDark = surface === "dark";
  return (
    <img
      src={LOGO_DATA_URI}
      alt="Makor Securities London Ltd"
      style={{
        height,
        width: "auto",
        display: "block",
        // dark surface: invert the JPG so black logo becomes white,
        //   then 'screen' blend so the inverted-black bg disappears into purple
        // light surface: 'multiply' blend so the white JPG bg disappears into cream
        filter: isDark ? "invert(1) brightness(1.05) contrast(0.96)" : "none",
        mixBlendMode: isDark ? "screen" : "multiply",
        ...style,
      }}
    />
  );
};

// ───────────── sidebar ─────────────

const NavItem = ({ icon: Icon, label, active, onClick, sub }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "13px 20px 13px 24px",
      background: active ? "rgba(126,111,177,0.16)" : "transparent",
      border: "none",
      borderLeft: active ? `2px solid ${C.purpleMist}` : "2px solid transparent",
      cursor: "pointer",
      transition: "all 0.18s ease",
      color: active ? "#fff" : "rgba(255,255,255,0.62)",
      textAlign: "left",
      fontFamily: fontSans,
      position: "relative",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.color = "rgba(255,255,255,0.92)";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.62)";
      }
    }}
  >
    <Icon size={15} strokeWidth={1.6} />
    <span style={{ flex: 1, fontSize: 12.5, letterSpacing: "0.02em", fontWeight: active ? 500 : 400 }}>
      {label}
    </span>
    {sub && (
      <span style={{ fontSize: 9.5, opacity: 0.5, fontStyle: "italic", fontFamily: fontSerif }}>{sub}</span>
    )}
  </button>
);

const Sidebar = ({ active, setActive }) => (
  <aside
    style={{
      width: 232,
      flexShrink: 0,
      background: C.purpleNight,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      borderRight: `1px solid ${C.purpleDeep}`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -120,
        left: -120,
        width: 360,
        height: 360,
        background: `radial-gradient(circle, rgba(126,111,177,0.18), transparent 65%)`,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -100,
        right: -100,
        width: 280,
        height: 280,
        background: `radial-gradient(circle, rgba(90,73,146,0.15), transparent 70%)`,
        pointerEvents: "none",
      }}
    />

    {/* Logo block */}
    <div
      style={{
        padding: "30px 24px 26px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <MakorLogo height={42} surface="dark" />
      <div
        style={{
          fontFamily: fontSans,
          fontSize: 8.5,
          letterSpacing: "0.26em",
          color: "rgba(255,255,255,0.42)",
          marginTop: 14,
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        Morning Intelligence
      </div>
      <div
        style={{
          fontFamily: fontSerif,
          fontSize: 12,
          color: "rgba(255,255,255,0.85)",
          marginTop: 3,
          fontStyle: "italic",
          fontWeight: 500,
        }}
      >
        Platform · v.1.1
      </div>
    </div>

    <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 24px 16px" }} />

    {/* Nav — three items only */}
    <nav style={{ flex: 1, position: "relative", zIndex: 1 }}>
      <NavItem
        icon={LayoutDashboard}
        label="Dashboard"
        active={active === "dashboard"}
        onClick={() => setActive("dashboard")}
      />
      <NavItem
        icon={ArchiveIcon}
        label="Archive"
        active={active === "archive"}
        onClick={() => setActive("archive")}
        sub="247"
      />
      <NavItem
        icon={Library}
        label="Sources"
        active={active === "sources"}
        onClick={() => setActive("sources")}
      />
    </nav>

    {/* Footer */}
    <div
      style={{
        padding: "16px 24px 20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontFamily: fontSans,
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: C.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fontSerif,
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          JM
        </div>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <div style={{ color: "#fff", fontSize: 11.5, fontWeight: 500 }}>J. Marchetti</div>
          <div style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            FX Strategy
          </div>
        </div>
        <Settings size={13} strokeWidth={1.6} style={{ opacity: 0.5, cursor: "pointer" }} />
      </div>
    </div>
  </aside>
);

// ───────────── top bar ─────────────

const TopBar = ({ time, page }) => {
  const fmt = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateFmt = time.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const labels = {
    dashboard: "Dashboard",
    archive: "Archive",
    sources: "Sources",
    briefing: "Briefing",
  };
  const subs = {
    dashboard: "— Pre-London Open",
    archive: "— Past Briefings",
    sources: "— Institutional Feeds",
    briefing: "— Vol. I · No. 247",
  };
  return (
    <div
      style={{
        height: 60,
        background: C.paper,
        borderBottom: `1px solid ${C.hairline}`,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
        <span
          style={{
            fontFamily: fontSans,
            fontSize: 10,
            color: C.muted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Workspace
        </span>
        <ChevronRight size={11} color={C.muted} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: fontSerif,
            fontSize: 13,
            color: C.ink,
            fontWeight: 600,
            letterSpacing: "-0.005em",
          }}
        >
          {labels[page]}
        </span>
        <span
          style={{
            fontFamily: fontSerif,
            fontSize: 12,
            color: C.muted,
            fontStyle: "italic",
            marginLeft: 14,
          }}
        >
          {subs[page]}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          background: C.creamSoft,
          border: `1px solid ${C.hairline}`,
          marginRight: 18,
          minWidth: 240,
        }}
      >
        <Search size={13} color={C.muted} strokeWidth={1.6} />
        <input
          type="text"
          placeholder="Search briefings, themes…"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontFamily: fontSans,
            fontSize: 11.5,
            color: C.text,
          }}
        />
        <span
          style={{
            fontFamily: fontSans,
            fontSize: 9,
            color: C.muted,
            border: `1px solid ${C.rule}`,
            padding: "1px 5px",
            letterSpacing: "0.05em",
          }}
        >
          ⌘K
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "7px 14px",
          background: "rgba(61,102,71,0.06)",
          border: `1px solid rgba(61,102,71,0.18)`,
          marginRight: 14,
        }}
      >
        <LiveDot color={C.green} size={6} />
        <span
          style={{
            fontFamily: fontSans,
            fontSize: 9.5,
            letterSpacing: "0.18em",
            color: C.green,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          London Pre-Open
        </span>
      </div>

      <div style={{ textAlign: "right", marginRight: 18 }}>
        <div
          style={{
            fontFamily: fontSerif,
            fontSize: 14,
            color: C.ink,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.005em",
          }}
        >
          {fmt} <span style={{ fontSize: 10, color: C.muted, fontWeight: 500 }}>GMT</span>
        </div>
        <div
          style={{
            fontFamily: fontSerif,
            fontSize: 10.5,
            color: C.muted,
            fontStyle: "italic",
            marginTop: 1,
          }}
        >
          {dateFmt}
        </div>
      </div>

      <button
        style={{
          width: 32,
          height: 32,
          background: C.creamSoft,
          border: `1px solid ${C.hairline}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Bell size={13} color={C.text2} strokeWidth={1.6} />
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 6,
            height: 6,
            background: C.red,
            borderRadius: "50%",
          }}
        />
      </button>
    </div>
  );
};


// ───────────── HERO (compact) ─────────────

const Hero = () => (
  <section
    style={{
      background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleDeep} 100%)`,
      color: "#fff",
      padding: "34px 44px 32px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -180,
        right: -150,
        width: 540,
        height: 540,
        background: `radial-gradient(circle, rgba(126,111,177,0.32), transparent 65%)`,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -120,
        left: "30%",
        width: 380,
        height: 380,
        background: `radial-gradient(circle, rgba(181,171,206,0.12), transparent 70%)`,
        pointerEvents: "none",
      }}
    />

    <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
      <Eyebrow color="rgba(255,255,255,0.55)">Daily FX & Macro Briefing · Vol. I · No. 247</Eyebrow>

      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 38,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "-0.014em",
          lineHeight: 1.05,
          margin: "14px 0 10px",
        }}
      >
        Good morning,{" "}
        <span style={{ fontStyle: "italic", color: C.purpleMist }}>desk.</span>
      </h1>
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 13,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.6,
          fontWeight: 300,
          maxWidth: 560,
        }}
      >
        Markets are pricing a{" "}
        <em style={{ fontFamily: fontSerif, color: "#fff" }}>de-escalation regime</em> on the Iran MoU. Brent
        −11.8%, USD broadly offered, JPY bid on suspected BoJ activity.
      </p>
    </div>
  </section>
);

// ───────────── BRIEFING GENERATOR (primary action) ─────────────

const QuickButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "9px 18px",
      background: active ? C.purpleDeep : C.white,
      color: active ? "#fff" : C.text,
      border: `1px solid ${active ? C.purpleDeep : C.hairline}`,
      cursor: "pointer",
      fontFamily: fontSans,
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontWeight: active ? 600 : 500,
      transition: "all 0.18s ease",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.borderColor = C.purple;
        e.currentTarget.style.color = C.purple;
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.borderColor = C.hairline;
        e.currentTarget.style.color = C.text;
      }
    }}
  >
    {children}
  </button>
);

const BriefingGenerator = ({ generating, onGenerate, selectedDate, setSelectedDate, quickMode, setQuickMode }) => {
  const dateLabel = selectedDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateInputValue = selectedDate.toISOString().split("T")[0];

  const setQuick = (mode) => {
    setQuickMode(mode);
    const today = new Date(2026, 4, 7); // 7 May 2026 fixed for prototype
    let d = new Date(today);
    if (mode === "yesterday") d.setDate(today.getDate() - 1);
    if (mode === "lastTrading") {
      // 7 May = Thursday → last trading day is Wed 6 May
      const day = today.getDay();
      d.setDate(today.getDate() - (day === 1 ? 3 : 1));
    }
    setSelectedDate(d);
  };

  return (
    <section style={{ padding: "40px 44px 0", background: C.cream }}>
      <div
        style={{
          background: C.white,
          border: `1px solid ${C.hairline}`,
          padding: "32px 40px 36px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
        }}
      >
        {/* subtle corner ornament */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 220,
            height: 220,
            background: `radial-gradient(circle at top right, ${C.purpleFog}, transparent 70%)`,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 28,
              gap: 24,
            }}
          >
            <div>
              <Eyebrow color={C.purple}>Generate Morning Briefing</Eyebrow>
              <div style={{ marginTop: 11, marginBottom: 6 }}>
                <SerifTitle size={28} weight={500}>
                  Compile today&rsquo;s desk note
                </SerifTitle>
              </div>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 13,
                  color: C.text2,
                  fontStyle: "italic",
                  maxWidth: 520,
                  lineHeight: 1.6,
                }}
              >
                Select a session date and Makor will assemble the FX &amp; macro briefing in your house style — geopolitical pulse, pair analysis, vol read, and the day&rsquo;s catalyst radar.
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <Eyebrow color={C.muted} mr={8}>
                Last Generated
              </Eyebrow>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 14,
                  color: C.ink,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                Today, 06:45 GMT
              </div>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 11,
                  color: C.muted,
                  fontStyle: "italic",
                  marginTop: 2,
                }}
              >
                Vol. I · No. 247
              </div>
            </div>
          </div>

          {/* Quick options */}
          <div style={{ marginBottom: 22 }}>
            <Eyebrow color={C.muted}>Quick Select</Eyebrow>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <QuickButton active={quickMode === "today"} onClick={() => setQuick("today")}>
                Today
              </QuickButton>
              <QuickButton active={quickMode === "yesterday"} onClick={() => setQuick("yesterday")}>
                Yesterday
              </QuickButton>
              <QuickButton active={quickMode === "lastTrading"} onClick={() => setQuick("lastTrading")}>
                Last Trading Day
              </QuickButton>
            </div>
          </div>

          {/* Date selector + generate */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "end",
              padding: "22px 24px",
              background: C.creamSoft,
              border: `1px solid ${C.hairline}`,
            }}
          >
            <div>
              <Eyebrow color={C.muted}>Session Date</Eyebrow>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: C.white,
                    border: `1px solid ${C.hairline}`,
                    flex: 1,
                    maxWidth: 360,
                    position: "relative",
                  }}
                >
                  <Calendar size={15} color={C.purple} strokeWidth={1.6} />
                  <span
                    style={{
                      fontFamily: fontSerif,
                      fontSize: 15,
                      color: C.ink,
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    {dateLabel}
                  </span>
                  <input
                    type="date"
                    value={dateInputValue}
                    onChange={(e) => {
                      setSelectedDate(new Date(e.target.value));
                      setQuickMode(null);
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <ChevronDown size={13} color={C.muted} strokeWidth={1.6} />
                </div>
                <span
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 11,
                    color: C.muted,
                    fontStyle: "italic",
                  }}
                >
                  Pre-London Open · 06:45 GMT
                </span>
              </div>
            </div>

            <button
              onClick={onGenerate}
              disabled={generating}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                padding: "14px 28px",
                background: generating ? C.purpleMid : C.purpleDeep,
                color: "#fff",
                border: `1px solid ${generating ? C.purpleMid : C.purpleDeep}`,
                cursor: generating ? "default" : "pointer",
                fontFamily: fontSans,
                fontSize: 11,
                letterSpacing: "0.16em",
                fontWeight: 600,
                textTransform: "uppercase",
                transition: "all 0.22s ease",
                boxShadow: generating ? "none" : "0 2px 12px rgba(45,34,86,0.22)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!generating) {
                  e.currentTarget.style.background = C.purple;
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(65,50,119,0.32)";
                }
              }}
              onMouseLeave={(e) => {
                if (!generating) {
                  e.currentTarget.style.background = C.purpleDeep;
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,34,86,0.22)";
                }
              }}
            >
              {generating ? (
                <>
                  <Sparkles size={14} className="makor-spin" strokeWidth={1.7} />
                  Compiling…
                </>
              ) : (
                <>
                  <PenLine size={14} strokeWidth={1.7} />
                  Generate Briefing
                </>
              )}
            </button>
          </div>

          {/* Generation pipeline progress (only when generating) */}
          {generating && (
            <div
              style={{
                marginTop: 18,
                padding: "16px 22px",
                background: C.purpleNight,
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <LiveDot color={C.purpleMist} size={6} />
                <Eyebrow color="rgba(255,255,255,0.6)" mr={8}>
                  Compiling Briefing
                </Eyebrow>
              </div>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                }}
              >
                Aggregating overnight tape · scanning central bank wires · weighting headline catalysts · drafting house-style narrative…
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ───────────── INTELLIGENCE GRID ─────────────

const InfoCard = ({ children, accent = C.purple, accentLeft = true, padding = "20px 24px" }) => (
  <div
    style={{
      background: C.white,
      border: `1px solid ${C.hairline}`,
      borderLeft: accentLeft ? `3px solid ${accent}` : `1px solid ${C.hairline}`,
      padding,
      boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
      position: "relative",
      height: "100%",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 4px 14px rgba(65,50,119,0.07)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(65,50,119,0.04)";
    }}
  >
    {children}
  </div>
);

const IntelligenceGrid = ({ onOpenBriefing }) => (
  <section style={{ padding: "32px 44px 0", background: C.cream }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingBottom: 13,
        borderBottom: `2px solid ${C.purple}`,
        marginBottom: 22,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        <span
          style={{
            fontFamily: fontSerif,
            fontSize: 36,
            color: C.purple,
            fontStyle: "italic",
            opacity: 0.85,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          §
        </span>
        <SerifTitle size={24} weight={500}>
          Makor Intelligence
        </SerifTitle>
      </div>
      <div
        style={{
          fontFamily: fontSerif,
          fontStyle: "italic",
          fontSize: 11.5,
          color: C.muted,
        }}
      >
        Snapshot · 7 May 2026 · Pre-London
      </div>
    </div>

    {/* 2x2 grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      {/* Latest Briefing */}
      <InfoCard accent={C.purple}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <Eyebrow color={C.purple}>Latest Briefing</Eyebrow>
          <Pill tone="green" small>
            <Circle size={5} fill={C.green} stroke={C.green} /> Published
          </Pill>
        </div>
        <SerifTitle size={18} weight={500}>
          Iran de-escalation drives broad{" "}
          <span style={{ fontStyle: "italic", color: C.purple }}>USD-offered</span> tape
        </SerifTitle>
        <p style={{ fontFamily: fontSans, fontSize: 11.5, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>
          Brent −11.8% on Wednesday as the war premium unwinds. DXY through 100.50 with USD/JPY printing a
          290-pip overnight range on suspected BoJ activity.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 14,
            marginTop: 14,
            borderTop: `1px solid ${C.hairline}`,
            fontFamily: fontSerif,
            fontStyle: "italic",
            fontSize: 11,
            color: C.muted,
          }}
        >
          <span>Vol. I · No. 247 · 06:45 GMT</span>
          <button
            onClick={onOpenBriefing}
            style={{
              fontFamily: fontSans,
              fontSize: 9.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.purple,
              fontWeight: 600,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontStyle: "normal",
            }}
          >
            Open <ArrowUpRight size={11} strokeWidth={1.7} />
          </button>
        </div>
      </InfoCard>

      {/* Current Regime */}
      <InfoCard accent={C.green}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <Eyebrow color={C.green}>Current Regime</Eyebrow>
          <Pill tone="green" small>
            Active
          </Pill>
        </div>
        <SerifTitle size={20} weight={500} italic>
          Risk-On · De-escalation
        </SerifTitle>
        <p style={{ fontFamily: fontSans, fontSize: 11.5, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>
          Iran-deal optimism is the dominant driver. Geopolitical safe-haven premium unwinding from oil, USD,
          and gold. Dual pressure on the dollar from energy disinflation and headline flow.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            marginTop: 14,
            paddingTop: 12,
            borderTop: `1px solid ${C.hairline}`,
          }}
        >
          {[
            { l: "USD", v: "Offered", c: C.red },
            { l: "Brent", v: "$98.40", c: C.amber },
            { l: "Vol Tone", v: "Bid 3M", c: C.purple },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                paddingLeft: i === 0 ? 0 : 14,
                borderLeft: i === 0 ? "none" : `1px solid ${C.hairline}`,
              }}
            >
              <div
                style={{
                  fontFamily: fontSans,
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.muted,
                  fontWeight: 600,
                }}
              >
                {s.l}
              </div>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 13,
                  color: s.c,
                  fontWeight: 600,
                  marginTop: 3,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Headline Risk */}
      <InfoCard accent={C.red}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <Eyebrow color={C.red}>Headline Risk Focus</Eyebrow>
          <Pill tone="red" small>
            Critical
          </Pill>
        </div>
        <SerifTitle size={18} weight={500}>
          Iran&rsquo;s response to the US 14-Point MoU
        </SerifTitle>
        <p style={{ fontFamily: fontSans, fontSize: 11.5, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>
          Tehran reviewing the Witkoff/Kushner framework. White House signalling flex on enrichment moratorium
          (20 → 12–15yr). Trump dual-tracking with renewed bombing threats.
        </p>
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${C.hairline}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontFamily: fontSerif, fontSize: 11, color: C.muted, fontStyle: "italic" }}>
            Window ·{" "}
            <span style={{ color: C.ink, fontWeight: 600, fontStyle: "normal" }}>Through Fri 06:00 GMT</span>
          </span>
          <span
            style={{
              fontFamily: fontSerif,
              fontSize: 11,
              color: C.muted,
              fontStyle: "italic",
            }}
          >
            Acceptance odds:{" "}
            <span style={{ color: C.green, fontWeight: 600, fontStyle: "normal" }}>60–70%</span>
          </span>
        </div>
      </InfoCard>

      {/* Active Theme */}
      <InfoCard accent={C.amber}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <Eyebrow color={C.amber}>Active Macro Theme</Eyebrow>
          <Pill tone="amber" small>
            Structural
          </Pill>
        </div>
        <SerifTitle size={18} weight={500}>
          Powell-to-Warsh Fed transition
        </SerifTitle>
        <p style={{ fontFamily: fontSans, fontSize: 11.5, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>
          Eight days until handover. Warsh has flagged a less-independent posture and faster balance-sheet
          run-off. Markets have not fully priced the uncertainty premium.
        </p>
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${C.hairline}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontFamily: fontSerif, fontSize: 11, color: C.muted, fontStyle: "italic" }}>
            Trigger ·{" "}
            <span style={{ color: C.ink, fontWeight: 600, fontStyle: "normal" }}>15 May 2026</span>
          </span>
          <span
            style={{
              fontFamily: fontSerif,
              fontSize: 11,
              color: C.muted,
              fontStyle: "italic",
            }}
          >
            Skew:{" "}
            <span style={{ color: C.amber, fontWeight: 600, fontStyle: "normal" }}>
              USD-bid risk
            </span>
          </span>
        </div>
      </InfoCard>
    </div>

    {/* Desk Commentary — wide feature card */}
    <InfoCard accent={C.purpleDeep} padding="22px 28px">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <Quote
            size={32}
            strokeWidth={1}
            style={{ color: C.purpleFog, flexShrink: 0, marginTop: 4 }}
          />
          <div>
            <Eyebrow color={C.purple}>Desk Commentary</Eyebrow>
            <div
              style={{
                fontFamily: fontSerif,
                fontStyle: "italic",
                fontSize: 11.5,
                color: C.muted,
                marginTop: 5,
              }}
            >
              Pinned · 06:32 GMT
            </div>
          </div>
        </div>

        <div>
          <SerifTitle size={17} weight={500}>
            The market is paying for the wrong tail.
          </SerifTitle>
          <p
            style={{
              fontFamily: fontSans,
              fontSize: 12,
              color: C.text,
              lineHeight: 1.7,
              marginTop: 10,
            }}
          >
            Term-structure flattening across G10 USD pairs confirms macro uncertainty is no longer concentrated
            in the front end. EUR &amp; GBP 3M vols offer the best risk-reward expression of dollar weakness;
            JPY is the most expensive hedge AND the riskiest carry leg. The cleaner trade is gamma in EUR/USD
            with a small downside hedge — not adding to JPY length.
          </p>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: 20, borderLeft: `1px solid ${C.hairline}` }}>
          <Eyebrow color={C.muted} mr={6}>
            Author
          </Eyebrow>
          <div
            style={{
              fontFamily: fontSerif,
              fontSize: 14,
              color: C.ink,
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            J. Marchetti
          </div>
          <div
            style={{
              fontFamily: fontSerif,
              fontSize: 11,
              color: C.muted,
              fontStyle: "italic",
              marginTop: 2,
            }}
          >
            Head of FX Strategy
          </div>
        </div>
      </div>
    </InfoCard>
  </section>
);


// ───────────── ARCHIVE PAGE ─────────────

const ArchivePage = ({ onOpenBriefing }) => {
  const items = [
    {
      vol: "247",
      date: "Thu 7 May 2026",
      title: "Iran de-escalation drives broad USD-offered tape",
      take: "MoU under Tehran review. Brent −11.8%, USD/JPY 290-pip range on suspected BoJ activity.",
      tag: "Risk-On",
      tagTone: "green",
      live: true,
    },
    {
      vol: "246",
      date: "Wed 6 May 2026",
      title: "Strait closure premium peaks; oil prints $112",
      take: "Iran tanker incident triggers risk-off cascade. Gold +3.8%, USD/JPY 159 with intervention chatter.",
      tag: "Risk-Off",
      tagTone: "red",
    },
    {
      vol: "245",
      date: "Tue 5 May 2026",
      title: "Trump bombing threats reignite the war premium",
      take: "Geopolitical regime re-engaged. EUR/USD breaks 1.16, Gilts off 12bp on UK energy pass-through.",
      tag: "Geopolitical",
      tagTone: "amber",
    },
    {
      vol: "244",
      date: "Fri 2 May 2026",
      title: "BoE 8-1 hold; Pill votes for hike",
      take: "Sterling fastest-mover on the day. UK 10Y to 4.55%. MPC dispersion now structural.",
      tag: "Central Banks",
      tagTone: "purple",
    },
    {
      vol: "243",
      date: "Thu 1 May 2026",
      title: "May Day · ECB sequencing under question",
      take: "Eurozone CPI 2.5% energy-driven. Schnabel speech leaks dovish-tilt; EUR/USD heavy from 1.18.",
      tag: "Inflation",
      tagTone: "amber",
    },
    {
      vol: "242",
      date: "Wed 30 Apr 2026",
      title: "Fed split hold; 8-4 vote with two dissents to hike",
      take: "Front-end repriced 18bp. Powell signs off with hawkish lean. DXY 102, sub-1.16 EUR/USD.",
      tag: "Fed",
      tagTone: "purple",
    },
    {
      vol: "241",
      date: "Tue 29 Apr 2026",
      title: "Atlanta Fed GDPNow tracks 3.7% Q2",
      take: "Resilience read pushed 2Y yields up 9bp. Stagflation tail debate reignited.",
      tag: "Growth",
      tagTone: "green",
    },
    {
      vol: "240",
      date: "Mon 28 Apr 2026",
      title: "BoJ shock: 25bp hike, intervention warnings",
      take: "Highest rate since 1995. USD/JPY round-trips 4 yen. Carry trades unwound aggressively.",
      tag: "BoJ",
      tagTone: "red",
    },
    {
      vol: "239",
      date: "Fri 25 Apr 2026",
      title: "Q1 productivity surprises higher; ULC cools",
      take: "Soft-landing narrative bid. SPX +1.4%, USD softer. Curve steepens 8bp.",
      tag: "Data",
      tagTone: "green",
    },
  ];

  const [filter, setFilter] = useState("all");

  return (
    <div style={{ background: C.cream, minHeight: "100%" }}>
      {/* Page header */}
      <section
        style={{
          padding: "44px 44px 32px",
          background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleDeep} 100%)`,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -120,
            width: 460,
            height: 460,
            background: `radial-gradient(circle, rgba(126,111,177,0.28), transparent 65%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <Eyebrow color="rgba(255,255,255,0.55)">Archive</Eyebrow>
          <h1
            style={{
              fontFamily: fontSerif,
              fontSize: 38,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.014em",
              lineHeight: 1.05,
              margin: "14px 0 10px",
            }}
          >
            Past Morning <span style={{ fontStyle: "italic", color: C.purpleMist }}>Briefings</span>
          </h1>
          <p
            style={{
              fontFamily: fontSans,
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            247 editions since launch. Browse by date, theme, or institutional regime.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section
        style={{
          padding: "22px 44px 0",
          background: C.cream,
        }}
      >
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.hairline}`,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
          }}
        >
          <span
            style={{
              fontFamily: fontSans,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.muted,
              fontWeight: 600,
            }}
          >
            Filter
          </span>
          {[
            { id: "all", label: "All" },
            { id: "risk", label: "Risk-On / Risk-Off" },
            { id: "cb", label: "Central Banks" },
            { id: "geo", label: "Geopolitical" },
            { id: "data", label: "Data Days" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "5px 12px",
                background: filter === f.id ? C.purpleDeep : "transparent",
                color: filter === f.id ? "#fff" : C.text2,
                border: `1px solid ${filter === f.id ? C.purpleDeep : C.hairline}`,
                cursor: "pointer",
                fontFamily: fontSans,
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.06em",
                transition: "all 0.18s ease",
              }}
            >
              {f.label}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: fontSerif, fontSize: 11, color: C.muted, fontStyle: "italic" }}>
              Showing 9 of 247
            </span>
          </div>
        </div>
      </section>

      {/* Archive list */}
      <section style={{ padding: "16px 44px 36px", background: C.cream }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) => (
            <article
              key={i}
              onClick={onOpenBriefing}
              style={{
                background: C.white,
                border: `1px solid ${C.hairline}`,
                borderLeft: `3px solid ${it.live ? C.green : C.purpleMist}`,
                padding: "18px 24px",
                boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: 24,
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderLeftColor = C.purple;
                e.currentTarget.style.transform = "translateX(2px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(65,50,119,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderLeftColor = it.live ? C.green : C.purpleMist;
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(65,50,119,0.04)";
              }}
            >
              {/* Volume + date column */}
              <div>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontStyle: "italic",
                    fontSize: 18,
                    color: C.purple,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  №{it.vol}
                </div>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 11,
                    color: C.muted,
                    fontStyle: "italic",
                    marginTop: 2,
                  }}
                >
                  {it.date}
                </div>
                {it.live && (
                  <div style={{ marginTop: 8 }}>
                    <Pill tone="green" small>
                      <Circle size={5} fill={C.green} stroke={C.green} /> Live
                    </Pill>
                  </div>
                )}
              </div>

              {/* Content column */}
              <div style={{ borderLeft: `1px solid ${C.hairline}`, paddingLeft: 24 }}>
                <SerifTitle size={16} weight={500}>
                  {it.title}
                </SerifTitle>
                <p
                  style={{
                    fontFamily: fontSans,
                    fontSize: 11.5,
                    color: C.text2,
                    lineHeight: 1.6,
                    marginTop: 6,
                  }}
                >
                  {it.take}
                </p>
                <div style={{ marginTop: 8 }}>
                  <Pill tone={it.tagTone} small>
                    {it.tag}
                  </Pill>
                </div>
              </div>

              {/* Action column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                <ArrowUpRight size={20} color={C.purpleMist} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: fontSans,
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.muted,
                    fontWeight: 600,
                  }}
                >
                  Open
                </span>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "11px 22px",
              background: "transparent",
              color: C.purple,
              border: `1px solid ${C.purple}`,
              cursor: "pointer",
              fontFamily: fontSans,
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.purple;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.purple;
            }}
          >
            Load Earlier Editions
          </button>
        </div>
      </section>
    </div>
  );
};

// ───────────── SOURCES PAGE ─────────────

const SourceCard = ({ name, type, desc, status }) => (
  <div
    style={{
      background: C.white,
      border: `1px solid ${C.hairline}`,
      padding: "16px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      transition: "all 0.2s ease",
      cursor: "default",
      height: "100%",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = C.purpleMist;
      e.currentTarget.style.transform = "translateY(-1px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = C.hairline;
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
      <div
        style={{
          fontFamily: fontSerif,
          fontSize: 15,
          fontWeight: 600,
          color: C.ink,
          letterSpacing: "-0.005em",
          lineHeight: 1.2,
        }}
      >
        {name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <LiveDot color={C.green} size={5} />
        <span
          style={{
            fontFamily: fontSans,
            fontSize: 8.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: C.green,
            fontWeight: 600,
          }}
        >
          {status || "Active"}
        </span>
      </div>
    </div>
    <div
      style={{
        fontFamily: fontSans,
        fontSize: 10.5,
        color: C.text2,
        lineHeight: 1.55,
      }}
    >
      {desc}
    </div>
    <div
      style={{
        marginTop: "auto",
        paddingTop: 10,
        borderTop: `1px solid ${C.hairline}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: fontSans,
          fontSize: 8.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.muted,
          fontWeight: 600,
        }}
      >
        {type}
      </span>
      <ExternalLink size={11} color={C.purpleMist} strokeWidth={1.6} />
    </div>
  </div>
);

const SourcesPage = () => {
  const categories = [
    {
      icon: Newspaper,
      title: "News & Wire",
      desc: "Real-time wire services and institutional news flow.",
      sources: [
        { name: "Reuters", type: "Wire Service", desc: "Primary global newswire — geopolitical, central bank, and macro headlines." },
        { name: "Bloomberg", type: "Terminal Feed", desc: "Cross-asset price action, market commentary, and policy coverage." },
        { name: "Financial Times", type: "Editorial", desc: "London-anchored European macro analysis and policy interpretation." },
        { name: "Wall Street Journal", type: "Editorial", desc: "US fiscal policy, Fed coverage, and corporate earnings flow." },
      ],
    },
    {
      icon: Building2,
      title: "Central Banks",
      desc: "Direct policy releases, statements, and minutes from monetary authorities.",
      sources: [
        { name: "Federal Reserve", type: "FOMC · Releases", desc: "Statements, minutes, dot plot, and Beige Book. Primary input for USD policy framing." },
        { name: "European Central Bank", type: "GovCouncil · Bulletin", desc: "Decisions, account of meetings, and Economic Bulletin commentary." },
        { name: "Bank of England", type: "MPC · Reports", desc: "MPC votes, Monetary Policy Reports, and Bailey/Pill testimony." },
        { name: "Bank of Japan", type: "BoJ · Summary", desc: "Outlook reports, Summary of Opinions, and intervention signals via MOF." },
        { name: "Swiss National Bank", type: "SNB", desc: "Quarterly assessments and intervention disclosures." },
        { name: "Bank of Canada", type: "BoC · MPR", desc: "Monetary Policy Report, statement, and Macklem press conferences." },
        { name: "Reserve Bank of Australia", type: "RBA", desc: "Cash rate decisions, SoMP, and Lowe-successor commentary." },
        { name: "People's Bank of China", type: "PBoC", desc: "LPR fixings, MLF operations, and CFETS USD/CNY mid-point setting." },
      ],
    },
    {
      icon: LineChart,
      title: "Market Data",
      desc: "Cross-asset prices, futures positioning, and derivatives flow.",
      sources: [
        { name: "Refinitiv", type: "Data Feed", desc: "Institutional FX rates, fixings, and tick data." },
        { name: "CME Group", type: "Futures · Options", desc: "Fed funds, eurodollar, and FX futures positioning." },
        { name: "ICE", type: "Energy · Rates", desc: "Brent, WTI, and short sterling. Primary energy benchmark feed." },
        { name: "TradingEconomics", type: "Macro Aggregator", desc: "Consensus economic forecasts and indicator history." },
        { name: "DTCC", type: "Swap Repository", desc: "Cleared swap volumes and dealer positioning signals." },
        { name: "Polymarket", type: "Prediction Market", desc: "Real-time event probability — geopolitics, elections, monetary outcomes." },
      ],
    },
    {
      icon: Scale,
      title: "Multilateral & Policy",
      desc: "International institutions, treasury feeds, and supranational data.",
      sources: [
        { name: "IMF", type: "WEO · Policy", desc: "World Economic Outlook, Article IV consultations, and FSAP reports." },
        { name: "BIS", type: "Bank for IS", desc: "Cross-border banking statistics, FX turnover survey, derivatives data." },
        { name: "OECD", type: "Economic Outlook", desc: "Composite leading indicators and member-state forecasts." },
        { name: "World Bank", type: "Global Economic Prospects", desc: "EM growth analysis and commodity outlook." },
        { name: "US Treasury", type: "TIC · Debt Mgmt", desc: "TIC capital flows, refunding announcements, sanctions notices." },
        { name: "European Commission", type: "DG ECFIN", desc: "EU economic forecasts, NextGenerationEU disbursement, fiscal monitoring." },
      ],
    },
    {
      icon: Flame,
      title: "Energy & Commodities",
      desc: "Physical and futures-market intelligence on the cycle's swing variable.",
      sources: [
        { name: "OPEC Secretariat", type: "MOMR", desc: "Monthly Oil Market Report, production schedules, and JMMC outcomes." },
        { name: "International Energy Agency", type: "IEA · OMR", desc: "Demand forecasts, inventory data, and policy disclosure on strategic reserves." },
        { name: "US EIA", type: "Weekly Petroleum", desc: "Crude inventories, refinery utilization, and natural gas storage." },
        { name: "London Bullion Market Assoc.", type: "LBMA", desc: "Gold and silver fixings, vault holdings, and central bank gold flows." },
      ],
    },
    {
      icon: Globe,
      title: "Geopolitical & Risk",
      desc: "Strategic intelligence on conflict zones, sanctions, and political risk.",
      sources: [
        { name: "Council on Foreign Relations", type: "Think Tank", desc: "Conflict tracker, policy briefs, and regional analysis." },
        { name: "Eurasia Group", type: "Risk Consultancy", desc: "Top Risks reports, country-specific political risk indices." },
        { name: "International Crisis Group", type: "Conflict Watch", desc: "Live conflict monitoring across the Middle East, Africa, and Asia-Pacific." },
        { name: "Atlantic Council", type: "Policy Institute", desc: "Sanctions impact analysis, transatlantic policy coverage." },
        { name: "Stockholm Int'l Peace Research Inst.", type: "SIPRI", desc: "Defence spending, arms transfers, and conflict casualty data." },
      ],
    },
  ];

  return (
    <div style={{ background: C.cream, minHeight: "100%" }}>
      {/* Page header */}
      <section
        style={{
          padding: "44px 44px 32px",
          background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleDeep} 100%)`,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -120,
            width: 460,
            height: 460,
            background: `radial-gradient(circle, rgba(126,111,177,0.28), transparent 65%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <Eyebrow color="rgba(255,255,255,0.55)">Sources</Eyebrow>
          <h1
            style={{
              fontFamily: fontSerif,
              fontSize: 38,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.014em",
              lineHeight: 1.05,
              margin: "14px 0 10px",
            }}
          >
            Institutional <span style={{ fontStyle: "italic", color: C.purpleMist }}>Intelligence Feeds</span>
          </h1>
          <p
            style={{
              fontFamily: fontSans,
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            The data providers, central bank feeds, and institutional sources behind every Makor briefing.
            Every source is verified, monitored, and weighted by editorial discretion.
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 32,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {[
              { v: "33", l: "Active Sources" },
              { v: "6", l: "Categories" },
              { v: "24/7", l: "Monitoring" },
              { v: "Tier-1", l: "Provenance" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: fontSans,
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 600,
                    marginTop: 3,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "32px 44px 36px", background: C.cream }}>
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} style={{ marginBottom: i === categories.length - 1 ? 0 : 36 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingBottom: 12,
                  borderBottom: `2px solid ${C.purple}`,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      background: C.purple,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} color="#fff" strokeWidth={1.6} />
                  </div>
                  <div>
                    <SerifTitle size={20} weight={500}>
                      {cat.title}
                    </SerifTitle>
                    <div
                      style={{
                        fontFamily: fontSerif,
                        fontStyle: "italic",
                        fontSize: 11.5,
                        color: C.muted,
                        marginTop: 2,
                      }}
                    >
                      {cat.desc}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: fontSerif,
                    fontStyle: "italic",
                    fontSize: 11,
                    color: C.muted,
                    paddingBottom: 4,
                  }}
                >
                  {cat.sources.length} sources
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                {cat.sources.map((s, j) => (
                  <SourceCard key={j} {...s} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Provenance footer */}
        <div
          style={{
            marginTop: 40,
            background: C.purpleNight,
            color: "#fff",
            padding: "24px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -80,
              right: -80,
              width: 280,
              height: 280,
              background: `radial-gradient(circle, rgba(126,111,177,0.2), transparent 65%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <ShieldCheck size={32} color={C.purpleMist} strokeWidth={1.4} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <Eyebrow color="rgba(255,255,255,0.55)">Editorial Provenance</Eyebrow>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  marginTop: 8,
                  lineHeight: 1.6,
                  maxWidth: 720,
                }}
              >
                Every claim in a Makor briefing is traceable to a tier-1 source. The desk does not aggregate
                from secondary outlets. Sourcing reviewed quarterly by Compliance.
              </div>
            </div>
            <button
              style={{
                padding: "10px 18px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontFamily: fontSans,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Methodology
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ───────────── FOOTER ─────────────


// ════════════════════════════════════════════════════════════════════════════
//   BRIEFING VIEWER PAGE
//   Full institutional morning briefing report
// ════════════════════════════════════════════════════════════════════════════

const SectionHead = ({ roman, title, tag, mt = 36 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingBottom: 13,
      borderBottom: `2px solid ${C.purple}`,
      marginBottom: 18,
      marginTop: mt,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
      <span
        style={{
          fontFamily: fontSerif,
          fontSize: 44,
          color: C.purple,
          fontStyle: "italic",
          opacity: 0.85,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
        }}
      >
        {roman}
      </span>
      <SerifTitle size={26} weight={500}>
        {title}
      </SerifTitle>
    </div>
    {tag && (
      <span
        style={{
          fontFamily: fontSans,
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: C.muted,
          fontWeight: 600,
          paddingBottom: 4,
        }}
      >
        {tag}
      </span>
    )}
  </div>
);

const SubHead = ({ children }) => (
  <div
    style={{
      fontFamily: fontSans,
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: C.purple,
      margin: "24px 0 12px",
      paddingBottom: 8,
      borderBottom: `1px solid ${C.purpleMist}`,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    }}
  >
    <span
      style={{
        color: C.purpleSoft,
        fontFamily: fontSerif,
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: 0,
        textTransform: "none",
        marginRight: 8,
      }}
    >
      §
    </span>
    {children}
  </div>
);

const InstBullets = ({ items }) => (
  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: "0 0 14px",
      background: C.white,
      border: `1px solid ${C.hairline}`,
      boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
    }}
  >
    {items.map((it, i) => (
      <li
        key={i}
        style={{
          fontFamily: fontSans,
          fontSize: 12,
          padding: "12px 18px 12px 36px",
          position: "relative",
          borderBottom: i === items.length - 1 ? "none" : `1px solid ${C.hairline}`,
          color: C.text,
          lineHeight: 1.65,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 18,
            top: 21,
            width: 10,
            height: 1,
            background: C.purple,
          }}
        />
        {it}
      </li>
    ))}
  </ul>
);

// ───────── 1. Action bar ─────────

const BriefingActionBar = ({ onBack }) => (
  <div
    style={{
      padding: "14px 44px",
      background: C.paper,
      borderBottom: `1px solid ${C.hairline}`,
      display: "flex",
      alignItems: "center",
      gap: 18,
    }}
  >
    <button
      onClick={onBack}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px 7px 12px",
        background: "transparent",
        border: `1px solid ${C.hairline}`,
        cursor: "pointer",
        fontFamily: fontSans,
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: 600,
        color: C.text2,
        transition: "all 0.18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.purple;
        e.currentTarget.style.color = C.purple;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.hairline;
        e.currentTarget.style.color = C.text2;
      }}
    >
      <ChevronRight size={11} strokeWidth={1.7} style={{ transform: "rotate(180deg)" }} />
      Back
    </button>

    <div style={{ display: "flex", alignItems: "center", gap: 11, flex: 1 }}>
      <span
        style={{
          fontFamily: fontSerif,
          fontStyle: "italic",
          fontSize: 14,
          color: C.purple,
          fontWeight: 600,
        }}
      >
        №247
      </span>
      <span style={{ fontFamily: fontSerif, fontStyle: "italic", fontSize: 12, color: C.muted }}>
        · Thu 7 May 2026 · Vol. I
      </span>
      <Pill tone="green" small>
        <Circle size={5} fill={C.green} stroke={C.green} /> Live
      </Pill>
    </div>

    <div style={{ display: "flex", gap: 8 }}>
      {[
        { icon: Printer, label: "Print" },
        { icon: Download, label: "Export" },
        { icon: Share2, label: "Share" },
        { icon: Star, label: "Bookmark" },
      ].map(({ icon: Icon, label }, i) => (
        <button
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 12px",
            background: "transparent",
            border: `1px solid ${C.hairline}`,
            cursor: "pointer",
            fontFamily: fontSans,
            fontSize: 9.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: C.text2,
            transition: "all 0.18s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = C.purple;
            e.currentTarget.style.color = C.purple;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = C.hairline;
            e.currentTarget.style.color = C.text2;
          }}
        >
          <Icon size={11} strokeWidth={1.7} />
          {label}
        </button>
      ))}
    </div>
  </div>
);

// ───────── 2. Masthead ─────────

const BriefingMasthead = () => (
  <div
    style={{
      background: C.purple,
      color: "#fff",
      padding: "32px 44px 30px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 460,
        height: 460,
        background: `radial-gradient(circle, rgba(126,111,177,0.28), transparent 65%)`,
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          fontFamily: fontSans,
          fontSize: 9.5,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginBottom: 14,
          fontWeight: 500,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 22,
            height: 1,
            background: "rgba(255,255,255,0.4)",
            marginRight: 12,
            verticalAlign: "middle",
            marginBottom: 2,
          }}
        />
        Daily FX &amp; Macro Briefing · Vol. I · No. 247
      </div>
      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 42,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "-0.014em",
          lineHeight: 1.05,
          marginBottom: 14,
          maxWidth: 760,
        }}
      >
        Iran de-escalation drives a broad{" "}
        <span style={{ fontStyle: "italic", color: C.purpleMist }}>USD-offered</span> tape
      </h1>
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 13.5,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.6,
          fontWeight: 300,
          maxWidth: 640,
          marginBottom: 24,
        }}
      >
        Markets are pricing a de-escalation regime as the White House circulates a 14-point MoU. Brent collapsed
        −11.8%, the dollar is broadly offered, and overnight saw suspected BoJ activity in USD/JPY. Position
        sizing around the binary remains paramount through Friday.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 28,
          paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {[
          { l: "Date", v: "Thu 7 May 2026" },
          { l: "Published", v: "06:45 GMT" },
          { l: "Session", v: "Pre-London Open" },
          { l: "Regime", v: "Risk-On · De-escalation" },
          { l: "Distribution", v: "Internal" },
        ].map((m, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: fontSans,
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 5,
                fontWeight: 500,
              }}
            >
              {m.l}
            </div>
            <div
              style={{
                fontFamily: fontSerif,
                fontSize: 14,
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ───────── 3. Stats strip ─────────

const BriefingStats = () => {
  const stats = [
    { v: "1.1720", l: "EUR/USD", c: "+0.42%", up: true },
    { v: "1.3520", l: "GBP/USD", c: "+0.31%", up: true },
    { v: "156.03", l: "USD/JPY", c: "−1.12%", up: false },
    { v: "$98.40", l: "Brent", c: "−11.8%", up: false },
    { v: "$4,518", l: "Gold", c: "+1.22%", up: true },
  ];
  return (
    <div
      style={{
        background: C.cream,
        padding: "34px 44px",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 28,
        borderBottom: `1px solid ${C.hairline}`,
      }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.purpleMist}`, paddingBottom: 13 }}>
          <div
            style={{
              fontFamily: fontSerif,
              fontSize: 30,
              color: C.ink,
              fontWeight: 500,
              letterSpacing: "-0.012em",
              lineHeight: 1,
              marginBottom: 9,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {s.v}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: fontSans,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.muted,
              fontWeight: 500,
            }}
          >
            <span>{s.l}</span>
            <span
              style={{
                fontFamily: fontSerif,
                fontStyle: "italic",
                fontSize: 11,
                color: s.up ? C.green : C.red,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                textTransform: "none",
                letterSpacing: 0,
              }}
            >
              {s.c}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ───────── 4. Since Yesterday ─────────

const SinceYesterday = () => (
  <section>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingBottom: 12,
        borderBottom: `1px solid ${C.purpleMist}`,
        marginBottom: 18,
      }}
    >
      <div>
        <Eyebrow color={C.purple}>Since Yesterday</Eyebrow>
        <SerifTitle size={20} weight={500} italic>
          What changed overnight.
        </SerifTitle>
      </div>
      <span
        style={{
          fontFamily: fontSerif,
          fontStyle: "italic",
          fontSize: 11,
          color: C.muted,
          paddingBottom: 4,
        }}
      >
        Last 18 hours · ranked by impact
      </span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[
        {
          tag: "Geopolitics",
          tone: C.red,
          h: "Iran MoU advances; Tehran response window opens",
          b: "Witkoff/Kushner draft circulating. White House willing to flex enrichment moratorium 20→12–15yr. Polymarket near-term acceptance 60–70%.",
        },
        {
          tag: "Energy",
          tone: C.amber,
          h: "Brent collapses 11.8% as war premium unwinds",
          b: "One of the largest single-day drops in years. Sub-$90 would re-engage cut pricing across G10 central banks.",
        },
        {
          tag: "FX · BoJ",
          tone: C.purple,
          h: "USD/JPY 290-pip overnight range on suspected MOF activity",
          b: "Estimated $35bn intervention last week unconfirmed. 158–160 corridor remains the perceived activation zone.",
        },
        {
          tag: "Rates",
          tone: C.green,
          h: "US 10Y rallies; disinflation trade engaged",
          b: "10Y from 4.46% peak conflict to 4.20%. Curve back near inversion; front-end the place to defend.",
        },
        {
          tag: "Equities",
          tone: C.green,
          h: "Dow futures +500 on peace hopes; risk bid",
          b: "Wall Street advanced as traders priced a disinflationary energy impulse. Carry trades rebuilt cautiously.",
        },
        {
          tag: "DXY",
          tone: C.red,
          h: "DXY broke 100.50; sub-100 in sight",
          b: "Geopolitical safe-haven premium unwinding. Dual pressure from oil collapse and headline flow.",
        },
      ].map((it, i) => (
        <div
          key={i}
          style={{
            background: C.white,
            border: `1px solid ${C.hairline}`,
            borderLeft: `2px solid ${it.tone}`,
            padding: "14px 18px",
            boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: fontSans,
              fontSize: 8.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: it.tone,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {it.tag}
          </div>
          <div
            style={{
              fontFamily: fontSerif,
              fontSize: 14,
              color: C.ink,
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {it.h}
          </div>
          <div style={{ fontFamily: fontSans, fontSize: 11, color: C.text2, lineHeight: 1.6 }}>{it.b}</div>
        </div>
      ))}
    </div>
  </section>
);

// ───────── 5. Macro Pulse ─────────

const RiskSentimentSnapshot = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14,
      margin: "12px 0",
    }}
  >
    {[
      { l: "Risk Sentiment", v: "Risk-On", s: "Iran deal optimism driving broad risk appetite across G10.", dark: true },
      { l: "Primary Catalyst", v: "US-Iran MoU", s: "Tehran's 48hr response window. Binary event for the session.", color: C.purple },
      { l: "Brent Crude", v: "$98.40", s: "−11.8% on Wednesday. War premium unwinding rapidly.", color: C.purple },
      { l: "USD Direction", v: "Offered", s: "Safe-haven bid compressed. Dual pressure from oil and deal flow.", dark: true },
    ].map((c, i) => (
      <div
        key={i}
        style={{
          background: c.dark ? C.purple : C.white,
          padding: "18px 18px",
          border: `1px solid ${c.dark ? C.purple : C.hairline}`,
          color: c.dark ? "#fff" : C.text,
          boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: fontSans,
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: c.dark ? "rgba(255,255,255,0.55)" : C.muted,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {c.l}
        </div>
        <div
          style={{
            fontFamily: fontSerif,
            fontSize: 22,
            fontWeight: 500,
            color: c.dark ? "#fff" : c.color || C.ink,
            marginBottom: 6,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {c.v}
        </div>
        <div
          style={{
            fontFamily: fontSans,
            fontSize: 10.5,
            color: c.dark ? "rgba(255,255,255,0.7)" : C.muted,
            lineHeight: 1.5,
          }}
        >
          {c.s}
        </div>
      </div>
    ))}
  </div>
);

const PrimaryRiskCallout = () => (
  <div
    style={{
      background: C.purple,
      color: "#fff",
      padding: "28px 32px",
      margin: "20px 0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -60,
        right: -60,
        width: 240,
        height: 240,
        background: `radial-gradient(circle, rgba(126,111,177,0.3), transparent 70%)`,
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          fontFamily: fontSans,
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        Primary Risk Event
      </div>
      <div
        style={{
          fontFamily: fontSerif,
          fontSize: 24,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "-0.01em",
          marginBottom: 12,
        }}
      >
        US/Iran Memorandum of Understanding
      </div>
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 12.5,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.82)",
          fontWeight: 300,
        }}
      >
        The White House is close to a one-page MoU with Iran to formally end the war. The 14-point framework —
        drafted by Witkoff and Kushner — pivots on Iran committing to a moratorium on uranium enrichment (US
        demanding 20 years; Iran proposed 5; likely landing zone 12–15), the US lifting sanctions and
        releasing frozen Iranian funds, and both sides lifting restrictions on Strait of Hormuz transit.{" "}
        <strong style={{ fontWeight: 500, color: "#fff" }}>
          Tehran's response is expected within 48 hours.
        </strong>{" "}
        Trump has simultaneously renewed bombing threats. Markets price the deal at 75% likely near-term;
        Polymarket comprehensive deal odds: 23.5%.
      </p>
    </div>
  </div>
);

const GeoMatrix = () => (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12,
      margin: "11px 0",
      background: C.white,
      border: `1px solid ${C.hairline}`,
      boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      fontFamily: fontSans,
    }}
  >
    <thead>
      <tr style={{ background: C.purple }}>
        {["Theatre", "Status", "Direction", "FX Impact", "Risk"].map((h, i) => (
          <th
            key={i}
            style={{
              color: "#fff",
              fontSize: 9,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              padding: "11px 14px",
              textAlign: "left",
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[
        ["US / Iran", "MoU under review; 48hr response window", { c: C.green, t: "De-escalating" }, "USD ↓ · Oil ↓", { tone: "amber", l: "Elevated" }],
        ["Strait of Hormuz", "Partially open; blockade paused; tanker disabled Wed", { c: C.muted, t: "Fluid" }, "Oil · LNG · Shipping", { tone: "amber", l: "High" }],
        ["Israel / Lebanon", "Hezbollah drone active; ceasefire clause in MoU", { c: C.red, t: "Simmering" }, "ILS · Risk premium", { tone: "amber", l: "Moderate" }],
        ["Japan MOF / BoJ", "~$35bn intervention est. last week; unconfirmed", { c: C.green, t: "Active support" }, "USD/JPY capped", { tone: "red", l: "Critical" }],
        ["Russia / Ukraine", "Background; no fresh escalation", { c: C.muted, t: "Stable" }, "Background premium", { tone: "neutral", l: "Low" }],
      ].map((r, i) => (
        <tr key={i} style={{ background: i % 2 ? C.creamSoft : "transparent" }}>
          <td style={{ padding: "11px 14px", borderBottom: `1px solid ${C.hairline}`, color: C.ink, fontWeight: 600 }}>
            {r[0]}
          </td>
          <td style={{ padding: "11px 14px", borderBottom: `1px solid ${C.hairline}`, color: C.text }}>
            {r[1]}
          </td>
          <td
            style={{
              padding: "11px 14px",
              borderBottom: `1px solid ${C.hairline}`,
              color: r[2].c,
              fontWeight: 500,
            }}
          >
            {r[2].t}
          </td>
          <td style={{ padding: "11px 14px", borderBottom: `1px solid ${C.hairline}`, color: C.text }}>
            {r[3]}
          </td>
          <td style={{ padding: "11px 14px", borderBottom: `1px solid ${C.hairline}` }}>
            <Pill tone={r[4].tone} small>
              {r[4].l}
            </Pill>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const SectionMacroPulse = () => (
  <section>
    <SectionHead roman="I" title="Global Macro & Geopolitical Pulse" tag="Most Important" />

    <SubHead>Risk Sentiment Snapshot</SubHead>
    <RiskSentimentSnapshot />

    <PrimaryRiskCallout />

    <SubHead>Market Impact — Iran Deal Optimism</SubHead>
    <InstBullets
      items={[
        <>
          <strong>Brent crude</strong> fell ~12% to below $100/bbl Wednesday — one of the largest single-day
          drops in years, reflecting the embedded war premium beginning to unwind.
        </>,
        <>
          <strong>Dow Futures</strong> surged 500 points on peace hopes. Wall Street equities advanced as
          traders priced in a disinflationary energy impulse.
        </>,
        <>
          <strong>USD</strong> sold off broadly — deal optimism reduces the geopolitical safe-haven bid for the
          dollar. The dollar's role as a reactive asset (not a pure safe haven) is reinforced.
        </>,
        <>
          <strong>Gold</strong> initially dipped below $4,500 on reduced safe-haven demand, then rebounded 3%
          Wednesday as the dollar weakened. Cross-asset whipsaw evident.
        </>,
        <>
          <strong>JPY and CHF</strong> saw safe-haven demand compress as risk appetite improved. AUD and NZD
          extended gains in the Asian session — classic risk-on rotation.
        </>,
      ]}
    />

    <SubHead>Geopolitical Risk Matrix — Secondary Theatres</SubHead>
    <GeoMatrix />

    <SubHead>Government Leadership & Jawboning</SubHead>
    <InstBullets
      items={[
        <>
          <strong>Trump:</strong> Simultaneously projecting optimism on Iran ("great progress") and escalation
          threats ("much higher level" bombing). Mixed signals keeping FX positioning nimble. Treat all Trump
          headlines as immediate market-moving.
        </>,
        <>
          <strong>Japan MOF / BoJ:</strong> Estimated to have deployed approximately $35bn in FX intervention
          last week. Officials have not confirmed. The 160.00 level in USD/JPY remains the perceived line in
          the sand.
        </>,
        <>
          <strong>Powell / Warsh transition:</strong> Powell's term expires May 15. Warsh is chair-elect and
          has flagged reopening the Fed-Treasury accord, more aggressive balance-sheet reduction, and a less
          independent posture.{" "}
          <em>Hawkish Warsh = USD bid; coordinated easing = USD offered.</em>
        </>,
        <>
          <strong>Bailey (BoE):</strong> Acknowledged elevated energy prices increase second-round inflation
          risks. April 30 guidance balanced with a tightening tilt — MPC member Pill voted for an immediate
          hike to 4%.
        </>,
        <>
          <strong>Lagarde (ECB):</strong> No fresh commentary overnight. ECB members remain divided on whether
          the energy shock warrants a policy response or is purely transitory.
        </>,
      ]}
    />
  </section>
);

// ───────── 6. Overnight Movers ─────────

const Mover = ({ pair, level, pct, up, cmt, width }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "100px 80px 1fr 280px",
      gap: 14,
      alignItems: "center",
      padding: "14px 18px",
      borderBottom: `1px solid ${C.hairline}`,
    }}
  >
    <div style={{ fontFamily: fontSerif, fontSize: 17, fontWeight: 500, color: C.ink }}>{pair}</div>
    <div
      style={{
        fontFamily: fontSerif,
        fontSize: 14,
        color: C.text,
        fontWeight: 500,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {level}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          flex: 1,
          height: 18,
          background: C.creamSoft,
          border: `1px solid ${C.hairline}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: up
              ? "linear-gradient(90deg,#3D6647,#5C8466)"
              : "linear-gradient(90deg,#963838,#B45050)",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: fontSerif,
          fontSize: 15,
          fontWeight: 500,
          minWidth: 64,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
          color: up ? C.green : C.red,
        }}
      >
        {pct}
      </div>
    </div>
    <div
      style={{
        fontFamily: fontSerif,
        fontStyle: "italic",
        fontSize: 11,
        color: C.muted,
        lineHeight: 1.55,
        borderLeft: `1px solid ${C.hairline}`,
        paddingLeft: 13,
      }}
    >
      {cmt}
    </div>
  </div>
);

const OvernightMovers = () => (
  <section>
    <SubHead>Overnight Movers — G10 vs USD</SubHead>
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      }}
    >
      <div
        style={{
          background: C.purple,
          color: "#fff",
          padding: "11px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: fontSans,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <ArrowUpRight size={12} strokeWidth={1.7} />
        Outperformers
        <span
          style={{
            marginLeft: "auto",
            fontFamily: fontSerif,
            fontSize: 9.5,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.6)",
            textTransform: "none",
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          Long-side · G10
        </span>
      </div>
      <Mover
        pair="AUD/USD"
        level="0.6960"
        pct="+0.55%"
        up={true}
        width={88}
        cmt={
          <>
            <b style={{ fontFamily: fontSans, fontStyle: "normal", fontWeight: 600, color: C.text }}>
              Top G10 mover.
            </b>{" "}
            Risk-on + China trade narrative. AUD/NZD reversal risk at highs.
          </>
        }
      />
      <Mover
        pair="EUR/USD"
        level="1.1720"
        pct="+0.42%"
        up={true}
        width={67}
        cmt={
          <>
            <b style={{ fontFamily: fontSans, fontStyle: "normal", fontWeight: 600, color: C.text }}>
              Cleanest USD-weakness expression.
            </b>{" "}
            Watch 1.1741 breakout for 1.1800–50 extension.
          </>
        }
      />
      <Mover
        pair="GBP/USD"
        level="1.3520"
        pct="+0.31%"
        up={true}
        width={50}
        cmt={
          <>BoE hawkish lean intact. Pill's hike vote underpinning sterling. Starmer politics capping upside.</>
        }
      />
      <Mover
        pair="NZD/USD"
        level="0.6140"
        pct="+0.28%"
        up={true}
        width={45}
        cmt={<>Risk-on follow-through. RBNZ on hold. Kiwi tracks AUD with marginally less momentum.</>}
      />
    </div>

    <div
      style={{
        background: C.white,
        border: `1px solid ${C.hairline}`,
        borderTop: "none",
        boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      }}
    >
      <div
        style={{
          background: C.purpleDeep,
          color: "#fff",
          padding: "11px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: fontSans,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <ArrowDownRight size={12} strokeWidth={1.7} />
        Underperformers
        <span
          style={{
            marginLeft: "auto",
            fontFamily: fontSerif,
            fontSize: 9.5,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.6)",
            textTransform: "none",
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          USD long-side
        </span>
      </div>
      <Mover
        pair="USD/JPY"
        level="156.03"
        pct="−1.12%"
        up={false}
        width={100}
        cmt={
          <>
            <b style={{ fontFamily: fontSans, fontStyle: "normal", fontWeight: 600, color: C.text }}>
              Largest mover overall.
            </b>{" "}
            290-pip range. BoJ intervention + USD sell-off. Avoid shorts above 159.
          </>
        }
      />
      <Mover
        pair="DXY"
        level="100.20"
        pct="−0.79%"
        up={false}
        width={71}
        cmt={<>Sub-100 in sight if Iran deal confirms. Geopolitical safe-haven premium unwinding.</>}
      />
      <Mover
        pair="USD/CHF"
        level="0.8850"
        pct="−0.28%"
        up={false}
        width={25}
        cmt={<>CHF safe-haven demand fading on risk-on. SNB welcomes mild softening. Range-constrained.</>}
      />
      <Mover
        pair="USD/CAD"
        level="1.3800"
        pct="−0.18%"
        up={false}
        width={16}
        cmt={<>Cross-currents: USD weakness vs oil collapse. Range-bound. Brent &lt; $90 = CAD-bearish.</>}
      />
    </div>
  </section>
);

// ───────── 7. Market Regime ─────────

const RegimeStrip = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 14 }}>
    {[
      {
        name: "Risk-On / De-escalation",
        state: "Active",
        tone: "green",
        accent: C.green,
        body: "Iran-deal optimism drives broad risk appetite. USD offered, equities bid, oil sub-$100.",
      },
      {
        name: "Inflation Shock",
        state: "Latent",
        tone: "amber",
        accent: C.amber,
        body: "Energy prices held up CPI. A peace deal disinflates structurally, reactivating cut pricing.",
      },
      {
        name: "Central Bank Regime",
        state: "In Transition",
        tone: "purple",
        accent: C.purple,
        body: "Powell exit + Warsh inauguration on May 15. BoE hawk-tilt; ECB studied caution; BoJ defending.",
      },
      {
        name: "Geopolitical Regime",
        state: "De-escalating",
        tone: "green",
        accent: C.green,
        body: "Iran the dominant story. Hormuz partially open. Tail risks remain — Polymarket comprehensive 23.5%.",
      },
    ].map((r, i) => (
      <div
        key={i}
        style={{
          background: C.white,
          border: `1px solid ${C.hairline}`,
          borderTop: `3px solid ${r.accent}`,
          padding: "16px 18px 18px",
          boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: fontSans,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.muted,
              fontWeight: 600,
            }}
          >
            Regime
          </div>
          <Pill tone={r.tone} small>
            {r.state}
          </Pill>
        </div>
        <div
          style={{
            fontFamily: fontSerif,
            fontSize: 15,
            color: C.ink,
            fontWeight: 500,
            lineHeight: 1.25,
            marginBottom: 8,
            letterSpacing: "-0.005em",
          }}
        >
          {r.name}
        </div>
        <div style={{ fontFamily: fontSans, fontSize: 11, color: C.text2, lineHeight: 1.55 }}>{r.body}</div>
      </div>
    ))}
  </div>
);

const MarketRegimeSection = () => (
  <section>
    <SectionHead roman="II" title="Market Regime" tag="Cross-Asset Read" />
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.hairline}`,
        borderLeft: `3px solid ${C.purple}`,
        padding: "20px 26px",
        marginBottom: 4,
        boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      }}
    >
      <Eyebrow color={C.purple}>Dominant Read</Eyebrow>
      <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
        <SerifTitle size={22} italic>
          The market is paying for the wrong tail.
        </SerifTitle>
      </div>
      <div
        style={{
          fontFamily: fontSans,
          fontSize: 12,
          color: C.text,
          marginTop: 8,
          lineHeight: 1.65,
          maxWidth: 760,
        }}
      >
        Spot is pricing near-term Iran acceptance at 60–70%; Polymarket prints comprehensive at 23.5%. The
        wedge is real — and the under-priced tail is the Fed transition on May 15, not the Tehran response.
      </div>
    </div>
    <RegimeStrip />
  </section>
);

// ───────── 8. Volatility (clean) ─────────

const SectionVolatility = () => {
  const data = [
    { p: "USD/JPY", v: 12.8, w: 96, c: C.red, t: "Extreme" },
    { p: "AUD/USD", v: 10.8, w: 81, c: C.amber, t: "High" },
    { p: "EUR/USD", v: 9.6, w: 72, c: C.purple, t: "Bid" },
    { p: "GBP/USD", v: 9.3, w: 70, c: C.purpleMid, t: "Bid" },
    { p: "USD/CHF", v: 8.2, w: 62, c: C.purpleSoft, t: "Normal" },
    { p: "USD/CAD", v: 7.5, w: 56, c: C.soft, t: "Subdued" },
  ];
  return (
    <section>
      <SectionHead roman="III" title="Volatility" tag="3M Strategic Hedging" />

      <div
        style={{
          background: C.white,
          border: `1px solid ${C.hairline}`,
          padding: "22px 28px",
          boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: 13,
            borderBottom: `1px solid ${C.hairline}`,
            marginBottom: 18,
          }}
        >
          <div>
            <Eyebrow color={C.purple}>Implied Volatility Ranking</Eyebrow>
            <SerifTitle size={18} weight={500}>
              3M tenor · macro horizon
            </SerifTitle>
          </div>
          <span style={{ fontFamily: fontSerif, fontSize: 11, color: C.muted, fontStyle: "italic" }}>
            Annualised %
          </span>
        </div>

        {data.map((r) => (
          <div
            key={r.p}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 60px 80px",
              gap: 16,
              alignItems: "center",
              padding: "9px 0",
            }}
          >
            <div style={{ fontFamily: fontSerif, fontSize: 14, color: C.ink, fontWeight: 500 }}>{r.p}</div>
            <div
              style={{
                height: 14,
                background: C.cream,
                border: `1px solid ${C.hairline}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${r.w}%`,
                  background: r.c,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: fontSerif,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: C.ink,
              }}
            >
              {r.v}
            </div>
            <div
              style={{
                fontFamily: fontSans,
                fontSize: 9,
                color: C.muted,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textAlign: "right",
                fontWeight: 600,
              }}
            >
              {r.t}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: `1px solid ${C.hairline}`,
            fontFamily: fontSerif,
            fontStyle: "italic",
            fontSize: 12,
            color: C.text,
            lineHeight: 1.7,
          }}
        >
          The 3M curve is pricing{" "}
          <b style={{ fontFamily: fontSans, fontStyle: "normal", color: C.ink }}>
            persistent macro uncertainty extending well past the Iran binary
          </b>
          . USD/JPY 3M at 12.8% reflects a structurally embedded BoJ intervention regime — options markets have
          repriced the entire reaction function, not a single event. EUR &amp; GBP vols bid through the 3M
          tenor capture the Powell-Warsh transition risk (May 15) layered on Eurozone energy disinflation
          uncertainty and UK MPC hawkish dispersion. Hedging activity has migrated{" "}
          <b style={{ fontFamily: fontSans, fontStyle: "normal", color: C.ink }}>
            from 1W tactical to 3M strategic
          </b>
          .
        </div>
      </div>
    </section>
  );
};

// ───────── 9. Event & Catalyst Radar ─────────

const RiskEventCard = ({ severity, time, title, status, exposed, vol }) => {
  const sev = {
    critical: { color: C.red, label: "Critical", bg: "rgba(150,56,56,0.06)" },
    elevated: { color: C.amber, label: "Elevated", bg: "rgba(156,107,26,0.06)" },
  };
  const s = sev[severity];
  return (
    <article
      style={{
        background: C.white,
        border: `1px solid ${C.hairline}`,
        borderLeft: `3px solid ${s.color}`,
        padding: "17px 22px 18px",
        boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: 11,
          borderBottom: `1px solid ${C.hairline}`,
          marginBottom: 11,
          gap: 14,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: fontSans,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.muted,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            <span style={{ color: s.color }}>{time.split("·")[0]}</span>
            <span style={{ marginLeft: 8 }}>· {time.split("·")[1]}</span>
          </div>
          <SerifTitle size={16} weight={500}>
            {title}
          </SerifTitle>
        </div>
        <span
          style={{
            fontFamily: fontSans,
            fontSize: 9,
            padding: "4px 10px",
            border: `1px solid ${s.color}`,
            color: s.color,
            background: s.bg,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {s.label}
        </span>
      </div>
      <p style={{ fontFamily: fontSans, fontSize: 11.5, color: C.text, lineHeight: 1.65 }}>{status}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginTop: 11,
          paddingTop: 11,
          borderTop: `1px solid ${C.hairline}`,
          fontFamily: fontSans,
          fontSize: 10,
          color: C.muted,
        }}
      >
        <span>
          <b
            style={{
              color: C.ink,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: 9,
            }}
          >
            Exposed
          </b>{" "}
          {exposed}
        </span>
        <span>
          <b
            style={{
              color: C.ink,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: 9,
            }}
          >
            Vol
          </b>{" "}
          {vol}
        </span>
      </div>
    </article>
  );
};

const CalendarTable = () => {
  const events = [
    { time: "12:30", name: "EZ · ECB Account of April Meeting", cons: "—", prev: "—", imp: "med", impact: "EUR-sens." },
    { time: "13:30", name: "US · Initial Jobless Claims", cons: "205K", prev: "189K", imp: "high", impact: "USD" },
    { time: "13:30", name: "US · Nonfarm Productivity Q1 (P)", cons: "+0.7%", prev: "+1.8%", imp: "high", impact: "USD" },
    { time: "13:30", name: "US · Unit Labor Costs Q1 (P)", cons: "+2.6%", prev: "+4.4%", imp: "high", impact: "USD" },
    { time: "13:30", name: "US · Continuing Jobless Claims", cons: "1,800K", prev: "1,785K", imp: "med", impact: "Mild" },
    { time: "15:30", name: "US · Atlanta Fed GDPNow Q2", cons: "3.7%", prev: "3.7%", imp: "med", impact: "Mild" },
    { time: "17:00", name: "US · 30Y Treasury Auction", cons: "—", prev: "4.65%", imp: "med", impact: "Yields" },
    { time: "~17:00", name: "US · WH Press Briefing (Iran)", cons: "—", prev: "—", imp: "med", impact: "Binary" },
    { time: "23:30", name: "JP · Household Spending y/y", cons: "+1.4%", prev: "+0.5%", imp: "low", impact: "JPY-mild" },
  ];
  const impColor = { high: C.red, med: C.amber, low: C.soft };
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: fontSans,
        fontSize: 11.5,
        background: C.white,
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
        marginTop: 12,
      }}
    >
      <thead>
        <tr style={{ background: C.purple }}>
          {["Time", "", "Event", "Cons.", "Prev.", "FX"].map((h, i) => (
            <th
              key={i}
              style={{
                color: "#fff",
                fontSize: 9,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                padding: "11px 13px",
                textAlign: i >= 3 ? "right" : "left",
                width: i === 0 ? 76 : i === 1 ? 22 : i >= 3 ? 80 : "auto",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {events.map((e, i) => (
          <tr
            key={i}
            style={{
              background: e.imp === "high" ? "rgba(150,56,56,0.025)" : "transparent",
              borderBottom: `1px solid ${C.hairline}`,
            }}
          >
            <td
              style={{
                padding: "10px 13px",
                fontFamily: fontSerif,
                fontWeight: 600,
                fontSize: 13,
                color: C.ink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {e.time}
            </td>
            <td style={{ padding: "10px 13px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: impColor[e.imp],
                }}
              />
            </td>
            <td style={{ padding: "10px 13px", color: C.ink, fontWeight: 500 }}>{e.name}</td>
            <td
              style={{
                padding: "10px 13px",
                textAlign: "right",
                fontFamily: fontSerif,
                fontWeight: 500,
                color: C.text,
              }}
            >
              {e.cons}
            </td>
            <td
              style={{
                padding: "10px 13px",
                textAlign: "right",
                fontFamily: fontSerif,
                fontWeight: 500,
                color: C.text2,
              }}
            >
              {e.prev}
            </td>
            <td
              style={{
                padding: "10px 13px",
                textAlign: "right",
                fontSize: 9,
                color: e.imp === "high" ? C.amber : C.muted,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {e.impact}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SectionCatalystRadar = () => (
  <section>
    <SectionHead roman="IV" title="Event & Catalyst Radar" tag="Live · Trader Focus" />

    <SubHead>Headline Risk Events</SubHead>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <RiskEventCard
        severity="critical"
        time="WINDOW · Today through Fri 06:00 GMT"
        title="Iran's Response to the US 14-Point MoU"
        status={
          <>
            Tehran's Supreme National Security Council reviewing the Witkoff/Kushner framework. White House
            signalling willingness to flex on the enrichment moratorium duration (20 → 12–15yr landing zone).
            Trump dual-tracking with renewed bombing threats.{" "}
            <b>Polymarket comprehensive deal odds: 23.5%. Near-term acceptance odds: 60–70%.</b>
          </>
        }
        exposed="Brent · DXY · USD/JPY · Gold · CHF"
        vol="Extreme · Wire-driven binary"
      />
      <RiskEventCard
        severity="elevated"
        time="SCHEDULED · ~17:00 GMT"
        title="White House Press Briefing — MoU Mechanics"
        status={
          <>
            Karoline Leavitt expected to address MoU specifics: enrichment timeline, sanctions-relief
            sequencing, frozen-funds release mechanism. <b>Watch for Trump direct remarks before/after</b> —
            historically the more market-moving channel.
          </>
        }
        exposed="USD · Brent · Risk currencies"
        vol="High intraday burst"
      />
      <RiskEventCard
        severity="elevated"
        time="STANDING · All session"
        title="BoJ / MOF Intervention Readiness"
        status={
          <>
            USD/JPY at <b>156.03</b> — the 158–160 corridor remains the perceived activation zone. Last week's
            estimated <b>$35bn intervention</b> not officially confirmed. Verbal escalation pathway: Suzuki →
            Kanda → joint MOF/BoJ statement.
          </>
        }
        exposed="USD/JPY · AUD/JPY · EUR/JPY"
        vol="Tail risk skewed to JPY upside"
      />
    </div>

    <SubHead>Full Schedule</SubHead>
    <CalendarTable />
  </section>
);

// ───────── 10. Desk Takes ─────────

const DeskTakeBoxes = () => {
  const takes = [
    {
      tag: "Vol Regime",
      author: "J. Marchetti",
      role: "Head of FX Strategy",
      time: "06:32 GMT",
      title: "The market is paying for the wrong tail.",
      body:
        "Term-structure flattening across G10 USD pairs confirms macro uncertainty is no longer concentrated in the front end. EUR & GBP 3M vols offer the best risk-reward expression of dollar weakness; JPY is the most expensive hedge AND the riskiest carry leg. The cleaner trade is gamma in EUR/USD with a small downside hedge.",
      pin: true,
    },
    {
      tag: "Asymmetry",
      author: "C. Okafor",
      role: "Senior FX Strategist",
      time: "06:18 GMT",
      title: "Iran-deal optimism is mispriced for asymmetry.",
      body:
        "Polymarket prints comprehensive at 23.5%, but spot is trading near-term acceptance at 60-70%. That's a real wedge. Trade short-dated USD downside vs. medium-dated USD upside — get paid both ways. Keep size small until Tehran's response window closes Friday.",
    },
    {
      tag: "Caution",
      author: "R. Westbrook",
      role: "Macro Strategist",
      time: "05:54 GMT",
      title: "Powell-Warsh transition is the unhedged risk.",
      body:
        "Eight days. Markets have positioned aggressively for the Iran binary while ignoring the bigger structural shift. A hawkish Warsh inaugural posture flips the entire G10 USD complex. We'd be buyers of USD vega in the 6-12M bucket from here.",
    },
  ];
  return (
    <section>
      <SectionHead roman="V" title="Desk Takes" tag="Internal Strategy Notes" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {takes.map((t, i) => (
          <article
            key={i}
            style={{
              background: t.pin ? C.purple : C.white,
              color: t.pin ? "#fff" : C.text,
              border: `1px solid ${t.pin ? C.purple : C.hairline}`,
              padding: "18px 22px 20px",
              boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
              position: "relative",
            }}
          >
            <Quote
              size={26}
              strokeWidth={1}
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                color: t.pin ? "rgba(255,255,255,0.18)" : C.purpleFog,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 11,
                paddingRight: 30,
              }}
            >
              <span
                style={{
                  fontFamily: fontSans,
                  fontSize: 8.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: t.pin ? "rgba(255,255,255,0.7)" : C.purple,
                  fontWeight: 600,
                  borderBottom: `1px solid ${t.pin ? "rgba(255,255,255,0.3)" : C.purpleMist}`,
                  paddingBottom: 3,
                }}
              >
                {t.tag}
              </span>
              {t.pin && (
                <span
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 9.5,
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  pinned
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: fontSerif,
                fontSize: 16,
                fontWeight: 500,
                color: t.pin ? "#fff" : C.ink,
                letterSpacing: "-0.005em",
                lineHeight: 1.3,
                marginBottom: 11,
                paddingRight: 12,
              }}
            >
              {t.title}
            </div>
            <p
              style={{
                fontFamily: fontSans,
                fontSize: 11.5,
                lineHeight: 1.65,
                color: t.pin ? "rgba(255,255,255,0.78)" : C.text,
                marginBottom: 16,
                fontWeight: t.pin ? 300 : 400,
              }}
            >
              {t.body}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 10,
                borderTop: `1px solid ${t.pin ? "rgba(255,255,255,0.12)" : C.hairline}`,
              }}
            >
              <div style={{ lineHeight: 1.2 }}>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 12,
                    fontStyle: "italic",
                    color: t.pin ? "rgba(255,255,255,0.85)" : C.text2,
                    fontWeight: 500,
                  }}
                >
                  — {t.author}
                </div>
                <div
                  style={{
                    fontFamily: fontSans,
                    fontSize: 8.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: t.pin ? "rgba(255,255,255,0.55)" : C.muted,
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {t.role}
                </div>
              </div>
              <span
                style={{
                  fontFamily: fontSans,
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: t.pin ? "rgba(255,255,255,0.5)" : C.muted,
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {t.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// ───────── 11. Trader Playbook ─────────

const TraderPlaybook = () => {
  const items = [
    {
      n: "01",
      title: "Pay vol on dollar weakness",
      body: "EUR & GBP 3M vega offer the cleanest expression of the de-escalation theme on a vol-adjusted basis.",
      tag: "Tactical",
    },
    {
      n: "02",
      title: "Avoid USD/JPY shorts above 159",
      body: "Crowded book + BoJ activation zone = poor risk/reward. Express via crosses (AUD/JPY, EUR/JPY).",
      tag: "Risk",
    },
    {
      n: "03",
      title: "EUR/USD 1.1741 is the key level",
      body: "Breakout opens 1.1800–1.1850 extension. Failure caps and re-engages 1.1660. ECB Account 12:30 the proximate catalyst.",
      tag: "Levels",
    },
    {
      n: "04",
      title: "Watch the curve, not the headline",
      body: "US 2s10s back near inversion. Disinflation bid in 10Y is the cleaner tell on Iran progress than spot USD.",
      tag: "Macro",
    },
    {
      n: "05",
      title: "Brent sub-$90 is a regime trigger",
      body: "Below $90, central-bank cut pricing accelerates and Warsh-hawkish narrative dilutes meaningfully.",
      tag: "Theme",
    },
  ];
  return (
    <section>
      <SectionHead roman="VI" title="Trader Playbook" tag="Tactical · Concise" />
      <div
        style={{
          background: C.purpleDeep,
          color: "#fff",
          padding: "26px 32px 30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 280,
            height: 280,
            background: `radial-gradient(circle, rgba(126,111,177,0.28), transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                fontFamily: fontSans,
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Today&rsquo;s Five Reads
            </div>
            <div
              style={{
                fontFamily: fontSerif,
                fontSize: 22,
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "-0.01em",
                fontStyle: "italic",
              }}
            >
              The London session, in five lines.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {items.map((it, i) => (
              <div
                key={it.n}
                style={{
                  paddingRight: i === 4 ? 0 : 22,
                  paddingLeft: i === 0 ? 0 : 22,
                  borderRight: i === 4 ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontStyle: "italic",
                    fontSize: 16,
                    color: C.purpleMist,
                    fontWeight: 600,
                    marginBottom: 8,
                    letterSpacing: "0.04em",
                  }}
                >
                  {it.n}
                </div>
                <div
                  style={{
                    fontFamily: fontSans,
                    fontSize: 12,
                    color: "#fff",
                    fontWeight: 500,
                    marginBottom: 8,
                    lineHeight: 1.35,
                  }}
                >
                  {it.title}
                </div>
                <div
                  style={{
                    fontFamily: fontSans,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.6,
                    marginBottom: 11,
                    fontWeight: 300,
                  }}
                >
                  {it.body}
                </div>
                <span
                  style={{
                    fontFamily: fontSans,
                    fontSize: 8.5,
                    color: "rgba(181,171,206,0.85)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: 7,
                    display: "inline-block",
                  }}
                >
                  {it.tag}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 22,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: fontSerif,
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                fontStyle: "italic",
              }}
            >
              — Marchetti, Pre-Open
            </span>
            <span
              style={{
                fontFamily: fontSans,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              Internal · Not for distribution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────── End plate ─────────

const BriefingEnd = () => (
  <div
    style={{
      marginTop: 36,
      padding: "26px 32px",
      background: C.white,
      border: `1px solid ${C.hairline}`,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 32,
      boxShadow: "0 1px 3px rgba(65,50,119,0.04)",
    }}
  >
    <div>
      <Eyebrow color={C.purple}>End of Briefing</Eyebrow>
      <div
        style={{
          fontFamily: fontSerif,
          fontStyle: "italic",
          fontSize: 14,
          color: C.ink,
          fontWeight: 500,
          marginTop: 8,
          lineHeight: 1.5,
        }}
      >
        Total Independence,
        <br />
        Outstanding Execution.
      </div>
    </div>
    <div>
      <Eyebrow color={C.muted}>Sources</Eyebrow>
      <div style={{ fontFamily: fontSans, fontSize: 11, color: C.text2, marginTop: 8, lineHeight: 1.7 }}>
        Reuters · Bloomberg · Federal Reserve · BoE · ECB · BoJ · IEA · Polymarket. Levels indicative as of
        06:45 GMT.
      </div>
    </div>
    <div style={{ textAlign: "right" }}>
      <Eyebrow color={C.muted}>Hash</Eyebrow>
      <div
        style={{
          fontFamily: fontSerif,
          fontSize: 11,
          color: C.muted,
          fontStyle: "italic",
          marginTop: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        №247 · v.1 · 0xA72E…F4B1
      </div>
      <div
        style={{
          fontFamily: fontSans,
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.muted,
          fontWeight: 600,
          marginTop: 6,
        }}
      >
        2,347 words · 14-min read
      </div>
    </div>
  </div>
);

// ───────── Page wrapper ─────────

const BriefingViewerPage = ({ onBack }) => (
  <div style={{ background: C.cream, minHeight: "100%" }}>
    <BriefingActionBar onBack={onBack} />
    <BriefingMasthead />
    <BriefingStats />
    <div style={{ padding: "30px 44px 36px", background: C.cream }}>
      <SinceYesterday />
      <SectionMacroPulse />
      <SectionHead roman="*" title="Overnight Movers" tag="G10 vs USD" />
      <OvernightMovers />
      <MarketRegimeSection />
      <SectionVolatility />
      <SectionCatalystRadar />
      <DeskTakeBoxes />
      <TraderPlaybook />
      <BriefingEnd />
    </div>
  </div>
);

const Footer = () => (
  <footer
    style={{
      padding: "22px 44px",
      background: C.cream,
      borderTop: `1px solid ${C.hairline}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: fontSans,
      fontSize: 9.5,
      color: C.muted,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontWeight: 500,
    }}
  >
    <div>© 2026 Makor Group · FCA Regulation 625054</div>
    <div
      style={{
        fontFamily: fontSerif,
        fontStyle: "italic",
        textTransform: "none",
        letterSpacing: 0,
        fontSize: 11,
      }}
    >
      Total Independence, Outstanding Execution.
    </div>
    <div>Internal · Not for distribution</div>
  </footer>
);

// ════════════════════════════════════════════════════════════════════════════
//   MAIN
// ════════════════════════════════════════════════════════════════════════════

const Dashboard = ({ generating, onGenerate, selectedDate, setSelectedDate, quickMode, setQuickMode, onOpenBriefing }) => (
  <>
    <Hero />
    <BriefingGenerator
      generating={generating}
      onGenerate={onGenerate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      quickMode={quickMode}
      setQuickMode={setQuickMode}
    />
    <IntelligenceGrid onOpenBriefing={onOpenBriefing} />
  </>
);

export default function MakorPlatform() {
  const [active, setActive] = useState("dashboard");
  const [previousPage, setPreviousPage] = useState("dashboard");
  const [generating, setGenerating] = useState(false);
  const [time, setTime] = useState(new Date(2026, 4, 7, 6, 47, 12));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 7));
  const [quickMode, setQuickMode] = useState("today");

  useEffect(() => {
    const i = setInterval(() => {
      setTime((t) => new Date(t.getTime() + 1000));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const goTo = (page) => {
    setPreviousPage(active);
    setActive(page);
  };

  const goBack = () => {
    setActive(previousPage === "briefing" ? "dashboard" : previousPage);
  };

  const onGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      goTo("briefing");
    }, 4000);
  };

  const onOpenBriefing = () => goTo("briefing");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.cream,
        fontFamily: fontSans,
        color: C.text,
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes makorPulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(2.1); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes makorSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .makor-spin { animation: makorSpin 1.4s linear infinite; }
        @keyframes makorFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .makor-fade { animation: makorFadeUp 0.5s ease both; }
        ::-webkit-scrollbar { width: 9px; height: 9px; }
        ::-webkit-scrollbar-track { background: ${C.cream}; }
        ::-webkit-scrollbar-thumb { background: ${C.purpleMist}; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.purple}; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
        }
      `}</style>

      <Sidebar active={active} setActive={goTo} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar time={time} page={active} />

        <div style={{ flex: 1, overflowY: "auto" }} key={active}>
          <div className="makor-fade">
            {active === "dashboard" && (
              <Dashboard
                generating={generating}
                onGenerate={onGenerate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                quickMode={quickMode}
                setQuickMode={setQuickMode}
                onOpenBriefing={onOpenBriefing}
              />
            )}
            {active === "archive" && <ArchivePage onOpenBriefing={onOpenBriefing} />}
            {active === "sources" && <SourcesPage />}
            {active === "briefing" && <BriefingViewerPage onBack={goBack} />}
          </div>
          {active !== "briefing" && <Footer />}
        </div>
      </main>
    </div>
  );
}
