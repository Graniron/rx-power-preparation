import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


const API_URL = 'https://api.github.com';

@Injectable()
export class UsersService {
    constructor(private http: Http) {}

    getUsers(query) {
        return this.http.get(`${API_URL}/search/users?q=${query}`)
            .map(res => res.json());
    }
}