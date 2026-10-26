import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            © {new Date().getFullYear()} · Data Analytics · Data Engineering · Machine Learning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile">
            <GitHubIcon width={17} height={17} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile">
            <LinkedInIcon width={16} height={16} />
          </a>
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send an email">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
