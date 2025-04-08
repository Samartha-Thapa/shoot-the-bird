import BirdGame from "@/components/bird-game"

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6">Bird Shooter Game</h1>
        <BirdGame />
      </div>
    </main>
  )
}

