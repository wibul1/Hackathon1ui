import { Component } from '@angular/core';
import { ZoneService } from 'src/app/services/meeting-room/zone.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReserveRoomService } from 'src/app/services/meeting-room/reserve-room.service';
import { RoomService } from 'src/app/services/meeting-room/room.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent {

  myFormpopup!: FormGroup;

  isLoading = false;
  showModal = false;

  constructor(
      private fb: FormBuilder,
      private ReserveRoomService: ReserveRoomService,
      private ZoneService: ZoneService,
      private RoomService: RoomService
    ) { }

    zoneData: any[] = [];
    zoneColumns: any[] = [];

    ngOnInit() {
      this.myFormpopup = this.fb.group({
        zoneName: ['']
      });

      this.isLoading = true; 
      this.ZoneService.searchZone({}).subscribe((data: any[]) => {
        this.isLoading = false;
        this.zoneData = data.map((z: any) => ({
          id: z.id,
          zoneName: z.zoneName,
          status: z.status
        }));
        this.zoneData = this.zoneData.map((z: any) => ({
          ...z,
          status: z.status === 1 ? 'ไม่ใช้งาน' : 'ใช้งาน'
        }));
      }, (error) => {
        this.isLoading = false;
        console.error('Error fetching zone data:', error);
      });


      this.zoneColumns = [
        { dataType: 'action' },
      
        { field: 'zoneName', header: 'โซน' },
        { field: 'status', header: 'สถานะ' }
        // สำหรับปุ่ม Action
      ];

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
      this.myFormpopup.patchValue({ zoneName: ''});
    }

    onDatatableFunction(event: any) {
      console.log('Action:', event.action, 'Data:', event.data);
      // คุณสามารถเขียน switch/case เพื่อ handle กด EDIT / DELETE ได้ที่นี่
    }

}
