import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            © {new Date().getFullYear()} · {t('footer.tagline')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t('footer.githubAria')}>
            <GitHubIcon width={17} height={17} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={t('footer.linkedinAria')}>
            <LinkedInIcon width={16} height={16} />
          </a>
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={t('footer.emailAria')}>
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
