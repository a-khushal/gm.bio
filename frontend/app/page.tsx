'use client'
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <main className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl float-animation"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-accent/15 to-primary/15 blur-3xl float-animation"
            style={{ animationDelay: "-3s" }}
          ></div>
        </div>

        <div className="relative flex items-center justify-center h-[calc(100vh-120px)] py-8">
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
            <div className="absolute inset-0 rounded-full bg-gradient-conic from-orange-400 via-red-500 via-orange-500 to-red-400 p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-background"></div>
            </div>

            <div className="absolute inset-[-30px] rounded-full bg-gradient-radial from-orange-500/50 via-red-500/40 to-transparent blur-3xl"></div>

            <div className="absolute inset-[-15px] rounded-full bg-gradient-radial from-orange-400/70 via-red-400/50 to-transparent blur-2xl"></div>

            <div className="absolute inset-0 rounded-full particle-ring-bright"></div>

            <div className="absolute inset-12 md:inset-16 lg:inset-20 rounded-full bg-gradient-radial from-background/90 via-background/80 to-background/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-white leading-tight">
                Your On-Chain Link-in-Bio
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 text-pretty max-w-lg leading-relaxed">
                Create and manage your Solana-powered profile with permanent, on-chain links
              </p>
              <Button
                size="lg"
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold px-8 py-3 text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-primary/30 hover:shadow-accent/40 hover:cursor-pointer"
                onClick={() => router.push('/create')}
              >
                <span className="relative z-10">Create Your Profile</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block text-lg">→</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
