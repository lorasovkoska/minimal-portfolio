import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="project-card card p-6 md:p-8 group">
      {/* Project Image */}
      {project.imageUrl ? (
        <div className="relative w-full h-48 md:h-64 mb-6 bg-gray-200 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-full h-48 md:h-64 mb-6 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-lg font-bold">
            {project.title}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-black text-white text-xs font-medium uppercase tracking-wider"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-bold uppercase text-sm tracking-wider"
            aria-label={`View ${project.title} live site`}
          >
            View Live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-bold uppercase text-sm tracking-wider"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            GitHub →
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard

