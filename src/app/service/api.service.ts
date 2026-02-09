import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private api = '/api';

    constructor(private http: HttpClient) {}
    
    getAdminTestMessage() {
        return this.http.get(this.api + '/admin', { responseType: 'text' });
    }
}