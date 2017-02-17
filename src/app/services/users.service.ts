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

    getUsers(query) {
        return this.http.get(`${API_URL}/search/users?q=${query}`)
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
