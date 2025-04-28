import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReserveRoomService } from 'src/app/services/meeting-room/reserve-room.service';
import { ZoneService } from 'src/app/services/meeting-room/zone.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  myForm!: FormGroup;
  myFormpopup!: FormGroup;
  rooms: any[] = [];
  zoneOptions: any[] = [];
  timeOptions: any[] = [];
  showModal = false;
  selectedRoom: any;

  constructor(
    private fb: FormBuilder,
    private ReserveRoomService: ReserveRoomService,
    private ZoneService: ZoneService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      zone_id: [''],
      status: [''],
      timeFrom: [''],
      timeTo: ['']
    });

    this.myFormpopup = this.fb.group({
      timeFrom: [''],
      timeTo: ['']
    });

    this.ZoneService.searchZone({}).subscribe((data: any[]) => {
      this.zoneOptions = data.map((z: any) => ({
        label: z.zoneName,
        value: z.id
      }));
    });

    this.timeOptions = this.generateTimeOptions();
  }

  
  fetchUnavailableTimes(roomId: string) {
    this.ReserveRoomService.searchTimeRooms({ roomId }).subscribe(
      (unavailableTimes: { timeFrom: string; timeTo: string }[]) => {
        const allOptions = this.generateTimeOptions(); // ตัวเลือกเวลาที่กรองตามเวลาปัจจุบันแล้ว
  
        // กรองเวลาที่ไม่สามารถจองได้
        this.timeOptions = allOptions.filter((option) => {
          return !unavailableTimes.some((unavailable) => {
            const optionTime = option.value;
            return (
              optionTime >= unavailable.timeFrom && optionTime < unavailable.timeTo
            );
          });
        });
      },
      (err) => {
        console.error('เกิดข้อผิดพลาดในการดึงเวลาที่ไม่สามารถจองได้:', err);
      }
    );
  }

  generateTimeOptions() {
    const options = [];
    const currentHour = new Date().getHours(); // ดึงชั่วโมงปัจจุบัน
  
    for (let hour = 8; hour <= 18; hour++) {
      if (hour > currentHour) { // แสดงเฉพาะเวลาที่มากกว่าชั่วโมงปัจจุบัน
        const time = `${hour}:00`;
        options.push({ label: time, value: time });
      }
    }
    return options;
  }

  onSubmit() {
    const formValue = this.myForm.value;
    const queryParams = {
      zone_id: formValue.zone_id,
      status: formValue.status
    };

    this.ReserveRoomService.searchReserveRooms(queryParams).subscribe(
      (res) => {
        this.rooms = res as any[];
      },
      (err) => {
        console.error('เกิดข้อผิดพลาด:', err);
      }
    );
  }

  onClear() {
    this.myForm.reset();
    this.rooms = [];
  }

  handleReserve(room: any) {
  this.selectedRoom = room;
  this.showModal = true;
  if (room && room.roomId) {
    this.fetchUnavailableTimes(room.roomId);
  } else {
    console.error('Room ID is undefined or invalid.');
  }
  }

  closeModal() {
    this.showModal = false;
    this.myFormpopup.patchValue({ timeFrom: '', timeTo: '' });
  }

  confirmReservation() {
    const { timeFrom, timeTo } = this.myFormpopup.value;
    if (timeFrom && timeTo) {
      if (timeFrom == timeTo) {
        return alert('กรุณาเลือกเวลาให้แตกต่างกัน');
      }
      const reservationData = {
        room_id: this.selectedRoom.roomId,
        timeFrom: timeFrom,
        timeTo: timeTo
      };

      
      alert(`จองห้อง ${this.selectedRoom.roomNumber} เรียบร้อย: ${timeFrom} - ${timeTo}`);
      this.ReserveRoomService.addReserveRoom(reservationData).subscribe(
        (response) => {
          console.log('Reservation successful:', response);
        },
        (error) => {
          console.error('Error during reservation:', error);
        }
      );
      // แสดงข้อความยืนยันการจอง
      
      this.closeModal();
    } else {
      alert('กรุณาเลือกเวลาให้ครบถ้วน');
    }
  }
}
