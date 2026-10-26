import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Database, Layers, Sparkles } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, ComposedChart, Line, ResponsiveContainer } from 'recharts'
import { wave } from '../../lib/series'

const trend = wave(28, 0.4).map((v, i) => ({ i, actual: i < 20 ? v : null, forecast: i >= 19 ? v + 2 : null }))
const bars = wave(10, 2.1, 40, 22).map((v, i) => ({ i, v }))
const spark = wave(16, 1.3, 30, 10).map((v, i) => ({ i, v }))

const layers = [
  { name: 'Bronze', color: 'var(--color-bronze)' },
  { name: 'Silver', color: 'var(--color-silver)' },
  { name: 'Gold', color: 'var(--color-gold)' },
]

/**
 * Decorative "analytics workspace" for the hero. Shapes only — no axes or
 * numbers — so it reads as an illustration rather than a claim about results.
 */
export function HeroDashboard() {
  const reduce = useReducedMotion()
  const float = (d: number) =>
    reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 6, delay: d, repeat: Infinity, ease: 'easeInOut' as const } }

  return (
    <div className="relative mx-auto aspect-[5/4.6] sm:aspect-[5/5.2] w-full max-w-[540px]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full bg-gradient-to-tr from-blue/25 via-violet/15 to-cyan/20 blur-3xl" />

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass absolute inset-x-[4%] top-[9%] rounded-2xl p-4 sm:p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
            </span>
            <span className="ml-2 font-mono text-[0.7rem] text-fg-subtle">sales_forecast.ipynb</span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-emerald">
            <span className="live-dot" /> running
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider text-fg-subtle">Store sales · forecast</p>
            <div className="mt-2 flex gap-3 text-[0.68rem] text-fg-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded bg-cyan" />
                actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 border-t border-dashed border-violet" />
                forecast
              </span>
            </div>
          </div>
          <Activity size={16} className="text-cyan" />
        </div>

        <div className="mt-3 h-36 sm:h-44">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trend} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="actual" stroke="#22d3ee" strokeWidth={2} fill="url(#heroFill)" isAnimationActive={!reduce} animationDuration={1600} />
              <Line type="monotone" dataKey="forecast" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={!reduce} animationBegin={1200} animationDuration={1000} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {layers.map((l, i) => (
            <div key={l.name} className="rounded-lg border border-line bg-ink-950/40 px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm" style={{ background: l.color }} />
                <span className="text-[0.68rem] font-medium text-fg-muted">{l.name}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: l.color }}
                  initial={{ width: reduce ? '100%' : 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.1, delay: 0.9 + i * 0.45, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating: segmentation bars */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute -left-4 bottom-0 hidden w-[44%] sm:block"
      >
        <motion.div {...float(0)} className="glass rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-[0.68rem] text-fg-muted">
            <Layers size={12} className="text-violet" /> ABC / XYZ segments
          </div>
          <div className="mt-2 h-14">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="v" fill="#8b5cf6" radius={[3, 3, 0, 0]} isAnimationActive={!reduce} animationBegin={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: SQL snippet */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute -right-4 bottom-[3%] hidden w-[50%] sm:block"
      >
        <motion.div {...float(1.5)} className="glass rounded-xl p-3 font-mono text-[0.62rem] leading-relaxed sm:text-[0.68rem]">
          <div className="mb-1.5 flex items-center gap-1.5 font-sans text-[0.68rem] text-fg-muted">
            <Database size={12} className="text-cyan" /> gold layer
          </div>
          <p>
            <span className="text-violet">SELECT</span> <span className="text-fg">store, month,</span>
          </p>
          <p className="pl-3 text-fg">
            <span className="text-cyan">SUM</span>(net_sales)
          </p>
          <p>
            <span className="text-violet">FROM</span> <span className="text-amber">gold.fact_sales</span>
          </p>
          <p>
            <span className="text-violet">GROUP BY</span> <span className="text-fg">store, month;</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Floating: sparkline chip */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute right-[2%] top-0 w-[38%]"
      >
        <motion.div {...float(0.8)} className="glass flex items-center gap-2 rounded-xl px-3 py-2">
          <Sparkles size={13} className="shrink-0 text-amber" />
          <div className="h-6 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={1.5} fill="#f59e0b" fillOpacity={0.12} isAnimationActive={!reduce} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[0.65rem] text-fg-muted">KPIs</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
