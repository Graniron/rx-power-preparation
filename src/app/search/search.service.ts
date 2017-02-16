import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchService {
  clientID = 27;
  baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';

  constructor(private _http: Http) { }

  search(queryString: string) {
    return this._http.get(`${this.baseUrl}${queryString}`);
  }

}
