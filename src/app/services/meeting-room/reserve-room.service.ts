import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReserveRoomService {

  private baseUrl = 'http://localhost:8080/api/reserve_rooms';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
  }

  public searchReserveRooms(params: any) {
    return this.http.get(`${this.baseUrl}/searchRoomByZone`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
  
  public searchTimeRooms(params: any) {
    return this.http.get<{ timeFrom: string; timeTo: string }[]>(`${this.baseUrl}/searchTimeByRoomId`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  public addReserveRoom(body: any) {
    return this.http.post(`${this.baseUrl}/addReserveRoom`, body, {
      headers: this.getAuthHeaders()
    });
  }

  public changStatusReserveRoom(body: any) {
    return this.http.post(`${this.baseUrl}/changStatusReserveRoom`, body, {
      headers: this.getAuthHeaders()
    });
  }

  public searchReserveRoom(params: any) {
    return this.http.get(`${this.baseUrl}/searchReserveRoom`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  

}
  
