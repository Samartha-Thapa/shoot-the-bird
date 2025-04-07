export function Bird({
    x,
    y,
    hit,
    pointsMultiplier = 1,
  }: {
    x: number
    y: number
    hit: boolean
    pointsMultiplier?: number
  }) {
    return (
      <div
        className={`absolute transition-colors duration-200 ${hit ? "opacity-50 rotate-180" : ""}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: `translateY(${hit ? "100px" : "0"}) ${hit ? "rotate(180deg)" : ""}`,
          transition: hit ? "transform 1s ease-in" : "none",
        }}
      >
        <div className="relative w-12 h-12">
          {/* Bird body */}
          <div
            className={`absolute w-10 h-6 rounded-full ${hit ? "bg-red-500" : "bg-blue-500"}`}
            style={{ left: "8px", top: "12px" }}
          ></div>
  
          {/* Bird head */}
          <div
            className={`absolute w-6 h-6 rounded-full ${hit ? "bg-red-700" : "bg-blue-700"}`}
            style={{ left: "2px", top: "10px" }}
          ></div>
  
          {/* Bird beak */}
          <div className="absolute w-4 h-2 bg-yellow-500" style={{ left: "-2px", top: "14px" }}></div>
  
          {/* Bird wing */}
          <div
            className={`absolute w-8 h-4 rounded-full ${hit ? "bg-red-600" : "bg-blue-600"}`}
            style={{
              left: "10px",
              top: "8px",
              animation: hit ? "none" : "flapWings 0.3s infinite alternate",
            }}
          ></div>
  
          {/* Bird tail */}
          <div
            className={`absolute w-4 h-4 ${hit ? "bg-red-400" : "bg-blue-400"}`}
            style={{
              left: "18px",
              top: "12px",
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          ></div>
  
          {/* Hit effect showing points */}
          {hit && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold text-red-600">+{10 * pointsMultiplier}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  