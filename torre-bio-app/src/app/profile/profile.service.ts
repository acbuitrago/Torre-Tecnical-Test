import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  torreURL:string ="https://bio.torre.co/api/";
  constructor(public http: Http) { }


  getUser(userid:string){
    return this.http.get(this.torreURL+"bios/"+userid)
      .map(res => res.json());
  }


}
