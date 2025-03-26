"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Car } from "./car";
import { MiniMap } from "@/components/mini-map";

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
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [aiPositions, setAiPositions] = useState<number[]>(
    AI_CARS.map(() => 0)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://api.quotable.io/random?minLength=250&maxLength=350")
      .then((response) => response.json())
      .then((data) => setText(data.content));
  }, []);

  // const newText = () => {

  // }

  useEffect(() => {
    if (!gameActive && input.length > 0) {
      setGameActive(true);
      setStartTime(Date.now());
    }

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correctChars++;
      }
    }

    const newProgress = (correctChars / text.length) * 100;
    setProgress(newProgress);

    if (correctChars === text.length) {
      setGameActive(false);
    }
  }, [input, gameActive, text]);

  useEffect(() => {
    if (!gameActive) return;
  
    // Generate unique random speeds for each car (between 25-50 WPM)
    const updatedSpeeds = AI_CARS.map(() => Math.random() * (50 - 25) + 25);
  
    setAiPositions((prev) =>
      prev.map(() => 0) // Reset positions at the start
    );
  
    const interval = setInterval(() => {
      setAiPositions((prev) =>
        prev.map((pos, idx) => {
          const speedFactor = updatedSpeeds[idx] * 0.002; // 10x slower
          const newPos = pos + speedFactor;
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

  const getHighlightedText = () => {
    return text.split("").map((char, index) => {
      if (index < input.length) {
        return (
          <span
            key={index}
            className={
              input[index] === char ? "text-green-800" : "text-red-800"
            }
          >
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Distance indicator */}
      {/* <div className="relative mb-8 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div> */}

      <div className="absolute top-4 right-4">
        <MiniMap progress={progress} opp={aiPositions} oppCars={AI_CARS} />
      </div>

      {/* Race track */}
      <div className="relative h-32 mb-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-700">
        {/* Track line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-600" />

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
        <div className="p-4 bg-zinc-900 rounded-lg text-zinc-100 border border-zinc-700">
          {getHighlightedText()}
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Start typing to begin the race..."
          className="w-full p-4 text-zinc-100"
          autoFocus
        />

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer"
        >
          Reset Game
        </button>
        <p>{startTime}</p>
      </div>
    </div>
  );
}
