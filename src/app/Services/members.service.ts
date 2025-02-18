import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member } from '../Model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = 'https://localhost:7030/api/Members';

  constructor() { }
  http = inject(HttpClient)

  getAuthHeaders() {
    const token = localStorage.getItem('jwt_token'); // Get token from storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllMembers() {
    return this.http.get<Member[]>(this.apiUrl, { headers: this.getAuthHeaders() })
  }

  addNewMember(data: any) {
    return this.http.post(this.apiUrl, data, { headers: this.getAuthHeaders() })
  }

  updateMember(data: any) {
    return this.http.put(this.apiUrl, data, { headers: this.getAuthHeaders() })
  }

  deleteMember(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
