import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MemberMgtService {

  private memberUrl = '/api/members';
  private buildingUrl = '/api/buildings';

  constructor(private http: Http) { }

  // getMembers() {

  //   return this.http.get(this.memberUrl)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch( (error: Response) => Observable.throw(error.json()));

  // }

  // getBuildings() {

  //   return this.http.get(this.buildingUrl)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch( (error: Response) => Observable.throw(error.json()));

  // }


} // end of MemberMgtService()
