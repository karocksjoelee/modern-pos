import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PreorderService {

  private saleUrl = '/api/sale/';
  private preOrderUrl = '/api/sale/preorderByDate/';
  private onsiteUrl = '/api/sale/onsiteByDate/';

  private serverErrorHandler(error: Response) {

    console.log(`[Pre-Order Error] ${error}`);
    return Observable.throw({
      status: 'Error',
      message: error || 'Pre-Order Service Error'
    });

  }

  constructor(private http: Http) { }

  // SALES ============================================

  getAllSales() {

    return this.http.get(this.saleUrl)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  getSale(id: any) {

    return this.http.get(this.saleUrl + `/${id}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);

  }


  createSale(saleObject: any) {

    return this.http.post(this.saleUrl, JSON.stringify(saleObject), {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .map((response: Response) => {
        const jsonRes = response.json();

        return ({
          status: 'OK',
          message: `已新增訂單`
        });

      }).catch(this.serverErrorHandler);

  }


  // PRE-ORDER ========================================

  getPreOrdersByDate(date) {

      return this.http.get(this.preOrderUrl + `${date}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);
  }

  deletePreorder(id) {

      return this.http.delete(this.saleUrl + `${id}`)
       .map((response: Response) => {
         return response.json();
       })
       .catch(this.serverErrorHandler);
  }


  // ON-SITE ========================================

  getOnsiteByDate(date) {

      return this.http.get(this.onsiteUrl + `${date}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.serverErrorHandler);
  }


} // end of MemberMgtService()
