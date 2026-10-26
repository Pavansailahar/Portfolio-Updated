import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ExternalLink, Info, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../../data/profile'
import { GitHubIcon } from '../ui/BrandIcons'
import { ProjectVisual } from '../visuals/ProjectVisuals'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.classList.add('modal-open')
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep Tab focus inside the dialog.
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="thin-scroll relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line-strong bg-ink-900 shadow-2xl sm:rounded-2xl"
          >
            <div className="relative aspect-[16/8] border-b border-line bg-gradient-to-br from-ink-800 to-ink-900">
              <ProjectVisual kind={project.visual} />
              <button ref={closeRef} type="button" onClick={onClose} className="icon-btn absolute right-3 top-3 !bg-ink-950/80 backdrop-blur" aria-label="Close project details">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="eyebrow !text-[0.68rem]">{project.category}</p>
              <h3 id="project-modal-title" className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">
                {project.title}
              </h3>

              <dl className="mt-6 grid grid-cols-3 gap-3">
                {project.facts.map((f) => (
                  <div key={f.label} className="rounded-xl border border-line bg-white/[0.02] p-3">
                    <dt className="text-[0.7rem] uppercase tracking-wider text-fg-subtle">{f.label}</dt>
                    <dd className="mt-1 font-display text-base font-semibold text-fg sm:text-lg">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-3">
                {project.overview.map((p) => (
                  <p key={p} className="leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
              </div>

              <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-fg">Key features</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-fg">Tech stack</h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {project.note && (
                <p className="mt-6 flex gap-2 rounded-xl border border-amber/25 bg-amber/[0.06] p-3 text-sm text-fg-muted">
                  <Info size={16} className="mt-0.5 shrink-0 text-amber" /> {project.note}
                </p>
              )}

              <p className="mt-6 text-xs text-fg-subtle">Thumbnail is an illustrative rendering of the project's outputs, not a screenshot of its results.</p>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <GitHubIcon width={16} height={16} /> View Repository
                </a>
                {project.demo && (
                  <a href={project.demo.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} /> {project.demo.label}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
