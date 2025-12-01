
'use client';

import { useState } from "react";

function createGearPath(
  teeth: number,
  innerRadius: number,
  outerRadius: number,
  cx: number,
  cy: number
) {
  const step = (Math.PI * 2) / teeth;
  const toothTipWidth = step * 0.35;
  const toothRootWidth = step * 0.6;

  let d = "";

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * step;

    const aRoot1 = baseAngle - toothRootWidth / 2;
    const aTip1 = baseAngle - toothTipWidth / 2;
    const aTip2 = baseAngle + toothTipWidth / 2;
    const aRoot2 = baseAngle + toothRootWidth / 2;

    const points = [
      [cx + innerRadius * Math.cos(aRoot1), cy + innerRadius * Math.sin(aRoot1)],
      [cx + outerRadius * Math.cos(aTip1), cy + outerRadius * Math.sin(aTip1)],
      [cx + outerRadius * Math.cos(aTip2), cy + outerRadius * Math.sin(aTip2)],
      [cx + innerRadius * Math.cos(aRoot2), cy + innerRadius * Math.sin(aRoot2)],
    ];

    if (i === 0) {
      d += `M ${points[0][0]} ${points[0][1]} `;
    }
    for (let j = 1; j < points.length; j++) {
      d += `L ${points[j][0]} ${points[j][1]} `;
    }
  }

  d += "Z";
  return d;
}

export default function Home() {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Gears */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large outlined gear behind hero */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[420px] h-[420px] md:w-[520px] md:h-[520px] text-slate-700/25 animate-spin"
            style={{ animationDuration: "45s" }}
          >
            {/* Math-generated gear outline */}
            <path
              d={createGearPath(18, 30, 40, 50, 50)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            {/* Inner ring */}
            <circle
              cx="50"
              cy="50"
              r="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            {/* Small dashed inner circle to suggest holes */}
            <circle
              cx="50"
              cy="50"
              r="11"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          </svg>
        </div>
        {/* Large Gear - Top Right */}
        <div className="absolute top-16 right-12 w-24 h-24 opacity-10 animate-spin" style={{ animationDuration: '20s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-600">
            <path d="M50 10c2.2-3.8 8.8-3.8 11 0l5.7 9.9a7 7 0 0 0 6.2 3.8l11.8-.3c4.8-.1 8.2 4.8 6.7 9.4l-2.9 10.8a7 7 0 0 0 2.1 7l8.7 6.8c3.7 2.9 3.7 8.6 0 11.5l-8.7 6.8a7 7 0 0 0-2.1 7l2.9 10.8c1.5 4.6-1.9 9.5-6.7 9.4l-11.8-.3a7 7 0 0 0-6.2 3.8l-5.7 9.9c-2.2 3.8-8.8 3.8-11 0l-5.7-9.9a7 7 0 0 0-6.2-3.8l-11.8.3c-4.8.1-8.2-4.8-6.7-9.4l2.9-10.8a7 7 0 0 0-2.1-7l-8.7-6.8c-3.7-2.9-3.7-8.6 0-11.5l8.7-6.8a7 7 0 0 0 2.1-7L15.5 33c-1.5-4.6 1.9-9.5 6.7-9.4l11.8.3a7 7 0 0 0 6.2-3.8L50 10z"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
          </svg>
        </div>

        {/* Medium Gear - Bottom Left */}
        <div className="absolute bottom-20 left-16 w-16 h-16 opacity-8 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700">
            <path d="M50 15c1.8-3.1 7.2-3.1 9 0l4.7 8.1a5.5 5.5 0 0 0 5 3.1l9.7-.2c3.9-.1 6.7 3.9 5.5 7.7l-2.4 8.9a5.5 5.5 0 0 0 1.7 5.8l7.1 5.6c3 2.4 3 7-.1 9.4l-7.1 5.6a5.5 5.5 0 0 0-1.7 5.8l2.4 8.9c1.2 3.8-1.6 7.8-5.5 7.7l-9.7-.2a5.5 5.5 0 0 0-5 3.1l-4.7 8.1c-1.8 3.1-7.2 3.1-9 0l-4.7-8.1a5.5 5.5 0 0 0-5-3.1l-9.7.2c-3.9.1-6.7-3.9-5.5-7.7l2.4-8.9a5.5 5.5 0 0 0-1.7-5.8l-7.1-5.6c-3-2.4-3-7 .1-9.4l7.1-5.6a5.5 5.5 0 0 0 1.7-5.8L23.1 35c-1.2-3.8 1.6-7.8 5.5-7.7l9.7.2a5.5 5.5 0 0 0 5-3.1L50 15z"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="6" fill="currentColor"/>
          </svg>
        </div>

        {/* Small Gear - Top Left */}
        <div className="absolute top-24 left-8 w-12 h-12 opacity-12 animate-spin" style={{ animationDuration: '12s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-600">
            <path d="M50 20c1.4-2.4 5.6-2.4 7 0l3.6 6.3a4.2 4.2 0 0 0 3.9 2.4l7.5-.2c3-.1 5.2 3 4.3 6l-1.9 6.9a4.2 4.2 0 0 0 1.3 4.5l5.5 4.3c2.3 1.9 2.3 5.3 0 7.2l-5.5 4.3a4.2 4.2 0 0 0-1.3 4.5l1.9 6.9c.9 3-1.3 6.1-4.3 6l-7.5-.2a4.2 4.2 0 0 0-3.9 2.4l-3.6 6.3c-1.4 2.4-5.6 2.4-7 0l-3.6-6.3a4.2 4.2 0 0 0-3.9-2.4l-7.5.2c-3 .1-5.2-3-4.3-6l1.9-6.9a4.2 4.2 0 0 0-1.3-4.5l-5.5-4.3c-2.3-1.9-2.3-5.3 0-7.2l5.5-4.3a4.2 4.2 0 0 0 1.3-4.5L27.7 35c-.9-3 1.3-6.1 4.3-6l7.5.2a4.2 4.2 0 0 0 3.9-2.4L50 20z"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="4.5" fill="currentColor"/>
          </svg>
        </div>

        {/* Tiny Gear - Bottom Right */}
        <div className="absolute bottom-16 right-12 w-8 h-8 opacity-15 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700">
            <path d="M50 25c1.1-1.9 4.4-1.9 5.5 0l2.8 4.9a3.3 3.3 0 0 0 3 1.9l5.8-.2c2.3-.1 4 2.4 3.3 4.7l-1.5 5.4a3.3 3.3 0 0 0 1 3.5l4.3 3.4c1.8 1.5 1.8 4.1 0 5.6l-4.3 3.4a3.3 3.3 0 0 0-1 3.5l1.5 5.4c.7 2.3-1 4.8-3.3 4.7l-5.8-.2a3.3 3.3 0 0 0-3 1.9l-2.8 4.9c-1.1 1.9-4.4 1.9-5.5 0l-2.8-4.9a3.3 3.3 0 0 0-3-1.9l-5.8.2c-2.3.1-4-2.4-3.3-4.7l1.5-5.4a3.3 3.3 0 0 0-1-3.5l-4.3-3.4c-1.8-1.5-1.8-4.1 0-5.6l4.3-3.4a3.3 3.3 0 0 0 1-3.5L31.9 36c-.7-2.3 1-4.8 3.3-4.7l5.8.2a3.3 3.3 0 0 0 3-1.9L50 25z"/>
            <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.8"/>
            <circle cx="50" cy="50" r="3.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title - Logo Style */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white mb-8 leading-none tracking-tight">
            Formex
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            A comprehensive library of parametric 3D mechanical components.
            <br className="hidden sm:block" />
            <span className="text-cyan-400">Ready-to-use parts</span> that accelerate your engineering workflow.
          </p>

          {/* CTA + modal triggers */}
          <div className="flex flex-col items-center gap-4 justify-center">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                Explore Components
              </button>
              <button
                onClick={() => setIsInfoOpen(true)}
                className="px-6 py-3 border border-slate-600 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-sm rounded-lg transition-colors bg-black/40 backdrop-blur-sm"
              >
                How Formex works
              </button>
            </div>
            <button
              onClick={() => setIsTeamOpen(true)}
              className="px-6 py-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-300 transition-colors rounded-lg border border-slate-600"
            >
              Meet the team
            </button>
          </div>
        </div>
      </div>

      {/* Team modal */}
      {isTeamOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-md mx-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900/40 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setIsTeamOpen(false)}
              className="absolute top-3 right-4 text-slate-500 hover:text-slate-200 text-sm"
            >
              ✕
            </button>

            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400/80">
                Formex Team
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-50">
                The people behind the parts
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                A small crew building a clean, reusable library of mechanical components.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-100">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-2.5">
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-xs font-semibold text-cyan-200">
                  AP
                </div>
                <span>Anish Pathak</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-2.5">
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-xs font-semibold text-cyan-200">
                  SP
                </div>
                <span>Shivanshu Pandey</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-2.5">
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-xs font-semibold text-cyan-200">
                  AN
                </div>
                <span>Arham Naqvi</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-2.5">
                <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-xs font-semibold text-cyan-200">
                  RB
                </div>
                <span>Rohit Brahme</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info / steps modal */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-md mx-4 rounded-3xl border border-cyan-500/20 bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-3 right-4 text-slate-500 hover:text-slate-200 text-sm"
            >
              ✕
            </button>

            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400/80">
                How it works
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-50">
                Three simple steps to a clean model
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Formex turns parametric choices into ready-to-use 3D mechanical components.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-100">
              {/* Step 1 */}
              <div className="flex gap-3 rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-xs font-semibold text-cyan-200">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Step 1
                  </span>
                  <span className="text-sm text-slate-50">
                    Select the component
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Pick a part from the library: bearings, gears, fasteners and more.
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-xs font-semibold text-cyan-200">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Step 2
                  </span>
                  <span className="text-sm text-slate-50">
                    Select the parameters
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Define sizes, tolerances and standards so the component matches your design.
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-xs font-semibold text-cyan-200">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Step 3
                  </span>
                  <span className="text-sm text-slate-50">
                    View and download
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Preview the 3D model, then download it in the format your tools expect.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}