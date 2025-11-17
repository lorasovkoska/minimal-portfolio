import { client, urlFor } from './sanity'
import { Project, SiteConfig } from '@/types'

export const getProjects = async (): Promise<Project[]> => {
  // Check if Sanity is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') {
    console.log('Sanity not configured, using fallback projects')
    return []
  }

  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    projectUrl,
    githubUrl,
    technologies,
    featured,
    order
  }`

  try {
    const projects = await client.fetch(query, {}, { next: { revalidate: 60 } })
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  // Check if Sanity is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') {
    console.log('Sanity not configured, using fallback config')
    return null
  }

  const query = `*[_type == "siteConfig"][0] {
    name,
    role,
    tagline,
    bio,
    email,
    github,
    linkedin,
    twitter
  }`

  try {
    const config = await client.fetch(query, {}, { next: { revalidate: 60 } })
    return config
  } catch (error) {
    console.error('Error fetching site config:', error)
    return null
  }
}

// Fallback data for when CMS is not set up
export const fallbackSiteConfig: SiteConfig = {
  name: 'Lora Sovkoska',
  role: 'Frontend Developer & Creative Designer',
  tagline: 'Building beautiful, functional web experiences where design meets code',
  bio: 'I\'m a frontend developer and creative designer with a passion for crafting beautiful, functional web experiences. I specialize in React, Next.js, and modern web technologies, bringing ideas to life with clean code and thoughtful design. When I\'m not coding, you\'ll find me exploring new design trends or experimenting with the latest web frameworks.',
  email: 'lorasovkoska@yahoo.com',
  github: 'https://github.com/lorasovkoska',
  linkedin: 'https://linkedin.com/in/lorasovkoska',
  twitter: 'https://twitter.com/lorasovkoska',
}

export const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'NexCommerce - Modern E-Commerce Platform',
    slug: 'nexcommerce-platform',
    description: 'A high-performance e-commerce platform built with Next.js 14, featuring real-time inventory sync, Stripe payment integration, and a comprehensive admin dashboard. Handles 10K+ daily transactions with 99.9% uptime. Includes advanced search, product recommendations, and multi-currency support.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Redis'],
    featured: true,
    order: 1,
    projectUrl: 'https://nexcommerce-demo.vercel.app',
    githubUrl: 'https://github.com',
  },
  {
    _id: '2',
    title: 'TaskFlow - Team Collaboration Suite',
    slug: 'taskflow-app',
    description: 'Real-time collaborative task management application with WebSocket integration, drag-and-drop Kanban boards, and advanced team analytics. Features include automated workflows, time tracking, file sharing, and Slack/Discord integrations. Built to scale for teams of 5 to 500+.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Redux Toolkit', 'Material-UI'],
    featured: true,
    order: 2,
    projectUrl: 'https://taskflow-demo.netlify.app',
    githubUrl: 'https://github.com',
  },
  {
    _id: '3',
    title: 'ContentAI - AI-Powered Writing Assistant',
    slug: 'contentai-generator',
    description: 'Intelligent content generation platform leveraging GPT-4 for marketing copy, blog posts, and social media content. Features custom brand voice training, SEO optimization suggestions, plagiarism detection, and multi-language support. Used by 500+ content creators and marketing teams.',
    technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel AI SDK'],
    featured: true,
    order: 3,
    projectUrl: 'https://contentai-demo.com',
    githubUrl: 'https://github.com',
  },
  {
    _id: '4',
    title: 'MetricsHub - Real-Time Analytics Dashboard',
    slug: 'metricshub-dashboard',
    description: 'Comprehensive analytics platform with beautiful data visualizations, custom report builder, and predictive insights powered by machine learning. Integrates with Google Analytics, Mixpanel, and custom data sources. Features real-time alerting and automated reporting via email/Slack.',
    technologies: ['React', 'D3.js', 'Chart.js', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'Redis'],
    featured: true,
    order: 4,
    projectUrl: 'https://metricshub-demo.com',
    githubUrl: 'https://github.com',
  },
]

