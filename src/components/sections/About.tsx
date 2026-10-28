import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { education, stats } from '../../data/profile'
import { useObject } from '../../hooks/useContent'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { t } = useTranslation()
  const obj = useObject()
  const paragraphs = obj<string[]>('about.paragraphs')
  const focus = obj<{ label: string; detail: string }[]>('about.focus')

  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow={t('about.eyebrow')} title={t('about.title')} />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={`leading-relaxed ${i === 0 ? 'text-lg text-fg' : 'text-fg-muted'}`}>{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {focus.map((f) => (
                <div key={f.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <p className="font-display text-sm font-semibold text-fg">{f.label}</p>
                  <p className="mt-1 text-sm text-fg-subtle">{f.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-blue/20 text-cyan">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <p className="font-display font-semibold text-fg">{education.school}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{t('about.education.degree')}</p>
                  <p className="mt-2 font-mono text-xs text-fg-subtle">{t('about.education.period')}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.key} delay={0.08 * i}>
                <div className="glass card-hover h-full rounded-2xl p-5">
                  <p className="text-gradient font-display text-3xl font-bold">{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-fg">{t(`about.stats.${s.key}.label`)}</p>
                  <p className="text-xs text-fg-subtle">{t(`about.stats.${s.key}.sub`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
