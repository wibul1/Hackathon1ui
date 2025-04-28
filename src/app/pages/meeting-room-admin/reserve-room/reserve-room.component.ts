import { Component } from '@angular/core';
import { ZoneService } from 'src/app/services/meeting-room/zone.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReserveRoomService } from 'src/app/services/meeting-room/reserve-room.service';
import { RoomService } from 'src/app/services/meeting-room/room.service';
import { ReserveRoomModel } from 'src/app/models/reserve-room.model';



@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent {

  myForm!: FormGroup;
  myFormpopup!: FormGroup;
  modelFrom!: FormGroup;
  ReserveRoom: any[] = [];
  zoneOptions: any[] = [];
  roomOptions: any[] = [];
  isLoading = false;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private ReserveRoomService: ReserveRoomService,
    private ZoneService: ZoneService,
    private RoomService: RoomService
  ) { }

  ReserveRoomData: any[] = [];
  ReserveRoomColumns: any[] = [];

  ngOnInit() {
    this.myForm = this.fb.group({
      zone_id: [''],
      room_id: ['']
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
  
     // โหลดโซน
     this.ZoneService.searchZone({}).subscribe((data: any[]) => {
      this.zoneOptions = data.map((z: any) => ({
        label: z.zoneName,
        value: z.id
      }));
    });
  
     // โหลดโซน
    this.ZoneService.searchZone({}).subscribe((data: any[]) => {
      this.zoneOptions = data.map((z: any) => ({
        label: z.zoneName,
        value: z.id
      }));
    });

    // ฟังการเปลี่ยนแปลงค่า zone_id เพื่อโหลดห้องที่อยู่ในโซนที่เลือก
    this.myForm.get('zone_id')?.valueChanges.subscribe((zoneId) => {
      if (zoneId) {
        const formValue = this.myForm.value;
        const queryParams = {
          zone_id: formValue.zone_id,
          status: 'A'
        };
        this.RoomService.searchReserveRooms(queryParams).subscribe(
          (data: any[]) => {
            this.roomOptions = data.map((room: any) => ({
              label: room.roomNumber,
              value: room.id
            }));
          },
          (err) => {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:', err);
          }
        );
      } else {
        this.roomOptions = []; // ล้างตัวเลือกห้องหาก zone_id เป็นค่าว่าง
      }
    });

    // ตั้งค่าคอลัมน์สำหรับ Datatable
    this.ReserveRoomColumns = [
      { dataType: 'action' },
      { field: 'zoneName', header: 'ชื่อโซน' },
      { field: 'roomName', header: 'ชื่อห้อง' },
      { field: 'roomNumber', header: 'เลขห้อง' },
      { field: 'timeFrom', header: 'เวลาเริ่ม' },
      { field: 'timeTo', header: 'เวลาจบ' },
      { field: 'status', header: 'สถานะ' }
      // สำหรับปุ่ม Action
    ];
  }

  onSubmit() {
    const formValue = this.myForm.value;
    const queryParams = {
      zone_id: formValue.zone_id,
      room_id: formValue.room_id
    };
    this.isLoading = true; // ✅ เริ่มโหลด
    this.ReserveRoomService.searchReserveRoom(queryParams).subscribe(
      (res: any) => {
        this.isLoading = false;
  
        // เพิ่ม zoneName ให้กับแต่ละห้อง
        this.ReserveRoom = res;
  
        this.ReserveRoomData = this.ReserveRoom; // กำหนดข้อมูลให้กับ datatable
      },
      (err) => {
        this.isLoading = false;
        console.error('เกิดข้อผิดพลาด:', err);
      }
    );
  }
  
  onClear() {
    this.myForm.reset();
    this.ReserveRoom = [];
    this.ReserveRoomData = [];
  }

  onDatatableFunction(event: any) {
    console.log('Event from datatable:', event);
    switch (event.action) {
      case 'EDIT':
        this.onedit(event.data);
        break;
      case 'DELETE':
        this.ondelete(event.data);
        break;
      case 'CHANGE':
        this.onchange(event.data);
        break;
    }
  }
  
  onedit(data: ReserveRoomModel) {
    console.log('Edit action');
  }
  ondelete(data: ReserveRoomModel) {
    console.log('Delete action');
  }
  onchange(data: ReserveRoomModel) {
    console.log('Change action', data);

      // ทำการเปลี่ยนแปลงสถานะที่นี่ 
    this.ReserveRoomService.changStatusReserveRoom(data).subscribe(
      (res) => {  
        console.log('Status changed successfully:', res);
      },
      (error) => {
        console.error('Error during Status changed:', error);
      }
    );  
  
    
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
