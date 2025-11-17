import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

// temporary
const mockProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    featured: true,
    order: 1,
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '2',
    title: 'Task Management App',
    slug: 'task-management',
    description: 'A collaborative task management application with drag-and-drop functionality, real-time updates, and team analytics.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    featured: true,
    order: 2,
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'An interactive weather dashboard with location-based forecasts, historical data visualization, and severe weather alerts.',
    technologies: ['React', 'Chart.js', 'API Integration', 'Tailwind'],
    featured: false,
    order: 3,
    projectUrl: 'https://example.com',
  },
  {
    _id: '4',
    title: 'Portfolio CMS',
    slug: 'portfolio-cms',
    description: 'A headless CMS-powered portfolio with dynamic content management, image optimization, and SEO-friendly architecture.',
    technologies: ['Next.js', 'Sanity', 'GSAP', 'Vercel'],
    featured: true,
    order: 4,
    githubUrl: 'https://github.com',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero 
        name="Lora Sovkoska"
        role="Frontend Developer & Creative Designer"
        tagline="Building beautiful, functional web experiences"
      />
      <About 
        bio="I'm a frontend developer and creative designer with a passion for building beautiful, functional web experiences. I specialize in React, Next.js, and modern web technologies, bringing ideas to life with clean code and thoughtful design. When I'm not coding, you'll find me exploring new design trends or experimenting with the latest web frameworks."
      />
      <Projects projects={mockProjects} />
      <Skills />
      <Contact 
        email="lorasovkoska@yahoo.com"
        github="https://github.com/lorasovkoska"
        linkedin="https://linkedin.com/in/lorasovkoska"
        twitter="https://twitter.com/lorasovkoska"
      />
    </main>
  )
}