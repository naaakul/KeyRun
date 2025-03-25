// interface MiniMapProps {
//     userProgress: number
//     aiPositions: number[]
//     aiCars: { id: number; color: string; speedFactor: number }[]
//   }
  
//   export function MiniMap({ userProgress, aiPositions, aiCars }: MiniMapProps) {
//     return (
//       <div className="relative w-20 h-20 bg-gray-100 rounded-full border-2 border-gray-300 overflow-hidden shadow-md">
//         {/* Track circle */}
//         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-400 transform -translate-y-1/2" />
  
//         {/* Center point */}
//         <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
  
//         {/* User position */}
//         <div
//           className="absolute w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
//           style={{
//             left: "50%",
//             top: "50%",
//             transform: `rotate(${userProgress * 3.6}deg) translateY(-8px) rotate(-${userProgress * 3.6}deg)`,
//           }}
//         />
  
//         {/* AI positions */}
//         {aiCars.map((car, index) => (
//           <div
//             key={car.id}
//             className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
//             style={{
//               backgroundColor: car.color,
//               left: "50%",
//               top: "50%",
//               transform: `rotate(${aiPositions[index] * 3.6}deg) translateY(-8px) rotate(-${aiPositions[index] * 3.6}deg)`,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }
  
import React from 'react';

interface MiniMapProps {
  userProgress: number
  aiPositions: number[]
  aiCars: { id: number; color: string; speedFactor: number }[]
}

export function MiniMap({ 
  userProgress, 
  aiPositions, 
  aiCars 
}: MiniMapProps) {
  // Generate a winding path that covers the entire map
  const generatePath = () => {
    const pathCommands = [
      'M 50 0', // Start at top center
      'C 70 20, 80 40, 70 60', // First curve
      'S 30 100, 50 120', // Second curve
      'S 70 140, 40 160', // Third curve
      'S 60 180, 50 200' // Final curve
    ];
    return pathCommands.join(' ');
  };

  return (
    <div className="relative w-40 h-40 bg-gray-100 rounded-full border-2 border-gray-300 overflow-hidden shadow-md">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200">
        {/* Winding path */}
        <path 
          d={generatePath()}
          fill="none" 
          stroke="#CBD5E1" 
          strokeWidth="2" 
          className="stroke-gray-400"
        />

        {/* Center point */}
        <circle 
          cx="50" 
          cy="100" 
          r="2" 
          className="fill-gray-500"
        />

        {/* User position (black dot) */}
        <circle
          cx="50"
          cy="100"
          r="3"
          className="fill-black"
          transform={`rotate(${userProgress * 1.8}, 50, 100)`}
        />

        {/* AI positions */}
        {aiCars.map((car, index) => (
          <circle
            key={car.id}
            cx="50"
            cy="100"
            r="2"
            fill={car.color}
            transform={`rotate(${aiPositions[index] * 1.8}, 50, 100)`}
          />
        ))}
      </svg>
    </div>
  );
}

export default MiniMap;