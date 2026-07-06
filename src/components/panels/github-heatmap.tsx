"use client";

import React, { useState, useMemo } from "react";
import { GitCommit, GitPullRequest, GitMerge, Star } from "lucide-react";

interface ActivityEvent {
  id: string;
  type: "commit" | "pr" | "merge" | "star";
  repo: string;
  message: string;
  time: string;
}

export function GithubHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

  // Generate 52 weeks * 7 days of simulated git contribution values
  const heatmapData = useMemo(() => {
    const data = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 364);

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);

      // Random weight centered on middle-of-week active commits
      const day = currentDate.getDay();
      let weight = Math.floor(Math.random() * 5);
      if (day === 0 || day === 6) {
        weight = Math.max(0, weight - 3); // less work on weekends
      }

      data.push({
        date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count: weight,
      });
    }
    return data;
  }, []);

  // Split into 52 columns of 7 days
  const weeks = useMemo(() => {
    const cols = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      cols.push(heatmapData.slice(i, i + 7));
    }
    return cols;
  }, [heatmapData]);

  // Live Activity feeds
  const activities: ActivityEvent[] = [
    {
      id: "act-1",
      type: "commit",
      repo: "developer/sentinel-db",
      message: "feat(indexer): optimize AVX-512 cosine search loops",
      time: "4 mins ago",
    },
    {
      id: "act-2",
      type: "pr",
      repo: "developer/flux-mesh",
      message: "opened PR #42: add adaptive connection sliding windows",
      time: "2 hours ago",
    },
    {
      id: "act-3",
      type: "merge",
      repo: "developer/sentinel-db",
      message: "merged branch hotfix/raft-linear-snapshots",
      time: "1 day ago",
    },
    {
      id: "act-4",
      type: "star",
      repo: "pmndrs/react-three-fiber",
      message: "starred project repository",
      time: "3 days ago",
    },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-glow">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Git telemetry</span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">GitHub Contribution Heatmap</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span>Less</span>
          <div className="w-3 h-3 bg-zinc-800 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-700/60 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-500/80 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid scrollable container */}
      <div className="relative overflow-x-auto no-scrollbar pb-3">
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((day, dIdx) => {
                // Color scaling
                let bgClass = "bg-zinc-900/50 hover:bg-zinc-800";
                if (day.count === 1) bgClass = "bg-emerald-950/40 border border-emerald-900/20";
                if (day.count === 2) bgClass = "bg-emerald-900/60 border border-emerald-800/30";
                if (day.count === 3) bgClass = "bg-emerald-700/80 border border-emerald-600/40";
                if (day.count >= 4) bgClass = "bg-emerald-500 border border-emerald-400/40";

                return (
                  <div
                    key={dIdx}
                    className={`w-[11px] h-[11px] rounded-sm transition-all cursor-pointer ${bgClass}`}
                    onMouseEnter={() => setHoveredCell({ count: day.count, date: day.date })}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip text info */}
      <div className="h-6 mt-2 text-xs text-zinc-400 text-center font-medium">
        {hoveredCell ? (
          <span>
            <strong className="text-white">{hoveredCell.count} commits</strong> on {hoveredCell.date}
          </span>
        ) : (
          <span className="text-zinc-600">Hover over active nodes to examine contribution metrics.</span>
        )}
      </div>

      {/* Live Activity Feed */}
      <div className="mt-8 border-t border-white/5 pt-6">
        <h4 className="text-sm font-bold text-zinc-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          Live Activity Feed
        </h4>
        
        <div className="space-y-4">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="p-1.5 bg-black/40 rounded-md border border-white/5 text-zinc-400">
                {act.type === "commit" && <GitCommit className="w-4 h-4 text-cyan-400" />}
                {act.type === "pr" && <GitPullRequest className="w-4 h-4 text-purple-400" />}
                {act.type === "merge" && <GitMerge className="w-4 h-4 text-emerald-400" />}
                {act.type === "star" && <Star className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-white truncate">{act.repo}</span>
                  <span className="text-[10px] text-zinc-500 whitespace-nowrap">{act.time}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 truncate">{act.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
