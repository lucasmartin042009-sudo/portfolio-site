import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    id: "auto",
    title: "Automobile",
    desc: "Shootings garage, livraisons, contenu réseaux sociaux, annonces véhicules.",
    icon: "◈",
  },
  {
    id: "immo",
    title: "Immobilier",
    desc: "Appartements, villas, home staging, architecture intérieure & extérieure.",
    icon: "▣",
  },
  {
    id: "food",
    title: "Restauration",
    desc: "Photo culinaire, ambiance restaurant, menus visuels, contenu Instagram.",
    icon: "◉",
  },
  {
    id: "event",
    title: "Événementiel",
    desc: "Couverture d'événements, portraits corporate, reportages sur mesure.",
    icon: "◇",
  },
  {
    id: "artisan",
    title: "Artisanat & Vignerons",
    desc: "Mise en valeur de savoir-faire, étiquettes, domaines viticoles.",
    icon: "◆",
  },
  {
    id: "brand",
    title: "Contenu de marque",
    desc: "Identité visuelle, produits, lifestyle, campagnes réseaux sociaux.",
    icon: "▲",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "auto", aspect: "tall", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
  { id: 2, category: "auto", aspect: "wide", gradient: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)" },
  { id: 3, category: "immo", aspect: "square", gradient: "linear-gradient(135deg, #2d1b30 0%, #1a1a2e 50%, #16213e 100%)" },
  { id: 4, category: "food", aspect: "tall", gradient: "linear-gradient(135deg, #1e1e1e 0%, #2a1f1f 50%, #3a2828 100%)" },
  { id: 5, category: "artisan", aspect: "wide", gradient: "linear-gradient(135deg, #1a2e1a 0%, #1e2e1e 50%, #2a3a2a 100%)" },
  { id: 6, category: "auto", aspect: "square", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0d1117 50%, #161b22 100%)" },
  { id: 7, category: "event", aspect: "wide", gradient: "linear-gradient(135deg, #2e1a1a 0%, #1a1a2e 50%, #1a2e2e 100%)" },
  { id: 8, category: "brand", aspect: "tall", gradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a2e 100%)" },
];

const CATEGORIES = ["tout", "auto", "immo", "food", "event", "artisan", "brand"];
const CAT_LABELS = { tout: "Tout", auto: "Auto", immo: "Immo", food: "Food", event: "Event", artisan: "Artisan", brand: "Brand" };

// ── Remplacez cette valeur par votre ID Formspree ──
// Créez un compte gratuit sur https://formspree.io et collez ici l'ID de votre formulaire
const FORMSPREE_ID = "xpwzgkrb";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Section({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scroll("hero")}>
        <div style={{
          width: "32px", height: "32px", border: "2px solid #c4a35a",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "14px", fontWeight: 700, color: "#c4a35a",
        }}>
          L
        </div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px",
          fontWeight: 400, color: "#e8e4dc", letterSpacing: "3px", textTransform: "uppercase",
        }}>
          Lucas
        </span>
      </div>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {[
          { label: "Services", id: "services" },
          { label: "Portfolio", id: "portfolio" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scroll(item.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: "rgba(232,228,220,0.6)", transition: "color 0.3s",
              padding: "4px 0",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#c4a35a")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(232,228,220,0.6)")}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", position: "relative",
        overflow: "hidden", padding: "0 24px",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(196,163,90,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(16,21,38,0.8) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px" }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(.22,1,.36,1) 0.2s",
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          letterSpacing: "6px", textTransform: "uppercase",
          color: "#c4a35a", marginBottom: "28px",
        }}>
          Photographe · Région lémanique
        </div>

        <h1 style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(.22,1,.36,1) 0.4s",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(48px, 10vw, 120px)", fontWeight: 400,
          color: "#e8e4dc", lineHeight: 0.95, margin: "0 0 24px 0",
          letterSpacing: "-2px",
        }}>
          Lucas
        </h1>

        <p style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(.22,1,.36,1) 0.6s",
          fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
          color: "rgba(232,228,220,0.5)", lineHeight: 1.7,
          maxWidth: "480px", margin: "0 auto 48px",
          fontWeight: 300, letterSpacing: "0.5px",
        }}>
          Automobile · Immobilier · Restauration · Artisanat
          <br />
          Nyon — Lausanne — Genève
        </p>

        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(.22,1,.36,1) 0.8s",
          display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
        }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#c4a35a", color: "#08080c", border: "none",
              padding: "14px 36px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
              cursor: "pointer", fontWeight: 600, transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#d4b36a"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "#c4a35a"; e.target.style.transform = "translateY(0)"; }}
          >
            Me contacter
          </button>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", color: "#e8e4dc",
              border: "1px solid rgba(232,228,220,0.2)",
              padding: "14px 36px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
              cursor: "pointer", fontWeight: 400, transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#c4a35a"; e.target.style.color = "#c4a35a"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(232,228,220,0.2)"; e.target.style.color = "#e8e4dc"; }}
          >
            Voir le portfolio
          </button>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 1.2s",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      }}>
        <div style={{
          width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, #c4a35a)",
          animation: "scrollPulse 2s ease infinite",
        }} />
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" style={{ padding: "120px 32px", maxWidth: "1200px", margin: "0 auto" }}>
      <Section>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          letterSpacing: "6px", textTransform: "uppercase",
          color: "#c4a35a", marginBottom: "16px",
        }}>
          Services
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400,
          color: "#e8e4dc", lineHeight: 1.1, margin: "0 0 16px 0",
        }}>
          Ce que je propose
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
          color: "rgba(232,228,220,0.45)", maxWidth: "500px",
          lineHeight: 1.7, marginBottom: "64px", fontWeight: 300,
        }}>
          Des visuels qui racontent une histoire et valorisent votre activité. Chaque projet est abordé avec une approche artistique et un regard personnel.
        </p>
      </Section>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1px", background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}>
        {SERVICES.map((s, i) => (
          <Section key={s.id} delay={i * 0.08}>
            <div
              style={{
                padding: "40px 32px", background: "#08080c",
                cursor: "default", transition: "all 0.4s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(196,163,90,0.04)";
                e.currentTarget.querySelector(".svc-icon").style.color = "#c4a35a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#08080c";
                e.currentTarget.querySelector(".svc-icon").style.color = "rgba(232,228,220,0.15)";
              }}
            >
              <div
                className="svc-icon"
                style={{
                  fontFamily: "Georgia, serif", fontSize: "28px",
                  color: "rgba(232,228,220,0.15)", marginBottom: "20px",
                  transition: "color 0.4s",
                }}
              >
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "20px", fontWeight: 400, color: "#e8e4dc",
                margin: "0 0 10px 0",
              }}>
                {s.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                color: "rgba(232,228,220,0.4)", lineHeight: 1.7,
                margin: 0, fontWeight: 300,
              }}>
                {s.desc}
              </p>
            </div>
          </Section>
        ))}
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState("tout");

  const filtered = filter === "tout" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" style={{ padding: "120px 32px", maxWidth: "1200px", margin: "0 auto" }}>
      <Section>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          letterSpacing: "6px", textTransform: "uppercase",
          color: "#c4a35a", marginBottom: "16px",
        }}>
          Portfolio
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400,
          color: "#e8e4dc", lineHeight: 1.1, margin: "0 0 48px 0",
        }}>
          Travaux récents
        </h2>
      </Section>

      <Section delay={0.1}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                background: filter === c ? "rgba(196,163,90,0.15)" : "transparent",
                border: `1px solid ${filter === c ? "#c4a35a" : "rgba(255,255,255,0.08)"}`,
                color: filter === c ? "#c4a35a" : "rgba(232,228,220,0.4)",
                padding: "8px 20px", fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.3s",
              }}
            >
              {CAT_LABELS[c]}
            </button>
          ))}
        </div>
      </Section>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "4px",
      }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              position: "relative", overflow: "hidden", cursor: "pointer",
              aspectRatio: item.aspect === "tall" ? "3/4" : item.aspect === "wide" ? "16/10" : "1/1",
              background: item.gradient,
              transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
              e.currentTarget.querySelector(".overlay").style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.querySelector(".overlay").style.opacity = "0";
            }}
          >
            {/* Placeholder — remplacez par <img src="..." /> */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "12px",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                border: "1px solid rgba(232,228,220,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", color: "rgba(232,228,220,0.15)",
              }}>
                ✦
              </div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                letterSpacing: "3px", textTransform: "uppercase",
                color: "rgba(232,228,220,0.15)",
              }}>
                {CAT_LABELS[item.category]}
              </span>
            </div>

            <div
              className="overlay"
              style={{
                position: "absolute", inset: 0,
                background: "rgba(196,163,90,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.4s",
              }}
            >
              <div style={{
                width: "40px", height: "40px",
                border: "1.5px solid #c4a35a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", color: "#c4a35a",
              }}>
                +
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", service: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{ padding: "120px 32px", maxWidth: "900px", margin: "0 auto" }}>
      <Section>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          letterSpacing: "6px", textTransform: "uppercase",
          color: "#c4a35a", marginBottom: "16px",
        }}>
          Contact
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400,
          color: "#e8e4dc", lineHeight: 1.1, margin: "0 0 16px 0",
        }}>
          Discutons de votre projet
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
          color: "rgba(232,228,220,0.45)", maxWidth: "500px",
          lineHeight: 1.7, marginBottom: "48px", fontWeight: 300,
        }}>
          Décrivez-moi votre besoin et je vous recontacte sous 24h avec une proposition adaptée.
        </p>
      </Section>

      <Section delay={0.15}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
          {/* Form */}
          <div>
            {status === "success" ? (
              <div style={{
                padding: "48px", border: "1px solid rgba(196,163,90,0.2)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "16px", color: "#c4a35a" }}>✓</div>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "20px", color: "#e8e4dc", margin: "0 0 8px 0",
                }}>
                  Message envoyé
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                  color: "rgba(232,228,220,0.4)",
                }}>
                  Je vous recontacte très vite.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { key: "name", label: "Nom", type: "text", placeholder: "Votre nom" },
                  { key: "email", label: "Email", type: "email", placeholder: "votre@email.ch" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                      letterSpacing: "3px", textTransform: "uppercase",
                      color: "rgba(232,228,220,0.35)", display: "block", marginBottom: "8px",
                    }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      required
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      style={{
                        width: "100%", padding: "14px 0",
                        background: "transparent", border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        color: "#e8e4dc", fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px", outline: "none", transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#c4a35a")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                    letterSpacing: "3px", textTransform: "uppercase",
                    color: "rgba(232,228,220,0.35)", display: "block", marginBottom: "8px",
                  }}>
                    Service souhaité
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: "100%", padding: "14px 0",
                      background: "transparent", border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      color: formData.service ? "#e8e4dc" : "rgba(232,228,220,0.3)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px", outline: "none", cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ background: "#08080c" }}>Choisir un service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} style={{ background: "#08080c" }}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                    letterSpacing: "3px", textTransform: "uppercase",
                    color: "rgba(232,228,220,0.35)", display: "block", marginBottom: "8px",
                  }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Décrivez votre projet..."
                    value={formData.message}
                    required
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: "100%", padding: "14px 0",
                      background: "transparent", border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      color: "#e8e4dc", fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px", outline: "none", resize: "vertical",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#c4a35a")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {status === "error" && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                    color: "#c4a35a",
                  }}>
                    Une erreur est survenue. Réessayez ou écrivez directement à lcs.mrt@icloud.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: "#c4a35a", color: "#08080c", border: "none",
                    padding: "16px 40px", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    fontWeight: 600, marginTop: "8px", transition: "all 0.3s",
                    alignSelf: "flex-start",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.target.style.background = "#d4b36a"; e.target.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { e.target.style.background = "#c4a35a"; e.target.style.transform = "translateY(0)"; }}
                >
                  {status === "sending" ? "Envoi..." : "Envoyer"}
                </button>
              </form>
            )}
          </div>

          {/* Infos */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "36px" }}>
            {[
              { label: "Email", value: "lcs.mrt@icloud.com", href: "mailto:lcs.mrt@icloud.com" },
              { label: "Instagram", value: "@lucas_mrt.08", href: "https://instagram.com/lucas_mrt.08" },
              { label: "Zone", value: "Nyon · Lausanne · Genève", href: null },
            ].map((item) => (
              <div key={item.label}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                  letterSpacing: "3px", textTransform: "uppercase",
                  color: "rgba(232,228,220,0.3)", marginBottom: "6px",
                }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                      color: "#e8e4dc", fontWeight: 300, textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#c4a35a")}
                    onMouseLeave={(e) => (e.target.style.color = "#e8e4dc")}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    color: "#e8e4dc", fontWeight: 300,
                  }}>
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "48px 32px", borderTop: "1px solid rgba(255,255,255,0.04)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "16px", maxWidth: "1200px", margin: "0 auto",
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(232,228,220,0.2)", letterSpacing: "1px",
      }}>
        © 2026 Lucas — Tous droits réservés
      </span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(232,228,220,0.2)", letterSpacing: "1px",
      }}>
        Photographe · Région lémanique
      </span>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div style={{
      background: "#08080c", minHeight: "100vh", color: "#e8e4dc",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(196,163,90,0.3); color: #e8e4dc; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #08080c; }
        ::-webkit-scrollbar-thumb { background: rgba(196,163,90,0.2); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(196,163,90,0.4); }
        input::placeholder, textarea::placeholder { color: rgba(232,228,220,0.2); }
        select option { background: #08080c; color: #e8e4dc; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }
        @media (max-width: 700px) {
          #contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />
      <Hero />

      <div style={{ width: "60px", height: "1px", background: "rgba(196,163,90,0.3)", margin: "0 auto" }} />
      <ServicesSection />
      <div style={{ width: "60px", height: "1px", background: "rgba(196,163,90,0.3)", margin: "0 auto" }} />
      <PortfolioSection />
      <div style={{ width: "60px", height: "1px", background: "rgba(196,163,90,0.3)", margin: "0 auto" }} />
      <ContactSection />
      <Footer />
    </div>
  );
}
