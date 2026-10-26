import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-fg-subtle">{index}</span>
        <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">{description}</p>}
    </Reveal>
  )
}
