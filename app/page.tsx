import Hero from '@/components/Hero'
import About from '@/components/About'

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
    </main>
  )
}