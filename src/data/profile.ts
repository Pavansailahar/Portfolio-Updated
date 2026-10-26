/**
 * Single source of truth for all portfolio content.
 * Everything here comes from the resume, the public GitHub profile/READMEs,
 * or details supplied directly by Pavan. Edit this file to update the site.
 */

export const profile = {
  name: 'Pavan Sai Lahar Yakkali',
  shortName: 'Pavan Sai',
  initials: 'PY',
  role: 'Data Analyst Intern | Data Engineering | Machine Learning',
  location: 'Hyderabad, India',
  email: 'pavansailahar.yakkali@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yakkalipavansai',
  github: 'https://github.com/Pavansailahar',
  githubUser: 'Pavansailahar',
  resume: '/Pavan_Sai_Lahar_Yakkali_Resume.pdf',
  headline: ['Turning Data Into Decisions.', 'Building Solutions That Matter.'],
  intro:
    "I'm Pavan Sai Lahar Yakkali, a Data Science undergraduate and aspiring data professional passionate about transforming complex datasets into actionable insights and building intelligent, data-driven solutions.",
} as const

export const education = {
  school: 'KLEF Deemed to be University',
  degree: 'B.Tech in Computer Science Engineering — Data Science & Big Data Analytics',
  period: 'Jul 2023 – May 2027',
  cgpa: '9.19',
}

export const aboutParagraphs = [
  "I'm a B.Tech student in Computer Science Engineering, specializing in Data Science & Big Data Analytics at KLEF Deemed to be University. I enjoy the full journey of data — from messy raw extracts to the dashboard a decision-maker actually opens.",
  'As a Data Analyst Intern at Apollo Pharmacy, I analyzed pharmacy sales and operational data, built Power BI dashboards for KPI tracking, and worked on cleaning, validation and ETL workflows with SQL, Python and Databricks.',
  "I'm especially drawn to building reliable data pipelines and business intelligence solutions, and to applying machine learning for predictive analytics. Alongside data work I keep sharpening my software engineering fundamentals in Java and data structures.",
  'I learn by building — every project here started as a question I wanted to answer properly, with reproducible code and honest numbers.',
]

export const aboutFocus = [
  { label: 'Data Analytics', detail: 'Trends, KPIs, and stakeholder-ready insight' },
  { label: 'Data Engineering', detail: 'Medallion pipelines, ETL, Delta Lake' },
  { label: 'Machine Learning', detail: 'Forecasting, classification, clustering' },
  { label: 'Business Intelligence', detail: 'Power BI and Tableau dashboards' },
]

export const stats = [
  { value: '9.19', label: 'CGPA', sub: 'KLEF University' },
  { value: 'Apollo', label: 'Internship', sub: 'Apollo Pharmacy' },
  { value: '6', label: 'Projects', sub: '3 featured below' },
  { value: '5', label: 'Certifications', sub: 'Earned' },
]

export const experience = {
  role: 'Data Analyst Intern',
  company: 'Apollo Pharmacy',
  period: 'June 2026 – October 2026',
  location: 'India',
  summary:
    'Analyzed pharmacy sales and inventory data to identify trends and support business decisions. Developed interactive Power BI dashboards to monitor key performance indicators and implemented data cleaning, validation, and ETL workflows using SQL, Python, and Databricks.',
  highlights: [
    { title: 'Sales & customer trend analysis', text: 'Pharmacy sales data analysed to surface customer trends that support business decision-making.' },
    { title: 'Interactive Power BI dashboards', text: 'Dashboards tracking 15+ KPIs including revenue, inventory turnover and customer lifetime value.' },
    { title: 'SQL & Python transformation', text: 'ETL pipelines that clean, validate and transform structured data from multiple sources.' },
    { title: 'Databricks workflows', text: 'Data engineering work on Databricks for transformation and analysis.' },
    { title: 'KPI tracking & reporting', text: 'Recurring business reporting built around agreed KPIs.' },
    { title: 'Data quality & validation', text: 'Automated validation rules that reduced data errors by 25%.' },
  ],
  stack: ['SQL', 'Python', 'Databricks', 'Power BI', 'ETL'],
}

export type ProjectVisualKind = 'retail' | 'delivery' | 'warehouse'

export interface Project {
  id: string
  title: string
  category: string
  visual: ProjectVisualKind
  summary: string
  overview: string[]
  features: string[]
  tech: string[]
  facts: { label: string; value: string }[]
  repo: string
  demo?: { label: string; url: string }
  note?: string
}

export const projects: Project[] = [
  {
    id: 'apollo-goa',
    title: 'Apollo Goa Retail Sales Analytics Platform',
    category: 'Data Engineering & Machine Learning',
    visual: 'retail',
    summary:
      'Retail analytics platform built on a SQL medallion architecture and Databricks Delta Lake, processing 7.17M+ transaction records with store-level Prophet forecasting and ABC/XYZ + K-Means segmentation.',
    overview: [
      'Developed a retail analytics platform using a SQL medallion architecture and Databricks Delta Lake to process more than 7.17 million transaction records.',
      'Raw POS extracts were consolidated in SQL Server, re-modelled through bronze/silver/gold layers, mirrored into Databricks as Delta tables, and surfaced through a Power BI report and a standalone web dashboard.',
      'Implemented Prophet-based store-level sales forecasting and customer/product segmentation using ABC/XYZ analysis and K-Means clustering.',
    ],
    features: [
      'SQL Server bronze → silver → gold medallion views over one consolidated sales table',
      'Databricks Delta Lake layers with business-question SQL notebooks',
      'Prophet forecasting for per-store next-month sales',
      'Store-SKU segmentation with ABC/XYZ analysis and K-Means',
      'Power BI dashboard with 30+ visuals plus a web dashboard with data lineage docs',
    ],
    tech: ['SQL Server', 'Python', 'Pandas', 'Scikit-learn', 'Databricks', 'Delta Lake', 'Prophet', 'Power BI'],
    facts: [
      { label: 'Transaction rows', value: '7.17M+' },
      { label: 'Goa stores', value: '58' },
      { label: 'Time span', value: 'Jan 2024 – Jun 2026' },
    ],
    repo: 'https://github.com/Pavansailahar/Apollo-Goa-Data-Engineering-project',
    demo: { label: 'Live Dashboard', url: 'https://apollo-sales-dashboard-tyaj.vercel.app/' },
  },
  {
    id: 'zomato-bi',
    title: 'Zomato BI & Delivery Time Prediction Platform',
    category: 'Machine Learning & Business Intelligence',
    visual: 'delivery',
    summary:
      'End-to-end analytics pipeline with ML models for delivery-time prediction and customer churn classification, plus a six-page Power BI dashboard backed by automated tests.',
    overview: [
      'Built an end-to-end analytics pipeline incorporating machine learning models for delivery-time prediction and customer churn classification.',
      'Twelve raw operational tables move through cleaning, SQL analytics, exploratory analysis and feature engineering into two independent ML problems and Power BI-ready datasets — each stage reproducible with its own script.',
      'Developed a six-page Power BI dashboard with automated testing and reproducible analytical workflows.',
    ],
    features: [
      'Delivery-time regression from distance, traffic, weather and prep-time features',
      'Customer churn classification over a 60-day inactivity window',
      'SQL analytics on PostgreSQL and SQLite',
      'Six-page Power BI dashboard and written business-insights report',
      'Automated test suite and one-script-per-stage reproducible pipeline',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'PostgreSQL', 'SQLite', 'Power BI', 'Jupyter Notebook'],
    facts: [
      { label: 'Raw tables', value: '12' },
      { label: 'ML problems', value: '2' },
      { label: 'Dashboard pages', value: '6' },
    ],
    repo: 'https://github.com/Pavansailahar/Zomato-Business-Intelligence-Delivery-Time-Prediction-Platform',
    note: 'Built on a synthetic, Zomato-style dataset for learning purposes — not real Zomato data.',
  },
  {
    id: 'sql-warehouse',
    title: 'SQL Data Warehouse — Medallion Architecture',
    category: 'Data Engineering',
    visual: 'warehouse',
    summary:
      'SQL Server data warehouse integrating CRM and ERP sources through Bronze, Silver and Gold layers into an analytics-ready star schema.',
    overview: [
      'Designed a SQL Server data warehouse integrating CRM and ERP data through a Bronze, Silver, and Gold medallion architecture.',
      'Implemented ETL workflows with stored procedures for ingestion, data cleansing, standardization and multi-source integration.',
      'Modelled the Gold layer as a star schema so business users can query clean dimensions and facts directly.',
    ],
    features: [
      'Bronze / Silver / Gold layered warehouse in SQL Server',
      'Stored-procedure ETL for ingestion, cleansing and standardization',
      'CRM + ERP multi-source integration',
      'Star schema dimensional model for analytics',
      'Data quality checks and documented naming conventions',
    ],
    tech: ['SQL Server', 'T-SQL', 'Stored Procedures', 'ETL', 'Medallion Architecture', 'Star Schema'],
    facts: [
      { label: 'Layers', value: '3' },
      { label: 'Source systems', value: 'CRM + ERP' },
      { label: 'Model', value: 'Star schema' },
    ],
    repo: 'https://github.com/Pavansailahar/Data-Warehouse',
  },
]

export interface SkillGroup {
  title: string
  icon: 'code' | 'chart' | 'pipeline' | 'brain' | 'database' | 'tools'
  blurb: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: 'Programming Languages', icon: 'code', blurb: 'Core languages for analysis and engineering', skills: ['Java', 'Python', 'SQL'] },
  {
    title: 'Data Analytics & Visualization',
    icon: 'chart',
    blurb: 'From exploration to stakeholder dashboards',
    skills: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Data Engineering',
    icon: 'pipeline',
    blurb: 'Pipelines, warehouses and cloud data services',
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
  {
    title: 'Machine Learning',
    icon: 'brain',
    blurb: 'Predictive models that answer business questions',
    skills: ['Scikit-learn', 'Predictive Analytics', 'Classification', 'Clustering', 'Time-Series Forecasting'],
  },
  { title: 'Databases', icon: 'database', blurb: 'Relational and document stores', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'] },
  {
    title: 'Development Tools',
    icon: 'tools',
    blurb: 'Everyday environment',
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'Eclipse IDE', 'Apache NetBeans'],
  },
]

export const certifications = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    issuer: 'Oracle',
    area: 'Cloud · Data Science',
    accent: 'from-red-500/25 to-orange-400/10',
  },
  {
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB',
    area: 'Databases · NoSQL',
    accent: 'from-emerald-500/25 to-green-400/10',
  },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    area: 'Cloud · Architecture',
    accent: 'from-amber-500/25 to-orange-400/10',
  },
  {
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    area: 'Version Control · DevOps',
    accent: 'from-slate-300/20 to-violet-400/10',
  },
  {
    title: 'Japanese-Language Proficiency Test (JLPT) N5',
    issuer: 'Japan Foundation & JEES',
    area: 'Language',
    accent: 'from-pink-500/25 to-rose-400/10',
  },
]

/** Smaller projects shown below the featured three. */
export const otherProjects = [
  {
    title: 'Supply Chain Control Tower',
    category: 'Analytics Engineering · ML · Operations Research',
    summary:
      'Synthetic ERP supply-chain data modelled with dbt on DuckDB, Prophet demand forecasts tracked in MLflow, OR-Tools reorder-point optimization and a Streamlit dashboard, orchestrated by Airflow on Docker with GitHub Actions CI.',
    tech: ['dbt', 'DuckDB', 'Prophet', 'MLflow', 'OR-Tools', 'Airflow', 'Docker', 'Streamlit'],
    repo: 'https://github.com/Pavansailahar/Supply_chain_management',
  },
  {
    title: 'Twitter Sentiment Analysis',
    category: 'NLP · Machine Learning',
    summary:
      'Hackathon project classifying tweets as positive or negative: text preprocessing and stemming, TF-IDF features and Logistic Regression trained on the 1.6M-tweet Sentiment140 dataset (77.6% test accuracy).',
    tech: ['Python', 'NLTK', 'Scikit-learn', 'TF-IDF', 'Pandas'],
    repo: 'https://github.com/Pavansailahar/Twitter-Sentiment-Analysis',
  },
  {
    title: 'Autonomous Mobile Robot & AGV Navigation',
    category: 'Robotics · Control Systems',
    summary:
      'Differential-drive mobile robot simulation with ROS 2 Jazzy, Gazebo Harmonic and Nav2 — LiDAR and camera sensors, SLAM mapping, AMCL localization and autonomous navigation with an MPPI controller.',
    tech: ['ROS 2', 'Gazebo', 'Nav2', 'SLAM Toolbox', 'ros2_control', 'Python'],
    repo: 'https://github.com/Pavansailahar/Autonomous-Mobile-Robot-AGV-Navigation---Control-Systems-',
  },
]

export const achievements = [
  {
    title: 'Ramanujan Mathematics Olympiad',
    tag: 'Second Place',
    icon: 'trophy' as const,
    text: 'Secured second place, demonstrating strong mathematical aptitude, analytical thinking and problem-solving ability.',
  },
  {
    title: 'Ohayo Japan — KL University 2026',
    tag: 'Core Team Member',
    icon: 'users' as const,
    text: 'Core member of the event management team, coordinating activities and hospitality — leadership, teamwork and organization in practice.',
  },
  {
    title: 'One-Day Hackathon',
    tag: 'Team Lead',
    icon: 'zap' as const,
    text: 'Led a team to build a Twitter Sentiment Analysis project, presented the project review, and explored AI tools and their practical applications.',
    link: 'https://github.com/Pavansailahar/Twitter-Sentiment-Analysis',
  },
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

/** Repositories surfaced in the GitHub section, in display order (verified public repos). */
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

export const repoBlurbs: Record<string, string> = {
  'Apollo-Goa-Data-Engineering-project': 'Medallion pipeline, Databricks Delta Lake, Prophet forecasting and store-SKU segmentation.',
  'Apollo-Sales-Dashboard': 'Standalone web dashboard for the Goa retail sales analysis.',
  'Zomato-Business-Intelligence-Delivery-Time-Prediction-Platform': 'Delivery-time regression, churn classification and Power BI reporting.',
  'Data-Warehouse': 'SQL Server warehouse integrating CRM and ERP data into a star schema.',
  Supply_chain_management: 'dbt + DuckDB marts, Prophet forecasts in MLflow, OR-Tools optimization, Airflow on Docker.',
  'Autonomous-Mobile-Robot-AGV-Navigation---Control-Systems-': 'ROS 2 + Gazebo differential-drive robot with SLAM, AMCL and Nav2 navigation.',
  'Twitter-Sentiment-Analysis': 'Hackathon project classifying tweet sentiment with TF-IDF and Logistic Regression.',
}
