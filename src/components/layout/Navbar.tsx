import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navItems, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const active = useActiveSection(navItems)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label={t('nav.primary')} className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex shrink-0 items-center gap-2.5" aria-label={t('nav.logoAria', { name: profile.name })}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-gradient-to-br from-cyan/20 to-violet/20 font-display text-sm font-bold text-fg transition-colors group-hover:border-cyan/50">
            {profile.initials}
          </span>
          <span className="hidden font-display text-[0.95rem] font-semibold text-fg sm:block">{profile.shortName}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`nav-link block whitespace-nowrap rounded-lg px-2.5 py-2 text-sm transition-colors xl:px-3 ${
                  active === id ? 'text-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <a href={profile.resume} download className="btn btn-secondary hidden !h-9 !px-3.5 text-sm md:inline-flex">
            {t('nav.resume')}
          </a>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              {navItems.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base ${
                      active === id ? 'bg-white/5 text-fg' : 'text-fg-muted'
                    }`}
                  >
                    {t(`nav.${id}`)}
                    {active === id && <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />}
                  </a>
                </li>
              ))}
              <li className="mt-2 px-3 pb-2">
                <a href={profile.resume} download className="btn btn-primary w-full">
                  {t('nav.downloadResume')}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
