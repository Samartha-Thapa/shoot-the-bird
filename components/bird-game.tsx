"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Bird } from "./bird"
import { GameControls } from "./game-controls"
import { AdSpace } from "./ad-space"
import { HighScoreBoard } from "./high-score-board"
import { WatchAdModal } from "./watch-ad-modal"

export default function BirdGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [birds, setBirds] = useState<Array<{ id: number; x: number; y: number; speed: number; hit: boolean }>>([])
  const [lastBirdId, setLastBirdId] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [gunPosition, setGunPosition] = useState({ x: 0, y: 0 })
  const [timeLeft, setTimeLeft] = useState(60)
  const [pointsMultiplier, setPointsMultiplier] = useState(1)
  const [multiplierTimeLeft, setMultiplierTimeLeft] = useState(0)
  const [showAdModal, setShowAdModal] = useState(false)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("birdGameHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Set up game area dimensions
  useEffect(() => {
    if (gameAreaRef.current) {
      setDimensions({
        width: gameAreaRef.current.offsetWidth,
        height: gameAreaRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (gameAreaRef.current) {
        setDimensions({
          width: gameAreaRef.current.offsetWidth,
          height: gameAreaRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver])

  // Points multiplier timer
  useEffect(() => {
    if (multiplierTimeLeft <= 0) {
      setPointsMultiplier(1)
      return
    }

    const timer = setInterval(() => {
      setMultiplierTimeLeft((prev) => {
        if (prev <= 1) {
          setPointsMultiplier(1)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [multiplierTimeLeft])

  // Bird spawning
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const spawnBird = () => {
      const newBirdId = lastBirdId + 1
      setLastBirdId(newBirdId)

      const newBird = {
        id: newBirdId,
        x: -50,
        y: Math.random() * (dimensions.height * 0.6) + 50,
        speed: Math.random() * 3 + 2,
        hit: false,
      }

      setBirds((prev) => [...prev, newBird])
    }

    const spawnInterval = setInterval(spawnBird, 1500)
    return () => clearInterval(spawnInterval)
  }, [gameStarted, gameOver, lastBirdId, dimensions.height])

  // Bird movement
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const moveBirds = () => {
      setBirds((prev) =>
        prev
          .map((bird) => ({
            ...bird,
            x: bird.x + bird.speed,
          }))
          .filter((bird) => bird.x < dimensions.width + 100),
      )
    }

    const moveInterval = setInterval(moveBirds, 16)
    return () => clearInterval(moveInterval)
  }, [gameStarted, gameOver, dimensions.width])

  // Track mouse/touch position for aiming
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect()
        setGunPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (gameAreaRef.current && e.touches[0]) {
        const rect = gameAreaRef.current.getBoundingClientRect()
        setGunPosition({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        })
      }
    }

    if (gameStarted && !gameOver) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [gameStarted, gameOver])

  // Save high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score)
      localStorage.setItem("birdGameHighScore", score.toString())
    }
  }, [gameOver, score, highScore])

  const handleShoot = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameStarted || gameOver) return

    // Prevent default for touch events
    e.preventDefault()

    let hitX, hitY

    if ("touches" in e && e.touches[0]) {
      const rect = gameAreaRef.current?.getBoundingClientRect()
      if (!rect) return

      hitX = e.touches[0].clientX - rect.left
      hitY = e.touches[0].clientY - rect.top
    } else if ("clientX" in e) {
      const rect = gameAreaRef.current?.getBoundingClientRect()
      if (!rect) return

      hitX = e.clientX - rect.left
      hitY = e.clientY - rect.top
    } else {
      return
    }

    // Find the first unhit bird that was hit
    const hitBirdIndex = birds.findIndex((bird) => {
      if (bird.hit) return false

      // Check if shot hit this bird (simple circle collision)
      const distance = Math.sqrt(Math.pow(bird.x - hitX, 2) + Math.pow(bird.y - hitY, 2))
      return distance < 40 // Bird hit radius
    })

    if (hitBirdIndex >= 0) {
      // Update the hit bird
      setBirds((prev) => prev.map((bird, index) => (index === hitBirdIndex ? { ...bird, hit: true } : bird)))

      // Update the score
      setScore((prev) => prev + 10 * pointsMultiplier)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setBirds([])
    setTimeLeft(60)
    setPointsMultiplier(1)
    setMultiplierTimeLeft(0)
  }

  const restartGame = () => {
    startGame()
  }

  const handleWatchAd = () => {
    setShowAdModal(true)
  }

  const handleAdWatched = () => {
    setShowAdModal(false)
    setPointsMultiplier(2)
    setMultiplierTimeLeft(30) // 30 seconds of 2x points
  }

  const handleCloseAdModal = () => {
    setShowAdModal(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1">
        <div
          ref={gameAreaRef}
          className="relative bg-sky-100 border-2 border-sky-300 rounded-lg h-[400px] md:h-[500px] overflow-hidden"
          onClick={handleShoot}
          onTouchStart={handleShoot}
        >
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="bg-white p-6 rounded-lg text-center">
                <h2 className="text-2xl text-black font-bold mb-4">Bird Shooter</h2>
                <p className="mb-4 text-gray-800">Click to shoot the birds!</p>
                <button onClick={startGame} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Start Game
                </button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="bg-white p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="mb-2">Your score: {score}</p>
                <p className="mb-4">High score: {highScore}</p>
                <button onClick={restartGame} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Play Again
                </button>
              </div>
            </div>
          )}

          {/* Game background */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-600"></div>

          {/* Birds */}
          {birds.map((bird) => (
            <Bird key={bird.id} x={bird.x} y={bird.y} hit={bird.hit} pointsMultiplier={pointsMultiplier} />
          ))}

          {/* Gun/Crosshair */}
          {gameStarted && !gameOver && (
            <div
              className="absolute w-8 h-8 pointer-events-none"
              style={{
                left: `${gunPosition.x - 16}px`,
                top: `${gunPosition.y - 16}px`,
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 border-2 border-red-500 rounded-full"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-red-500"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-red-500"></div>
              </div>
            </div>
          )}

          {/* Points multiplier indicator */}
          {pointsMultiplier > 1 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold animate-pulse">
              x{pointsMultiplier} Points! ({multiplierTimeLeft}s)
            </div>
          )}
        </div>

        {/* Game controls and info */}
        <GameControls
          score={score}
          highScore={highScore}
          timeLeft={timeLeft}
          gameStarted={gameStarted}
          gameOver={gameOver}
          onWatchAd={handleWatchAd}
          pointsMultiplier={pointsMultiplier}
        />

        {/* High score board */}
        <HighScoreBoard currentScore={score} highScore={highScore} />
      </div>

      {/* Ad space */}
      <div className="w-full md:w-64">
        <AdSpace />
      </div>

      {/* Watch Ad Modal */}
      {showAdModal && <WatchAdModal onAdWatched={handleAdWatched} onClose={handleCloseAdModal} />}
    </div>
  )
}

