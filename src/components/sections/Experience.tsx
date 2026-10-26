import { BarChart3, Briefcase, CalendarDays, Database, LineChart, ShieldCheck, TrendingUp, Workflow } from 'lucide-react'
import { experience } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const highlightIcons = [TrendingUp, BarChart3, Workflow, Database, LineChart, ShieldCheck]

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where analysis met real business data."
        description="Hands-on work with pharmacy sales and operational data — from raw extracts to dashboards people use."
      />

      <div className="relative pl-6 md:pl-10">
        {/* Timeline rail */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-cyan/70 via-violet/40 to-transparent md:left-[11px]" aria-hidden="true" />
        <span className="absolute left-0 top-7 grid h-[15px] w-[15px] place-items-center rounded-full border border-cyan/60 bg-ink-950 md:h-[23px] md:w-[23px]" aria-hidden="true">
          <span className="h-[7px] w-[7px] rounded-full bg-cyan md:h-[9px] md:w-[9px]" />
        </span>

        <Reveal>
          <article className="glass overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-4 border-b border-line p-6 md:flex-row md:items-start md:justify-between md:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-gradient-to-br from-emerald/15 to-cyan/10 text-emerald">
                  <Briefcase size={20} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-fg md:text-2xl">{experience.role}</h3>
                  <p className="mt-1 font-medium text-cyan">{experience.company}</p>
                </div>
              </div>
              <p className="flex items-center gap-2 font-mono text-sm text-fg-muted">
                <CalendarDays size={15} /> {experience.period}
              </p>
            </div>

            <div className="p-6 md:p-8">
              <p className="max-w-3xl leading-relaxed text-fg-muted">{experience.summary}</p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {experience.highlights.map((h, i) => {
                  const Icon = highlightIcons[i % highlightIcons.length]
                  return (
                    <li key={h.title} className="group rounded-xl border border-line bg-ink-950/30 p-4 transition-colors hover:border-cyan/30">
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className="text-cyan transition-transform group-hover:scale-110" />
                        <p className="text-sm font-semibold text-fg">{h.title}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{h.text}</p>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {experience.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}
