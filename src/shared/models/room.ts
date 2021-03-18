import { User } from "./user";

export class Room {
  room: RoomInterface
  constructor(name: string) {
    this.room = {
      name,
      users: []
    };
  }

  updateRoomWithUser(username: string) {
    this.room.users.push(new User(username).user);
  }
}
