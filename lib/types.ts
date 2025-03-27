export interface User {
    id: string;
    username: string;
    roomCode: string;
    progress?: number;
}

export interface RoomState {
    roomCode: string;
    admin: string;
    users: User[];
    started: boolean;
}