import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ItemMgtService {

  private itemUrl = '/api/items';
  private mealsetUrl = '/api/mealSets';

  private serverErrorHandler(error: Response) {

    console.log(`[ItemMgt Error] ${error}`);
    return Observable.throw({
      status: 'Error',
      message: error || 'Item Service Error'
    });

  }

  constructor(private http: Http) { }

  // ITEM ========================================

  getItems() {

    return this.http.get(this.itemUrl)
        .map((response: Response) => {
          return response.json();
        })
        .catch(this.serverErrorHandler);

  }

  getItemById(id: any) {

    return this.http.get(this.itemUrl + `/${id}`)
        .map((response: Response) => {
          return response.json();
        })
        .catch(this.serverErrorHandler);

  }

  createItem(itemObject: any) {

    return this.http.post(this.itemUrl, JSON.stringify(itemObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已新增餐點: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }

  updateItem(id, itemObject: any) {

    return this.http.put(this.itemUrl + `/${id}`, JSON.stringify(itemObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已更新餐點: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }


  // MEALSETS ========================================

  getMealsets() {

    return this.http.get(this.mealsetUrl)
        .map((response: Response) => {
          return response.json();
        })
        .catch(this.serverErrorHandler);

  }


  getMealsetById(id: any) {

    return this.http.get(this.mealsetUrl + `/${id}`)
        .map((response: Response) => {
          return response.json();
        })
        .catch(this.serverErrorHandler);

  }

  createMealset(mealSetObject: any) {

    return this.http.post(this.mealsetUrl, JSON.stringify(mealSetObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已新增餐點: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }

  updateMealSet(id, mealSetObject: any) {

    return this.http.put(this.mealsetUrl + `/${id}`, JSON.stringify(mealSetObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已更新套餐: ${jsonRes.name}`
        });

      }).catch(this.serverErrorHandler);

  }


} // end of ItemMgtService()
