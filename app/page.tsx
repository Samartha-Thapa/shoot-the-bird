"use client"

import BirdGame from "@/components/bird-game"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://gizokraijaw.net/401/9188992"
    script.async = true
    try {
      document.body.appendChild(script)
    } catch (e) {
      console.error("Failed to append ad script:", e)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6">Bird Shooter Game</h1>
        <BirdGame />
      </div>
    </main>
  )
}

