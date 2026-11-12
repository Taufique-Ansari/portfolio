// Centralized site content (shared by the feature components and the animation engine).

export type Project = {
  id: string
  name: string
  date: string
  category: string
  year: string
  desc: string
  tags: string[]
  cover: string // image used by the list preview, gallery ring and work cube
  media: string[] // detail-view gallery; `.mp4` entries play as video with a same-name `.webp` poster
}

export const PROJECTS: Project[] = [
  {
    id: 'finsight',
    name: 'Finsight',
    date: '09 2025',
    category: 'Mobile App',
    year: '2025',
    desc: 'A personal finance app that links bank accounts, categorises every transaction and turns spending into clear cashflow insights — OTP sign-in, live balance checks, recurring-payment tracking and interactive charts.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Node.js'],
    cover: '/projects/finsight.webp',
    media: ['/projects/finsight.mp4', '/projects/finsight-mobile.webp'],
  },
  {
    id: 'ommimedia',
    name: 'Ommi Media',
    date: '11 2025',
    category: 'Agency Website',
    year: '2025',
    desc: 'The website for a content agency behind 1M+ views and 500K subscriber growth — an animated client marquee, a video showcase of their work, services and FAQ sections, and a call-booking flow for coaches, consultants and founders.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'GSAP'],
    cover: '/projects/ommimedia-home.webp',
    media: ['/projects/ommimedia.mp4', '/projects/ommimedia-home.webp'],
  },
  {
    id: 'binance-crm',
    name: 'Binance P2P CRM',
    date: '06 2025',
    category: 'Internal Tool',
    year: '2025',
    desc: 'A full-featured CRM for managing Binance P2P trading operations, self-hosted on a private server — real-time WebSocket chat between traders and agents, granular RBAC, JWT auth and an admin portal with operational dashboards.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'JWT', 'Docker'],
    cover: '/projects/bp2p-1.webp',
    media: [1, 2, 3, 4].map((i) => `/projects/bp2p-${i}.webp`),
  },
  {
    id: 'tenant-management',
    name: 'Tenant Management System',
    date: '03 2025',
    category: 'Web Application',
    year: '2025',
    desc: 'An end-to-end platform to manage tenants, rent cycles and custom utility billing — a configurable per-unit electricity calculator, automated monthly statements, JWT-secured APIs and a role-based admin portal.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    cover: '/projects/tenant-1.webp',
    media: [1, 2, 3, 4].map((i) => `/projects/tenant-${i}.webp`),
  },
  {
    id: 'digital-bookstore',
    name: 'Digital Book Store',
    date: '11 2024',
    category: 'Web Application',
    year: '2024',
    desc: 'A full-stack bookstore built on Spring Boot, Spring Data JPA and MySQL, secured with Spring Security + JWT, exposing REST APIs consumed by an Angular frontend.',
    tags: ['Spring Boot', 'Java', 'MySQL', 'Angular', 'JWT'],
    cover: '/projects/bookstore-1.webp',
    media: [1, 2, 3, 4].map((i) => `/projects/bookstore-${i}.webp`),
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    date: '09 2025',
    category: 'Web Design',
    year: '2025',
    desc: 'A collection of conversion-focused landing pages — Sahyadri Farms, a farmer-owned produce exporter; Northline, a remote staffing platform; and Ledgerly, a fintech infrastructure concept — each with a cinematic hero and scroll-driven motion.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Vercel'],
    cover: '/projects/landing-sahyadri.webp',
    media: ['/projects/landing-sahyadri.mp4', '/projects/landing-northline.mp4', '/projects/landing-ledgerly.mp4'],
  },
]

export type SkillGroup = { group: string; title: string; items: string[] }

export const SKILL_GROUPS: SkillGroup[] = [
  { group: 'languages', title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'C++'] },
  { group: 'frontend', title: 'Frontend', items: ['React.js', 'Next.js', 'Angular', 'Tailwind CSS', 'HTML', 'CSS'] },
  { group: 'backend', title: 'Backend', items: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'WebSockets'] },
  { group: 'database', title: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'] },
  { group: 'devops', title: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'Vercel', 'Postman', 'Maven'] },
  { group: 'methodologies', title: 'Methodologies', items: ['Agile (Scrum)', 'SDLC', 'TDD', 'Microservices'] },
]

// Newest first. Totals shown in the Info overlay heading.
export const EXPERIENCE = {
  summary: '2 yrs freelance · 1 yr Cognizant',
  roles: [
    { period: 'Aug 2026 — Present', role: 'Freelance Full Stack Engineer' },
    { period: 'Aug 2025 — Aug 2026', role: 'Full Stack Engineer, Cognizant' },
    { period: 'Aug 2024 — Aug 2025', role: 'Freelance Full Stack Engineer' },
  ],
}

export const SOCIALS = {
  leetcode: 'https://leetcode.com/u/taufiqueansari451',
  linkedin: 'https://www.linkedin.com/in/taufique-ansari1',
  github: 'https://github.com/Taufique-Ansari',
  email: 'taufiqueansari451@gmail.com',
  site: 'taufiqueansari.in',
}

export const INFO = {
  heading: 'Taufique Ansari.',
  lead: 'Full Stack Engineer building production-grade systems across frontend, backend and integrations.',
  body: "I own problems end-to-end — from requirements to deployment — and I'm comfortable in ambiguous, fast-moving environments.",
  basedIn: 'Pune, India',
  status: 'Open to opportunities',
}

export const CONTACT = {
  heading: "Let's build together.",
  lead: 'Full stack engineer, focused on robust systems, clean APIs and great product experiences.',
  body: "If you have a project in mind or an ambitious idea, I'd be glad to discuss it and explore how we can build it together.",
  cardTitle: "Let's talk about your project.",
  cardBody: 'I respond quickly to roles, freelance missions and collaborations around web and backend systems.',
  basedIn: 'Pune, India',
  status: 'Full Stack Engineer',
  response: '24h',
  shortcuts: ['Direct mail', 'LinkedIn', 'GitHub', 'LeetCode'],
  brief: ['Product goal', 'Target deadline', 'Tech stack', 'Expected deliverables'],
}
