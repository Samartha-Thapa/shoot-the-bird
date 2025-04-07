"use client"

export function GameControls({
  score,
  highScore,
  timeLeft,
  gameStarted,
  gameOver,
  onWatchAd,
  pointsMultiplier,
}: {
  score: number
  highScore: number
  timeLeft: number
  gameStarted: boolean
  gameOver: boolean
  onWatchAd: () => void
  pointsMultiplier: number
}) {
  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-gray-100 rounded-lg mt-4">
      <div className="text-lg font-bold">
        Score: <span className="text-green-600">{score}</span>
      </div>

      {gameStarted && !gameOver && (
        <>
          <div className="text-lg font-bold">
            Time: <span className={`${timeLeft <= 10 ? "text-red-600" : "text-blue-600"}`}>{timeLeft}s</span>
          </div>

          {pointsMultiplier === 1 && (
            <button
              onClick={onWatchAd}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Watch Ad for x2 Points
            </button>
          )}
        </>
      )}
    </div>
  )
}

