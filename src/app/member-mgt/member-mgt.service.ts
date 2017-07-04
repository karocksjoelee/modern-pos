import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MemberMgtService {

  private memberUrl = '/api/members';
  private buildingUrl = '/api/buildings';

  private serverErrorHandler(error: Response) {

    console.log(`[Accounting Error] ${error}`);
    return Observable.throw({
      status: 'Error',
      message: error || 'Member Service Error'
    });

  }

  constructor(private http: Http) { }

  // BUILDINGS ========================================

  getBuildings() {

    return this.http.get(this.buildingUrl)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  getBuilding(id: any) {

    return this.http.get(this.buildingUrl + `/${id}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  createBuilding(buildingObject: any) {

    return this.http.post(this.buildingUrl, JSON.stringify(buildingObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已新增大樓: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }


  updateBuilding(id, buildingObject: any) {

    return this.http.put(this.buildingUrl + `/${id}`, JSON.stringify(buildingObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已更新大樓: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }



  // MEMBER ========================================

  getMembers() {

    return this.http.get(this.memberUrl)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  getMember(id: any) {

    return this.http.get(this.memberUrl + `/${id}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  createMember(memberObject: any) {

    return this.http.post(this.memberUrl, JSON.stringify(memberObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已新增會員: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }


  updateMember(id, memberObject: any) {

    return this.http.put(this.memberUrl + `/${id}`, JSON.stringify(memberObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已更新會員: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }



} // end of MemberMgtService()
