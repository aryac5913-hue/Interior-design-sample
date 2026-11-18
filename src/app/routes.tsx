import { CSSProperties, FormEvent, ReactNode, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, createBrowserRouter, useLocation } from "react-router";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const img = {
  hero: asset("/images/hero.jpg"),
  living: asset("/images/living.jpg"),
  dining: asset("/images/dining.jpg"),
  cream: asset("/images/cream.jpg"),
  kitchen: asset("/images/kitchen.jpg"),
  dark: asset("/images/dark.jpg"),
  founder: asset("/images/founder.jpg"),
  hands: asset("/images/hands.jpg"),
  villa: asset("/images/villa.jpg"),
  pool: asset("/images/pool.jpg"),
  courtyard: asset("/images/courtyard.jpg"),
  office: asset("/images/office.jpg"),
  lobby: asset("/images/lobby.jpg"),
  reception: asset("/images/reception.jpg"),
  lounge: asset("/images/lounge.jpg"),
  marble: asset("/images/marble.jpg"),
  apartment: asset("/images/apartment.jpg"),
  waterside: asset("/images/waterside.jpg"),
};

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Process", "/process"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <Link to="/" className="brand" aria-label="Maison Aveline home">
        <span className="brand-mark">MA</span>
        <span className="brand-text">
          Maison Aveline<small>Interior Architecture</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map(([label, path]) => (
          <NavLink key={path} to={path} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="header-enquire">
        Enquire
      </Link>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <p className="eyebrow">Explore the studio</p>
          {nav.map(([label, path], i) => (
            <NavLink key={path} to={path}>
              <span>0{i + 1}</span>
              {label}
            </NavLink>
          ))}
          <div className="mobile-contact">
            Dubai · Milan · London
            <br />
            +971 4 555 0187
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-monogram">MA</div>
          <p>
            Creating deeply personal interiors
            <br />
            of enduring beauty.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Navigate</span>
            {nav.slice(1).map(([n, p]) => (
              <Link key={p} to={p}>
                {n}
              </Link>
            ))}
          </div>
          <div>
            <span>Studios</span>
            <p>
              Dubai Design District
              <br />
              Mayfair, London
              <br />
              Brera, Milan
            </p>
          </div>
          <div>
            <span>Connect</span>
            <a href="mailto:studio@maisonaveline.com">studio@maisonaveline.com</a>
            <a href="tel:+97145550187">+971 4 555 0187</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Maison Aveline</span>
        <span>Privacy · Terms</span>
        <div>
          <a href="#" aria-label="Instagram">
            IG
          </a>
          <a href="#" aria-label="LinkedIn">
            IN
          </a>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function SectionHead({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </Reveal>
  );
}

function PageHero({
  kicker,
  title,
  image,
  align = "left",
}: {
  kicker: string;
  title: string;
  image: string;
  align?: "left" | "center";
}) {
  return (
    <section className={`page-hero ${align}`}>
      <img src={image} alt="" />
      <div className="hero-shade" />
      <div className="page-hero-content">
        <p className="eyebrow light">{kicker}</p>
        <h1>{title}</h1>
      </div>
      <ArrowDown className="hero-arrow" size={22} />
    </section>
  );
}

function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="arrow-link" to={to}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}

const projects = [
  {
    title: "Villa Élan",
    location: "Emirates Hills, Dubai",
    category: "Residential",
    image: img.hero,
  },
  {
    title: "Casa Lucente",
    location: "Lake Como, Italy",
    category: "Residential",
    image: img.waterside,
  },
  { title: "The Aurelia", location: "Mayfair, London", category: "Hospitality", image: img.lobby },
  {
    title: "Al Noor Residence",
    location: "Palm Jumeirah, Dubai",
    category: "Residential",
    image: img.villa,
  },
  { title: "Atelier One", location: "DIFC, Dubai", category: "Commercial", image: img.office },
  { title: "Palazzo Brera", location: "Milan, Italy", category: "Hospitality", image: img.dining },
  {
    title: "Serene Penthouse",
    location: "Knightsbridge, London",
    category: "Residential",
    image: img.apartment,
  },
  { title: "Maison N", location: "Jumeirah Bay, Dubai", category: "Residential", image: img.cream },
];

function Home() {
  return (
    <>
      <section className="home-hero">
        <img src={img.hero} alt="Sculptural luxury living room by Maison Aveline" />
        <div className="hero-shade" />
        <div className="home-hero-content">
          <p className="eyebrow light">Dubai · Milan · London</p>
          <h1>
            Spaces That
            <br />
            <em>Tell Your Story</em>
          </h1>
          <p>Interior architecture for exceptional residences and destinations.</p>
          <ArrowLink to="/projects">Discover our work</ArrowLink>
        </div>
        <div className="hero-side">
          Scroll to explore <span />
        </div>
      </section>

      <section className="intro editorial-grid">
        <div className="number">01</div>
        <Reveal className="intro-title">
          <p className="eyebrow">The studio</p>
          <h2>We create spaces of quiet confidence and lasting soul.</h2>
        </Reveal>
        <Reveal className="intro-copy">
          <p>
            Maison Aveline is an international interior architecture studio shaping refined, deeply
            personal environments. We unite European craftsmanship with a distinctly modern
            sensibility.
          </p>
          <ArrowLink to="/about">Our story</ArrowLink>
        </Reveal>
      </section>

      <section className="featured-section">
        <SectionHead kicker="Selected portfolio" title="Homes with a sense of place" />
        <div className="featured-grid">
          {projects.slice(0, 3).map((p, i) => (
            <Link
              to="/projects/al-noor-residence"
              className={`project-tile tile-${i + 1}`}
              key={p.title}
            >
              <div className="image-wrap">
                <img src={p.image} alt={`${p.title}, ${p.location}`} />
              </div>
              <div>
                <p>{p.location}</p>
                <h3>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="center-link">
          <ArrowLink to="/projects">View all projects</ArrowLink>
        </div>
      </section>

      <section className="services-dark">
        <SectionHead
          kicker="What we do"
          title="A complete design journey"
          copy="From the first sketch to the final placement, every decision is considered and every detail resolved."
        />
        <div className="service-list">
          {[
            "Interior Architecture",
            "Interior Design",
            "Bespoke Furniture",
            "Turnkey Delivery",
          ].map((s, i) => (
            <Link to="/services" key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <Quote size={28} strokeWidth={1} />
        <blockquote>
          “Aveline understood that true luxury is not about excess. It is about how a space makes
          you feel, every single day.”
        </blockquote>
        <p>Private Client · Emirates Hills</p>
      </section>

      <section className="split-cta">
        <div className="split-image">
          <img src={img.cream} alt="Quietly luxurious cream interior" />
        </div>
        <div className="split-content">
          <p className="eyebrow">Begin a conversation</p>
          <h2>
            Let’s create something <em>extraordinary.</em>
          </h2>
          <p>Tell us about your vision, and discover what is possible.</p>
          <Link to="/contact" className="button-gold">
            Book a consultation <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero
        kicker="Our story"
        title="The art of living, beautifully considered."
        image={img.courtyard}
      />
      <section className="story-section editorial-grid">
        <div className="number">02</div>
        <Reveal className="intro-title">
          <p className="eyebrow">Maison Aveline</p>
          <h2>Born from a belief that interiors should be felt, not simply seen.</h2>
        </Reveal>
        <Reveal className="intro-copy">
          <p>
            Founded in Dubai and shaped by years in Milan and London, our studio brings a global
            perspective to every commission. We design with restraint, warmth and an uncompromising
            eye for detail.
          </p>
          <p>
            Our work is defined not by a signature style, but by an enduring atmosphere—spaces that
            feel inevitable, intimate and entirely their own.
          </p>
        </Reveal>
      </section>
      <section className="founder">
        <div className="founder-image">
          <img src={img.founder} alt="Aveline Laurent, founder and creative director" />
        </div>
        <Reveal className="founder-copy">
          <p className="eyebrow">Founder & Creative Director</p>
          <h2>Aveline Laurent</h2>
          <p>
            “My role is to listen deeply—to the client, to the architecture and to the spirit of a
            place. The most beautiful rooms emerge when all three are in harmony.”
          </p>
          <div className="signature">Aveline</div>
        </Reveal>
      </section>
      <section className="values">
        <SectionHead kicker="Our philosophy" title="What guides us" />
        <div className="value-grid">
          {[
            [
              "01",
              "Timeless over trend",
              "We design for longevity, selecting forms and materials that grow more beautiful with time.",
            ],
            [
              "02",
              "Personal, always",
              "Every project begins with your story. No formula, no repetition—only an authentic response.",
            ],
            [
              "03",
              "The poetry of detail",
              "From a shadow line to a hand-stitched seam, refinement lives in the smallest decisions.",
            ],
            [
              "04",
              "Craft without compromise",
              "We collaborate with exceptional makers who share our reverence for material and process.",
            ],
          ].map((v) => (
            <Reveal className="value-card" key={v[0]}>
              <span>{v[0]}</span>
              <h3>{v[1]}</h3>
              <p>{v[2]}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="image-manifesto">
        <img src={img.hands} alt="Designer selecting materials and reviewing plans" />
        <div>
          <p className="eyebrow light">Our approach</p>
          <h2>
            Intuition, rigour
            <br />
            and a little magic.
          </h2>
          <ArrowLink to="/process">Explore our process</ArrowLink>
        </div>
      </section>
    </>
  );
}

const serviceItems = [
  [
    "Private Residences",
    "Villas & Estates",
    "Immersive homes shaped around the rituals, collections and aspirations of the people who inhabit them.",
    img.hero,
  ],
  [
    "Urban Living",
    "Apartments & Penthouses",
    "Sophisticated city homes where precision planning meets warmth, comfort and effortless function.",
    img.apartment,
  ],
  [
    "Destination Design",
    "Hospitality & Hotels",
    "Memorable guest experiences with a distinct sense of place, from boutique retreats to landmark hotels.",
    img.reception,
  ],
  [
    "Workplace",
    "Offices & Commercial",
    "Cultivated workplaces and commercial environments that express identity and inspire connection.",
    img.office,
  ],
];

function Services() {
  return (
    <>
      <PageHero kicker="Our expertise" title="Design without compromise." image={img.lobby} />
      <section className="service-intro">
        <p className="eyebrow">A complete studio</p>
        <h2>
          From architecture to the final art placement, we deliver spaces of exceptional coherence.
        </h2>
      </section>
      <section className="service-editorial">
        {serviceItems.map((s, i) => (
          <article className={i % 2 ? "reverse" : ""} key={s[1]}>
            <div className="service-photo">
              <img src={s[3]} alt={`${s[1]} interior`} />
            </div>
            <Reveal className="service-body">
              <span>0{i + 1}</span>
              <p className="eyebrow">{s[0]}</p>
              <h2>{s[1]}</h2>
              <p>{s[2]}</p>
              <ArrowLink to="/contact">Discuss your project</ArrowLink>
            </Reveal>
          </article>
        ))}
      </section>
      <section className="capabilities">
        <SectionHead kicker="Capabilities" title="Every layer, expertly resolved" />
        <div>
          {[
            "Turnkey Interiors",
            "Space Planning",
            "Interior Architecture",
            "3D Visualisation",
            "Lighting Design",
            "Bespoke Joinery",
            "FF&E Curation",
            "Art & Accessories",
          ].map((x, i) => (
            <span key={x}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {x}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  return (
    <>
      <section className="projects-title">
        <p className="eyebrow">Selected work · 2018—2026</p>
        <h1>
          Spaces with
          <br />
          <em>a story to tell.</em>
        </h1>
      </section>
      <div className="filters" role="group" aria-label="Filter projects">
        {["All", "Residential", "Hospitality", "Commercial"].map((f) => (
          <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>
            {f}
          </button>
        ))}
      </div>
      <section className="portfolio-grid">
        {filtered.map((p, i) => (
          <Link
            to="/projects/al-noor-residence"
            className={`portfolio-card card-${i % 4}`}
            key={p.title}
          >
            <div className="image-wrap">
              <img src={p.image} alt={`${p.title} interior project`} />
              <span className="view-circle">View</span>
            </div>
            <div>
              <h2>{p.title}</h2>
              <p>
                {p.location} · {p.category}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

function ProjectDetail() {
  return (
    <>
      <section className="project-detail-hero">
        <img src={img.villa} alt="Al Noor Residence villa exterior" />
        <div className="hero-shade" />
        <div>
          <Link to="/projects">
            <ArrowLeft size={16} /> All projects
          </Link>
          <p className="eyebrow light">Palm Jumeirah · Dubai</p>
          <h1>
            Al Noor
            <br />
            Residence
          </h1>
        </div>
      </section>
      <section className="project-meta">
        <div>
          <span>Type</span>
          <p>Private Residence</p>
        </div>
        <div>
          <span>Scope</span>
          <p>Architecture · Interiors · Styling</p>
        </div>
        <div>
          <span>Area</span>
          <p>18,500 sq ft</p>
        </div>
        <div>
          <span>Completed</span>
          <p>2025</p>
        </div>
      </section>
      <section className="concept editorial-grid">
        <div className="number">01</div>
        <div className="intro-title">
          <p className="eyebrow">The concept</p>
          <h2>Desert light, distilled into a home.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Al Noor is conceived as a sanctuary of tonal calm. Monumental forms are softened by
            tactile linens, hand-finished plaster and the gentle movement of filtered light.
          </p>
          <p>
            The palette draws from the UAE landscape: limestone, pale oak, warm bronze and the dusky
            rose of the evening sky.
          </p>
        </div>
      </section>
      <section className="detail-gallery">
        <img className="wide" src={img.hero} alt="Al Noor formal living room" />
        <img src={img.marble} alt="Bespoke marble coffee tables" />
        <img src={img.kitchen} alt="Sculptural kitchen island" />
      </section>
      <section className="materials">
        <div>
          <p className="eyebrow">Material language</p>
          <h2>
            Quietly tactile.
            <br />
            Naturally refined.
          </h2>
        </div>
        <div className="material-list">
          {[
            "Travertine",
            "Smoked oak",
            "Patinated brass",
            "Bouclé & linen",
            "Hand-blown glass",
          ].map((m, i) => (
            <p key={m}>
              <span>0{i + 1}</span>
              {m}
            </p>
          ))}
        </div>
      </section>
      <section className="detail-gallery second">
        <img src={img.dark} alt="Intimate evening lounge" />
        <img src={img.cream} alt="Soft neutral family room" />
        <img className="wide" src={img.courtyard} alt="Serene private courtyard" />
      </section>
      <section className="next-project">
        <p className="eyebrow">Next project</p>
        <Link to="/projects">
          <span>Casa Lucente</span>
          <ArrowRight />
        </Link>
      </section>
    </>
  );
}

const stages = [
  [
    "01",
    "Private Consultation",
    "We begin with a considered conversation about your life, ambitions, timeline and the feeling you wish to create.",
  ],
  [
    "02",
    "Discovery & Brief",
    "We study the architecture, context and practical needs, translating every insight into a precise creative brief.",
  ],
  [
    "03",
    "Concept Direction",
    "Mood, materiality and spatial ideas come together in a distinctive narrative for your project.",
  ],
  [
    "04",
    "Design Development",
    "Plans, elevations, lighting and bespoke details are refined into one fully resolved design language.",
  ],
  [
    "05",
    "Visualisation",
    "Cinematic 3D imagery allows you to experience the design before a single piece is made.",
  ],
  [
    "06",
    "Sourcing & Craft",
    "We commission artisans, select finishes and curate furniture, art, lighting and objects from around the world.",
  ],
  [
    "07",
    "Realisation",
    "Our team coordinates contractors and makers, rigorously overseeing quality, programme and every installation.",
  ],
  [
    "08",
    "Final Handover",
    "The final layer is composed, every detail perfected, and your finished home is revealed.",
  ],
];

function Process() {
  return (
    <>
      <PageHero
        kicker="How we work"
        title="A considered journey, beautifully managed."
        image={img.hands}
      />
      <section className="process-intro">
        <p className="eyebrow">From vision to reality</p>
        <h2>A rigorous process designed to feel effortless.</h2>
        <p>
          We bring clarity and calm to complex projects, guiding you through every decision with
          transparency, expertise and care.
        </p>
      </section>
      <section className="process-list">
        {stages.map((s, i) => (
          <article key={s[0]}>
            <div className="process-number">{s[0]}</div>
            <div>
              <p>Stage {s[0]}</p>
              <h2>{s[1]}</h2>
            </div>
            <p>{s[2]}</p>
            <span className="stage-line" style={{ "--i": i } as CSSProperties} />
          </article>
        ))}
      </section>
      <section className="process-image">
        <img src={img.marble} alt="Material details in the design process" />
        <div>
          <p className="eyebrow light">The Aveline promise</p>
          <h2>
            One studio.
            <br />
            One vision.
            <br />
            Every detail.
          </h2>
        </div>
      </section>
    </>
  );
}

const articles = [
  [
    "Perspective",
    "The New Language of Quiet Luxury",
    "Why the most compelling interiors are moving beyond display toward depth, craft and emotional resonance.",
    img.cream,
    "8 min read",
  ],
  [
    "Materials",
    "The Enduring Poetry of Natural Stone",
    "From honed travertine to richly veined marble, we explore materiality that only improves with age.",
    img.marble,
    "6 min read",
  ],
  [
    "Lighting",
    "Sculpting Atmosphere With Light",
    "How layered illumination transforms volume, texture and the way we experience a room after dusk.",
    img.lobby,
    "5 min read",
  ],
  [
    "Architecture",
    "Living With the Landscape",
    "A new generation of villas dissolves the line between interior and nature.",
    img.pool,
    "7 min read",
  ],
  [
    "Travel",
    "A Designer’s Guide to Milan",
    "The hidden courtyards, galleries and ateliers that continue to shape our creative world.",
    img.dining,
    "9 min read",
  ],
  [
    "Studio Notes",
    "Inside the Making of Al Noor",
    "A close look at the artisans, materials and decisions behind our Palm Jumeirah residence.",
    img.hands,
    "10 min read",
  ],
];

function Journal() {
  return (
    <>
      <section className="journal-head">
        <p className="eyebrow">The journal</p>
        <h1>
          Ideas, objects
          <br />& <em>inspiration.</em>
        </h1>
        <p>Notes on design, architecture, craft and the art of considered living.</p>
      </section>
      <section className="journal-feature">
        <div className="image-wrap">
          <img src={articles[0][3]} alt="Quiet luxury interior" />
        </div>
        <div>
          <p className="eyebrow">{articles[0][0]}</p>
          <h2>{articles[0][1]}</h2>
          <p>{articles[0][2]}</p>
          <span>{articles[0][4]}</span>
          <a href="#article">
            Read the story <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section className="article-grid" id="article">
        {articles.slice(1).map((a) => (
          <article key={a[1]}>
            <div className="image-wrap">
              <img src={a[3]} alt={a[1]} />
            </div>
            <p className="eyebrow">
              {a[0]} · {a[4]}
            </p>
            <h2>{a[1]}</h2>
            <p>{a[2]}</p>
            <a href="#article">
              Read article <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </section>
      <section className="newsletter">
        <p className="eyebrow">A considered edit</p>
        <h2>Join our private journal.</h2>
        <p>Occasional stories, studio news and places that inspire us.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Your email address"
            aria-label="Email address"
          />
          <button aria-label="Subscribe">
            <ArrowRight />
          </button>
        </form>
      </section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="contact-page">
      <div className="contact-aside">
        <img src={img.waterside} alt="Elegant residence overlooking the landscape" />
        <div className="hero-shade" />
        <div>
          <p className="eyebrow light">Begin a conversation</p>
          <h1>
            Let’s create
            <br />
            something
            <br />
            <em>remarkable.</em>
          </h1>
          <p>
            We accept a limited number of commissions each year to ensure the highest level of
            creative attention.
          </p>
        </div>
      </div>
      <div className="contact-form-wrap">
        {sent ? (
          <div className="success">
            <span>
              <Check />
            </span>
            <p className="eyebrow">Thank you</p>
            <h2>Your story begins here.</h2>
            <p>
              Our studio will be in touch within two working days to arrange a private consultation.
            </p>
            <button onClick={() => setSent(false)} className="text-button">
              Submit another enquiry
            </button>
          </div>
        ) : (
          <>
            <div className="contact-form-head">
              <p className="eyebrow">Private consultation</p>
              <h2>Tell us about your project.</h2>
              <p>
                Share a few details below and a member of our studio will contact you personally.
              </p>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <label>
                <span>Your name *</span>
                <input required name="name" placeholder="Full name" />
              </label>
              <label>
                <span>Email address *</span>
                <input required type="email" name="email" placeholder="you@email.com" />
              </label>
              <label>
                <span>Phone number</span>
                <input name="phone" placeholder="+971" />
              </label>
              <label>
                <span>Project location *</span>
                <input required name="location" placeholder="City, country" />
              </label>
              <label>
                <span>Property type *</span>
                <select required defaultValue="">
                  <option value="" disabled>
                    Select type
                  </option>
                  <option>Villa / Estate</option>
                  <option>Apartment / Penthouse</option>
                  <option>Hospitality</option>
                  <option>Office / Commercial</option>
                </select>
                <ChevronDown />
              </label>
              <label>
                <span>Estimated budget *</span>
                <select required defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  <option>$250k — $500k</option>
                  <option>$500k — $1m</option>
                  <option>$1m — $3m</option>
                  <option>$3m+</option>
                </select>
                <ChevronDown />
              </label>
              <label className="full">
                <span>Tell us about your vision</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Property details, aspirations, timeline..."
                />
              </label>
              <button className="submit-button" type="submit">
                Send enquiry <ArrowRight size={17} />
              </button>
            </form>
            <div className="contact-details">
              <div>
                <MapPin />
                <span>
                  Dubai Design District
                  <br />
                  Building 7, Dubai, UAE
                </span>
              </div>
              <div>
                <Mail />
                <a href="mailto:studio@maisonaveline.com">studio@maisonaveline.com</a>
              </div>
              <div>
                <Phone />
                <a href="https://wa.me/97145550187">WhatsApp +971 4 555 0187</a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>This room is yet to be designed.</h1>
      <ArrowLink to="/">Return home</ArrowLink>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "projects", Component: Projects },
      { path: "projects/al-noor-residence", Component: ProjectDetail },
      { path: "process", Component: Process },
      { path: "journal", Component: Journal },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, "") });
