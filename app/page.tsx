"use client";

import { useState } from "react";
import TypingRaceGame from "../components/typing-race-game";

export default function Home() {
  const [showOptions, setShowOptions] = useState(true);

  // if (showOptions) {
  //   return (
  //     <div className="p-4 bg-gray-100 rounded-lg text-gray-700 border border-gray-300">
  //       <p className="text-lg font-bold mb-4">Welcome to the Context Blog</p>
  //       <p className="mb-4">Choose an option to proceed:</p>
  //       <div className="flex gap-4">
  //         <button
  //           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
  //           onClick={() => setShowOptions(false)}
  //         >
  //           Join
  //         </button>
  //         <button
  //           className="px-4 py-2 bg-green-500 text-white rounded-lg"
  //           onClick={() => setShowOptions(false)}
  //         >
  //           Create
  //         </button>
  //         <button
  //           className="px-4 py-2 bg-gray-500 text-white rounded-lg"
  //           onClick={() => setShowOptions(false)}
  //         >
  //           Computer
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-black relative">
      {showOptions && (
        <div className="backdrop-blur-[7px] sm:backdrop-blur-[12px] absolute inset-0 flex items-center justify-center z-40">
          <div className="flex gap-2 w-80 bg-black flex-col p-5 rounded-lg border border-zinc-800 z-50">
            <button className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer" onClick={() => setShowOptions(false)}>
              Join
            </button>
            <button className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer" onClick={() => setShowOptions(false)}>
              Create
            </button>
            <button className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer" onClick={() => setShowOptions(false)}>
              Computer
            </button>
          </div>
        </div>
      )}
      <h1 className="text-3xl text-zinc-100 font-bold mb-8">
        Typing Race Game
      </h1>
      <TypingRaceGame />
    </main>
  );
}
