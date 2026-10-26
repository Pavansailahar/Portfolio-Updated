import { useEffect, useState } from 'react'
import { fallbackRepos, featuredRepoNames, profile } from '../data/profile'

export interface GitHubUser {
  name: string | null
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  name: string
  html_url: string
  language: string | null
  homepage: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string | null
}

export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  created_at: string
  payload: { commits?: unknown[]; ref_type?: string; size?: number }
}

interface GitHubState {
  status: 'loading' | 'live' | 'fallback'
  user: GitHubUser | null
  repos: GitHubRepo[]
  events: GitHubEvent[]
}

const API = 'https://api.github.com'
const CACHE_KEY = 'gh-cache-v1'
const CACHE_TTL = 1000 * 60 * 30

const fallback: GitHubRepo[] = fallbackRepos.map((r) => ({
  ...r,
  html_url: `${profile.github}/${r.name}`,
  stargazers_count: 0,
  forks_count: 0,
  pushed_at: null,
}))

/**
 * Pulls the public profile, repos and recent events from the GitHub REST API.
 * Results are cached in sessionStorage to stay well under the unauthenticated
 * rate limit; on any failure we fall back to the verified static repo list.
 */
export function useGitHub(): GitHubState {
  const [state, setState] = useState<GitHubState>({ status: 'loading', user: null, repos: fallback, events: [] })

  useEffect(() => {
    let cancelled = false

    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { at, data } = JSON.parse(cached) as { at: number; data: GitHubState }
        if (Date.now() - at < CACHE_TTL) {
          setState(data)
          return
        }
      }
    } catch {
      /* storage unavailable — just fetch */
    }

    const user = profile.githubUser
    const get = <T,>(path: string) =>
      fetch(`${API}${path}`, { headers: { Accept: 'application/vnd.github+json' } }).then((r) => {
        if (!r.ok) throw new Error(`GitHub ${r.status}`)
        return r.json() as Promise<T>
      })

    Promise.all([
      get<GitHubUser>(`/users/${user}`),
      get<GitHubRepo[]>(`/users/${user}/repos?per_page=100&sort=pushed`),
      get<GitHubEvent[]>(`/users/${user}/events/public?per_page=30`).catch(() => [] as GitHubEvent[]),
    ])
      .then(([u, repos, events]) => {
        if (cancelled) return
        const byName = new Map(repos.map((r) => [r.name, r]))
        const featured = featuredRepoNames.map((n) => byName.get(n)).filter((r): r is GitHubRepo => Boolean(r))
        const data: GitHubState = {
          status: 'live',
          user: u,
          repos: featured.length ? featured : fallback,
          events: events.filter((e) => ['PushEvent', 'CreateEvent', 'PublicEvent', 'ReleaseEvent'].includes(e.type)).slice(0, 5),
        }
        setState(data)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'fallback', user: null, repos: fallback, events: [] })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
