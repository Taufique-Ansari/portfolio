// Centralized site content (shared by the feature components and the animation engine).

export type Project = {
  id: string
  name: string
  date: string
  category: string
  year: string
  desc: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'binance-crm',
    name: 'Binance P2P CRM',
    date: '06 2025',
    category: 'Internal Tool',
    year: '2025',
    desc: 'A full-featured CRM for managing Binance P2P trading operations, self-hosted on a private server — real-time WebSocket chat between traders and agents, granular RBAC, JWT auth and an admin portal with operational dashboards.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'JWT', 'Docker'],
  },
  {
    id: 'tenant-management',
    name: 'Tenant Management System',
    date: '03 2025',
    category: 'Web Application',
    year: '2025',
    desc: 'An end-to-end platform to manage tenants, rent cycles and custom utility billing — a configurable per-unit electricity calculator, automated monthly statements, JWT-secured APIs and a role-based admin portal.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    id: 'digital-bookstore',
    name: 'Digital Book Store',
    date: '11 2024',
    category: 'Web Application',
    year: '2024',
    desc: 'A full-stack bookstore built on Spring Boot, Spring Data JPA and MySQL, secured with Spring Security + JWT, exposing REST APIs consumed by an Angular frontend.',
    tags: ['Spring Boot', 'Java', 'MySQL', 'Angular', 'JWT'],
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
  body: "I own problems end-to-end — from requirements to deployment — and I'm comfortable in ambiguous, fast-moving environments. Currently building enterprise software at Cognizant.",
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
