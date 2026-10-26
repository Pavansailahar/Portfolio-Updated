import { ArrowUpRight, ExternalLink, Maximize2 } from 'lucide-react'
import type { Project } from '../../data/profile'
import { GitHubIcon } from '../ui/BrandIcons'
import { ProjectVisual } from '../visuals/ProjectVisuals'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
  onOpen: (p: Project) => void
}

export function ProjectCard({ project, index, featured = false, onOpen }: ProjectCardProps) {
  return (
    <article
      className={`glass card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl ${
        featured ? 'lg:grid lg:grid-cols-[1.1fr_1fr]' : ''
      }`}
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className={`relative block w-full overflow-hidden border-b border-line bg-gradient-to-br from-ink-800 to-ink-900 text-left ${
          featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r' : 'aspect-[16/10]'
        }`}
        aria-label={`Open details for ${project.title}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgb(59_130_246/0.18),transparent_60%)]" />
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectVisual kind={project.visual} />
        </div>
        <span className="absolute bottom-3 right-3 z-10 rounded-md border border-line bg-ink-950/80 px-2 py-0.5 font-mono text-[0.65rem] text-fg-muted backdrop-blur">
          0{index + 1}
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-line bg-ink-950/70 text-fg-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Maximize2 size={14} />
        </span>
      </button>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:p-8' : ''}`}>
        <p className="eyebrow !text-[0.68rem]">{project.category}</p>
        <h3 className={`mt-3 font-semibold text-fg ${featured ? 'text-2xl md:text-[1.7rem]' : 'text-xl'}`}>{project.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, featured ? 4 : 3).map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip !text-[0.7rem]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !h-10 !px-4 text-sm">
            <GitHubIcon width={15} height={15} /> Repository
          </a>
          {project.demo && (
            <a href={project.demo.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-10 !px-4 text-sm">
              <ExternalLink size={15} /> {project.demo.label}
            </a>
          )}
          <button type="button" onClick={() => onOpen(project)} className="btn btn-ghost !h-10 !px-3 text-sm">
            Details <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}
