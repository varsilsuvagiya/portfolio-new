// Technical skills, exactly as listed in the resume. Group labels live in src/dictionaries/*.json → expertise.groups.
export const skillGroups = [
  { id: 'languages', items: ['JavaScript', 'TypeScript', 'PHP'] },
  { id: 'frontend', items: ['React.js', 'Next.js', 'Laravel Blade'] },
  { id: 'backend', items: ['Node.js', 'Express.js', 'Django', 'Laravel'] },
  { id: 'databases', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Supabase'] },
  { id: 'devops', items: ['Docker', 'AWS', 'Vercel', 'Nginx', 'Linux'] },
  { id: 'tools', items: ['Git', 'GitHub', 'GitLab', 'Postman', 'Figma', 'VS Code'] },
  { id: 'ai', items: ['n8n', 'Claude Code', 'GitHub Copilot', 'Cursor'] },
] as const
