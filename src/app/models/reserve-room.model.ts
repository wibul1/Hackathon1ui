
export class ReserveRoomModel {
  id: string;
  roomName: string;
  roomNumber: string;
  timeFrom: string;
  timeTo: string;
  status: string;

  constructor(
    id: string,
    roomName: string,
    roomNumber: string,
    timeFrom: string,
    timeTo: string,
    status: string
  ) {
    this.id = id;
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
    this.status = status;
  }
}