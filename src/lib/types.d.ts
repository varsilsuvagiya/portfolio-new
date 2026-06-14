export interface Project {
  title: string
  shortDescription: string
  priority: number
  cover: string
  livePreview?: string
  githubLink?: string
  visitors?: string
  earned?: string
  githubStars?: string
  ratings?: string
  numberOfSales?: string
  type?: string
  siteAge?: string
}

export interface Heading {
  id: string
  title: string
  items: Heading[]
}

export interface Testimonial {
  name: string
  title?: string
  feedback: string
  image: string
  stars: number
  createdAt: string
}

export interface ExperienceItem {
  type: 'experience' | 'education'
  title: string
  company: string
  date: string
  description: string
}export interface Service {
  icon: string
  title: string
  shortDescription: string
}

export interface Dictionary {
  navigation: {
    about: string
    projects: string
    experience: string
    testimonials: string
    blogs: string
    services: string
    contact: string
  }
  hero: {
    greeting: string
    role: string
    description: string
    hireMe: string
    linkedIn: string
  }
  skills: {
    title: string
  }
  experience: {
    title: string
  }
  projects: {
    title: string
    viewAll: string
    livePreview: string
    githubLink: string
  }
  services: {
    title: string
    subtitle: string
  }
  testimonials: {
    title: string
  }
  contact: {
    title: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    submit: string
  }
  footer: {
    description: string
    socials: string
    navigation: string
    contact: string
    rights: string
    languages: string
  }
}
