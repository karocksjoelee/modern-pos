import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AccountingService {

    private accountSubjectUrl = 'api/accountSubject';
    private mainIngredientUrl = 'api/accountSubject/mainIngredient';
    private accountingUrl = 'api/accounting';
    private accoutingByDate = 'api/accounting/byDate/';

    private serverErrorHandler(error: Response) {

    console.log(`[Accounting Error] ${error}`);
    return Observable.throw({
      status: 'Error',
      message: error || 'Accounting Service Error'
    });

  }

    constructor(private http: Http) { }

    // ACCOUNT SUBJECT ========================================

    getAccountSubjects() {

        return this.http.get(this.accountSubjectUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.serverErrorHandler);

    }


    getMainIngredients() {

        return this.http.get(this.mainIngredientUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.serverErrorHandler);

    }

    // ACCOUNting ========================================

    getAccountings() {

        return this.http.get(this.accountingUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.serverErrorHandler);

    }


} // end of AccountingService();
