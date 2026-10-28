import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { HeroDashboard } from '../visuals/HeroDashboard'

export function Hero() {
  const { t } = useTranslation()
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
            {t('hero.badge')}
          </motion.div>

          <motion.h1 {...rise(0.08)} className="hero-headline mt-6 text-[2.4rem] font-bold leading-[1.06] text-fg sm:text-[3.4rem] lg:text-[3.25rem] xl:text-[3.7rem]">
            {t('hero.headline1')}
            <br />
            <span className="text-gradient">{t('hero.headline2')}</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {t('hero.intro')}
          </motion.p>

          <motion.p {...rise(0.2)} className="mt-4 flex items-center gap-1.5 text-sm text-fg-subtle">
            <MapPin size={14} /> {t('hero.location')}
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary group">
              {t('hero.explore')}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resume} download className="btn btn-secondary">
              <Download size={16} /> {t('hero.download')}
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Send size={16} /> {t('hero.connect')}
            </a>
          </motion.div>

          <motion.div {...rise(0.34)} className="mt-10 flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t('hero.githubAria')}>
              <GitHubIcon width={18} height={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t('hero.linkedinAria')}>
              <LinkedInIcon width={17} height={17} />
            </a>
            <span className="ml-2 hidden h-px w-10 bg-line-strong sm:block" aria-hidden="true" />
            <span className="hidden font-mono text-xs text-fg-subtle sm:block">{t('hero.degreeLine')}</span>
          </motion.div>
        </div>

        <HeroDashboard />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-fg-subtle transition-colors hover:text-fg md:flex"
        aria-label={t('hero.scrollAria')}
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <span className="scroll-dot h-1.5 w-1 rounded-full bg-cyan" />
        </span>
        {t('hero.scroll')}
      </a>
    </section>
  )
}
