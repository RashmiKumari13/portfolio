"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, PlayCircle, XCircle, Terminal, RefreshCw } from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  status: "idle" | "running" | "success" | "failed";
  logs: string[];
  duration: string;
}

export function PipelineVisualizer() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [pipelineState, setPipelineState] = useState<"idle" | "running" | "success">("idle");
  const [selectedStepId, setSelectedStepId] = useState<string>("lint");

  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: "lint",
      name: "Pre-Commit Lint",
      status: "idle",
      duration: "0.8s",
      logs: [
        "$ eslint --ext .ts,.tsx src/",
        "✓ 142 source files scanned",
        "✓ 0 lint errors found, 0 warnings",
        "✓ Prettier formatting checked out",
      ],
    },
    {
      id: "compile",
      name: "TS Compile",
      status: "idle",
      duration: "4.2s",
      logs: [
        "$ next build --experimental-compile",
        "Creating an optimized production build...",
        "✓ Compile target: ESNext (Strict TypeScript enabled)",
        "✓ 0 compilation errors reported",
      ],
    },
    {
      id: "test",
      name: "Integrations Tests",
      status: "idle",
      duration: "6.5s",
      logs: [
        "$ vitest run --coverage",
        "✓ test/vector_db_raft.test.ts (24 tests passed)",
        "✓ test/epoll_connection.test.ts (12 tests passed)",
        "✓ test/shader_compile.test.ts (8 tests passed)",
        "Test coverage: 96.4% lines matches target.",
      ],
    },
    {
      id: "security",
      name: "Snyk Security Scan",
      status: "idle",
      duration: "2.1s",
      logs: [
        "$ snyk test --severity-threshold=medium",
        "Scanning dependencies for vulnerabilties...",
        "✓ Checked 432 dependencies in package-lock.json",
        "✓ 0 critical/high issues detected",
      ],
    },
    {
      id: "deploy",
      name: "Vercel Ingress Deploy",
      status: "idle",
      duration: "3.4s",
      logs: [
        "$ vercel deploy --prod --token=$VERCEL_TOKEN",
        "Deploying portfolio assets to edge node routes...",
        "✓ Core Web Vitals optimizations injected",
        "✓ Route mapping initialized",
        "✓ Live URL: https://alexrivers.dev",
      ],
    },
  ]);

  const activeStep = steps.find((s) => s.id === selectedStepId) || steps[0];

  // Run pipeline simulation
  const startPipeline = () => {
    setPipelineState("running");
    setActiveStepIndex(0);
    
    // Reset all steps
    setSteps((prev) => prev.map((s) => ({ ...s, status: "idle" })));
  };

  useEffect(() => {
    if (pipelineState !== "running") return;

    if (activeStepIndex >= steps.length) {
      setPipelineState("success");
      return;
    }

    // Mark current step as running
    setSteps((prev) =>
      prev.map((s, idx) => {
        if (idx === activeStepIndex) return { ...s, status: "running" };
        if (idx < activeStepIndex) return { ...s, status: "success" };
        return s;
      })
    );
    setSelectedStepId(steps[activeStepIndex].id);

    // Simulate step duration
    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [pipelineState, activeStepIndex]);

  // Handle pipeline completed state
  useEffect(() => {
    if (pipelineState === "success") {
      setSteps((prev) => prev.map((s) => ({ ...s, status: "success" })));
      setSelectedStepId("deploy");
    }
  }, [pipelineState]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-glow">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">DevOps Pipeline</span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">CI/CD Production Deployment</h3>
        </div>
        
        <button
          onClick={startPipeline}
          disabled={pipelineState === "running"}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-black font-semibold text-xs hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${pipelineState === "running" ? "animate-spin" : ""}`} />
          Run Pipeline
        </button>
      </div>

      {/* Visual Pipeline flow */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2 mb-8 bg-black/40 p-4 rounded-xl border border-white/5">
        {steps.map((step, idx) => {
          const isSelected = selectedStepId === step.id;
          return (
            <React.Fragment key={step.id}>
              {/* Step bubble */}
              <div
                onClick={() => setSelectedStepId(step.id)}
                className={`flex-1 flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-white/10 border-white/20"
                    : "bg-white/0 border-transparent hover:bg-white/5"
                }`}
              >
                {step.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                {step.status === "running" && <PlayCircle className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />}
                {step.status === "idle" && <div className="w-4 h-4 rounded-full border-2 border-zinc-700 shrink-0" />}

                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{step.name}</p>
                  <p className="text-[10px] text-zinc-500">{step.duration}</p>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block w-8 h-[2px] bg-zinc-800 relative">
                  {step.status === "success" && (
                    <div className="absolute inset-0 bg-emerald-500 transition-all duration-500" />
                  )}
                  {step.status === "running" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-transparent animate-pulse" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Embedded Terminal logs */}
      <div className="bg-zinc-950/90 rounded-xl border border-white/10 overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span>Job logs: {activeStep.id}.yaml</span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">
            Status: {activeStep.status}
          </span>
        </div>
        
        {/* Terminal logs list */}
        <div className="p-4 h-44 overflow-y-auto text-xs space-y-1.5 text-zinc-300">
          {activeStep.logs.map((log, lIdx) => (
            <div key={lIdx} className="leading-relaxed">
              {log.startsWith("$") ? (
                <span className="text-cyan-400 font-bold">{log}</span>
              ) : log.startsWith("✓") ? (
                <span className="text-emerald-400">{log}</span>
              ) : (
                <span>{log}</span>
              )}
            </div>
          ))}
          {activeStep.status === "running" && (
            <div className="text-cyan-400 animate-pulse flex items-center gap-1">
              <span>_</span>
              <span className="text-[10px] text-zinc-500">(running simulation...)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
