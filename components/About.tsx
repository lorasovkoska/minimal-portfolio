'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AboutProps {
  bio: string
}

const About: React.FC<AboutProps> = ({ bio }) => {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const highlights = [
    {
      label: 'Experience',
      value: '2+ Years',
    },
    {
      label: 'Projects Completed',
      value: '30+',
    },
    {
      label: 'Technologies',
      value: '20+',
    },
    {
      label: 'Hours of Code',
      value: '1000+',
    },
  ]

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const initAnimations = () => {
        // Animate heading
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })

        // Fade in bio text
        gsap.from(bioRef.current, {
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        })

        // Stagger the highlight stats
        const highlightItems = skillsRef.current?.querySelectorAll('.highlight-item')
        if (highlightItems && highlightItems.length > 0) {
          gsap.from(highlightItems, {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          })
        }

        // Refresh ScrollTrigger after animations are set up
        ScrollTrigger.refresh()
      }

      // Wait for next frame to ensure layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(initAnimations)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding bg-gray-100 grid-bg-subtle"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <h2
          ref={headingRef}
          id="about-heading"
          className="text-heading font-bold mb-16"
        >
          About
        </h2>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-square border-4 border-black bg-gray-200 relative overflow-hidden">
              {/* Placeholder Photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              {/* Photo:
              <Image
                src="/images/photo.jpg"
                alt="Lora"
                fill
                className="object-cover"
                priority
              />
              */}
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Bio */}
            <p
              ref={bioRef}
              className="text-lg leading-relaxed text-gray-700 mb-8"
            >
              {bio}
            </p>

            {/* Highlights */}
            <div ref={skillsRef} className="grid grid-cols-2 gap-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="highlight-item border-l-4 border-black pl-4 py-2"
                >
                  <div className="text-3xl font-bold mb-1">
                    {highlight.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    {highlight.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

