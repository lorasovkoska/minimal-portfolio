'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const skillGroups = [
    {
      category: 'Frontend',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Redux Toolkit', 'React Query', 'Tailwind CSS', 'Bootstrap', 'SASS', 'Framer Motion', 'GSAP'],
    },
    {
      category: 'Backend & APIs',
      skills: ['Node.js', 'REST APIs', 'API Integration', 'MySQL', 'PostgreSQL'],
    },
    {
      category: 'Design & UX/UI',
      skills: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'UI/UX Design', 'Prototyping', 'Wireframing', 'Design Systems'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git & GitHub', 'Docker', 'Vercel', 'VS Code', 'Sanity CMS', 'Chrome DevTools'],
    },
  ]

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible first
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 1 })
      }
      
      const groups = skillsRef.current?.querySelectorAll('.skill-group')
      if (groups && groups.length > 0) {
        gsap.set(groups, { opacity: 1, x: 0 })
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

        // Stagger the skill categories
        if (groups && groups.length > 0) {
          gsap.fromTo(
            groups,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: skillsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          )
        }

        // Refresh ScrollTrigger
        ScrollTrigger.refresh()
      }, 100)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="skills"
      className="section-padding bg-gray-100 grid-bg-subtle"
      aria-labelledby="skills-heading"
    >
      <div className="container-custom">
        <h2
          ref={headingRef}
          id="skills-heading"
          className="text-heading font-bold mb-20"
        >
          Skills & Technologies
        </h2>

        <div ref={skillsRef} className="space-y-16">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.category} className="skill-group">
              {/* Category Title - Big and Bold */}
              <div className="mb-8 pb-6 border-b-4 border-black">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  {group.category}
                </h3>
                <div className="mt-2 text-sm font-bold text-gray-600 uppercase tracking-widest">
                  {group.skills.length} Technologies
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                {group.skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-start gap-3 group"
                  >
                    {/* Number */}
                    <span className="text-2xl font-bold text-gray-300 group-hover:text-black transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Skill Name */}
                    <span className="text-lg font-medium leading-tight group-hover:underline">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
