"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  Mail,
  Download,
  Shield,
  FileCode,
  Gauge,
  Briefcase,
  Play,
  CheckCircle,
  Clock,
  Code2,
  Award
} from "lucide-react";

// Synchronized Background Videos
import { ScrollVideoSync } from "@/components/layouts/scroll-video-sync";

// Dynamic Client-side imports to optimize Core Web Vitals (No SSR for Canvas/Telemetries)
const SkillGraph = dynamic(() => import("@/components/canvas/skill-graph").then((mod) => mod.SkillGraph), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full glass-panel rounded-2xl flex items-center justify-center text-zinc-500 animate-pulse">
      Initialising 3D Skill Graph...
    </div>
  ),
});

const ArchitectureDiagram = dynamic(() => import("@/components/panels/architecture-diagram").then((mod) => mod.ArchitectureDiagram), {
  ssr: false,
});

const GithubHeatmap = dynamic(() => import("@/components/panels/github-heatmap").then((mod) => mod.GithubHeatmap), {
  ssr: false,
});

const PipelineVisualizer = dynamic(() => import("@/components/panels/pipeline-visualizer").then((mod) => mod.PipelineVisualizer), {
  ssr: false,
});

const ChatPanel = dynamic(() => import("@/components/chat-bot/chat-panel").then((mod) => mod.ChatPanel), {
  ssr: false,
});

// Structured datasets
import { projectsData, Project } from "@/data/projects";
import { timelineData, codingStatsData } from "@/data/timeline";

// Local Custom SVG Brand Icons since they are omitted in standard lucide builds
function Github({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(projectsData[0]);
  const [projectTab, setProjectTab] = useState<"architecture" | "code" | "performance" | "docs">("architecture");

  // Smooth scroll helper to section ID
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Cinematic Video Layer */}
      <ScrollVideoSync />

      {/* Global Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("section-hero")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center font-bold text-black text-sm">
            RK
          </div>
          <span className="font-extrabold tracking-widest text-sm uppercase hidden sm:inline">RASHMI KUMARI</span>
        </div>

        <nav className="flex items-center gap-6 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          <button onClick={() => scrollToSection("section-journey")} className="hover:text-white transition-colors">
            Journey
          </button>
          <button onClick={() => scrollToSection("section-projects")} className="hover:text-white transition-colors">
            Projects
          </button>
          <button onClick={() => scrollToSection("section-certifications")} className="hover:text-white transition-colors">
            Credentials
          </button>
          <button
            onClick={() => {
              setRecruiterMode(!recruiterMode);
              scrollToSection("section-journey");
            }}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              recruiterMode
                ? "bg-primary/20 border-primary text-primary glow-text-purple"
                : "border-white/10 hover:border-white/30 text-white"
            }`}
          >
            Recruiter Mode {recruiterMode ? "ON" : "OFF"}
          </button>
        </nav>
      </header>

      {/* SECTION 1: HERO INTRODUCTION */}
      <section
        id="section-hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 pt-20"
      >
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Available for full-time roles — 2026 Graduate</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Rashmi Kumari
          </h1>
          
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-cyan-400 glow-text-cyan">
            Cybersecurity &amp; AI/ML Engineer
          </h2>

          <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
            Final-year Computer Science B.Tech student at Government Engineering College, West Champaran (CGPA: 8.2/10), specializing in network security, custom packet scanners, and AI-driven classification models.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection("section-projects")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase hover:bg-zinc-200 transition-all"
            >
              <span>Inspect Codebases</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRecruiterMode(true);
                scrollToSection("section-journey");
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 hover:border-white/35 font-extrabold text-xs uppercase text-white transition-all"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Enter Recruiter Cockpit</span>
            </button>
          </div>
        </div>

        {/* Floating visual anchors */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer" onClick={() => scrollToSection("section-journey")}>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Scroll to descend</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* SECTION 2: ENGINEERING JOURNEY / COCKPIT */}
      <section
        id="section-journey"
        className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black/60 backdrop-blur-md border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section title */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase">Core Telemetry</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
                {recruiterMode ? "Engineering Cockpit" : "Professional Journey"}
              </h2>
            </div>
            
            {/* Interactive Toggle for Recruiter Mode */}
            <div className="flex items-center gap-3 bg-zinc-900/60 border border-white/10 px-4 py-2 rounded-full">
              <span className="text-xs text-zinc-400 font-medium">Recruiter Insights Mode</span>
              <button
                onClick={() => setRecruiterMode(!recruiterMode)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  recruiterMode ? "bg-primary" : "bg-zinc-800"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    recruiterMode ? "transform translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* RECRUITER MODE: TELEMETRY DASHBOARD */}
          {recruiterMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Col 1 & 2: Main Telemetry Panels */}
              <div className="lg:col-span-2 space-y-8">
                {/* Real-time stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Internships Completed</span>
                    <p className="text-2xl font-black text-white mt-1">6+</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">B.Tech CGPA</span>
                    <p className="text-2xl font-black text-cyan-400 glow-text-cyan mt-1">8.2 / 10</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Git Commits</span>
                    <p className="text-2xl font-black text-white mt-1">{codingStatsData.commitsCount}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Test Coverage</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">{codingStatsData.testCoverage}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Lines Written</span>
                    <p className="text-2xl font-black text-white mt-1">{codingStatsData.linesWritten}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">PRs Merged</span>
                    <p className="text-2xl font-black text-purple-400 mt-1">{codingStatsData.prMerged}</p>
                  </div>
                </div>

                {/* Pipeline visualizer */}
                <PipelineVisualizer />

                {/* Github Contribution Heatmap */}
                <GithubHeatmap />
              </div>

              {/* Col 3: 3D interactive Skill mesh */}
              <div className="space-y-6">
                <div className="glass-panel p-4 rounded-xl border border-white/5">
                  <h4 className="text-sm font-bold text-zinc-300">3D Interactive Technology Graph</h4>
                  <p className="text-xs text-zinc-500 mt-1 mb-4 leading-normal">
                    Rotate, scroll, or hover over technology clusters to explore integration pathways and system architecture layouts.
                  </p>
                  <SkillGraph />
                </div>
              </div>
            </div>
          ) : (
            // STANDARD MODE: CINEMATIC ROADMAP & 3D GRAPH
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Timeline Roadmap */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Engineering Milestones
                </h3>

                <div className="relative border-l border-white/10 pl-6 space-y-12">
                  {timelineData.map((item) => (
                    <div key={item.id} className="relative group">
                      {/* Timeline Dot Indicator */}
                      <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-cyan-400 border border-black transition-all" />
                      
                      <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                        {item.year}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{item.role}</h4>
                      <h5 className="text-xs text-cyan-400 font-semibold mt-0.5">{item.company}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Performance Highlights */}
                      <ul className="text-xs text-zinc-500 space-y-1 mt-4 border-t border-white/5 pt-3">
                        {item.metrics.map((metric, mIdx) => (
                          <li key={mIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Skill Graph */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold tracking-tight text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Visual Skill Topology
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hover nodes inside the interactive WebGL Canvas to inspect technical capabilities. Each branch maps direct engineering implementations.
                </p>
                <SkillGraph />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: SYSTEM PROJECTS AND ARCHITECTURES */}
      <section
        id="section-projects"
        className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black/80 backdrop-blur-lg border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="border-b border-white/5 pb-8">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Production Log</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
              Featured Projects
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed mt-2 max-w-xl">
              Inspect full architectural flowcharts, code highlights, and performance diagnostics for real project prototypes.
            </p>
          </div>

          {/* Project List / Grid selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectsData.map((project) => {
              const isActive = activeProject.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    setActiveProject(project);
                    setProjectTab("architecture");
                  }}
                  className={`glass-panel p-5 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? "bg-white/10 border-primary shadow-lg shadow-primary/10"
                      : "bg-white/0 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{project.tagline}</p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[8px] font-bold text-zinc-500">+{project.techStack.length - 3} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE PROJECT INSPECTOR COMPONENT */}
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Top Bar / Navigation Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-6 py-4 bg-zinc-950 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 glow-text-cyan animate-pulse" />
                <h4 className="text-lg font-extrabold text-white">{activeProject.title}</h4>
              </div>

              {/* Inspector Tabs */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <button
                  onClick={() => setProjectTab("architecture")}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    projectTab === "architecture"
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  Architecture Flow
                </button>
                <button
                  onClick={() => setProjectTab("code")}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    projectTab === "code"
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  Code Highlights
                </button>
                <button
                  onClick={() => setProjectTab("performance")}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    projectTab === "performance"
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  Metrics Dashboard
                </button>
                <button
                  onClick={() => setProjectTab("docs")}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    projectTab === "docs"
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  Documentation
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 min-h-[400px]">
              {/* TAB 1: ARCHITECTURE DIAGRAM */}
              {projectTab === "architecture" && (
                <div className="space-y-6">
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                    {activeProject.architecture.description}
                  </p>
                  <ArchitectureDiagram />
                </div>
              )}

              {/* TAB 2: CODE HIGHLIGHTS */}
              {projectTab === "code" && (
                <div className="space-y-6">
                  {activeProject.codeHighlights.map((highlight, idx) => (
                    <div key={idx} className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Source file: {highlight.filename}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                          {highlight.explanation}
                        </p>
                      </div>

                      <div className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden font-mono p-4">
                        <pre className="text-xs text-zinc-300 overflow-x-auto whitespace-pre no-scrollbar leading-relaxed">
                          <code>{highlight.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: PERFORMANCE METRICS */}
              {projectTab === "performance" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Lighthouse Audit circles */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-lg">
                        {activeProject.performance.lighthousePerformance}
                      </div>
                      <span className="text-xs text-zinc-400 font-semibold mt-2">Performance</span>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-lg">
                        {activeProject.performance.lighthouseAccessibility}
                      </div>
                      <span className="text-xs text-zinc-400 font-semibold mt-2">Accessibility</span>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-lg">
                        {activeProject.performance.lighthouseBestPractices}
                      </div>
                      <span className="text-xs text-zinc-400 font-semibold mt-2">Best Practices</span>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-400 text-lg">
                        {activeProject.performance.lighthouseSEO}
                      </div>
                      <span className="text-xs text-zinc-400 font-semibold mt-2">SEO</span>
                    </div>
                  </div>

                  {/* Core Web Vitals details */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-zinc-300">Core Web Vitals Benchmarks</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                        <span className="text-zinc-400">First Contentful Paint (FCP)</span>
                        <span className="font-mono text-emerald-400">{activeProject.performance.fcpMs}ms</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                        <span className="text-zinc-400">Total Load Time</span>
                        <span className="font-mono text-emerald-400">{activeProject.performance.loadTimeMs}ms</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                        <span className="text-zinc-400">Bundle Size (Gzipped)</span>
                        <span className="font-mono text-emerald-400">{activeProject.performance.bundleSizeKb} KB</span>
                      </div>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/25 p-3 rounded-lg flex gap-2.5 items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-emerald-300 leading-normal">
                        Optimized using route chunk splitting, dynamic importing of 3D visual modules, and custom asset CDN distribution layers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DOCUMENTATION */}
              {projectTab === "docs" && (
                <div className="prose prose-invert prose-xs max-w-none text-zinc-300 font-mono leading-relaxed space-y-4">
                  <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 overflow-x-auto text-xs whitespace-pre-wrap leading-relaxed">
                    {activeProject.documentation}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-t border-white/10 text-xs">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white font-semibold transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-primary hover:text-primary-foreground font-semibold transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Live Repository Link</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CERTIFICATIONS & ACHIVEVEMENTS */}
      <section
        id="section-certifications"
        className="py-32 px-6 md:px-12 lg:px-24 bg-black/60 backdrop-blur-md border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="border-b border-white/5 pb-8">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Credentials</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
              Certifications &amp; Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5 flex gap-4 items-start">
              <Award className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Cybersecurity Virtual Simulation</h4>
                <p className="text-[10px] text-zinc-500 uppercase font-semibold mt-0.5">Tata (Forage)</p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Completed defensive simulation projects focusing on asset protection, scanning networks, and configuring IAM rules.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5 flex gap-4 items-start">
              <Award className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Salesforce Developer Internship</h4>
                <p className="text-[10px] text-zinc-500 uppercase font-semibold mt-0.5">Salesforce</p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Earned Developer Virtual Internship credentials validating security customisations, process automations, and APEX script structures.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5 flex gap-4 items-start">
              <Award className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">AI &amp; ML Bootcamp</h4>
                <p className="text-[10px] text-zinc-500 uppercase font-semibold mt-0.5">Kodacy / InternCertify</p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Completed intensive bootcamps focused on Python data science, data preprocessing, classifier evaluations, and feature engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION ENDING */}
      <section
        id="section-cta"
        className="min-h-screen flex flex-col justify-between py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-t from-black via-black/85 to-transparent relative border-t border-white/5"
      >
        <div className="my-auto max-w-3xl space-y-8" id="contact">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Contact</span>
          
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
            Let's build secure &amp; intelligent systems
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed">
            I am actively looking for full-time Cybersecurity and AI/ML roles where I can contribute, learn, and grow. Available from mid-2026. Open to remote &amp; relocation opportunities. Let's talk!
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* Direct Mail */}
            <a
              href="mailto:rashmikumar42005@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase hover:bg-zinc-200 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            {/* Resume download link */}
            <a
              href="/Rashmi_Kumari_blue.pdf"
              download
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 hover:border-white/35 font-extrabold text-xs uppercase text-white transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Footer & Social Profiles */}
        <footer className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/RashmiKumari13"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/-rashmikumari-gj261"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-600">
            <Shield className="w-3.5 h-3.5" />
            <span>Securely engineered portfolio. No trackers.</span>
          </div>
        </footer>
      </section>

      {/* Floating Recruiter Assistant Dialog */}
      <ChatPanel />
    </div>
  );
}
