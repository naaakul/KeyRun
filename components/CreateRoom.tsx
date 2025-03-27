import React, { useState } from 'react';
import {useRouter} from "next/navigation";


interface CreateRoomProps {
    connectToWebSocket: (username: string, roomCode: string) => void;
  }

const CreateRoom: React.FC<CreateRoomProps> = ({ connectToWebSocket }) => {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleCreateRoom = () => {
        if (username.trim()) {
          fetch('/api/create-room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
          })
          .then(response => response.json())
          .then(data => {
            const roomCode = data.roomCode;
            connectToWebSocket(username, roomCode);
            router.push(`/room/${roomCode}`);
          });
        }
      };

  return (
    <>
        <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="name"
        className="px-4 py-2 bg-primary text-zinc-100 rounded-md"
      />
      <button
        className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer"
        onClick={handleCreateRoom}
      >
        Create
      </button>
    </>
  )
}

export default CreateRoom