/**
 * Language-neutral portfolio data: names, links, numbers and technology names.
 * All human-readable text lives in src/locales/<lang>/translation.json and is
 * joined with this data in src/hooks/useContent.ts.
 */

export const profile = {
  name: 'Pavan Sai Lahar Yakkali',
  shortName: 'Pavan Sai',
  initials: 'PY',
  email: 'pavansailahar.yakkali@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yakkalipavansai',
  linkedinHandle: 'in/yakkalipavansai',
  github: 'https://github.com/Pavansailahar',
  githubUser: 'Pavansailahar',
  resume: `${import.meta.env.BASE_URL}Pavan_Sai_Lahar_Yakkali_Resume.pdf`,
} as const

export const education = {
  school: 'KLEF Deemed to be University',
  cgpa: '9.19',
}

/** Text for each stat lives at about.stats.<key> */
export const stats = [
  { key: 'cgpa', value: '9.19' },
  { key: 'internship', value: 'Apollo' },
  { key: 'projects', value: '6' },
  { key: 'certifications', value: '5' },
] as const

export const experience = {
  company: 'Apollo Pharmacy',
  stack: ['SQL', 'Python', 'Databricks', 'Power BI', 'ETL'],
}

export type ProjectVisualKind = 'retail' | 'delivery' | 'warehouse'

/** Text for each project lives at projects.items.<id> */
export const projectData = [
  {
    id: 'apollo-goa',
    title: 'Apollo Goa Retail Sales Analytics Platform',
    visual: 'retail',
    tech: ['SQL Server', 'Python', 'Pandas', 'Scikit-learn', 'Databricks', 'Delta Lake', 'Prophet', 'Power BI'],
    repo: 'https://github.com/Pavansailahar/Apollo-Goa-Data-Engineering-project',
    demoUrl: 'https://apollo-sales-dashboard-tyaj.vercel.app/',
  },
  {
    id: 'zomato-bi',
    title: 'Zomato BI & Delivery Time Prediction Platform',
    visual: 'delivery',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'PostgreSQL', 'SQLite', 'Power BI', 'Jupyter Notebook'],
    repo: 'https://github.com/Pavansailahar/Zomato-Business-Intelligence-Delivery-Time-Prediction-Platform',
  },
  {
    id: 'sql-warehouse',
    title: 'SQL Data Warehouse — Medallion Architecture',
    visual: 'warehouse',
    tech: ['SQL Server', 'T-SQL', 'Stored Procedures', 'ETL', 'Medallion Architecture', 'Star Schema'],
    repo: 'https://github.com/Pavansailahar/Data-Warehouse',
  },
] as const satisfies readonly { id: string; title: string; visual: ProjectVisualKind; tech: readonly string[]; repo: string; demoUrl?: string }[]

/** Smaller projects shown below the featured three. Text lives at projects.other.<id> */
export const otherProjectData = [
  {
    id: 'supply-chain',
    title: 'Supply Chain Control Tower',
    tech: ['dbt', 'DuckDB', 'Prophet', 'MLflow', 'OR-Tools', 'Airflow', 'Docker', 'Streamlit'],
    repo: 'https://github.com/Pavansailahar/Supply_chain_management',
  },
  {
    id: 'twitter',
    title: 'Twitter Sentiment Analysis',
    tech: ['Python', 'NLTK', 'Scikit-learn', 'TF-IDF', 'Pandas'],
    repo: 'https://github.com/Pavansailahar/Twitter-Sentiment-Analysis',
  },
  {
    id: 'agv',
    title: 'Autonomous Mobile Robot & AGV Navigation',
    tech: ['ROS 2', 'Gazebo', 'Nav2', 'SLAM Toolbox', 'ros2_control', 'Python'],
    repo: 'https://github.com/Pavansailahar/Autonomous-Mobile-Robot-AGV-Navigation---Control-Systems-',
  },
] as const

export type SkillGroupId = 'code' | 'chart' | 'pipeline' | 'brain' | 'database' | 'tools'

/** Group titles live at skills.groups.<id>; concept names are translated via terms.<name>. */
export const skillGroups: { id: SkillGroupId; skills: string[] }[] = [
  { id: 'code', skills: ['Java', 'Python', 'SQL'] },
  { id: 'chart', skills: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  {
    id: 'pipeline',
    skills: [
      'Databricks',
      'Delta Lake',
      'ETL Pipelines',
      'Medallion Architecture',
      'SQL Server',
      'T-SQL',
      'Azure Data Factory',
      'Azure Synapse Analytics',
      'Azure Storage',
    ],
  },
  { id: 'brain', skills: ['Scikit-learn', 'Predictive Analytics', 'Classification', 'Clustering', 'Time-Series Forecasting'] },
  { id: 'database', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'] },
  { id: 'tools', skills: ['Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'Eclipse IDE', 'Apache NetBeans'] },
]

/** Text lives at achievements.certs.<id> */
export const certificationData = [
  { id: 'oci', accent: 'from-red-500/25 to-orange-400/10' },
  { id: 'mongodb', accent: 'from-emerald-500/25 to-green-400/10' },
  { id: 'aws', accent: 'from-amber-500/25 to-orange-400/10' },
  { id: 'github', accent: 'from-slate-300/20 to-violet-400/10' },
  { id: 'jlpt', accent: 'from-pink-500/25 to-rose-400/10' },
] as const

/** Text lives at achievements.items.<id> */
export const achievementData = [
  { id: 'olympiad', icon: 'trophy' },
  { id: 'ohayo', icon: 'users' },
  { id: 'hackathon', icon: 'zap', link: 'https://github.com/Pavansailahar/Twitter-Sentiment-Analysis' },
] as const

/** Labels live at nav.<id> */
export const navItems = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'] as const

/** Repositories surfaced in the GitHub section, in display order (verified public repos). Blurbs live at github.repoBlurbs. */
export const featuredRepoNames = [
  'Apollo-Goa-Data-Engineering-project',
  'Apollo-Sales-Dashboard',
  'Zomato-Business-Intelligence-Delivery-Time-Prediction-Platform',
  'Data-Warehouse',
  'Supply_chain_management',
  'Autonomous-Mobile-Robot-AGV-Navigation---Control-Systems-',
  'Twitter-Sentiment-Analysis',
]

/** Offline fallback when the GitHub API is unreachable or rate-limited. */
export const fallbackRepos = [
  { name: 'Apollo-Goa-Data-Engineering-project', language: 'Jupyter Notebook', homepage: null },
  { name: 'Apollo-Sales-Dashboard', language: 'HTML', homepage: 'https://apollo-sales-dashboard-tyaj.vercel.app' },
  { name: 'Zomato-Business-Intelligence-Delivery-Time-Prediction-Platform', language: 'Jupyter Notebook', homepage: null },
  { name: 'Data-Warehouse', language: 'TSQL', homepage: null },
  { name: 'Supply_chain_management', language: 'Python', homepage: null },
  { name: 'Autonomous-Mobile-Robot-AGV-Navigation---Control-Systems-', language: 'Python', homepage: null },
  { name: 'Twitter-Sentiment-Analysis', language: 'Jupyter Notebook', homepage: null },
]
