"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";

interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  description: string;
  details: string;
}

const architectureNodes: ArchitectureNode[] = [
  {
    id: "client",
    label: "gRPC & HTTP Clients",
    type: "client",
    x: 100,
    y: 150,
    description: "Multiplayer WebGL clients and administrative consoles.",
    details: "Establishes sub-millisecond connections using HTTP/2 multiplexing or WebSockets. Handles Client-side AST translation.",
  },
  {
    id: "lb",
    label: "Envoy Load Balancer",
    type: "network",
    x: 300,
    y: 150,
    description: "Ingress Router and SSL termination layer.",
    details: "Routes search queries to SIMD nodes, and mutations to the Raft Leader. Performs rate-limiting and authorization checks.",
  },
  {
    id: "leader",
    label: "Raft Leader Node",
    type: "leader",
    x: 500,
    y: 80,
    description: "Consensus coordinator for cluster synchronization.",
    details: "Secures linearizable write operations. Appends writes to Write-Ahead Log (WAL) and orchestrates snapshot synchronization across followers.",
  },
  {
    id: "follower-a",
    label: "Search Worker A",
    type: "storage",
    x: 500,
    y: 220,
    description: "HNSW index node with AVX-512 SIMD assembly.",
    details: "Processes cosine distance evaluations in parallel on floats quantized to 8-bit integers. Loads active indexes directly in memory.",
  },
  {
    id: "follower-b",
    label: "Search Worker B",
    type: "storage",
    x: 500,
    y: 320,
    description: "Replica search worker node.",
    details: "Maintains read availability during network partitions. Synchronizes with leader logs asynchronously.",
  },
  {
    id: "db",
    label: "S3 Block Storage",
    type: "database",
    x: 700,
    y: 200,
    description: "Persistent storage for WAL logs and raw blocks.",
    details: "Provides cold storage snapshots. Rebuilt dynamically in memory by new nodes during spin-up.",
  },
];

export function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(architectureNodes[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 glass-panel p-6 rounded-2xl border border-white/10 glass-panel-glow">
      {/* SVG Canvas (cols 1 & 2) */}
      <div className="lg:col-span-2 relative min-h-[350px] bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-4">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full max-w-2xl select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow filters */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Arrow marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>

          {/* Animated data flow lines */}
          {/* Client to Load Balancer */}
          <path
            d="M 170 150 L 230 150"
            stroke="#06b6d4"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="6 6"
            className="animate-[dash_1.5s_linear_infinite]"
          />
          {/* Load Balancer to Raft Leader (Writes) */}
          <path
            d="M 370 140 Q 430 100 440 90"
            stroke="#7c3af5"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="6 6"
            className="animate-[dash_2s_linear_infinite]"
          />
          {/* Load Balancer to Search Worker A */}
          <path
            d="M 370 160 Q 430 200 440 210"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="6 6"
            className="animate-[dash_2.5s_linear_infinite]"
          />
          {/* Load Balancer to Search Worker B */}
          <path
            d="M 350 180 Q 400 280 440 300"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="6 6"
            className="animate-[dash_3s_linear_infinite]"
          />
          {/* Raft Leader replicas to followers */}
          <path
            d="M 500 110 L 500 190"
            stroke="#7c3af5"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="4 4"
            className="animate-[dash_1.8s_linear_infinite]"
          />
          <path
            d="M 520 110 Q 560 160 520 290"
            stroke="#7c3af5"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="4 4"
            className="animate-[dash_2.2s_linear_infinite]"
          />
          {/* Search workers to persistence DB */}
          <path
            d="M 570 220 L 630 210"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="4 4"
            className="animate-[dash_4s_linear_infinite]"
          />
          <path
            d="M 570 320 L 640 230"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
            strokeDasharray="4 4"
            className="animate-[dash_4s_linear_infinite]"
          />

          {/* Node Renderings */}
          {architectureNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            // Theme coloring per component type
            let color = "#3f3f46"; // zinc
            if (node.type === "client") color = "#06b6d4"; // cyan
            if (node.type === "network") color = "#3b82f6"; // blue
            if (node.type === "leader") color = "#8b5cf6"; // purple
            if (node.type === "storage") color = "#10b981"; // emerald
            if (node.type === "database") color = "#f59e0b"; // amber

            return (
              <g
                key={node.id}
                transform={`translate(${node.x - 70}, ${node.y - 30})`}
                className="cursor-pointer"
                onClick={() => setSelectedNode(node)}
              >
                {/* Node Box */}
                <rect
                  width="140"
                  height="60"
                  rx="8"
                  fill="rgba(9, 9, 11, 0.9)"
                  stroke={isSelected ? color : "rgba(255,255,255,0.1)"}
                  strokeWidth={isSelected ? "2.5" : "1"}
                  filter={isSelected ? "url(#glow-cyan)" : ""}
                  className="transition-all duration-200"
                />
                {/* Visual Category Dot */}
                <circle cx="20" cy="30" r="4" fill={color} />
                {/* Node Title */}
                <text
                  x="32"
                  y="34"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Global dash scrolling animations styling */}
        <style jsx global>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -20;
            }
          }
        `}</style>
      </div>

      {/* Details Box (col 3) */}
      <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Subsystem Inspector</span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-1 mb-3">
            {selectedNode.label}
          </h3>
          <p className="text-xs leading-relaxed text-zinc-400 mb-4">
            {selectedNode.description}
          </p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <h4 className="text-xs font-bold text-zinc-300 mb-1">Operational Metrics & Features</h4>
            <p className="text-xs text-zinc-500 leading-normal">
              {selectedNode.details}
            </p>
          </div>
        </div>

        <div className="text-[10px] text-zinc-600 mt-6 pt-3 border-t border-white/5">
          Select a system block on the diagram canvas to analyze operations, replication channels, and network topology.
        </div>
      </div>
    </div>
  );
}
