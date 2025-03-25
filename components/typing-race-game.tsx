"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Car } from "./car";
import { MiniMap } from "@/components/mini-map";

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. A gentle breeze rustles through the autumn leaves as birds chirp melodiously in the distance. Children laugh and play in the park nearby while adults enjoy their peaceful afternoon.";

const AI_CARS = [
  { id: 1, color: "red", speedFactor: 0.8 },
  { id: 2, color: "blue", speedFactor: 1.2 },
  { id: 3, color: "green", speedFactor: 0.9 },
  { id: 4, color: "purple", speedFactor: 1.1 },
];

export default function TypingRaceGame() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiPositions, setAiPositions] = useState<number[]>(
    AI_CARS.map(() => 0)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!gameActive && input.length > 0) {
      setGameActive(true);
      setStartTime(Date.now());
    }

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === SAMPLE_TEXT[i]) {
        correctChars++;
      }
    }

    const newProgress = (correctChars / SAMPLE_TEXT.length) * 100;
    setProgress(newProgress);

    if (correctChars === SAMPLE_TEXT.length) {
      setGameActive(false);
    }
  }, [input, gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setAiPositions((prev) =>
        prev.map((pos, idx) => {
          const newPos = pos + AI_CARS[idx].speedFactor * 0.5;
          return newPos > 100 ? 100 : newPos;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameActive]);

  const resetGame = () => {
    setInput("");
    setProgress(0);
    setGameActive(false);
    setStartTime(null);
    setAiPositions(AI_CARS.map(() => 0));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Distance indicator */}
      <div className="relative mb-8 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="absolute top-4 right-4">
        <MiniMap />
      </div>

      {/* Race track */}
      <div className="relative h-32 mb-8 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
        {/* Track line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-400" />

        {/* User car */}
        <Car position={progress} color="black" isUser={true} />

        {/* AI cars */}
        {AI_CARS.map((car, index) => (
          <Car
            key={car.id}
            position={aiPositions[index]}
            color={car.color}
            isUser={false}
            offsetY={index * 10 - 15}
          />
        ))}
      </div>

      {/* Typing area */}
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg text-gray-700 border border-gray-300">
          {SAMPLE_TEXT}
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Start typing to begin the race..."
          className="w-full p-4"
          autoFocus
        />

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Reset Game
        </button>
        <p>{startTime}</p>
      </div>
    </div>
  );
}
