'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'
import { Project } from '@/types'
import ProjectCard from './ProjectCard'

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
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

