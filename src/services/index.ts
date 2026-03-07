import { Project, Testimonial, ExperienceItem, Service } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// Function to read project file
const readProjectFile = async (filePath: string): Promise<Project> => {
  const projectData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(projectData)
}

// Function to get all projects
const getAllProjects = async (locale: string = 'en'): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), `/content/projects/${locale}`)
    const projectsName = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      projectsName.map(async (projectName) => {
        const filePath = path.join(projectsPath, projectName)
        const projectDetails = await readProjectFile(filePath)
        return projectDetails
      }),
    )

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsPath = path.join(process.cwd(), '/content/testimonials')
    const testimonialsName = await fs.readdir(testimonialsPath)

    const testimonials = await Promise.all(
      testimonialsName.map(async (projectName) => {
        const filePath = path.join(testimonialsPath, projectName)
        const projectDetails = await fs.readFile(filePath, 'utf8')
        return JSON.parse(projectDetails)
      }),
    )

    // Sort testimonials by date
    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return testimonials
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllExperience = async (locale: string = 'en'): Promise<ExperienceItem[]> => {
  try {
    const experiencePath = path.join(process.cwd(), `/content/experience/${locale}/experience.json`)
    const experienceData = await fs.readFile(experiencePath, 'utf8')
    return JSON.parse(experienceData)
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllServices = async (locale: string = 'en'): Promise<Service[]> => {
  try {
    const servicesPath = path.join(process.cwd(), `/content/services/${locale}/services.json`)
    const servicesData = await fs.readFile(servicesPath, 'utf8')
    return JSON.parse(servicesData)
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

export { getAllExperience, getAllProjects, getAllTestimonials, getAllServices }
