import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  Twitter,
  X,
} from "lucide-react";
import { portfolio } from "./data/portfolio";

const navItems = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
          <span className="brand-mark">&lt;/&gt;</span>
          <span>{portfolio.name}</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <a
  className="nav-cta"
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kichahfavour75@gmail.com&su=Portfolio%20Contact"
  target="_blank"
  rel="noreferrer"
>
  Let's talk <ArrowUpRight size={15} />
</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Toggle theme" onClick={() => setDark((v) => !v)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="menu-button icon-button" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="availability"><span /> {portfolio.availability}</div>
            <p className="hero-kicker">Hello, I'm</p>
            <h1>{portfolio.name}<span>.</span></h1>
            <h2>{portfolio.role}</h2>
            <p className="hero-description">{portfolio.bio}</p>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo("projects")}>
                View my work <ArrowUpRight size={18} />
              </button>
              <a className="secondary-button" href={portfolio.resume} download>
                <Download size={17} /> Download CV
              </a>
            </div>

            <div className="social-row">
              <a href={portfolio.social.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
              <a href={portfolio.social.twitter} target="_blank" rel="noreferrer">< Twitter size={18} /> Twitter</a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="portrait-frame">
              <div className="portrait-glow" />
              <img src={portfolio.profileImage} alt={`${portfolio.name} profile`} />
            </div>
          </motion.div>
        </section>

        <section id="about" className="section">
          <SectionHeading eyebrow="01 / About" title={portfolio.about.title} text="A little more about me, my approach, and what I care about." />
          <div className="about-grid">
            <div className="about-copy">
              {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="stats">
                <div><strong>01+</strong><span>Years building</span></div>
                <div><strong>10+</strong><span>Projects</span></div>
                <div><strong>∞</strong><span>Curiosity</span></div>
              </div>
            </div>
            <div className="principles">
              {["Clean, maintainable code", "Responsive by default", "Accessible user experiences", "Continuous learning"].map((item) => (
                <div className="principle" key={item}><CheckCircle2 size={19} /><span>{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section muted-section">
          <SectionHeading eyebrow="02 / Skills" title="Tools I use to turn ideas into products." />
          <div className="skills-grid">
            {["Frontend", "Backend", "Tools"].map((category) => (
              <div className="skill-card" key={category}>
                <div className="skill-icon"><Code2 size={22} /></div>
                <h3>{category}</h3>
                <div className="skill-list">
                  {portfolio.skills.filter((skill) => skill.category === category).map((skill) => (
                    <div className="skill-item" key={skill.name}>
                      <span>{skill.name}</span><small>{skill.level}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading eyebrow="03 / Experience" title="Where I've contributed." />
          <div className="timeline">
            {portfolio.experience.map((job) => (
              <motion.article className="timeline-item" key={`${job.company}-${job.period}`} whileInView={{ opacity: [0, 1], x: [-12, 0] }} viewport={{ once: true }}>
                <div className="timeline-dot" />
                <div className="timeline-meta"><span>{job.period}</span><span>{job.company}</span></div>
                <div className="timeline-content">
                  <h3>{job.role}</h3>
                  <p>{job.description}</p>
                  <ul>{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section muted-section">
          <SectionHeading eyebrow="04 / Selected work" title="Projects I'm proud of." text="A selection of projects showcasing my experience building modern, responsive, and practical web applications." />
          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <motion.article className="project-card" key={project.title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <div className="project-image">
                  <img src={project.image} alt="" />
                  <span>0{index + 1}</span>
                </div>
                <div className="project-body">
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>
                    <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={16} /></a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <SectionHeading eyebrow="05 / Education" title="Education & certifications." />
          <div className="education-grid">
            <div>
              {portfolio.education.map((item) => (
                <article className="education-card" key={item.institution}>
                  <span className="card-label">{item.period}</span>
                  <h3>{item.qualification}</h3>
                  <strong>{item.institution}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="cert-card">
              <span className="card-label">CERTIFICATIONS</span>
              {portfolio.certifications.map((cert) => <div className="cert-item" key={cert}><CheckCircle2 size={18} />{cert}</div>)}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div>
              <span className="eyebrow">06 / Contact</span>
              <h2>Let's build something useful.</h2>
              <p>Have a project, opportunity, or role in mind? Send me a message and I'll get back to you.</p>
            </div>
            <a
  className="primary-button"
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kichahfavour75@gmail.com&su=Portfolio%20Contact"
  target="_blank"
  rel="noreferrer"
>
  Get in touch <ArrowUpRight size={18} />
</a>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span>
        <span>Built with React + TypeScript</span>
      </footer>
    </div>
  );
}