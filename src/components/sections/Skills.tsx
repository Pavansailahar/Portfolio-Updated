import { BarChart3, BrainCircuit, Code2, Database, Wrench, Workflow, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { skillGroups, type SkillGroupId } from '../../data/profile'
import { useTerm } from '../../hooks/useContent'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  pipeline: Workflow,
  brain: BrainCircuit,
  database: Database,
  tools: Wrench,
}

const groupAccent: Record<SkillGroupId, string> = {
  code: 'from-cyan/25 to-blue/10 text-cyan',
  chart: 'from-amber/25 to-orange-500/10 text-amber',
  pipeline: 'from-blue/25 to-violet/10 text-blue',
  brain: 'from-violet/25 to-fuchsia-500/10 text-violet',
  database: 'from-emerald/25 to-teal-500/10 text-emerald',
  tools: 'from-slate-400/20 to-slate-500/10 text-silver',
}

/** Brand-ish colour dots so each technology is recognisable at a glance. */
const techColor: Record<string, string> = {
  Java: '#f89820',
  Python: '#3776ab',
  SQL: '#22d3ee',
  'Power BI': '#f2c811',
  Tableau: '#e97627',
  Pandas: '#a78bfa',
  NumPy: '#4dabcf',
  Matplotlib: '#11557c',
  Seaborn: '#7db0d6',
  Databricks: '#ff3621',
  'Delta Lake': '#00add4',
  'SQL Server': '#cc2927',
  'T-SQL': '#cc2927',
  'Azure Data Factory': '#0078d4',
  'Azure Synapse Analytics': '#0078d4',
  'Azure Storage': '#0078d4',
  'Scikit-learn': '#f7931e',
  MySQL: '#4479a1',
  PostgreSQL: '#4169e1',
  MongoDB: '#47a248',
  Git: '#f05032',
  GitHub: '#e6eaf5',
  'Jupyter Notebook': '#f37626',
  'Google Colab': '#f9ab00',
  'Eclipse IDE': '#7c5cd6',
  'Apache NetBeans': '#1b6ac6',
}

/* Bento layout: the larger groups get extra width so rows stay balanced. */
const order: SkillGroupId[] = ['pipeline', 'code', 'chart', 'brain', 'database', 'tools']
const ordered = order.map((id) => skillGroups.find((g) => g.id === id)).filter((g): g is (typeof skillGroups)[number] => Boolean(g))
const wide: Partial<Record<SkillGroupId, string>> = { pipeline: 'sm:col-span-2', tools: 'sm:col-span-2 lg:col-span-3' }

export function Skills() {
  const { t } = useTranslation()
  const term = useTerm()
  return (
    <Section id="skills">
      <SectionHeading index="05" eyebrow={t('skills.eyebrow')} title={t('skills.title')} description={t('skills.description')} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((g, i) => {
          const Icon = groupIcons[g.id]
          return (
            <Reveal key={g.id} delay={(i % 3) * 0.07} className={`h-full ${wide[g.id] ?? ''}`}>
              <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${groupAccent[g.id]}`}>
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg">{t(`skills.groups.${g.id}.title`)}</h3>
                    <p className="text-xs text-fg-subtle">{t(`skills.groups.${g.id}.blurb`)}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s} className="chip !py-1.5 !text-[0.8rem] !text-fg transition-colors hover:border-cyan/40">
                      <span className="h-2 w-2 rounded-full" style={{ background: techColor[s] ?? 'var(--color-fg-subtle)' }} aria-hidden="true" />
                      {term(s)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
