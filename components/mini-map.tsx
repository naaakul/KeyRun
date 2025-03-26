"use client";

import React, { useMemo } from "react";

interface AiCars {
  id: number;
  color: string;
  speedFactor: number;
}

interface MiniMapProps {
  progress?: number;
  opp: number[];
  oppCars: AiCars[];
}

export function MiniMap({ oppCars, opp, progress = 0 }: MiniMapProps) {
  const pathData =
    "M 50 0 C 70 20, 80 40, 70 60 S 30 100, 50 120 S 70 140, 40 160 S 60 180, 50 200";

  const getPointOnPath = useMemo(() => {
    return (progress: number) => {
      // Only perform calculations in browser environment
      if (typeof window !== "undefined") {
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", pathData);
        svg.appendChild(path);

        const length = path.getTotalLength();
        const point = path.getPointAtLength(((100 - progress) / 100) * length);

        return { x: point.x, y: point.y };
      }

      // Fallback position if not in browser
      return { x: 50, y: (progress / 100) * 200 };
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
    <div className="relative w-40 h-40 bg-zinc-800 rounded-full border-2 border-zinc-700 overflow-hidden shadow-md">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200">
        <path
          d={pathData}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          className="stroke-zinc-100"
        />

        {oppCars.map((car) => {
          const oppPosition = getPointOnPath(opp[car.id - 1] || 0);
          return (
            <circle
              key={car.id}
              cx={oppPosition.x}
              cy={oppPosition.y}
              r="5"
              fill={car.color}
              className="transition-all duration-300 ease-out"
            />
          );
        })}

        <circle
          cx={dotPosition.x}
          cy={dotPosition.y}
          r="5"
          className="fill-black transition-all duration-300 ease-out"
        />
      </svg>
    </div>
  );
}

export default MiniMap;
