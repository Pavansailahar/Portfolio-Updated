import type { TFunction } from 'i18next'
import { ArrowUpRight, ExternalLink, GitBranch, GitCommitHorizontal, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { useObject } from '../../hooks/useContent'
import { useGitHub, type GitHubEvent } from '../../hooks/useGitHub'
import { GitHubIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const langColor: Record<string, string> = {
  'Jupyter Notebook': '#f37626',
  Python: '#3776ab',
  TSQL: '#e38c00',
  HTML: '#e34c26',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
}

const prettyName = (n: string) => n.replace(/[-_]+/g, ' ').trim()

/** "3 days ago" / "3 日前" / "3 दिन पहले" via the browser's built-in Intl data. */
const relTime = (iso: string, lang: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  // "today" reads better than "0 days ago"; everything else uses "N … ago".
  if (days < 1) return new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(0, 'day')
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'always' })
  if (days < 30) return rtf.format(-days, 'day')
  if (days < 365) return rtf.format(-Math.floor(days / 30), 'month')
  return rtf.format(-Math.floor(days / 365), 'year')
}

const describeEvent = (e: GitHubEvent, t: TFunction) => {
  const repo = e.repo.name.split('/')[1] ?? e.repo.name
  switch (e.type) {
    case 'PushEvent': {
      const count = e.payload.size ?? e.payload.commits?.length
      return count ? t('github.events.pushed', { count, repo }) : t('github.events.pushedNoCount', { repo })
    }
    case 'CreateEvent':
      return e.payload.ref_type && e.payload.ref_type !== 'repository'
        ? t('github.events.created', { ref: e.payload.ref_type, repo })
        : t('github.events.createdRepo', { repo })
    case 'PublicEvent':
      return t('github.events.madePublic', { repo })
    default:
      return t('github.events.released', { repo })
  }
}

export function GitHubSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'en'
  const blurbs = useObject()<Record<string, string>>('github.repoBlurbs')
  const { status, user, repos, events } = useGitHub()

  return (
    <Section id="github">
      <SectionHeading index="04" eyebrow={t('github.eyebrow')} title={t('github.title')} description={t('github.description')} />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Profile card */}
        <Reveal>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="flex items-center gap-4">
              {user ? (
                <img src={user.avatar_url} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full border border-line-strong" />
              ) : (
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line-strong bg-ink-800 text-fg">
                  <GitHubIcon width={24} height={24} />
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-display font-semibold text-fg">{user?.name ?? profile.name}</p>
                <p className="font-mono text-sm text-fg-subtle">@{profile.githubUser}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                { label: t('github.repos'), value: user?.public_repos },
                { label: t('github.followers'), value: user?.followers },
                { label: t('github.following'), value: user?.following },
              ].map((s) => (
                <div key={s.label} className="min-w-0 rounded-xl border border-line bg-ink-950/40 px-1 py-3">
                  <p className="font-display text-lg font-semibold text-fg">{s.value ?? '—'}</p>
                  <p className="truncate text-[0.68rem] uppercase tracking-wider text-fg-subtle">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{t('github.recentActivity')}</p>
              {status === 'loading' && <p className="mt-3 text-sm text-fg-subtle">{t('github.loading')}</p>}
              {status !== 'loading' && events.length === 0 && (
                <p className="mt-3 text-sm text-fg-subtle">{status === 'fallback' ? t('github.unreachable') : t('github.noActivity')}</p>
              )}
              <ul className="mt-3 space-y-3">
                {events.map((e) => (
                  <li key={e.id} className="flex gap-2.5 text-sm">
                    <GitCommitHorizontal size={15} className="mt-0.5 shrink-0 text-cyan" />
                    <span className="min-w-0">
                      <span className="block break-words text-fg-muted">{describeEvent(e, t)}</span>
                      <span className="font-mono text-[0.68rem] text-fg-subtle">{relTime(e.created_at, lang)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-auto w-full !mt-6">
              <GitHubIcon width={16} height={16} /> {t('github.viewProfile')}
            </a>
          </div>
        </Reveal>

        {/* Repositories */}
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 0.06} className="h-full">
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass card-hover group flex h-full flex-col rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <GitBranch size={15} className="shrink-0 text-fg-subtle" />
                    <span className="break-words font-display font-semibold leading-snug text-fg">{prettyName(r.name)}</span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{blurbs[r.name] ?? t('github.publicRepo')}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs text-fg-subtle">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[r.language] ?? '#69728c' }} />
                      {r.language}
                    </span>
                  )}
                  {status === 'live' && (
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {r.stargazers_count}
                    </span>
                  )}
                  {r.pushed_at && <span>{t('github.updated', { time: relTime(r.pushed_at, lang) })}</span>}
                  {r.homepage && (
                    <span className="flex items-center gap-1 text-cyan">
                      <ExternalLink size={12} /> {t('github.liveSite')}
                    </span>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
          <Reveal className="h-full">
            <a
              href={`${profile.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong p-5 text-center transition-colors hover:border-cyan/40"
            >
              <GitHubIcon width={22} height={22} className="text-fg-subtle transition-colors group-hover:text-cyan" />
              <span className="font-display font-semibold text-fg">
                {user ? t('github.allRepos', { count: user.public_repos }) : t('github.allReposNoCount')}
              </span>
              <span className="text-sm text-fg-subtle">{t('github.browseAll')}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
