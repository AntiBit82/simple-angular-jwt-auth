import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private api = '/api';

    constructor(private http: HttpClient) {}
    
    getTestMessage(admin: boolean = false) {
        const path = `${this.api}/test/${admin ? 'admin' : 'user'}`;
        return this.http.get(path, { responseType: 'text' });
    }
}