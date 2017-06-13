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

    private accountSubjects = [];
    private accountings = [];

    private mainIngredients = [
        {
            subjectName: '進貨-雞腿肉',
            subjectEng: 'Purchase-ChickenLegs',
            subjectType: 'Expense',
            barCode: 'pc0001',
            unit: 'g',
            main: true,
            description: ''
        },
        {
            subjectName: '進貨-豬肉',
            subjectEng: 'Purchase-Porks',
            subjectType: 'Expense',
            barCode: 'pc0002',
            unit: 'g',
            main: true,
            description: ''
        },
        {
            subjectName: '進貨-鯖魚',
            subjectEng: 'Purchase-Mackerel',
            subjectType: 'Expense',
            barCode: 'pc0003',
            unit: 'g',
            main: true,
            description: ''
        },
        {
            subjectName: '進貨-蔬菜',
            subjectEng: 'Purchase-Vegetables',
            subjectType: 'Expense',
            barCode: 'pc0004',
            unit: 'g',
            main: true,
            description: ''
        },
    ];

    constructor(private http: Http) { }

    getAccountSubjects() {

        return this.accountSubjects;

    }


    getMainIngredients() {

        return this.mainIngredients;

    }


    getAccoutings() {

        return this.accountings;

    }


} // end of AccountingService();
