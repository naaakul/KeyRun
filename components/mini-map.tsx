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
  
import React, { useMemo } from 'react';

interface MiniMapProps {
  progress?: number
}

export function MiniMap({ progress = 10 }: MiniMapProps) {
 
  const pathData = "M 50 0 C 70 20, 80 40, 70 60 S 30 100, 50 120 S 70 140, 40 160 S 60 180, 50 200";

 
  const getPointOnPath = useMemo(() => {
    return (progress: number) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);

     
      const length = path.getTotalLength();
      const point = path.getPointAtLength(((100 - progress) / 100) * length);

      return { x: point.x, y: point.y };
    };
  }, [pathData]);

 
  const dotPosition = useMemo(() => {
    try {
      return getPointOnPath(progress);
    } catch {
      return { x: 50, y: 0 };
    }
  }, [getPointOnPath, progress]);

  return (
    <div className="relative w-40 h-40 bg-gray-100 rounded-full border-2 border-gray-300 overflow-hidden shadow-md">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200">
        <path 
          d={pathData}
          fill="none" 
          stroke="#CBD5E1" 
          strokeWidth="2" 
          className="stroke-gray-400"
        />

        <circle
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="4"
          className="fill-black"
        />
      </svg>
    </div>
  );
}

export default MiniMap;