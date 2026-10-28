import { useTranslation } from 'react-i18next'
import { achievementData, certificationData, otherProjectData, projectData, type ProjectVisualKind } from '../data/profile'

/*
 * Joins the language-neutral data in profile.ts with the active language's
 * text, so section components receive ready-to-render objects.
 */

export interface Project {
  id: string
  title: string
  category: string
  visual: ProjectVisualKind
  summary: string
  overview: string[]
  features: string[]
  tech: string[]
  facts: { label: string; value: string }[]
  repo: string
  demo?: { label: string; url: string }
  note?: string
}

/** Translated array/object lookup (i18next `returnObjects`). */
function useObject() {
  const { t } = useTranslation()
  return <T,>(key: string) => t(key, { returnObjects: true }) as unknown as T
}

/** Translates concept names (e.g. "Classification") while leaving tool names like "Python" untouched. */
export function useTerm() {
  const terms = useObject()<Record<string, string>>('terms')
  return (name: string) => terms[name] ?? name
}

export function useProjects(): Project[] {
  const { t, i18n } = useTranslation()
  const obj = useObject()
  return projectData.map((p) => {
    const base = `projects.items.${p.id}`
    const demoUrl = 'demoUrl' in p ? p.demoUrl : undefined
    return {
      id: p.id,
      title: p.title,
      visual: p.visual,
      tech: [...p.tech],
      repo: p.repo,
      category: t(`${base}.category`),
      summary: t(`${base}.summary`),
      overview: obj<string[]>(`${base}.overview`),
      features: obj<string[]>(`${base}.features`),
      facts: obj<Project['facts']>(`${base}.facts`),
      demo: demoUrl ? { url: demoUrl, label: t(`${base}.demo`) } : undefined,
      note: i18n.exists(`${base}.note`) ? t(`${base}.note`) : undefined,
    }
  })
}

export function useOtherProjects() {
  const { t } = useTranslation()
  return otherProjectData.map((p) => ({
    ...p,
    category: t(`projects.other.${p.id}.category`),
    summary: t(`projects.other.${p.id}.summary`),
  }))
}

export function useCertifications() {
  const { t } = useTranslation()
  return certificationData.map((c) => ({
    ...c,
    title: t(`achievements.certs.${c.id}.title`),
    issuer: t(`achievements.certs.${c.id}.issuer`),
    area: t(`achievements.certs.${c.id}.area`),
  }))
}

export function useAchievements() {
  const { t } = useTranslation()
  return achievementData.map((a) => ({
    ...a,
    title: t(`achievements.items.${a.id}.title`),
    tag: t(`achievements.items.${a.id}.tag`),
    text: t(`achievements.items.${a.id}.text`),
  }))
}

export { useObject }
