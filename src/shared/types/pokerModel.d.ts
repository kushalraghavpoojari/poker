export {};

declare global {
  interface message {

  }

  interface UserInterface {
    name: string;
  }

  interface RoomInterface {
    name: string;
    users: UserInterface[];
  }

  interface pokerModel {
    rooms: RoomInterface[];
  }
}
