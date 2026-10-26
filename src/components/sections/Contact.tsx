import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'sent' | 'mailto' | 'error'; message?: string }

/**
 * Set VITE_WEB3FORMS_KEY (free at web3forms.com) to deliver messages straight
 * to the inbox. Without it, the form opens the visitor's email client with the
 * message pre-filled — it never pretends to have sent something it didn't.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={17} />, external: false },
  { label: 'LinkedIn', value: 'in/yakkalipavansai', href: profile.linkedin, icon: <LinkedInIcon width={16} height={16} />, external: true },
  { label: 'GitHub', value: `@${profile.githubUser}`, href: profile.github, icon: <GitHubIcon width={17} height={17} />, external: true },
]

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [honeypot, setHoneypot] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [e.target.name]: e.target.value }
    setFields(next)
    if (touched) setErrors(validate(next))
  }

  const openMailClient = () => {
    const body = `${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(fields.subject.trim())}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    if (honeypot) return // bot

    if (!WEB3FORMS_KEY) {
      openMailClient()
      setStatus({ kind: 'mailto', message: 'Your email app should open with the message ready to send. If nothing happened, email me directly at the address on the left.' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'Portfolio contact form',
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: `[Portfolio] ${fields.subject.trim()}`,
          message: fields.message.trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
      if (!res.ok || !json.success) throw new Error(json.message || 'Submission failed')
      setStatus({ kind: 'sent', message: "Thanks — your message has been delivered. I'll get back to you soon." })
      setFields({ name: '', email: '', subject: '', message: '' })
      setTouched(false)
    } catch {
      setStatus({ kind: 'error', message: 'Something went wrong sending your message.' })
    }
  }

  const field = (name: keyof Fields, label: string, opts: { type?: string; textarea?: boolean; placeholder: string; autoComplete?: string }) => (
    <div className={opts.textarea ? 'sm:col-span-2' : ''}>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium text-fg-muted">
        {label}
      </label>
      {opts.textarea ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          rows={5}
          value={fields[name]}
          onChange={onChange}
          placeholder={opts.placeholder}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          className="field resize-y"
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={opts.type ?? 'text'}
          value={fields[name]}
          onChange={onChange}
          placeholder={opts.placeholder}
          autoComplete={opts.autoComplete}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          className="field"
        />
      )}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-red-400">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <Section id="contact" className="pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-ink-800/80 via-ink-900/80 to-ink-950 p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-violet/15 blur-3xl" aria-hidden="true" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-fg-subtle">07</span>
              <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-[2.75rem]">
              Let's Build Something <span className="text-gradient">Meaningful</span> With Data.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-fg-muted">
              I'm always interested in opportunities to solve real-world problems, develop impactful data solutions, and collaborate on innovative projects.
            </p>

            <ul className="mt-8 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-ink-950/40 p-3.5 transition-colors hover:border-cyan/35"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 text-fg-muted transition-colors group-hover:text-cyan">
                      {l.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-fg-subtle">{l.label}</span>
                      <span className="block truncate text-sm font-medium text-fg">{l.value}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-fg-subtle transition-colors group-hover:text-cyan" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm text-fg-subtle">
              <MapPin size={14} /> Based in {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass rounded-2xl p-5 sm:p-7" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                {field('name', 'Name', { placeholder: 'Your name', autoComplete: 'name' })}
                {field('email', 'Email', { type: 'email', placeholder: 'you@company.com', autoComplete: 'email' })}
                <div className="sm:col-span-2">{field('subject', 'Subject', { placeholder: 'Internship, project, collaboration…' })}</div>
                {field('message', 'Message', { textarea: true, placeholder: 'Tell me a bit about what you have in mind.' })}
              </div>

              {/* Honeypot for bots — hidden from people and assistive tech */}
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />

              <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary mt-6 w-full sm:w-auto">
                {status.kind === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />}
                {status.kind === 'sending' ? 'Sending…' : WEB3FORMS_KEY ? 'Send Message' : 'Send via Email'}
              </button>

              <div aria-live="polite" className="min-h-0">
                {status.kind === 'sent' && (
                  <p className="mt-4 flex gap-2 rounded-xl border border-emerald/30 bg-emerald/[0.07] p-3 text-sm text-fg">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald" /> {status.message}
                  </p>
                )}
                {status.kind === 'mailto' && (
                  <p className="mt-4 flex gap-2 rounded-xl border border-cyan/30 bg-cyan/[0.06] p-3 text-sm text-fg-muted">
                    <Mail size={17} className="mt-0.5 shrink-0 text-cyan" /> {status.message}
                  </p>
                )}
                {status.kind === 'error' && (
                  <p className="mt-4 flex flex-wrap items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/[0.07] p-3 text-sm text-fg-muted">
                    <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-400" />
                    <span className="flex-1">
                      {status.message}{' '}
                      <button type="button" onClick={openMailClient} className="font-medium text-cyan underline-offset-2 hover:underline">
                        Send it by email instead
                      </button>
                      .
                    </span>
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
