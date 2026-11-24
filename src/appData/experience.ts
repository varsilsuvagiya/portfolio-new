// Employment history. Source: resume. Bullet points live in src/dictionaries/*.json → experience.entries[id].
export const experience = [
  {
    id: 'cloudus',
    company: 'Cloudus Infotech PVT LTD',
    role: 'Software Engineer',
    start: '2026-02',
    end: null,
    location: 'Surat, Gujarat, India',
    tech: ['Next.js', 'Node.js', 'NestJS', 'REST APIs', 'PostgreSQL', 'Supabase', 'MongoDB', 'AWS', 'Vercel'],
  },
  {
    id: 'lathiya',
    company: 'Lathiya Solutions',
    role: 'Software Engineer',
    start: '2023-05',
    end: '2024-08',
    location: 'Surat, Gujarat, India',
    tech: ['React.js', 'Next.js', 'Node.js', 'Core PHP', 'JWT'],
  },
  {
    id: 'trueline',
    company: 'Trueline Solutions',
    role: 'Software Engineer Intern',
    start: '2022-11',
    end: '2023-04',
    location: 'Surat, Gujarat, India',
    tech: ['React.js', 'Next.js', 'Node.js', 'Git', 'GitLab'],
  },
] as const
