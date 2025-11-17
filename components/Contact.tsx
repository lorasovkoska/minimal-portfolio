'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@/hooks/useGSAP'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ContactProps {
  email: string
  github?: string
  linkedin?: string
  twitter?: string
}

const Contact: React.FC<ContactProps> = ({ email, github, linkedin, twitter }) => {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Small delay to ensure DOM is ready
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

        // Fade in contact items
        const items = contentRef.current?.querySelectorAll('.contact-item')
        if (items && items.length > 0) {
          gsap.from(items, {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
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
      id="contact"
      className="section-padding"
      aria-labelledby="contact-heading"
    >
      <div className="container-custom">
        <h2
          ref={headingRef}
          id="contact-heading"
          className="text-heading font-bold mb-16"
        >
          Get In Touch
        </h2>

        <div ref={contentRef} className="max-w-3xl">
          <p className="contact-item text-xl md:text-2xl mb-12 text-gray-700">
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          {/* Email */}
          <div className="contact-item mb-8">
            <a
              href={`mailto:${email}`}
              className="text-3xl md:text-4xl font-bold link-underline hover:text-gray-600 transition-colors"
              aria-label="Send email"
            >
              {email}
            </a>
          </div>

          {/* Social Links */}
          <div className="contact-item flex flex-wrap gap-6">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-bold uppercase text-lg tracking-wider hover:text-gray-600 transition-colors"
                aria-label="Visit GitHub profile"
              >
                GitHub
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-bold uppercase text-lg tracking-wider hover:text-gray-600 transition-colors"
                aria-label="Visit LinkedIn profile"
              >
                LinkedIn
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-bold uppercase text-lg tracking-wider hover:text-gray-600 transition-colors"
                aria-label="Visit Twitter profile"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container-custom mt-20 pt-8 border-t-2 border-black">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </section>
  )
}

export default Contact

