// Projects from the resume. URLs are the hyperlinks embedded in the resume PDF.
// Screenshots only where a real one exists in public/projects; the rest render a typographic cover.
// Descriptions live in src/dictionaries/*.json → projects[slug].
import type { Dictionary } from '@/dictionaries'

export interface Project {
  slug: keyof Dictionary['projects']
  name: string
  url: string
  stack: string[]
  image?: string
  /** 'contain' shows the whole image (portrait app screens, very wide pages) instead of cropping to the frame. */
  fit?: 'contain'
  /** Full-length capture of the live page, panned on hover when the site blocks live embedding. */
  fullImage?: { src: string; width: number; height: number }
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'trafica',
    name: 'Trafica AI',
    url: 'https://staging.trafica.ai/',
    stack: ['Next.js', 'AWS Amplify'],
    image: '/projects/trafica.png',
    fullImage: { src: '/projects/trafica-full.jpg', width: 1440, height: 7000 },
    featured: true,
  },
  {
    slug: 'olysim',
    name: 'Olysim',
    url: 'http://olysim.in/',
    stack: ['Next.js', 'Laravel', 'CI/CD'],
    image: '/projects/olysim.png',
    fullImage: { src: '/projects/olysim-full.jpg', width: 1440, height: 6698 },
    featured: true,
  },
  {
    slug: 'cloudusExam',
    name: 'Cloudus Online Examination',
    url: 'https://exam.cloudusinfotech.com/',
    stack: ['Next.js', 'AWS Amplify'],
    image: '/projects/cloudus-exam.png',
    featured: true,
  },
  {
    slug: 'braoza',
    name: 'Braoza',
    url: 'https://www.staging.braoza.com/',
    stack: ['Next.js', 'AWS', 'Deepgram', 'Google Gen AI'],
    image: '/projects/braoza.png',
    featured: true,
  },
  {
    slug: 'vongo',
    name: 'VONGO',
    url: 'https://www.vongo.pro/',
    stack: ['Next.js', 'Node.js', 'Cloudflare'],
    image: '/projects/vongo.jpg',
    fullImage: { src: '/projects/vongo-full.jpg', width: 1440, height: 3582 },
    featured: true,
  },
  {
    slug: 'exambro',
    name: 'ExamBro',
    url: 'https://exambro.app/',
    stack: ['Next.js', 'Laravel'],
    image: '/projects/exambro.png',
    fullImage: { src: '/projects/exambro-full.jpg', width: 1440, height: 7000 },
    featured: true,
  },
  // Not on the resume — added at the user's request. Copy reflects what is live on the staging site;
  // stack verified from response headers (Next.js on Vercel) and media requests (Cloudinary).
  {
    slug: 'jovasu',
    name: 'Jovasu Dryfruits',
    url: 'https://jovasudryfruits-staging-2026.vercel.app/',
    stack: ['Next.js', 'Vercel', 'Cloudinary'],
    image: '/projects/jovasu.jpg',
    fullImage: { src: '/projects/jovasu-full.jpg', width: 1440, height: 6418 },
    fit: 'contain',
    featured: false,
  },
  {
    slug: 'assureit',
    name: 'Assure-IT',
    url: 'https://www.assureit.co.il/en/',
    stack: ['PHP', 'MySQL', 'jQuery', 'AJAX'],
    image: '/projects/assureit.png',
    fullImage: { src: '/projects/assureit-full.jpg', width: 1440, height: 7000 },
    featured: false,
  },
  {
    slug: 'federation',
    name: 'Federation',
    url: 'https://manage.federation.co.il/',
    stack: ['PHP', 'MySQL', 'AJAX'],
    image: '/projects/federatiom.png',
    featured: false,
  },
  {
    slug: 'radheshyam',
    name: 'Radhe Shyam Steel & Crockery',
    url: 'https://radheshyamsteel.com/',
    stack: ['Next.js', 'AWS', 'bunny.net'],
    image: '/projects/radheshyam.jpg',
    fit: 'contain',
    featured: false,
  },
  {
    slug: 'community',
    name: 'Community Management Platform',
    url: 'https://platform.kohinoor-overseas.com/',
    stack: ['Next.js', 'Node.js', 'Cloudflare'],
    image: '/projects/community-app.png',
    featured: false,
  },
  // Not on the resume — added at the user's request. Stack and contributions unknown, so they stay empty.
  {
    slug: 'villageonweb',
    name: 'Village On Web',
    url: 'https://villageonweb.in/',
    stack: [],
    image: '/projects/villageonweb.jpeg',
    fullImage: { src: '/projects/villageonweb-full.jpg', width: 1440, height: 2261 },
    featured: false,
  },
]
