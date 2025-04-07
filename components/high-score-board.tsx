export function HighScoreBoard({
    currentScore,
    highScore,
  }: {
    currentScore: number
    highScore: number
  }) {
    return (
      <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
        <h3 className="text-xl font-bold mb-2">High Score Board</h3>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-300">Current Score</p>
            <p className="text-2xl font-bold">{currentScore}</p>
          </div>
          <div>
            <p className="text-gray-300">High Score</p>
            <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
          </div>
        </div>
      </div>
    )
  }
  
  