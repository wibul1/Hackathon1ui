import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private baseUrl = 'http://localhost:8080/api/zones';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin')
    });
  }

  public searchZone(params: any) {
    return this.http.get<any[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
  
  
}
  
