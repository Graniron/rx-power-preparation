import { Observable } from 'rxjs/Rx';
import { UsersService } from './../../../services/users.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-users-search-form',
  templateUrl: './users-search-form.component.html',
  styleUrls: ['./users-search-form.component.css']
})
export class UsersSearchFormComponent implements OnInit {
  private username = new FormControl();
  private language = new FormControl();

  private searchObj = {
    username: '',
    language: '',
  }
  
  private users;

  constructor(private usersService: UsersService) { }

  ngOnInit() {  

  this.language.valueChanges.merge(this.username.valueChanges)
        .debounceTime(1000)
        .distinctUntilChanged()
        .switchMap(value => this.usersService.getUsers(this.searchObj).catch(err => Observable.of([])))
        .subscribe(results => this.usersService.shareUsers(results));


    //  this.language.valueChanges
    //     // .filter(query => query.length >= 3)
    //     .debounceTime(400)
    //     .distinctUntilChanged()
    //     .switchMap(value => this.usersService.getUsers(this.searchObj).catch(err => Observable.of([])))
    //     .subscribe(results => this.usersService.shareUsers(results));





    // OK, that works. But when I see something like this, it reminds me of Promises and nested then calls,    
    // this.input.valueChanges.subscribe(
    //    value => {
    //      this.usersService.getUsers(value).subscribe(
    //        (results) => {
    //          this.users = results.items;
    //        }
    //      )
    //    }     
    // )



    // that can be flattened. And indeed you can do the same with Observables, with the concatMap﻿ operator for example:
    // this.input.valueChanges
    //   .concatMap(value => this.usersService.getUsers(value))
    //   .subscribe(results => this.users = results.items);
    // concatMap "flattens" our code. It replaces every event emitted by the source observable (i.e. the entered user name) 
    // by the events emitted by the observable of fetched users 

    // As our search﻿ method performs an HTTP request per search, we can run into some troubles if a request is too slow. Our user might query n﻿ then ni﻿,
    // but the result might come back really slowly for n﻿, and fast for ni﻿. That means our code above will display the second results only after the first displayed,
    // even if we don’t care about the first ones anymore! This could be tracked by hand, but that would be really cumbersome.

    //Unlike concatMap﻿, switchMap﻿ will only care about the last value emitted, and will discard the earlier values,
    // so we’re sure that the results corresponding to an old input won’t be displayed.
    // this.input.valueChanges
    //   .switchMap(value => this.usersService.getUsers(value))
    //   .subscribe(results => this.users = results.items);

    // OK, now let’s discard the queries that are less than three characters. Easy: we just have to use a filter﻿ operator!
      // this.input.valueChanges
      //   .filter(query => query.length >= 3)
      //   .switchMap(value => this.usersService.getUsers(value))
      //   .subscribe(results => this.users = results.items);


    // We also don’t want to search immediately after a keystroke: we’d like to search only after the user stops typing for 400ms for example.
    // Yep, you guessed it: there’s an operator for that, and it’s called debounceTime﻿:   
    // this.input.valueChanges
    //     .filter(query => query.length >= 3)
    //     .debounceTime(400)
    //     .switchMap(value => this.usersService.getUsers(value))
    //     .subscribe(results => this.users = results.items); 


     // So now a user can enter a value, delete some character, add others and the query will only fire when 400ms have passed since the last keystroke.
     // But what if the user enters "Rainbow", waits for 400ms (which will thus send a request), then enters "Rainbow Dash" and immediately removed the "Dash"
     // to get back to "Rainbow"? That would send two subsequent requests for "Rainbow"! Maybe we can only trigger a request if the query is different than the last one?
     // Of course we can, with distinctUntilChanged﻿:   
    // this.input.valueChanges
    //     .filter(query => query.length >= 3)
    //     .debounceTime(400)
    //     .distinctUntilChanged()
    //     .switchMap(value => this.usersService.getUsers(value))
    //     .subscribe(results => this.users = results.items); 


     // Last thing: we need to properly handle the errors. We know that the valueChanges﻿ will not emit any error, but our ponyService.search()﻿ 
     // observable might throw as it is dependent on the network. And the problem with observables is that an error will completely break the stream:
     // so if one request blows, the whole typeahead will be down…​ We don’t want that, so let’s catch potential errors:   
    // this.username.valueChanges
    //     // .filter(query => query.length >= 3)
    //     .debounceTime(400)
    //     .distinctUntilChanged()
    //     .switchMap(value => this.usersService.getUsers(this.searchObj).catch(err => Observable.of([])))
    //     .subscribe(results => this.usersService.shareUsers(results)); 


    // Quite nice, don’t you think? We now only trigger a search when the user enters a text with more then 3 characters and waits at least 400ms.
    // We guarantee that we don’t trigger the same request twice, and that the results are always in sync with the request!
    // All that in 5 lines of code. Good luck doing the same by hand without adding any issue…​
    // This is of course a really good use-case for RxJS, but the point is that it provides a lot of operators, with some gems hidden in it.
    // It takes time to understand it, but it’s worth the trouble as it can be tremendously useful in your application.    

  }

}




// Building your own Observable
// const numbers = Observable.create(observer => {
//   observer.next(1);
//   observer.next(2);
//   observer.complete();
// });


// numbers.subscribe(
//   number => console.log(number),
//   error => console.log(error),
//   () => console.log('Complete!')
// );
// Will log:
// 1
// 2
// Complete!



// GO TO SERVICE
