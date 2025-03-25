interface CarProps {
    position: number
    color: string
    isUser: boolean
    offsetY?: number
  }
  
  export function Car({ position, color, isUser, offsetY = 0 }: CarProps) {
    return (
      <div
        className="absolute top-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${position}%`,
          transform: `translateY(${offsetY - 10}px)`,
          zIndex: isUser ? 10 : 5,
        }}
      >
        {/*shape */}
        <div className={`relative w-12 h-6 rounded-md ${isUser ? "shadow-md" : ""}`} style={{ backgroundColor: color }}>
          {/*windows*/}
          <div className="absolute top-1 left-2 right-2 h-2 bg-blue-100 rounded-sm opacity-70" />
  
          {/*wheels */}
          <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-800 rounded-full" />
          <div className="absolute -bottom-1 right-1 w-2 h-2 bg-gray-800 rounded-full" />
        </div>
      </div>
    )
  }
  
  