import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type LanguageCode } from '../../i18n'
import { Flag } from '../ui/Flags'

/** Accessible language dropdown (ARIA listbox pattern) for the navigation bar. */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])
  const listId = useId()

  const current = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0]
  const currentIndex = LANGUAGES.indexOf(current)

  const focusOption = (i: number) => optionRefs.current[(i + LANGUAGES.length) % LANGUAGES.length]?.focus()

  const close = (returnFocus = true) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  const select = (code: LanguageCode) => {
    if (code !== i18n.resolvedLanguage) void i18n.changeLanguage(code)
    close()
  }

  // Move focus to the selected option when the list opens.
  useEffect(() => {
    if (open) requestAnimationFrame(() => optionRefs.current[currentIndex]?.focus())
  }, [open, currentIndex])

  // Close on any pointer press outside the switcher.
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  const onButtonKey = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      setOpen(true)
    }
  }

  const onListKey = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        focusOption(index + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        focusOption(index - 1)
        break
      case 'Home':
        e.preventDefault()
        focusOption(0)
        break
      case 'End':
        e.preventDefault()
        focusOption(LANGUAGES.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        select(LANGUAGES[index].code)
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
      case 'Tab':
        close(false)
        break
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={t('language.button', { language: current.label })}
        className={`flex h-9 min-w-[6.75rem] items-center justify-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium transition-colors ${
          open ? 'border-cyan/40 bg-white/[0.08] text-fg' : 'border-line bg-white/[0.04] text-fg-muted hover:border-cyan/40 hover:text-fg'
        }`}
      >
        <Languages size={15} className="shrink-0 text-cyan" aria-hidden="true" />
        <span lang={current.code}>{current.short}</span>
        <ChevronDown size={13} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={t('language.listLabel')}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] min-w-[12rem] overflow-hidden rounded-xl border border-line-strong bg-ink-900/95 p-1.5 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
          >
            {LANGUAGES.map((lang, i) => {
              const selected = lang.code === current.code
              return (
                <li
                  key={lang.code}
                  ref={(el) => {
                    optionRefs.current[i] = el
                  }}
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  lang={lang.code}
                  onClick={() => select(lang.code)}
                  onKeyDown={(e) => onListKey(e, i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus-visible:bg-white/[0.07] focus-visible:ring-1 focus-visible:ring-cyan/50 ${
                    selected ? 'bg-cyan/[0.08] text-fg' : 'text-fg-muted hover:bg-white/[0.06] hover:text-fg'
                  }`}
                >
                  <Flag code={lang.code} />
                  <span className="flex-1">{lang.label}</span>
                  {selected && <Check size={15} className="text-cyan" aria-hidden="true" />}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
