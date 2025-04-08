"use client"

import BirdGame from "@/components/bird-game"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // First ad container
    const script1 = document.createElement('script')
    script1.innerHTML = `
      (function(d, z, s, id) {
        s.src = 'https://' + d + '/400/' + z;
        s.id = id;
        try {
          document.getElementById(id + '-container').appendChild(s)
        } catch(e) {}
      })('vemtoutcheeg.com', 9188844, document.createElement('script'), 'monetag-ad-1')
    `
    document.body.appendChild(script1)

    // Second ad container (with different zone ID if needed)
    const script2 = document.createElement('script')
    script2.innerHTML = `
      (function(d, z, s, id) {
        s.src = 'https://' + d + '/400/' + z;
        s.id = id;
        try {
          document.getElementById(id + '-container').appendChild(s)
        } catch(e) {}
      })('vemtoutcheeg.com', 9188845, document.createElement('script'), 'monetag-ad-2')
    `
    document.body.appendChild(script2)

    return () => {
      [script1, script2].forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      })
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

