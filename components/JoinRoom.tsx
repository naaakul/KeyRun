import React, { useState } from "react";
import {useRouter} from "next/navigation";

interface JoinRoomProps {
  connectToWebSocket: (username: string, roomCode: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ connectToWebSocket }) => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
//   const navigate = useNavigate();
const router = useRouter();

  const handleJoinRoom = () => {
    if (username.trim() && roomCode.trim()) {
      fetch(`/api/check-room/${roomCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            connectToWebSocket(username, roomCode);
            // navigate(`/room/${roomCode}`);
            router.push('/room/${roomCode}');
          } else {
            alert("Room does not exist");
          }
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
      <input
        type="text"
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="code"
        className="px-4 py-2 bg-primary text-zinc-100 rounded-md"
      />
      <button
        className="px-4 py-2 bg-primary text-zinc-100 rounded-md hover:bg-primary/50 cursor-pointer"
        onClick={handleJoinRoom}
      >
        Join
      </button>
    </>
  );
};

export default JoinRoom;
