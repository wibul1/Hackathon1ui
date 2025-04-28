import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
  }

  public searchReserveRooms(params: any) {
    return this.http.get<any[]>(`${this.baseUrl}/adminSearchRoomByZone`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
  
  
}
  
