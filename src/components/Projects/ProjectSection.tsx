import { Project } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProjectCard from './ProjectCard'

interface ProjectSectionProps {
  projects: Project[]
  dict: Record<string, string>
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, dict }) => {
  return (
    <section id="projects">
      <SectionHeading title={`// ${dict.title}`} />

      <div className="my-8 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.priority} data={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
