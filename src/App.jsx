import { useState, useEffect, useRef } from "react";

// ── Palette ──────────────────────────────────────────────
const C = {
  accent:     "#5B9CF0",
  accentHover:"#78B0FF",
  accentDim:  "rgba(91,156,240,0.12)",
  accentGlow: "rgba(91,156,240,0.25)",
  bg:         "#08090f",
  bgCard:     "#0e0f1a",
  bgCardHover:"#131425",
  text:       "#e4e8f4",
  textMid:    "rgba(228,232,244,0.55)",
  textDim:    "rgba(228,232,244,0.28)",
  border:     "rgba(91,156,240,0.12)",
  borderSub:  "rgba(228,232,244,0.06)",
};

const SERVICES = [
  { id: "portrait",title: "Portrait",             desc: "Photo pro pour LinkedIn, presse kit d'artiste, book personnel — en studio ou en extérieur, selon votre univers.", icon: "◉" },
  { id: "auto",    title: "Automobile & Moto",    desc: "Mise en valeur de votre véhicule pour une vente, un événement ou vos réseaux. Résultat propre, ambiance soignée.", icon: "◈" },
  { id: "concert", title: "Concert & Événements", desc: "Couverture complète de votre soirée, concert ou événement — des images que vous pouvez utiliser le lendemain.", icon: "▲" },
  { id: "ski",     title: "Ski & Montagne",       desc: "Action sur les pistes, freeride ou ambiance station — pour les moniteurs, écoles de ski et passionnés de glisse.", icon: "◇" },
  { id: "paysage", title: "Paysage",              desc: "Grands espaces, golden hour, longue exposition — une approche artistique avant tout, disponible en tirage.",      icon: "▣" },
];

const PORTFOLIO_ITEMS = [
  // Auto & Moto
  { id: 1,  category: "auto", src: "/photos/automobile_moto/_DSC0221.jpg", o: "p" },
  { id: 2,  category: "auto", src: "/photos/automobile_moto/_DSC4176.jpg", o: "p" },
  { id: 3,  category: "auto", src: "/photos/automobile_moto/_DSC4207.jpg", o: "l" },
  { id: 4,  category: "auto", src: "/photos/automobile_moto/_DSC9570.jpg", o: "l" },
  { id: 5,  category: "auto", src: "/photos/automobile_moto/_DSC1739.jpg", o: "p" },
  { id: 6,  category: "auto", src: "/photos/automobile_moto/_DSC3361.jpg", o: "p" },
  { id: 7,  category: "auto", src: "/photos/automobile_moto/_DSC4585.jpg", o: "l" },
  { id: 8,  category: "auto", src: "/photos/automobile_moto/_DSC8998.jpg", o: "p" },
  { id: 9,  category: "auto", src: "/photos/automobile_moto/_DSC9447.jpg", o: "p" },
  { id: 10, category: "auto", src: "/photos/automobile_moto/IMG_0977.jpg",  o: "p" },
  // Paysage
  { id: 11, category: "paysage", src: "/photos/paysage/_DSC0710.jpg", o: "l" },
  { id: 12, category: "paysage", src: "/photos/paysage/_DSC0716.jpg", o: "l" },
  { id: 13, category: "paysage", src: "/photos/paysage/_DSC0722.jpg", o: "l" },
  { id: 14, category: "paysage", src: "/photos/paysage/_DSC0763.jpg", o: "p" },
  { id: 15, category: "paysage", src: "/photos/paysage/_DSC3095.jpg", o: "l" },
  { id: 16, category: "paysage", src: "/photos/paysage/_DSC3110.jpg", o: "l" },
  { id: 17, category: "paysage", src: "/photos/paysage/_DSC3127.jpg", o: "p" },
  { id: 18, category: "paysage", src: "/photos/paysage/_DSC4267.jpg", o: "p" },
  { id: 19, category: "paysage", src: "/photos/paysage/IMG_2255.jpg",  o: "p" },
  // Portrait
  { id: 20, category: "portrait", src: "/photos/portrait/_DSC0671.jpg", o: "p" },
  { id: 21, category: "portrait", src: "/photos/portrait/_DSC1951.jpg", o: "l" },
  { id: 22, category: "portrait", src: "/photos/portrait/_DSC1970.jpg", o: "p" },
  { id: 23, category: "portrait", src: "/photos/portrait/_DSC2000.jpg", o: "p" },
  { id: 24, category: "portrait", src: "/photos/portrait/_DSC3818.jpg", o: "p" },
  { id: 25, category: "portrait", src: "/photos/portrait/_DSC3859.jpg", o: "p" },
  { id: 26, category: "portrait", src: "/photos/portrait/_DSC3893.jpg", o: "p" },
  { id: 27, category: "portrait", src: "/photos/portrait/_DSC3920.jpg", o: "p" },
  // Ski
  { id: 28, category: "ski", src: "/photos/ski/_DSC2099.jpg", o: "p" },
  { id: 29, category: "ski", src: "/photos/ski/_DSC2129.jpg", o: "p" },
  { id: 30, category: "ski", src: "/photos/ski/_DSC2323.jpg", o: "p" },
  { id: 31, category: "ski", src: "/photos/ski/_DSC2383.jpg", o: "p" },
  { id: 32, category: "ski", src: "/photos/ski/_DSC2428.jpg", o: "p" },
  { id: 33, category: "ski", src: "/photos/ski/_DSC2489.jpg", o: "p" },
  { id: 34, category: "ski", src: "/photos/ski/_DSC0710.jpg", o: "l" },
  { id: 35, category: "ski", src: "/photos/ski/_DSC0773.jpg", o: "p" },
  // Concert
  { id: 36, category: "concert", src: "/photos/concert/IMG_1255.jpg", o: "p" },
  { id: 37, category: "concert", src: "/photos/concert/IMG_1330.jpg", o: "p" },
  { id: 38, category: "concert", src: "/photos/concert/IMG_1341.jpg", o: "p" },
  { id: 39, category: "concert", src: "/photos/concert/IMG_1387.jpg", o: "p" },
  { id: 40, category: "concert", src: "/photos/concert/IMG_1419.jpg", o: "p" },
  { id: 41, category: "concert", src: "/photos/concert/IMG_1448.jpg", o: "p" },
];

const CATEGORIES = ["tout", "portrait", "auto", "concert", "ski", "paysage"];
const CAT_LABELS  = { tout: "Tout", portrait: "Portrait", auto: "Auto & Moto", concert: "Concert", ski: "Ski", paysage: "Paysage" };

const FORMSPREE_ID = "xpwzgkrb";

// ── Hooks ─────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Section({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(5,6,12,0.96)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Image */}
      <img
        src={item.src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "90vh",
          borderRadius: "16px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          objectFit: "contain",
        }}
      />

      {/* Fermer */}
      <button onClick={onClose} style={{
        position: "fixed", top: "24px", right: "28px",
        background: "rgba(255,255,255,0.07)", border: "none",
        color: C.text, fontSize: "22px", width: "44px", height: "44px",
        borderRadius: "50%", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = C.accentDim)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
        ✕
      </button>

      {/* Précédent */}
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{
          position: "fixed", left: "20px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.07)", border: "none",
          color: C.text, fontSize: "22px", width: "48px", height: "48px",
          borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = C.accentDim)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          ‹
        </button>
      )}

      {/* Suivant */}
      {index < items.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{
          position: "fixed", right: "20px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.07)", border: "none",
          color: C.text, fontSize: "22px", width: "48px", height: "48px",
          borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = C.accentDim)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          ›
        </button>
      )}

      {/* Compteur */}
      <div style={{
        position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
        fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
        color: C.textDim, letterSpacing: "2px",
      }}>
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 40px" : "22px 40px",
      background: scrolled ? "rgba(8,9,15,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.borderSub}` : "none",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scroll("hero")}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: C.accentDim, border: `1.5px solid ${C.accent}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 700, color: C.accent,
        }}>L</div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
          fontWeight: 500, color: C.text, letterSpacing: "2px", textTransform: "uppercase",
        }}>Lucas</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[{ label: "Services", id: "services" }, { label: "Portfolio", id: "portfolio" }, { label: "Contact", id: "contact" }].map((item) => (
          <button key={item.id} onClick={() => scroll(item.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: C.textMid, transition: "color 0.3s",
            padding: "8px 14px", borderRadius: "100px",
          }}
          onMouseEnter={(e) => { e.target.style.color = C.accent; e.target.style.background = C.accentDim; }}
          onMouseLeave={(e) => { e.target.style.color = C.textMid; e.target.style.background = "none"; }}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  const t = (delay) => ({
    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      overflow: "hidden", padding: "0 24px",
    }}>
      {/* Glows */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse 60% 50% at 40% 30%, ${C.accentGlow} 0%, transparent 70%),
                     radial-gradient(ellipse 40% 40% at 70% 70%, rgba(30,40,80,0.5) 0%, transparent 70%)`,
      }} />
      <div style={{ position: "absolute", top: "20%", left: "20%", width: "320px", height: "320px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(91,156,240,0.06) 0%, transparent 70%)`,
        filter: "blur(40px)", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "860px" }}>
        <div style={{ ...t(0.2), fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          letterSpacing: "6px", textTransform: "uppercase", color: C.accent, marginBottom: "24px",
        }}>
          Photographe · Région lémanique
        </div>

        <h1 style={{ ...t(0.38), fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(52px, 10vw, 118px)", fontWeight: 400,
          color: C.text, lineHeight: 0.95, margin: "0 0 24px 0", letterSpacing: "-2px",
        }}>Lucas</h1>

        <p style={{ ...t(0.54), fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
          color: C.textMid, lineHeight: 1.8, maxWidth: "440px", margin: "0 auto 48px",
          fontWeight: 300, letterSpacing: "0.3px",
        }}>
          Portrait · Auto & Moto · Concert · Ski · Paysage
          <br />Région lémanique
        </p>

        <div style={{ ...t(0.68), display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: C.accent, color: "#fff", border: "none",
              padding: "14px 36px", borderRadius: "100px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer", fontWeight: 600, transition: "all 0.3s",
              boxShadow: `0 0 24px ${C.accentGlow}`,
            }}
            onMouseEnter={(e) => { e.target.style.background = C.accentHover; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 4px 32px ${C.accentGlow}`; }}
            onMouseLeave={(e) => { e.target.style.background = C.accent; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 0 24px ${C.accentGlow}`; }}>
            Me contacter
          </button>
          <button onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", color: C.text,
              border: `1.5px solid ${C.border}`, padding: "14px 36px", borderRadius: "100px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer", fontWeight: 400, transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; e.target.style.background = C.accentDim; }}
            onMouseLeave={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.text; e.target.style.background = "transparent"; }}>
            Voir le portfolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 0.45 : 0, transition: "opacity 1s ease 1.4s",
      }}>
        <div style={{ width: "1px", height: "44px", background: `linear-gradient(to bottom, transparent, ${C.accent})`, animation: "scrollPulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" style={{ padding: "120px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Section>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", color: C.accent, marginBottom: "14px" }}>Services</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: C.text, lineHeight: 1.1, margin: "0 0 14px 0" }}>Ce que je propose</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: C.textMid, maxWidth: "480px", lineHeight: 1.8, marginBottom: "60px", fontWeight: 300 }}>
          Des visuels qui racontent une histoire et valorisent votre activité. Chaque projet est abordé avec une approche artistique et un regard personnel.
        </p>
      </Section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {SERVICES.map((s, i) => (
          <Section key={s.id} delay={i * 0.07}>
            <div style={{
              padding: "36px 28px", background: C.bgCard, borderRadius: "20px",
              border: `1px solid ${C.borderSub}`, cursor: "default", transition: "all 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.bgCardHover;
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 40px rgba(91,156,240,0.08)`;
              e.currentTarget.querySelector(".svc-icon").style.color = C.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.bgCard;
              e.currentTarget.style.borderColor = C.borderSub;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.querySelector(".svc-icon").style.color = C.textDim;
            }}>
              <div className="svc-icon" style={{ fontSize: "26px", color: C.textDim, marginBottom: "18px", transition: "color 0.35s" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "19px", fontWeight: 400, color: C.text, margin: "0 0 10px 0" }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.textMid, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{s.desc}</p>
            </div>
          </Section>
        ))}
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────
function PortfolioSection() {
  const [filter, setFilter] = useState("tout");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const filtered = filter === "tout" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" style={{ padding: "120px 40px", maxWidth: "1300px", margin: "0 auto" }}>
      <Section>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", color: C.accent, marginBottom: "14px" }}>Portfolio</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: C.text, lineHeight: 1.1, margin: "0 0 40px 0" }}>Travaux récents</h2>
      </Section>

      {/* Filtres */}
      <Section delay={0.1}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { setFilter(c); setLightboxIndex(null); }} style={{
              background: filter === c ? C.accentDim : "transparent",
              border: `1.5px solid ${filter === c ? C.accent : C.borderSub}`,
              color: filter === c ? C.accent : C.textDim,
              padding: "8px 20px", borderRadius: "100px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              letterSpacing: "1.5px", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.25s", fontWeight: filter === c ? 500 : 400,
            }}>
              {CAT_LABELS[c]}
            </button>
          ))}
        </div>
      </Section>

      {/* Mosaïque */}
      <div style={{ columns: "3 280px", columnGap: "12px" }}>
        {filtered.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(i)}
            style={{
              breakInside: "avoid", marginBottom: "12px",
              borderRadius: "16px", overflow: "hidden",
              cursor: "pointer", position: "relative",
              transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(0.985)";
              e.currentTarget.style.boxShadow = `0 16px 48px rgba(91,156,240,0.18)`;
              e.currentTarget.querySelector(".overlay").style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.querySelector(".overlay").style.opacity = "0";
            }}
          >
            <img
              src={item.src}
              alt={CAT_LABELS[item.category]}
              loading="lazy"
              style={{ width: "100%", display: "block", borderRadius: "16px" }}
            />
            <div className="overlay" style={{
              position: "absolute", inset: 0, borderRadius: "16px",
              background: "rgba(8,9,15,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.3s",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                border: `1.5px solid ${C.accent}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", color: C.accent,
                background: "rgba(8,9,15,0.5)",
              }}>⤢</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1))}
      />
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", service: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: C.bgCard,
    border: `1.5px solid ${C.borderSub}`, borderRadius: "12px",
    color: C.text, fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px", outline: "none", transition: "border-color 0.3s",
  };

  return (
    <section id="contact" style={{ padding: "120px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <Section>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", color: C.accent, marginBottom: "14px" }}>Contact</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, color: C.text, lineHeight: 1.1, margin: "0 0 14px 0" }}>Discutons de votre projet</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: C.textMid, maxWidth: "480px", lineHeight: 1.8, marginBottom: "48px", fontWeight: 300 }}>
          Décrivez-moi votre besoin et je vous recontacte sous 24h avec une proposition adaptée.
        </p>
      </Section>

      <Section delay={0.15}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
          {/* Formulaire */}
          <div>
            {status === "success" ? (
              <div style={{ padding: "48px", background: C.bgCard, borderRadius: "20px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "14px", color: C.accent }}>✓</div>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", color: C.text, margin: "0 0 8px 0" }}>Message envoyé</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.textMid }}>Je vous recontacte très vite.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { key: "name",  label: "Nom",   type: "text",  placeholder: "Votre nom" },
                  { key: "email", label: "Email", type: "email", placeholder: "votre@email.ch" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.textDim, display: "block", marginBottom: "6px" }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={formData[key]} required
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = C.accent)}
                      onBlur={(e) => (e.target.style.borderColor = C.borderSub)} />
                  </div>
                ))}

                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.textDim, display: "block", marginBottom: "6px" }}>Service</label>
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer", color: formData.service ? C.text : C.textDim }}>
                    <option value="" style={{ background: C.bgCard }}>Choisir un service</option>
                    {SERVICES.map((s) => <option key={s.id} value={s.id} style={{ background: C.bgCard }}>{s.title}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.textDim, display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea placeholder="Décrivez votre projet..." value={formData.message} required rows={4}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = C.accent)}
                    onBlur={(e) => (e.target.style.borderColor = C.borderSub)} />
                </div>

                {status === "error" && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.accent }}>
                    Erreur — écrivez directement à lcs.mrt@icloud.com
                  </p>
                )}

                <button type="submit" disabled={status === "sending"} style={{
                  background: C.accent, color: "#fff", border: "none",
                  padding: "15px 40px", borderRadius: "100px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                  letterSpacing: "2px", textTransform: "uppercase",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  fontWeight: 600, marginTop: "8px", transition: "all 0.3s",
                  alignSelf: "flex-start", opacity: status === "sending" ? 0.7 : 1,
                  boxShadow: `0 0 20px ${C.accentGlow}`,
                }}
                onMouseEnter={(e) => { if (status !== "sending") { e.target.style.background = C.accentHover; e.target.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={(e) => { e.target.style.background = C.accent; e.target.style.transform = "translateY(0)"; }}>
                  {status === "sending" ? "Envoi…" : "Envoyer"}
                </button>
              </form>
            )}
          </div>

          {/* Infos */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px" }}>
            {[
              { label: "Email",     value: "lcs.mrt@icloud.com",   href: "mailto:lcs.mrt@icloud.com" },
              { label: "Instagram", value: "@lucas_mrt.08",         href: "https://instagram.com/lucas_mrt.08" },
              { label: "Zone",      value: "Nyon · Lausanne · Genève", href: null },
            ].map((item) => (
              <div key={item.label} style={{ padding: "20px 24px", background: C.bgCard, borderRadius: "16px", border: `1px solid ${C.borderSub}` }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.textDim, marginBottom: "6px" }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.text, fontWeight: 400, textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={(e) => (e.target.style.color = C.accent)}
                      onMouseLeave={(e) => (e.target.style.color = C.text)}>
                      {item.value}
                    </a>
                  : <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.text, fontWeight: 400 }}>{item.value}</div>
                }
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "40px 40px", borderTop: `1px solid ${C.borderSub}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "12px", maxWidth: "1200px", margin: "0 auto",
    }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: C.textDim, letterSpacing: "1px" }}>© 2026 Lucas — Tous droits réservés</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: C.textDim, letterSpacing: "1px" }}>Photographe · Région lémanique</span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(91,156,240,0.25); color: #e4e8f4; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #08090f; }
        ::-webkit-scrollbar-thumb { background: rgba(91,156,240,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(91,156,240,0.4); }
        input::placeholder, textarea::placeholder { color: rgba(228,232,244,0.2); }
        select option { background: #0e0f1a; color: #e4e8f4; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(1.4); }
        }
        @media (max-width: 700px) {
          #contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />
      <Hero />

      <div style={{ width: "48px", height: "1px", background: `linear-gradient(to right, transparent, ${C.accent}, transparent)`, margin: "0 auto" }} />
      <ServicesSection />
      <div style={{ width: "48px", height: "1px", background: `linear-gradient(to right, transparent, ${C.accent}, transparent)`, margin: "0 auto" }} />
      <PortfolioSection />
      <div style={{ width: "48px", height: "1px", background: `linear-gradient(to right, transparent, ${C.accent}, transparent)`, margin: "0 auto" }} />
      <ContactSection />
      <Footer />
    </div>
  );
}
