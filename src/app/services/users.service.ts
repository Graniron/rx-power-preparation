import { Observable } from 'rxjs/Rx';
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


const API_URL = 'https://api.github.com';

@Injectable()
export class UsersService {
    private users;
    public onUsersUpdate: EventEmitter<any> = new EventEmitter();
    
    constructor(private http: Http) {}

    // grani+in%3Alogin+language%3Aruby

    getUsers(searchObj) {
        let q = 'q='
        if (searchObj.username) {
            q += `${searchObj.username}+in%3Alogin`;
        }
        if (searchObj.language) {
            q +=  `+language%3A${searchObj.language}`;
        }
        if(!searchObj.language && !searchObj.username) {
           q += '*===emtpy===*';     
        }
        

        return this.http.get(`${API_URL}/search/users?${q}`)
            .map(res => res.json());
    }

    getUser(id) {
        return this.http.get(`${API_URL}/user/${id}`)
            .map(res => res.json());
    }

    shareUsers(users) {
        // this.users = users;
        this.onUsersUpdate.emit(users);
    }

    // getStoredUsers(users) {
    //     return this.users;
    // }


}








  // Now, let’s say I want to emit 'hello' every 2 seconds, and never complete.
// We could easily do this with some built-in operators, but we can try by hand, as a small example:

// get(): Observable<string> {
//     return Observable.create(observer => {
//       const interval = setInterval(() => observer.next('hello'), 2000);
//     });
//   }

// The callback function passed to Observable.create()﻿ can also return a function that will be called on the unsubscription. 
// That’s really useful if you have some cleanup to do.
// Like us with our HelloService﻿, because we’ll need to stop the setInterval﻿ when the observable will be unsubscribed.
// get(): Observable<string> {
//     return Observable.create(observer => {
//       const interval = setInterval(() => observer.next('hello'), 2000);
//       return () => clearInterval(interval);
//     });
//   }
