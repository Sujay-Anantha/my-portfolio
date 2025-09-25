"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Moon, Sun, Link as LinkIcon, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ---------- CONFIG: Edit this data to personalize ----------
const PROFILE = {
  name: "Sujay Anantha",
  title: "Machine Learning Engineer · Data Scientist",
  blurb:
    "I build ML products end‑to‑end: data pipelines, training, and delightful UX. Previously at Example Co; MS @ NYU.",
  location: "Virginia, USA",
  email: "ananthasujay@gmail.com",
  resumeUrl: "/resume.pdf", // put a real file in /public
  socials: {
    github: "https://github.com/Sujay-Anantha",
    linkedin: "https://www.linkedin.com/in/sujay-anantha-1799961b0/",
  },
};

const SKILLS = [
  "Python", "PyTorch", "TensorFlow", "Hugging Face", "RAG", "LLMs",
  "AWS (SageMaker, Lambda, Glue)", "GCP", "Spark", "Airflow", "SQL", "dbt",
  "Next.js", "TypeScript", "Tailwind", "Docker", "CI/CD",
];

const PROJECTS = [
  {
    title: "Paper Summarizer",
    desc: "Summarizes arXiv/DOI papers via OA fetch + Workers AI. Caching + JSON-mode UI.",
    tags: ["Next.js", "Workers AI", "LLM", "arXiv"],
    link: "https://example.com/demo",
    repo: "https://github.com/yourhandle/paper-summarizer",
  },
  {
    title: "Fraud Detection @ Scale",
    desc: "Spark + XGBoost on 180M transactions; feature store; real-time scoring API.",
    tags: ["Spark", "ML", "MLOps", "AWS"],
    link: "https://example.com/case-study",
    repo: "https://github.com/yourhandle/fraud-ml",
  },
  {
    title: "GNN Benchmarks",
    desc: "Node classification suite; tracked with MLflow; GPU tuning for 35% speedup.",
    tags: ["PyTorch", "GNN", "MLflow"],
    link: "https://example.com/gnn",
    repo: "https://github.com/yourhandle/gnn-bench",
  },
];

const EXPERIENCE = [
  {
    org: "Example Co.",
    role: "ML Engineer",
    date: "2024 — Present",
    points: [
      "Shipped RAG pipeline (25% faster retrieval, 0.12 MRR gain).",
      "Deployed models on SageMaker with CI/CD, blue‑green rollout.",
    ],
  },
  {
    org: "NYU VIP M&A",
    role: "Machine Learning Engineer",
    date: "2023 — 2024",
    points: [
      "Built GNN benchmarking; improved selection accuracy 20%.",
      "ETL with Pandas/Spark; pipeline runtime −50%.",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They turned ambiguous research into a production ML service in weeks.",
    name: "CTO, Example Co.",
  },
  { quote: "Phenomenal attention to data quality and tooling.", name: "PM, FinTech" },
];
// -----------------------------------------------------------

function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, setDark };
}

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-14">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">{title}</h2>
      {children}
    </div>
  </section>
);

export default function PortfolioSite() {
  const { dark, setDark } = useDarkMode();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [tix, setTix] = useState(0);

  const filtered = useMemo(() => {
    return PROJECTS.filter(p =>
      (!tag || p.tags.includes(tag)) &&
      (q.trim().length === 0 || (p.title + " " + p.desc + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, tag]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#hero" className="font-bold tracking-tight">{PROFILE.name}</a>
          <nav className="hidden md:flex gap-4 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
              {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </Button>
            <Button asChild>
              <a href={PROFILE.resumeUrl} download>
                <Download className="h-4 w-4 mr-2"/> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.5}}
              className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {PROFILE.title}
            </motion.h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{PROFILE.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-2"/> GitHub</a>
              </Button>
              <Button asChild variant="secondary">
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 mr-2"/> LinkedIn</a>
              </Button>
              <Button asChild>
                <a href={`mailto:${PROFILE.email}`}><Mail className="h-4 w-4 mr-2"/> Contact</a>
              </Button>
            </div>
          </div>
          <Card className="border border-black/5 dark:border-white/10">
            <CardHeader>
              <CardTitle>Quick Intro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>Location:</strong> {PROFILE.location}</p>
              <p>
                I enjoy building <em>useful</em> AI features with measurable impact—latency, quality, and UX.
                Scroll for selected work and a contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4"/>
            <div className="flex gap-2 flex-wrap">
              {([null, ...new Set(PROJECTS.flatMap(p => p.tags))] as (string|null)[]).map(t => (
                <Button key={t ?? "all"} variant={t===tag?"default":"outline"} size="sm" onClick={() => setTag(t)}>
                  {t ?? "All"}
                </Button>
              ))}
            </div>
          </div>
          <div className="md:w-72">
            <Input placeholder="Search projects (tech, title, desc)" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.title} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.05}}>
              <Card className="h-full border border-black/5 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="secondary" size="sm"><a href={p.link} target="_blank" rel="noreferrer"><LinkIcon className="h-4 w-4 mr-1"/> Live</a></Button>
                    <Button asChild variant="outline" size="sm"><a href={p.repo} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-1"/> Code</a></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span key={s} className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10">{s}</span>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="relative pl-6">
              <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-indigo-500"/>
              <h3 className="font-semibold">{e.role} · {e.org} <span className="text-sm text-slate-500 dark:text-slate-400">({e.date})</span></h3>
              <ul className="list-disc ml-5 text-sm text-slate-700 dark:text-slate-300">
                {e.points.map((p, j) => (<li key={j} className="mt-1">{p}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" title="Testimonials">
        <Card className="border border-black/5 dark:border-white/10">
          <CardContent className="py-6">
            <div className="flex items-start justify-between gap-6">
              <p className="text-lg md:text-xl">“{TESTIMONIALS[tix].quote}”
                <span className="block mt-2 text-sm text-slate-500 dark:text-slate-400">— {TESTIMONIALS[tix].name}</span>
              </p>
              <div className="whitespace-nowrap flex gap-2">
                <Button variant="outline" size="sm" onClick={()=>setTix((tix-1+TESTIMONIALS.length)%TESTIMONIALS.length)}>Prev</Button>
                <Button variant="outline" size="sm" onClick={()=>setTix((tix+1)%TESTIMONIALS.length)}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <Card className="border border-black/5 dark:border-white/10">
          <CardContent className="py-6">
            <form
              className="grid md:grid-cols-2 gap-3"
              action="https://formspree.io/f/yourFormId" // replace with your Formspree ID for a free backend
              method="POST"
            >
              <Input name="name" placeholder="Your name" required />
              <Input type="email" name="email" placeholder="Your email" required />
              <Textarea className="md:col-span-2" name="message" placeholder="Your message" required />
              <div className="md:col-span-2 flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">Or email me: <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>

      <footer className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {PROFILE.name} · Built with Next.js, Tailwind, and shadcn/ui
      </footer>

      {/* Tailwind base scaffold (ignored if your app already has globals.css) */}
      <style>{`
        :root { color-scheme: light dark; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
