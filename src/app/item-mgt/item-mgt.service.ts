import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ItemMgtService {

  private itemUrl = '/api/items';
  private mealsetUrl = '/api/mealsets';

  constructor(private http: Http) { }

  // getItems() {

  //   return this.http.get(this.itemUrl)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch( (error: Response) => Observable.throw(error.json()));

  // }

  getItems() {

    return ([
      {
        name: '匈牙利烤雞腿飯盒',
        category: '肉料理',
        barCode: 'a0001',
        price: 100,
        unit: '盒',
        image: 'path/to/img',
        calorie: '300',
        ingredient: {
          id: '00A1',
          subjectName: '進貨-雞腿肉'
        },
        description: '',
        active: true
      },
      {
        name: '薄鹽烤鯖魚飯盒',
        category: '魚料理',
        barCode: 'a0002',
        price: 100,
        unit: '盒',
        image: 'path/to/img',
        calorie: '320',
        ingredient: {
          id: '00A2',
          subjectName: '進貨-鯖魚'
        },
        description: '',
        active: true
      }, {
        name: '野菜蔬果飯盒',
        category: '蔬料理',
        barCode: 'a0003',
        price: 100,
        unit: '盒',
        image: 'path/to/img',
        calorie: '300',
        ingredient: {
          id: '00A3',
          subjectName: '進貨-花椰菜'
        },
        description: '',
        active: true
      },
      {
        name: '養生紅醩肉飯盒',
        category: '主廚發揮',
        barCode: 'a0001',
        price: 100,
        unit: '盒',
        image: 'path/to/img',
        calorie: '290',
        ingredient: {
          id: '00A4',
          subjectName: '進貨-五花肉'
        },
        description: '',
        active: true
      },
      {
        name: '健康蔬果汁',
        category: '果汁',
        barCode: 'j0001',
        price: 65,
        unit: '杯',
        image: 'path/to/img',
        calorie: '150',
        ingredient: {
          id: '00B1',
          subjectName: '進貨-奇異果'
        },
        description: '',
        active: true
      }
    ]);

  } // end of getItems()

  getMealsets() {

    return ([
      {
        setName: '肉料理套餐',
        barCode: '00B1',
        price: '150',
        image: 'path/to/image',
        active: true,
        items: [
          {
            name: '匈牙利烤雞腿',
            category: '肉料理',
            barCode: 'a0001',
            price: 100,
            unit: '盒',
            image: 'path/to/img',
            calorie: '300',
            ingredient: {
              id: '00A1',
              subjectName: '進貨-雞腿肉'
            },
            description: '',
            active: true
          },
          {
            name: '健康蔬果汁',
            category: '果汁',
            barCode: 'j0001',
            price: 65,
            unit: '杯',
            image: 'path/to/img',
            calorie: '150',
            ingredient: {
              id: '00B1',
              subjectName: '進貨-奇異果'
            },
            description: '',
            active: true
          }
        ]
      },
      {
        setName: '魚料理套餐',
        barCode: '00B2',
        price: '150',
        image: 'path/to/image',
        active: true,
        items: [
          {
            name: '薄鹽烤鯖魚',
            category: '魚料理',
            barCode: 'a0002',
            price: 100,
            unit: '盒',
            image: 'path/to/img',
            calorie: '300',
            ingredient: {
              id: '00A1',
              subjectName: '進貨-鯖魚'
            },
            description: '',
            active: true
          },
          {
            name: '健康蔬果汁',
            category: '果汁',
            barCode: 'j0001',
            price: 65,
            unit: '杯',
            image: 'path/to/img',
            calorie: '150',
            ingredient: {
              id: '00B1',
              subjectName: '進貨-奇異果'
            },
            description: '',
            active: true
          }
        ]
      }
    ]);

  }

} // end of ItemMgtService()
