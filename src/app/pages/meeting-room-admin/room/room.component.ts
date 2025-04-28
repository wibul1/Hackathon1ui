import { Component } from '@angular/core';
import { ZoneService } from 'src/app/services/meeting-room/zone.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReserveRoomService } from 'src/app/services/meeting-room/reserve-room.service';
import { RoomService } from 'src/app/services/meeting-room/room.service';




@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  myForm!: FormGroup;
  myFormpopup!: FormGroup;
  rooms: any[] = [];
  zoneOptions: any[] = [];
  isLoading = false;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private ReserveRoomService: ReserveRoomService,
    private ZoneService: ZoneService,
    private RoomService: RoomService
  ) { }

  roomData: any[] = [];
  roomColumns: any[] = [];
  
  ngOnInit() {
    this.myForm = this.fb.group({
      zone_id: [''],
      status: ['']
    });

    this.myFormpopup = this.fb.group({
      roomName: [''],
      zone_id: ['']
    });
  
    // โหลดโซน
    this.ZoneService.searchZone({}).subscribe((data: any[]) => {
      this.zoneOptions = data.map((z: any) => ({
        label: z.zoneName,
        value: z.id
      }));
    });
  
    // ตั้งค่าคอลัมน์สำหรับ Datatable
    this.roomColumns = [
      { dataType: 'action' },
      { field: 'roomName', header: 'ชื่อห้อง' },
      { field: 'roomNumber', header: 'เลขห้อง' },
      { field: 'zoneName', header: 'โซน' },
      { field: 'status', header: 'สถานะ' }
      // สำหรับปุ่ม Action
    ];
  }
  
  onSubmit() {
    const formValue = this.myForm.value;
    const queryParams = {
      zone_id: formValue.zone_id,
      status: formValue.status
    };
    this.isLoading = true; // ✅ เริ่มโหลด
    this.RoomService.searchReserveRooms(queryParams).subscribe(
      (res: any) => {
        this.isLoading = false;
  
        // เพิ่ม zoneName ให้กับแต่ละห้อง
        this.rooms = res.map((room: any) => ({
          ...room,
          zoneName: room.zone.zoneName // ดึง zoneName จาก room.zone
        }));
  
        this.roomData = this.rooms; // กำหนดข้อมูลให้กับ datatable
      },
      (err) => {
        this.isLoading = false;
        console.error('เกิดข้อผิดพลาด:', err);
      }
    );
  }
  
  onClear() {
    this.myForm.reset();
    this.rooms = [];
    this.roomData = [];
  }
  
  onDatatableFunction(event: any) {
    console.log('Action:', event.action, 'Data:', event.data);
    // คุณสามารถเขียน switch/case เพื่อ handle กด EDIT / DELETE ได้ที่นี่
  }
  
  openModal() {
    this.showModal = true;
  }

  OnSave() {
    const formValue = this.myFormpopup.value;
    const body = {
      roomName: formValue.roomName,
      zone_id: formValue.zone_id
    };
    // เขียนเชือ่มต่อ API ที่นี่

  }

  closeModalPopup() {
    this.showModal = false;
    this.myFormpopup.patchValue({ roomName: '', zone_id: '' });
  }
}
