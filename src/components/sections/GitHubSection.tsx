import { ArrowUpRight, ExternalLink, GitBranch, GitCommitHorizontal, Star } from 'lucide-react'
import { profile, repoBlurbs } from '../../data/profile'
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

const relTime = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

const describeEvent = (e: GitHubEvent) => {
  const repo = e.repo.name.split('/')[1] ?? e.repo.name
  switch (e.type) {
    case 'PushEvent': {
      const n = e.payload.size ?? e.payload.commits?.length
      return n ? `Pushed ${n} commit${n === 1 ? '' : 's'} to ${repo}` : `Pushed to ${repo}`
    }
    case 'CreateEvent':
      return `Created ${e.payload.ref_type ?? 'repository'} in ${repo}`
    case 'PublicEvent':
      return `Made ${repo} public`
    default:
      return `Released ${repo}`
  }
}

export function GitHubSection() {
  const { status, user, repos, events } = useGitHub()

  return (
    <Section id="github">
      <SectionHeading
        index="04"
        eyebrow="Open Source"
        title="The code behind the work."
        description="Public repositories pulled live from GitHub — every project above links to its source."
      />

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
                { label: 'Repos', value: user?.public_repos },
                { label: 'Followers', value: user?.followers },
                { label: 'Following', value: user?.following },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-ink-950/40 py-3">
                  <p className="font-display text-lg font-semibold text-fg">{s.value ?? '—'}</p>
                  <p className="text-[0.68rem] uppercase tracking-wider text-fg-subtle">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">Recent activity</p>
              {status === 'loading' && <p className="mt-3 text-sm text-fg-subtle">Loading from GitHub…</p>}
              {status !== 'loading' && events.length === 0 && (
                <p className="mt-3 text-sm text-fg-subtle">{status === 'fallback' ? 'GitHub is unreachable right now — see the profile for live activity.' : 'No recent public activity.'}</p>
              )}
              <ul className="mt-3 space-y-3">
                {events.map((e) => (
                  <li key={e.id} className="flex gap-2.5 text-sm">
                    <GitCommitHorizontal size={15} className="mt-0.5 shrink-0 text-cyan" />
                    <span className="min-w-0">
                      <span className="block break-words text-fg-muted">{describeEvent(e)}</span>
                      <span className="font-mono text-[0.68rem] text-fg-subtle">{relTime(e.created_at)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-auto w-full !mt-6">
              <GitHubIcon width={16} height={16} /> View GitHub Profile
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
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{repoBlurbs[r.name] ?? 'Public repository.'}</p>
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
                  {r.pushed_at && <span>Updated {relTime(r.pushed_at)}</span>}
                  {r.homepage && (
                    <span className="flex items-center gap-1 text-cyan">
                      <ExternalLink size={12} /> Live site
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
                {user ? `All ${user.public_repos} repositories` : 'All repositories'}
              </span>
              <span className="text-sm text-fg-subtle">Browse everything on GitHub</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
