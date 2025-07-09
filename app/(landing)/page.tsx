import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <section className="w-full flex-center flex-col">
        <h1 className="text-6xl font-black text-center blue_gradient pb-4">
          Track & Manage <br className="max-md:hidden" /> <span className="text-center">Your Video Game Backlog</span>
        </h1>
        <p className="text-center text-lg py-8 px-2 text-slate-400">
          ShameStack is a visual tracking tool for managing, organizing and completing your unbeaten video games.
        </p>

        <div>
          <Image
            src="/images/collage.png"
            width={1920}
            height={1020}
            alt="Picture of video games"
            className="image-test"
          />
        </div>
      </section>
    </main>
  )
}
