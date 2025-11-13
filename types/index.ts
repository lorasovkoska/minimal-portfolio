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
