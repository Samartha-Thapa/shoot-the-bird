"use client"

import { useState, useEffect } from "react"

export function WatchAdModal({
  onAdWatched,
  onClose,
}: {
  onAdWatched: () => void
  onClose: () => void
}) {
  const [adTime, setAdTime] = useState(5) // 5 second simulated ad
  const [adComplete, setAdComplete] = useState(false)

  useEffect(() => {
    if (adTime <= 0) {
      setAdComplete(true)
      return
    }

    const timer = setInterval(() => {
      setAdTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [adTime])

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Advertisement</h3>

        <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center">
          {!adComplete ? (
            <div className="text-center">
              <p className="text-xl font-bold mb-2">Watching Ad...</p>
              <p className="text-gray-600">Ad will complete in {adTime} seconds</p>
              <div className="mt-4 w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-1000"
                  style={{ width: `${((5 - adTime) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 mb-2">Ad Complete!</p>
              <p>You've earned 2x points for 30 seconds!</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {adComplete ? (
            <button onClick={onAdWatched} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Claim Reward
            </button>
          ) : (
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Skip (No Reward)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

