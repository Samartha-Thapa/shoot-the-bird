"use client"

import { useEffect } from "react"

export function AdSpace() {
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
