export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
  technologies: string[]
  featured: boolean
  order: number
}

export interface SiteConfig {
  name: string
  role: string
  tagline: string
  bio: string
  email: string
  github?: string
  linkedin?: string
  twitter?: string
}
