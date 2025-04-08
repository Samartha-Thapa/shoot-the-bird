'use client'

import { useEffect } from 'react'

export function AdSpace() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    const scriptId = 'monetag-script'
    
    // Check if script already exists to avoid duplicates
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.innerHTML = `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9188844,document.createElement('script'))`
    
    // Append to document
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* First Ad Container */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg h-[250px] flex items-center justify-center bg-gray-50"
        id="monetag-ad-container-1"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 font-medium">Advertisement</p>
          <p className="text-xs text-gray-400 mt-2">300x250</p>
        </div>
      </div>

      {/* Second Ad Container */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg h-[250px] flex items-center justify-center bg-gray-50"
        id="monetag-ad-container-2"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 font-medium">Advertisement</p>
          <p className="text-xs text-gray-400 mt-2">300x250</p>
        </div>
      </div>
    </div>
  )
}