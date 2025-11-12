import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero 
        name="Lora Sovkoska"
        role="Frontend Developer & Creative Designer"
        tagline="Building beautiful, functional web experiences"
      />
    </main>
  )
}