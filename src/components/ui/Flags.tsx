import { useId } from 'react'
import type { LanguageCode } from '../../i18n'

/*
 * Inline SVG flags. Emoji flags render as plain letters ("GB", "JP") on
 * Windows, so these keep the switcher consistent on every platform.
 */

const frame = 'h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/15'

function UnitedKingdom() {
  const id = useId()
  return (
    <svg viewBox="0 0 60 30" className={frame} aria-hidden="true" preserveAspectRatio="none">
      <clipPath id={`${id}-s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}-t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}-s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function Japan() {
  return (
    <svg viewBox="0 0 3 2" className={frame} aria-hidden="true">
      <rect width="3" height="2" fill="#fff" />
      <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
    </svg>
  )
}

function India() {
  return (
    <svg viewBox="0 0 3 2" className={frame} aria-hidden="true">
      <rect width="3" height="0.667" fill="#FF9933" />
      <rect y="0.667" width="3" height="0.667" fill="#fff" />
      <rect y="1.333" width="3" height="0.667" fill="#138808" />
      <circle cx="1.5" cy="1" r="0.27" fill="none" stroke="#000080" strokeWidth="0.06" />
      <circle cx="1.5" cy="1" r="0.06" fill="#000080" />
    </svg>
  )
}

export function Flag({ code }: { code: LanguageCode }) {
  if (code === 'ja') return <Japan />
  if (code === 'hi') return <India />
  return <UnitedKingdom />
}
