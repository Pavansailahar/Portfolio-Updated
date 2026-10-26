import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts'
import type { ProjectVisualKind } from '../../data/profile'
import { wave } from '../../lib/series'

/*
 * Original, code-drawn thumbnails for each project. They illustrate the *kind*
 * of output each project produces; values are synthetic shapes, not results.
 */

const panel = 'rounded-lg border border-line bg-ink-950/50'

function Kpi({ label, color }: { label: string; color: string }) {
  return (
    <div className={`${panel} px-2.5 py-2`}>
      <p className="text-[0.58rem] uppercase tracking-wider text-fg-subtle">{label}</p>
      <div className="mt-1.5 h-1.5 w-3/4 rounded-full" style={{ background: color, opacity: 0.85 }} />
      <div className="mt-1 h-1 w-1/2 rounded-full bg-white/10" />
    </div>
  )
}

/* ------------------------------ Retail ------------------------------ */
const retailTrend = wave(30, 0.2, 60, 20).map((v, i) => ({ i, actual: i < 22 ? v : null, fc: i >= 21 ? v + 3 : null }))
const storeBars = [72, 58, 66, 44, 81, 52, 63, 39].map((v, i) => ({ i, v }))
const segs = [
  { name: 'A', v: 20, c: '#22d3ee' },
  { name: 'B', v: 30, c: '#3b82f6' },
  { name: 'C', v: 50, c: '#8b5cf6' },
]

function RetailVisual({ animate }: { animate: boolean }) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-2 p-3">
      <div className="grid grid-cols-3 gap-2">
        <Kpi label="Revenue" color="#22d3ee" />
        <Kpi label="Stores" color="#3b82f6" />
        <Kpi label="Forecast" color="#a78bfa" />
      </div>
      <div className="grid min-h-0 grid-cols-[1.6fr_1fr] gap-2">
        <div className={`${panel} flex min-h-0 flex-col p-2`}>
          <p className="text-[0.58rem] text-fg-subtle">Sales trend · Prophet forecast</p>
          <div className="min-h-0 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retailTrend} margin={{ top: 6, right: 4, left: 4, bottom: 2 }}>
                <Line type="monotone" dataKey="actual" stroke="#22d3ee" strokeWidth={1.8} dot={false} isAnimationActive={animate} />
                <Line type="monotone" dataKey="fc" stroke="#a78bfa" strokeWidth={1.8} strokeDasharray="4 3" dot={false} isAnimationActive={animate} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-2 gap-2">
          <div className={`${panel} flex min-h-0 flex-col p-2`}>
            <p className="text-[0.58rem] text-fg-subtle">Stores</p>
            <div className="min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storeBars} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="v" fill="#3b82f6" radius={[2, 2, 0, 0]} isAnimationActive={animate} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={`${panel} flex min-h-0 items-center gap-1 p-2`}>
            <div className="h-full min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={segs} dataKey="v" innerRadius="55%" outerRadius="90%" stroke="none" isAnimationActive={animate}>
                    {segs.map((s) => (
                      <Cell key={s.name} fill={s.c} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-0.5 text-[0.55rem] text-fg-subtle">
              {segs.map((s) => (
                <p key={s.name} className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-sm" style={{ background: s.c }} />
                  {s.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- Delivery ----------------------------- */
const scatter = Array.from({ length: 40 }, (_, i) => {
  const x = (i * 37) % 100
  const noise = Math.sin(i * 12.9898) * 14
  return { x, y: 18 + x * 0.32 + noise, z: 1 }
})
const hourly = wave(24, 1.7, 40, 26).map((v, i) => ({ i, v }))

function DeliveryVisual({ animate }: { animate: boolean }) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-2 p-3">
      <div className="grid grid-cols-3 gap-2">
        <Kpi label="ETA (min)" color="#f59e0b" />
        <Kpi label="On-time" color="#34d399" />
        <Kpi label="Churn risk" color="#f87171" />
      </div>
      <div className="grid min-h-0 grid-cols-[1.3fr_1fr] gap-2">
        <div className={`${panel} flex min-h-0 flex-col p-2`}>
          <p className="text-[0.58rem] text-fg-subtle">Distance vs delivery time</p>
          <div className="min-h-0 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 6, right: 4, left: 4, bottom: 2 }}>
                <XAxis dataKey="x" type="number" hide />
                <YAxis dataKey="y" type="number" hide />
                <ZAxis dataKey="z" range={[14, 14]} />
                <Scatter data={scatter} fill="#f59e0b" fillOpacity={0.75} isAnimationActive={animate} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-2">
          <div className={`${panel} flex min-h-0 flex-col p-2`}>
            <p className="text-[0.58rem] text-fg-subtle">Orders by hour</p>
            <div className="min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourly} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <Area type="monotone" dataKey="v" stroke="#34d399" fill="#34d399" fillOpacity={0.15} strokeWidth={1.6} isAnimationActive={animate} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={`${panel} space-y-1.5 p-2`}>
            {[
              ['Retained', 'w-[78%]', 'bg-emerald'],
              ['At risk', 'w-[34%]', 'bg-red-400'],
            ].map(([l, w, c]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="w-11 text-[0.55rem] text-fg-subtle">{l}</span>
                <div className="h-1.5 flex-1 rounded-full bg-white/5">
                  <div className={`h-full rounded-full ${w} ${c} opacity-80`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------- Warehouse ----------------------------- */
function WarehouseVisual() {
  const layers = [
    { x: 118, label: 'Bronze', sub: 'raw', color: 'var(--color-bronze)' },
    { x: 196, label: 'Silver', sub: 'cleansed', color: 'var(--color-silver)' },
    { x: 274, label: 'Gold', sub: 'star schema', color: 'var(--color-gold)' },
  ]
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" role="img" aria-label="Diagram: CRM and ERP flow through Bronze, Silver and Gold layers into analytics">
      <defs>
        <linearGradient id="wh-flow" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* sources */}
      {[
        { y: 58, t: 'CRM' },
        { y: 132, t: 'ERP' },
      ].map((s) => (
        <g key={s.t}>
          <rect x="18" y={s.y} width="62" height="34" rx="8" fill="rgb(16 22 42)" stroke="rgb(148 163 184 / 0.3)" />
          <text x="49" y={s.y + 21} textAnchor="middle" fontSize="11" fill="#e6eaf5" fontFamily="JetBrains Mono">
            {s.t}
          </text>
          <path d={`M80 ${s.y + 17} C 100 ${s.y + 17}, 100 110, 118 110`} fill="none" stroke="url(#wh-flow)" strokeWidth="1.6" className="flow-line" />
        </g>
      ))}
      {/* layers */}
      {layers.map((l, i) => (
        <g key={l.label}>
          <rect x={l.x} y="62" width="62" height="96" rx="10" fill="rgb(11 16 32)" stroke={l.color} strokeOpacity="0.7" />
          <rect x={l.x} y="62" width="62" height="5" rx="2" fill={l.color} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={l.x + 10} y={84 + r * 16} width={42 - r * 8} height="5" rx="2.5" fill={l.color} opacity={0.35} />
          ))}
          <text x={l.x + 31} y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="#e6eaf5" fontFamily="Space Grotesk">
            {l.label}
          </text>
          <text x={l.x + 31} y="196" textAnchor="middle" fontSize="8.5" fill="#69728c" fontFamily="Inter">
            {l.sub}
          </text>
          {i < layers.length - 1 && <line x1={l.x + 62} y1="110" x2={l.x + 78} y2="110" stroke="url(#wh-flow)" strokeWidth="1.6" className="flow-line" />}
        </g>
      ))}
      {/* analytics */}
      <line x1="336" y1="110" x2="346" y2="110" stroke="url(#wh-flow)" strokeWidth="1.6" className="flow-line" />
      <rect x="346" y="70" width="40" height="80" rx="8" fill="rgb(16 22 42)" stroke="rgb(34 211 238 / 0.5)" />
      {[0, 1, 2, 3].map((b) => (
        <rect key={b} x={353 + b * 7.5} y={130 - [18, 30, 24, 40][b]} width="5" height={[18, 30, 24, 40][b]} rx="1.5" fill="#22d3ee" opacity={0.5 + b * 0.12} />
      ))}
      <text x="366" y="168" textAnchor="middle" fontSize="8.5" fill="#69728c" fontFamily="Inter">
        BI
      </text>
      <text x="200" y="34" textAnchor="middle" fontSize="9" fill="#69728c" fontFamily="JetBrains Mono" letterSpacing="1.5">
        EXEC load_bronze → load_silver → gold views
      </text>
    </svg>
  )
}

export function ProjectVisual({ kind, animate = true }: { kind: ProjectVisualKind; animate?: boolean }) {
  return (
    <div className="relative h-full w-full">
      {kind === 'retail' && <RetailVisual animate={animate} />}
      {kind === 'delivery' && <DeliveryVisual animate={animate} />}
      {kind === 'warehouse' && <WarehouseVisual />}
    </div>
  )
}
