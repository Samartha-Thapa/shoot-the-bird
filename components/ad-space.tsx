"use client"

import { useEffect } from "react"

export function AdSpace() {
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
    <div className="flex flex-col gap-4">
      {/* First Ad Container */}
      <div 
        id="monetag-ad-1-container"
        className="border-2 border-dashed border-gray-300 rounded-lg h-[250px] flex items-center justify-center bg-gray-50"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 font-medium">Advertisement</p>
          <p className="text-xs text-gray-400 mt-2">300x250</p>
        </div>
      </div>

      {/* Second Ad Container */}
      <div 
        id="monetag-ad-2-container"
        className="border-2 border-dashed border-gray-300 rounded-lg h-[250px] flex items-center justify-center bg-gray-50"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 font-medium">Advertisement</p>
          <p className="text-xs text-gray-400 mt-2">300x250</p>
        </div>
      </div>
    </div>
  )
}
