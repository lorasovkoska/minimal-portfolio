'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@/hooks/useGSAP'

interface HeroProps {
  name: string
  role: string
  tagline: string
}

const Hero: React.FC<HeroProps> = ({ name, role, tagline }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate everything in on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
        .from(
          roleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          buttonRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          accentRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.6'
        )

      // Parallax effect on scroll
      const handleScroll = () => {
        const scrolled = window.scrollY
        if (gridRef.current) {
          gsap.to(gridRef.current, {
            y: scrolled * 0.5,
            duration: 0,
          })
        }
        if (containerRef.current) {
          const content = containerRef.current.querySelector('.hero-content')
          if (content) {
            gsap.to(content, {
              y: scrolled * 0.25,
              duration: 0,
            })
          }
        }
        if (accentRef.current) {
          gsap.to(accentRef.current, {
            y: scrolled * 0.7,
            rotate: scrolled * 0.1,
            duration: 0,
          })
        }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleViewWork = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid Background with parallax */}
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-50" />

      {/* Accent element */}
      <div
        ref={accentRef}
        className="absolute top-20 right-20 w-32 h-32 border-4 border-black hidden lg:block"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-custom relative z-10 text-center hero-content">
        <h1
          ref={nameRef}
          className="text-display font-bold mb-6 text-balance"
        >
          {name}
        </h1>
        <p
          ref={roleRef}
          className="text-subheading font-semibold mb-4 text-gray-700"
        >
          {role}
        </p>
        <p
          ref={taglineRef}
          className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto"
        >
          {tagline}
        </p>
        <a
          ref={buttonRef}
          onClick={handleViewWork}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleViewWork()
            }
          }}
          className="btn-primary inline-block cursor-pointer"
          tabIndex={0}
          role="button"
          aria-label="View my work"
        >
          View Work
        </a>
      </div>

    </section>
  )
}

export default Hero

