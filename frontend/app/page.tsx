import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent glow-effect"></div>
          <span className="text-xl font-bold font-mono">gm.bio</span>
        </div>
        <Button
          variant="outline"
          className="border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 bg-transparent"
        >
          Connect Wallet
        </Button>
      </nav>

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
                Your Digital Identity, Reimagined
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 text-pretty max-w-lg leading-relaxed">
                Connect, showcase, and monetize your digital presence in the decentralized web
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-semibold px-8 py-3 text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/30 group"
              >
                Get Started
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block text-lg">→</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
