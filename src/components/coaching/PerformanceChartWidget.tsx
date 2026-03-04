"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";

// ── Data ────────────────────────────────────────────────────────────────────
const vo2Data = [47.0, 47.4, 48.1, 48.6, 49.2, 49.0, 50.2, 50.7, 51.1, 51.4, 51.9, 51.7, 52.4, 53.0, 53.6, 54.1];
const ctlData = [30, 35, 40, 44, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72, 68, 65];
const atlData = [40, 45, 55, 58, 60, 65, 60, 68, 72, 75, 80, 72, 60, 50, 40, 35];

// ── Chart math ──────────────────────────────────────────────────────────────
const VOX0 = 18, VOX1 = 295, VOY0 = 8, VOY1 = 98;
const vo2Min = 45.5, vo2Max = 55.5;
function voX(i: number) { return VOX0 + (i / 15) * (VOX1 - VOX0); }
function voY(v: number) { return VOY1 - ((v - vo2Min) / (vo2Max - vo2Min)) * (VOY1 - VOY0); }

const PMCX0 = 18, PMCX1 = 295, PMCY0 = 8, PMCY1 = 98;
const pmcMax = 90;
function pmcX(i: number) { return PMCX0 + (i / 15) * (PMCX1 - PMCX0); }
function pmcY(v: number) { return PMCY1 - (v / pmcMax) * (PMCY1 - PMCY0); }

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

const vo2Pts: [number, number][] = vo2Data.map((v, i) => [voX(i), voY(v)]);
const vo2LinePath = toPath(vo2Pts);
const vo2AreaPath = `${vo2LinePath} L ${voX(15).toFixed(1)} ${VOY1} L ${voX(0).toFixed(1)} ${VOY1} Z`;

const ctlLinePath = toPath(ctlData.map((v, i) => [pmcX(i), pmcY(v)]));
const atlLinePath = toPath(atlData.map((v, i) => [pmcX(i), pmcY(v)]));
const ctlAreaPath = `${ctlLinePath} L ${pmcX(15).toFixed(1)} ${PMCY1} L ${pmcX(0).toFixed(1)} ${PMCY1} Z`;

const vo2GridVals = [48, 50, 52, 54];
const pmcGridVals = [20, 40, 60, 80];

// Interpolate along data array given 0-1 progress
function lerpData(data: number[], t: number) {
  const idx = t * (data.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, data.length - 1);
  return data[lo] + (data[hi] - data[lo]) * (idx - lo);
}

export function PerformanceChartWidget() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Motion values for animation progress (0 → 1)
  const vo2Progress = useMotionValue(0);
  const ctlProgress = useMotionValue(0);

  // ── Derived display values (update live as paths draw) ───────────────────
  const vo2Text = useTransform(vo2Progress, (t) =>
    lerpData(vo2Data, t).toFixed(1)
  );
  const ftpText = useTransform(vo2Progress, (t) =>
    Math.round(245 + t * (287 - 245)) + " W"
  );
  const ctlText = useTransform(ctlProgress, (t) =>
    Math.round(lerpData(ctlData, t)).toString()
  );

  useEffect(() => {
    if (!isInView) return;
    animate(vo2Progress, 1, { duration: 2.2, ease: "easeInOut", delay: 0.3 });
    animate(ctlProgress, 1, { duration: 2.4, ease: "easeInOut", delay: 0.3 });
  }, [isInView, vo2Progress, ctlProgress]);

  return (
    <div ref={ref} className="w-full text-xs">

      {/* Stat badges — numbers update live as graphs draw */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "VO₂ Max", value: vo2Text, unit: "mL/kg/min", color: "text-cyan-400" },
          { label: "FTP",     value: ftpText,  unit: "threshold",  color: "text-teal-400" },
          { label: "CTL",     value: ctlText,  unit: "fitness",    color: "text-sky-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/50 text-center"
          >
            <div className={`text-base font-black tabular-nums ${stat.color}`}>
              <motion.span>{stat.value}</motion.span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* VO₂ Max Chart */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            VO₂ Max Trend — 16 Weeks
          </span>
          <span className="text-[10px] text-cyan-500 font-bold">+7.1 mL/kg/min</span>
        </div>
        <svg viewBox="0 0 310 110" className="w-full" style={{ height: 90 }}>
          {vo2GridVals.map((v) => (
            <g key={v}>
              <line x1={VOX0} y1={voY(v)} x2={VOX1} y2={voY(v)} stroke="#1e293b" strokeWidth="1" />
              <text x={VOX0 - 3} y={voY(v) + 3} fontSize="6" fill="#475569" textAnchor="end">{v}</text>
            </g>
          ))}

          {/* Area fill fades in once line reaches end */}
          <motion.path
            d={vo2AreaPath}
            fill="rgba(6,182,212,0.08)"
            style={{ opacity: useTransform(vo2Progress, [0.9, 1], [0, 1]) }}
          />

          {/* Animated VO₂ line — driven by vo2Progress */}
          <motion.path
            d={vo2LinePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: vo2Progress }}
          />

          {/* Dot tracking tip of line */}
          <motion.circle
            style={{
              cx: useTransform(vo2Progress, (t) => voX(Math.min(t * 15, 15))),
              cy: useTransform(vo2Progress, (t) => {
                const idx = Math.min(t * 15, 15);
                const lo = Math.floor(idx);
                const hi = Math.min(lo + 1, 15);
                return voY(vo2Data[lo] + (vo2Data[hi] - vo2Data[lo]) * (idx - lo));
              }),
              opacity: useTransform(vo2Progress, [0, 0.05], [0, 1]),
            }}
            r="3"
            fill="#06b6d4"
          />

          {["W1", "W4", "W8", "W12", "W16"].map((lbl, i) => {
            const idx = [0, 3, 7, 11, 15][i];
            return <text key={lbl} x={voX(idx)} y={VOY1 + 9} fontSize="6" fill="#475569" textAnchor="middle">{lbl}</text>;
          })}
        </svg>
      </div>

      {/* PMC Chart */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Performance Management Chart
          </span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <span className="w-3 h-0.5 rounded bg-cyan-400 inline-block" />
              <span className="text-[10px] text-slate-500">Fitness</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-0.5 rounded bg-orange-400 inline-block" />
              <span className="text-[10px] text-slate-500">Fatigue</span>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 310 110" className="w-full" style={{ height: 90 }}>
          {pmcGridVals.map((v) => (
            <g key={v}>
              <line x1={PMCX0} y1={pmcY(v)} x2={PMCX1} y2={pmcY(v)} stroke="#1e293b" strokeWidth="1" />
              <text x={PMCX0 - 3} y={pmcY(v) + 3} fontSize="6" fill="#475569" textAnchor="end">{v}</text>
            </g>
          ))}

          {/* Race day marker */}
          <line x1={pmcX(13)} y1={PMCY0} x2={pmcX(13)} y2={PMCY1} stroke="#10b981" strokeWidth="0.8" strokeDasharray="3,3" />
          <text x={pmcX(13)} y={PMCY0 - 1} fontSize="6" fill="#10b981" textAnchor="middle">RACE</text>

          {/* CTL area */}
          <motion.path
            d={ctlAreaPath}
            fill="rgba(6,182,212,0.07)"
            style={{ opacity: useTransform(ctlProgress, [0.9, 1], [0, 1]) }}
          />

          {/* CTL line */}
          <motion.path
            d={ctlLinePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: ctlProgress }}
          />

          {/* ATL line — starts drawing 0.3s after CTL */}
          <motion.path
            d={atlLinePath}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4,3"
            style={{ pathLength: useTransform(ctlProgress, [0.15, 1], [0, 1]) }}
          />

          {/* Tracking dot on CTL line */}
          <motion.circle
            style={{
              cx: useTransform(ctlProgress, (t) => pmcX(Math.min(t * 15, 15))),
              cy: useTransform(ctlProgress, (t) => {
                const idx = Math.min(t * 15, 15);
                const lo = Math.floor(idx);
                const hi = Math.min(lo + 1, 15);
                return pmcY(ctlData[lo] + (ctlData[hi] - ctlData[lo]) * (idx - lo));
              }),
              opacity: useTransform(ctlProgress, [0, 0.05], [0, 1]),
            }}
            r="3"
            fill="#06b6d4"
          />

          {["W1", "W4", "W8", "W12", "W16"].map((lbl, i) => {
            const idx = [0, 3, 7, 11, 15][i];
            return <text key={lbl} x={pmcX(idx)} y={PMCY1 + 9} fontSize="6" fill="#475569" textAnchor="middle">{lbl}</text>;
          })}
        </svg>
      </div>
    </div>
  );
}
