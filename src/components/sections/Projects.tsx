import { ArrowUpRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { otherProjects, projects, type Project } from '../../data/profile'
import { GitHubIcon } from '../ui/BrandIcons'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModal } from '../projects/ProjectModal'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const close = useCallback(() => setActive(null), [])
  const [lead, ...rest] = projects

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Featured Projects"
        title="Pipelines, models and dashboards — end to end."
        description="Three projects that span data engineering, machine learning and business intelligence. Open any card for the full breakdown."
      />

      <div className="grid gap-6">
        <Reveal>
          <ProjectCard project={lead} index={0} featured onOpen={setActive} />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} index={i + 1} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <h3 className="mb-5 mt-16 text-sm font-semibold uppercase tracking-wider text-fg-muted">More projects</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.06} className="h-full">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card-hover group flex h-full flex-col rounded-2xl p-6"
              aria-label={`${p.title} — view repository on GitHub`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="eyebrow !text-[0.65rem] !normal-case !tracking-wide">{p.category}</p>
                <ArrowUpRight size={16} className="shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
              </div>
              <h4 className="mt-3 text-lg font-semibold leading-snug text-fg">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.summary}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {p.tech.map((t) => (
                  <span key={t} className="chip !text-[0.68rem]">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors group-hover:text-cyan">
                <GitHubIcon width={14} height={14} /> Repository
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={active} onClose={close} />
    </Section>
  )
}
