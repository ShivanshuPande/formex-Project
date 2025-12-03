
'use client';
// this is now a client side component 
import { useState } from "react";
import Link from "next/link";

function createGearPath(
  teeth: number,
  innerRadius: number,
  outerRadius: number,
  cx: number,
  cy: number
) {
  const step = (Math.PI * 2) / teeth;
  
  // Spur gear proportions: standard gear design ratios
  // Tooth tip width (addendum face width) - typically 40-45% of pitch
  const toothTipWidth = step * 0.42;
  // Tooth root width (dedendum face width) - wider for strength
  const toothRootWidth = step * 0.58;
  
  // Pitch circle radius (standard reference for gear design)
  const pitchRadius = (innerRadius + outerRadius) / 2;
  
  // Root fillet radius (small curve at tooth base for stress relief)
  const filletRadius = (outerRadius - innerRadius) * 0.15;
  const filletStartRadius = innerRadius + filletRadius;

  let d = "";
  let firstPoint: [number, number] | null = null;

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * step;

    // Root angles (where teeth meet the inner circle)
    const aRoot1 = baseAngle - toothRootWidth / 2;
    const aRoot2 = baseAngle + toothRootWidth / 2;
    
    // Tip angles (flat top of tooth)
    const aTip1 = baseAngle - toothTipWidth / 2;
    const aTip2 = baseAngle + toothTipWidth / 2;
    
    // Fillet transition angles (where straight flank meets root fillet)
    const aFillet1 = baseAngle - toothRootWidth / 2 + (toothRootWidth - toothTipWidth) / 2 * 0.3;
    const aFillet2 = baseAngle + toothRootWidth / 2 - (toothRootWidth - toothTipWidth) / 2 * 0.3;

    // Calculate key points
    const root1: [number, number] = [
      cx + innerRadius * Math.cos(aRoot1),
      cy + innerRadius * Math.sin(aRoot1)
    ];
    
    // Fillet start points (where straight flank begins)
    const filletStart1: [number, number] = [
      cx + filletStartRadius * Math.cos(aFillet1),
      cy + filletStartRadius * Math.sin(aFillet1)
    ];
    
    // Tooth tip points (flat top)
    const tip1: [number, number] = [
      cx + outerRadius * Math.cos(aTip1),
      cy + outerRadius * Math.sin(aTip1)
    ];
    const tip2: [number, number] = [
      cx + outerRadius * Math.cos(aTip2),
      cy + outerRadius * Math.sin(aTip2)
    ];
    
    // Fillet start point (right side)
    const filletStart2: [number, number] = [
      cx + filletStartRadius * Math.cos(aFillet2),
      cy + filletStartRadius * Math.sin(aFillet2)
    ];
    
    const root2: [number, number] = [
      cx + innerRadius * Math.cos(aRoot2),
      cy + innerRadius * Math.sin(aRoot2)
    ];

    if (i === 0) {
      d += `M ${root1[0]} ${root1[1]} `;
      firstPoint = root1;
    }
    
    // Small fillet at root (left side) - smooth transition from root to flank
    const filletControl1: [number, number] = [
      cx + (innerRadius + filletRadius * 0.5) * Math.cos(aRoot1 + (aFillet1 - aRoot1) * 0.5),
      cy + (innerRadius + filletRadius * 0.5) * Math.sin(aRoot1 + (aFillet1 - aRoot1) * 0.5)
    ];
    d += `Q ${filletControl1[0]} ${filletControl1[1]} ${filletStart1[0]} ${filletStart1[1]} `;
    
    // Straight flank (left side) - characteristic of spur gear
    d += `L ${tip1[0]} ${tip1[1]} `;
    
    // Flat tooth top (spur gear characteristic)
    d += `L ${tip2[0]} ${tip2[1]} `;
    
    // Straight flank (right side)
    d += `L ${filletStart2[0]} ${filletStart2[1]} `;
    
    // Small fillet at root (right side)
    const filletControl2: [number, number] = [
      cx + (innerRadius + filletRadius * 0.5) * Math.cos(aFillet2 + (aRoot2 - aFillet2) * 0.5),
      cy + (innerRadius + filletRadius * 0.5) * Math.sin(aFillet2 + (aRoot2 - aFillet2) * 0.5)
    ];
    d += `Q ${filletControl2[0]} ${filletControl2[1]} ${root2[0]} ${root2[1]} `;
    
    // Connect to next tooth root along inner circle
    if (i < teeth - 1) {
      const nextBaseAngle = (i + 1) * step;
      const nextRoot1 = [
        cx + innerRadius * Math.cos(nextBaseAngle - toothRootWidth / 2),
        cy + innerRadius * Math.sin(nextBaseAngle - toothRootWidth / 2)
      ];
      // Smooth arc along inner circle
      const rootControlAngle = (aRoot2 + nextBaseAngle - toothRootWidth / 2) / 2;
      const rootControl: [number, number] = [
        cx + innerRadius * Math.cos(rootControlAngle),
        cy + innerRadius * Math.sin(rootControlAngle)
      ];
      d += `Q ${rootControl[0]} ${rootControl[1]} ${nextRoot1[0]} ${nextRoot1[1]} `;
    }
  }

  // Close the path smoothly
  if (firstPoint) {
    const lastRootAngle = (teeth - 1) * step + toothRootWidth / 2;
    const firstRootAngle = -toothRootWidth / 2;
    // Calculate midpoint angle, handling wrap-around
    let rootControlAngle = (lastRootAngle + firstRootAngle + Math.PI * 2) / 2;
    // Normalize to [0, 2π]
    while (rootControlAngle > Math.PI * 2) rootControlAngle -= Math.PI * 2;
    while (rootControlAngle < 0) rootControlAngle += Math.PI * 2;
    
    const rootControl: [number, number] = [
      cx + innerRadius * Math.cos(rootControlAngle),
      cy + innerRadius * Math.sin(rootControlAngle)
    ];
    d += `Q ${rootControl[0]} ${rootControl[1]} ${firstPoint[0]} ${firstPoint[1]} `;
  }

  d += "Z";
  return d;
}

export default function Home() {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Dotted grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: [
              "radial-gradient(circle at center, rgba(94,234,212,0.35) 1px, transparent 1px)",
              "linear-gradient(rgba(15,23,42,0.35) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(15,23,42,0.35) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "24px 24px, 120px 120px, 120px 120px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[560px] h-[560px] md:w-[680px] md:h-[680px] text-slate-500/25 animate-spin"
            style={{ animationDuration: "45s" }}
          >
            
            <path
              d={createGearPath(18, 40, 50, 50, 50)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title - Logo Style */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white mb-8 leading-none tracking-tight">
            F
            <span
              className="relative inline-flex items-center justify-center align-middle mx-2 w-[0.72em] h-[0.72em]"
              aria-label="double circle representing the letter O"
            >
              <span className="absolute inset-0 rounded-full border-[0.08em] border-current" />
              <span className="absolute inset-[0.18em] rounded-full border-[0.08em] border-current" />
            </span>
            rmex
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
                <Link href="/components">Explore Components</Link>
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
                    Pick a part from the library: Washer, nuts, bolt and more.
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
                    Define sizes, Parameters and standards so the component matches your design.
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