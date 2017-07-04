import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

    getAccountSubject(id: any) {
        return this.http.get(this.accountSubjectUrl + `/${id}`)
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

    createSubject(accountSubject: any) {

        return this.http.post(this.accountSubjectUrl, JSON.stringify(accountSubject), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        })
            .map((response: Response) => {
                const jsonRes = response.json();

                return ({
                    status: 'OK',
                    message: `已新增科目: ${jsonRes.subjectName}`
                });

            }).catch(this.serverErrorHandler);

    }

    updateSubject(id, accountSubject: any) {

        return this.http.put(this.accountSubjectUrl + `/${id}`, JSON.stringify(accountSubject), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        })
            .map((response: Response) => {
                const jsonRes = response.json();

                return ({
                    status: 'OK',
                    message: `已更新科目: ${jsonRes.subjectName}`
                });

            }).catch(this.serverErrorHandler);

    }

    // ACCOUNTING ========================================

    getAccountings() {

        return this.http.get(this.accountingUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.serverErrorHandler);

    }

    getAccountingsByDate(date) {

        return this.http.get(this.accoutingByDate + date)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.serverErrorHandler);

    }

    newAccounting(accountingObject: any) {

        return this.http.post(this.accountingUrl, JSON.stringify(accountingObject), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        })
            .map((response: Response) => {
                const jsonRes = response.json();

                return ({
                    status: 'OK',
                    message: `已新增帳務: ${jsonRes.subjectName} at ${jsonRes.date}`
                });

            }).catch(this.serverErrorHandler);

    }


} // end of AccountingService();
