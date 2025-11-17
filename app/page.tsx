import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import { getProjects, getSiteConfig, fallbackSiteConfig, fallbackProjects } from '@/lib/queries'

export const revalidate = 60 // Revalidate every 60 seconds

const HomePage = async () => {
  // Fetch data from CMS with fallbacks
  const [siteConfig, projects] = await Promise.all([
    getSiteConfig(),
    getProjects(),
  ])

  const config = siteConfig || fallbackSiteConfig
  const projectsData = projects.length > 0 ? projects : fallbackProjects

  return (
    <main className="min-h-screen bg-white">
      <Hero
        name={config.name}
        role={config.role}
        tagline={config.tagline}
      />
      <About bio={config.bio} />
      <Projects projects={projectsData} />
      <Skills />
      <Contact
        email={config.email}
        github={config.github}
        linkedin={config.linkedin}
        twitter={config.twitter}
      />
    </main>
  )
}

export default HomePage
