import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { HeroDashboard } from '../visuals/HeroDashboard'

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  })

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pb-20 pt-28 md:pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:px-8">
        <div>
          <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 text-[0.7rem] font-medium text-cyan sm:text-[0.8rem]">
            <span className="live-dot" />
            {profile.role}
          </motion.div>

          <motion.h1 {...rise(0.08)} className="mt-6 text-[2.4rem] font-bold leading-[1.06] text-fg sm:text-[3.4rem] lg:text-[3.25rem] xl:text-[3.7rem]">
            {profile.headline[0]}
            <br />
            <span className="text-gradient">{profile.headline[1]}</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.p {...rise(0.2)} className="mt-4 flex items-center gap-1.5 text-sm text-fg-subtle">
            <MapPin size={14} /> {profile.location}
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary group">
              Explore My Projects
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resume} download className="btn btn-secondary">
              <Download size={16} /> Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Send size={16} /> Let's Connect
            </a>
          </motion.div>

          <motion.div {...rise(0.34)} className="mt-10 flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile (opens in new tab)">
              <GitHubIcon width={18} height={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in new tab)">
              <LinkedInIcon width={17} height={17} />
            </a>
            <span className="ml-2 hidden h-px w-10 bg-line-strong sm:block" aria-hidden="true" />
            <span className="hidden font-mono text-xs text-fg-subtle sm:block">B.Tech · Data Science & Big Data Analytics</span>
          </motion.div>
        </div>

        <HeroDashboard />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-fg-subtle transition-colors hover:text-fg md:flex"
        aria-label="Scroll to About section"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <span className="scroll-dot h-1.5 w-1 rounded-full bg-cyan" />
        </span>
        Scroll
      </a>
    </section>
  )
}
