import { Award, BadgeCheck, ExternalLink, Trophy, Users, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAchievements, useCertifications } from '../../hooks/useContent'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const achievementIcons = { trophy: Trophy, users: Users, zap: Zap }

export function Achievements() {
  const { t } = useTranslation()
  const certifications = useCertifications()
  const achievements = useAchievements()

  return (
    <Section id="achievements">
      <SectionHeading index="06" eyebrow={t('achievements.eyebrow')} title={t('achievements.title')} description={t('achievements.description')} />

      {/* Certifications */}
      <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg-muted">
        <BadgeCheck size={16} className="text-cyan" /> {t('achievements.certsHeading')}
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {certifications.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08} className={`h-full ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="glass card-hover relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent} blur-2xl`} aria-hidden="true" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-ink-950/50 text-fg">
                <Award size={20} />
              </span>
              <p className="relative mt-5 font-semibold leading-snug text-fg">{c.title}</p>
              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-1 pt-5 text-sm">
                <span className="text-fg-muted">
                  {t('achievements.issuedBy')} <span className="font-medium text-fg">{c.issuer}</span>
                </span>
                <span className="font-mono text-[0.68rem] text-fg-subtle">{c.area}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Achievements timeline */}
      <h3 className="mb-5 mt-16 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg-muted">
        <Trophy size={16} className="text-amber" /> {t('achievements.activitiesHeading')}
      </h3>
      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = achievementIcons[a.icon]
          return (
            <Reveal key={a.id} delay={i * 0.08} className="h-full">
              <article className="glass card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber/20 to-violet/15 text-amber">
                    <Icon size={18} />
                  </span>
                  <span className="rounded-full border border-amber/30 bg-amber/[0.07] px-2.5 py-1 text-[0.7rem] font-medium text-amber">{a.tag}</span>
                </div>
                <p className="mt-5 font-display text-lg font-semibold text-fg">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{a.text}</p>
                {'link' in a && a.link && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-cyan hover:underline">
                    {t('achievements.viewProject')} <ExternalLink size={13} />
                  </a>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
