import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Mail, Camera, Car, Music, Mountain, X, ChevronLeft, ChevronRight, Send } from "lucide-react";
import Hls from "hls.js";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "auto",
    title: "Automobile & Moto",
    desc: "Mise en valeur de votre véhicule pour une vente, un événement ou vos réseaux. Résultat propre, ambiance soignée — chaque courbe capturée sous son meilleur angle.",
    icon: "◈",
    tag: "Spécialité",
  },
  {
    id: "portrait",
    title: "Portrait",
    desc: "Photo professionnelle pour LinkedIn, press kit d'artiste ou book personnel. En studio ou en extérieur, selon votre univers.",
    icon: "◉",
    tag: "Portrait",
  },
  {
    id: "concert",
    title: "Concert & Événements",
    desc: "Couverture complète de votre soirée, concert ou événement — des images que vous pouvez utiliser le lendemain.",
    icon: "▲",
    tag: "Événements",
  },
  {
    id: "ski",
    title: "Ski & Montagne",
    desc: "Action sur les pistes, freeride ou ambiance station. Pour les moniteurs, écoles de ski et passionnés de glisse.",
    icon: "◇",
    tag: "Sport",
  },
  {
    id: "paysage",
    title: "Paysage",
    desc: "Grands espaces, golden hour, longue exposition. Une approche artistique avant tout, disponible en tirage.",
    icon: "▣",
    tag: "Art",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1,  category: "auto",    src: "/photos/automobile_moto/_DSC0221.jpg" },
  { id: 2,  category: "auto",    src: "/photos/automobile_moto/_DSC4176.jpg" },
  { id: 3,  category: "auto",    src: "/photos/automobile_moto/_DSC4207.jpg" },
  { id: 4,  category: "auto",    src: "/photos/automobile_moto/_DSC9570.jpg" },
  { id: 5,  category: "auto",    src: "/photos/automobile_moto/_DSC1739.jpg" },
  { id: 6,  category: "auto",    src: "/photos/automobile_moto/_DSC3361.jpg" },
  { id: 7,  category: "auto",    src: "/photos/automobile_moto/_DSC4585.jpg" },
  { id: 8,  category: "auto",    src: "/photos/automobile_moto/_DSC8998.jpg" },
  { id: 9,  category: "auto",    src: "/photos/automobile_moto/_DSC9447.jpg" },
  { id: 10, category: "auto",    src: "/photos/automobile_moto/IMG_0977.jpg" },
  { id: 11, category: "paysage", src: "/photos/paysage/_DSC0710.jpg" },
  { id: 12, category: "paysage", src: "/photos/paysage/_DSC0716.jpg" },
  { id: 13, category: "paysage", src: "/photos/paysage/_DSC0722.jpg" },
  { id: 14, category: "paysage", src: "/photos/paysage/_DSC0763.jpg" },
  { id: 15, category: "paysage", src: "/photos/paysage/_DSC3095.jpg" },
  { id: 16, category: "paysage", src: "/photos/paysage/_DSC3110.jpg" },
  { id: 17, category: "paysage", src: "/photos/paysage/_DSC3127.jpg" },
  { id: 18, category: "paysage", src: "/photos/paysage/_DSC4267.jpg" },
  { id: 19, category: "paysage", src: "/photos/paysage/IMG_2255.jpg" },
  { id: 20, category: "portrait", src: "/photos/portrait/_DSC0671.jpg" },
  { id: 21, category: "portrait", src: "/photos/portrait/_DSC1951.jpg" },
  { id: 22, category: "portrait", src: "/photos/portrait/_DSC1970.jpg" },
  { id: 23, category: "portrait", src: "/photos/portrait/_DSC2000.jpg" },
  { id: 24, category: "portrait", src: "/photos/portrait/_DSC3818.jpg" },
  { id: 25, category: "portrait", src: "/photos/portrait/_DSC3859.jpg" },
  { id: 26, category: "portrait", src: "/photos/portrait/_DSC3893.jpg" },
  { id: 27, category: "portrait", src: "/photos/portrait/_DSC3920.jpg" },
  { id: 28, category: "ski",     src: "/photos/ski/_DSC2428.jpg" },
  { id: 29, category: "ski",     src: "/photos/ski/_DSC0773.jpg" },
  { id: 30, category: "ski",     src: "/photos/ski/_DSC2016.jpg" },
  { id: 31, category: "ski",     src: "/photos/ski/_DSC0759.jpg" },
  { id: 36, category: "concert", src: "/photos/concert/IMG_1255.jpg" },
  { id: 37, category: "concert", src: "/photos/concert/IMG_1330.jpg" },
  { id: 38, category: "concert", src: "/photos/concert/IMG_1341.jpg" },
  { id: 39, category: "concert", src: "/photos/concert/IMG_1387.jpg" },
  { id: 40, category: "concert", src: "/photos/concert/IMG_1419.jpg" },
  { id: 41, category: "concert", src: "/photos/concert/IMG_1448.jpg" },
];

const CATEGORIES = [
  { id: "tout", label: "Tout" },
  { id: "auto", label: "Auto & Moto" },
  { id: "portrait", label: "Portrait" },
  { id: "concert", label: "Concert" },
  { id: "ski", label: "Ski" },
  { id: "paysage", label: "Paysage" },
];

const HERO_PHOTO = "/photos/automobile_moto/_DSC9570.jpg";
const STATS_VIDEO = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";
const CTA_VIDEO   = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
const FORMSPREE_ID = "xpwzgkrb";

// ─── BLUR TEXT ───────────────────────────────────────────────────────────────

function BlurText({ text, className = "", delay = 100 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * (delay / 1000),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── HLS VIDEO ───────────────────────────────────────────────────────────────

function HlsVideo({ src, className = "", style = {} }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play().catch(() => {});
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={style}
    />
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-6 lg:px-12 py-2 flex items-center justify-between"
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-heading italic text-white text-2xl tracking-tight"
      >
        LM
      </button>

      {/* Center nav pill */}
      <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1 items-center gap-1">
        {["Portfolio", "Services", "À Propos", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase().replace(" ", "").replace("à", "a"))}
            className="px-3 py-2 text-sm font-body font-medium text-white/80 hover:text-white transition-colors rounded-full"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-body font-medium transition-colors" style={{ background: "var(--gold)", color: "#000" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gold-light)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
        >
          Me contacter <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Mobile CTA */}
      <button
        onClick={() => scrollTo("contact")}
        className="md:hidden liquid-glass-strong rounded-full px-4 py-2 text-sm font-body font-medium text-white flex items-center gap-1.5"
      >
        Contact <ArrowUpRight size={14} />
      </button>
    </motion.nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: 700 }}>
      {/* Photo background */}
      <img
        src={HERO_PHOTO}
        alt="Hero"
        className="absolute left-0 w-full h-full object-cover z-0"
        style={{ top: 0 }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: 350, background: "linear-gradient(to bottom, transparent, black)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center" style={{ paddingTop: 100 }}>
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs font-body font-medium tracking-[4px] uppercase mb-6" style={{ color: "var(--gold)" }}
        >
          Photographe & Vidéaste · Nyon
        </motion.p>
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-3xl tracking-[-3px] mb-6">
          <BlurText text="Lucas Martin" delay={120} />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-base text-white/70 font-body font-light leading-relaxed max-w-md mb-10"
        >
          Auto · Portrait · Concert · Montagne
          <br />Région lémanique : Nyon · Lausanne · Genève
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Voir le portfolio <ArrowUpRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white/70 hover:text-white text-sm font-body font-light transition-colors flex items-center gap-2"
          >
            <Mail size={15} />
            Me contacter
          </button>
        </motion.div>

        {/* Categories scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8"
        >
          {["Auto", "Portrait", "Concert", "Ski", "Paysage"].map((cat) => (
            <span
              key={cat}
              className="text-white/40 text-sm font-body font-light tracking-wide hidden md:block"
            >
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO GALLERY ────────────────────────────────────────────────────────

function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("tout");
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const filtered = activeCategory === "tout"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((p) => p.category === activeCategory);

  const openLightbox = (item) => {
    const idx = filtered.findIndex((p) => p.id === item.id);
    setLightbox(idx);
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, prev, next]);

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-16" ref={ref}>
      {/* Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-body font-medium text-white mb-6"
        >
          Portfolio
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-4"
        >
          L'image parle d'elle-même.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 font-body font-light text-sm max-w-md mx-auto"
        >
          Une sélection de travaux récents, entre automobiles, portraits et grands espaces.
        </motion.p>
      </div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? "text-black"
                : "liquid-glass text-white/70 hover:text-white"
            }`}
            style={activeCategory === cat.id ? { background: "var(--gold)" } : {}}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
            onClick={() => openLightbox(item)}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 liquid-glass rounded-full p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 liquid-glass rounded-full p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 liquid-glass rounded-full p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={22} />
          </button>
          <motion.img
            key={filtered[lightbox]?.id}
            src={filtered[lightbox]?.src}
            alt=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-body">
            {lightbox + 1} / {filtered.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}

// ─── SERVICES CHESS ───────────────────────────────────────────────────────────

function ServicesChess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const featuredServices = [
    {
      ...SERVICES[0], // auto
      image: "/photos/automobile_moto/_DSC4207.jpg",
      subtext: "Votre voiture mérite mieux qu'une photo de parking.",
    },
    {
      ...SERVICES[1], // portrait
      image: "/photos/portrait/_DSC3893.jpg",
      subtext: "Un regard. Une lumière. Une image qui vous ressemble vraiment.",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 lg:px-16" ref={ref}>
      {/* Header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-body font-medium text-white mb-6"
        >
          Prestations
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
        >
          Ce que je fais bien.
        </motion.h2>
      </div>

      {/* Chess rows */}
      <div className="space-y-16 max-w-5xl mx-auto">
        {featuredServices.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
          >
            {/* Text */}
            <div className="flex-1 space-y-6">
              <span className="liquid-glass rounded-full px-3 py-1 text-xs font-body font-medium text-white/60 inline-block">
                {service.tag}
              </span>
              <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-tight">
                {service.title}
              </h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {service.desc}
              </p>
              <p className="text-white/40 font-body font-light text-xs italic">
                {service.subtext}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-body font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors w-fit"
              >
                Demander un devis <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 w-full">
              <div className="liquid-glass rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES GRID ────────────────────────────────────────────────────────────

function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const icons = [
    <Car size={18} />,
    <Camera size={18} />,
    <Music size={18} />,
    <Mountain size={18} />,
    <Camera size={18} />,
  ];

  return (
    <section className="py-16 px-6 lg:px-16" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="liquid-glass rounded-2xl p-6 space-y-4"
          >
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center text-white">
              {icons[i]}
            </div>
            <h3 className="text-lg font-heading italic text-white">{service.title}</h3>
            <p className="text-white/50 font-body font-light text-sm leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}

        {/* "À Propos" card */}
        <motion.div
          id="apropos"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="liquid-glass rounded-2xl p-6 space-y-4 md:col-span-2 lg:col-span-1 flex flex-col justify-between"
        >
          <div>
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center text-white mb-4">
              <span className="text-sm font-heading italic">LM</span>
            </div>
            <h3 className="text-lg font-heading italic text-white mb-2">À propos</h3>
            <p className="text-white/50 font-body font-light text-sm leading-relaxed">
              Photographe basé à Nyon, je travaille sur des projets auto, portrait et événements dans la région lémanique. Approche artistique, résultats pro.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass-strong rounded-full px-4 py-2 text-xs font-body font-medium text-white flex items-center gap-1.5 w-fit mt-4 hover:bg-white/10 transition-colors"
          >
            Travailler ensemble <ArrowUpRight size={12} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const stats = [
    { value: "41+", label: "Photos au portfolio" },
    { value: "5", label: "Catégories" },
    { value: "100%", label: "Satisfaction client" },
    { value: "Nyon", label: "Région lémanique" },
  ];

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* HLS video BG (desaturated) */}
      <HlsVideo
        src={STATS_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "saturate(0) brightness(0.4)" }}
      />
      {/* Gradient fades */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to top, black, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="liquid-glass rounded-3xl p-10 md:p-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">
                  {s.value}
                </div>
                <div className="text-white/50 font-body font-light text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONTACT + FOOTER ─────────────────────────────────────────────────────────

function CtaFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* HLS video BG */}
      <HlsVideo
        src={CTA_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.35)" }}
      />
      {/* Gradient fades */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to top, black, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-16 max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-body font-medium text-white mb-8"
        >
          Contact
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] mb-6"
        >
          On travaille ensemble ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 font-body font-light text-sm mb-12 max-w-sm mx-auto"
        >
          Dites-moi ce que vous avez en tête — une séance, un événement, un véhicule.
          Je reviens rapidement.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="liquid-glass rounded-3xl p-8 space-y-4 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <input
              type="email"
              placeholder="Votre email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <textarea
            placeholder="Votre message — décrivez votre projet..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-white/30 text-xs font-body">
              {status === "success" && "✓ Message envoyé — je reviens vite !"}
              {status === "error" && "Erreur — réessayez ou écrivez directement."}
            </span>
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Envoi..." : "Envoyer"}
              <Send size={14} />
            </button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-white/30"
        >
          <span>© 2026 Lucas Martin. Tous droits réservés.</span>
          <div className="flex items-center gap-6">
            <a href="mailto:lcs.mrt@icloud.com" className="hover:text-white/60 transition-colors">
              Email
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Instagram
            </a>
            <span className="text-white/20">Nyon, Suisse</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <div className="bg-black">
        <PortfolioGallery />
        <ServicesChess />
        <ServicesGrid />
        <CtaFooter />
      </div>
    </div>
  );
}
