import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(public http: Http) { }


  getUser(userid:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get("https://bio.torre.co/api/bios/"+userid, {headers: headers})
      .map(res => res.json());
  }


}
