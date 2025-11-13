'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { Project } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectsProps {
  projects: Project[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible first
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 1 })
      }
      
      const cards = cardsRef.current?.querySelectorAll('.project-card')
      if (cards && cards.length > 0) {
        gsap.set(cards, { opacity: 1, y: 0 })
      }

      setTimeout(() => {
        // Animate heading
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              duration: 1,
              ease: 'power3.out',
            }
          )
        }

        // Animate each project card as it scrolls into view
        if (cards && cards.length > 0) {
          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 110%',
                  toggleActions: 'play none none reverse',
                },
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power1.out',
              }
            )
          })
        }

        // Refresh ScrollTrigger
        ScrollTrigger.refresh()
      }, 100)
    }, containerRef)

    return () => ctx.revert()
  }, [projects])

  return (
    <section
      ref={containerRef}
      id="projects"
      className="section-padding"
      aria-labelledby="projects-heading"
    >
      <div className="container-custom">
        <h2
          ref={headingRef}
          id="projects-heading"
          className="text-heading font-bold mb-16"
        >
          Selected Work
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 md:gap-12"
        >
          {projects.map((project) => (
            <article
              key={project._id}
              className="project-card card p-6 md:p-8 group"
            >
              {/* Project Image Placeholder */}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

