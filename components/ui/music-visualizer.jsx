"use client";
import React from "react";

const MusicVisualizer = ({ className = "" }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] max-w-[200vw] max-h-[200vw]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,42,61,0.28)_0%,rgba(255,42,61,0.10)_30%,transparent_65%)] bass-pulse-1" />

        <div className="absolute inset-[12%] rounded-full border border-accent-glow/30 bass-pulse-2" />
        <div className="absolute inset-[22%] rounded-full border border-accent/25 bass-pulse-3" />
        <div className="absolute inset-[32%] rounded-full border border-accent/20 bass-pulse-4" />

        <div className="absolute inset-[40%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,85,102,0.35)_0%,rgba(255,42,61,0.15)_40%,rgba(138,10,20,0.25)_100%)] backdrop-blur-2xl border border-white/10 shadow-[inset_0_2px_0_rgba(255,255,255,0.10),0_30px_80px_rgba(0,0,0,0.6)] bass-pulse-core">
          <div className="absolute inset-3 rounded-full border border-white/10" />
          <div className="absolute inset-6 rounded-full border border-accent/25" />
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-accent-glow to-accent-deep shadow-[0_0_24px_rgba(255,42,61,0.7)]" />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[110vw] max-h-[110vw] rounded-full bg-accent/20 blur-[80px] bass-pulse-glow" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <style jsx>{`
        @keyframes bassPulse1 {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50%      { transform: scale(1.06); opacity: 1; }
        }
        @keyframes bassPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.12); opacity: 0.9; }
        }
        @keyframes bassPulse3 {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.10); opacity: 0.8; }
        }
        @keyframes bassPulse4 {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%      { transform: scale(1.08); opacity: 0.7; }
        }
        @keyframes bassPulseCore {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        @keyframes bassPulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50%      { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
        }

        .bass-pulse-1    { animation: bassPulse1   1.2s ease-in-out infinite; transform-origin: center; will-change: transform, opacity; }
        .bass-pulse-2    { animation: bassPulse2   1.2s ease-in-out infinite 0.05s; transform-origin: center; will-change: transform, opacity; }
        .bass-pulse-3    { animation: bassPulse3   1.2s ease-in-out infinite 0.10s; transform-origin: center; will-change: transform, opacity; }
        .bass-pulse-4    { animation: bassPulse4   1.2s ease-in-out infinite 0.15s; transform-origin: center; will-change: transform, opacity; }
        .bass-pulse-core { animation: bassPulseCore 1.2s ease-in-out infinite; transform-origin: center; will-change: transform; }
        .bass-pulse-glow { animation: bassPulseGlow 1.2s ease-in-out infinite; will-change: transform, opacity; }

        @media (prefers-reduced-motion: reduce) {
          .bass-pulse-1, .bass-pulse-2, .bass-pulse-3, .bass-pulse-4,
          .bass-pulse-core, .bass-pulse-glow { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default MusicVisualizer;
