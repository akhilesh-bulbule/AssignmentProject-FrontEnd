import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ItemModule, Item } from './models/data-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly baseUrl = 'http://localhost:50946/api';
  constructor( private _http: HttpClient ) { }

  getItemList() : Observable<ItemModule.IItemModel[]>{
    let endpointUrl = this.baseUrl + '/Items';
    
    let response = this._http.get<ItemModule.IItemModel[]>(endpointUrl)
            .pipe(map((res: ItemModule.IItemModel[]) => {
                return res;
            }));

        return response;
    
  }

  deleteItem(itemId : number){
      let endpointUrl = this.baseUrl + '/Items/'+ itemId;
      
      return this._http.delete(endpointUrl)
      .pipe(map(res => {
        return res;
    }));
  }

updateItem(inputItem :Item){
  let endpointUrl = this.baseUrl + '/Items/'+ inputItem.ItemId;
      
  const content_ = JSON.stringify(inputItem);

  let options_: any = {
    observe: 'response',
    responseType: 'blob',
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};

      return this._http.put(endpointUrl,content_,options_)
      .pipe(map(res => {
        return res;
    }));
}

addItem(inputItem :Item){
  let endpointUrl = this.baseUrl + '/Items';
      
  const content_ = JSON.stringify(inputItem);

  let options_: any = {
    observe: 'response',
    responseType: 'blob',
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};

      return this._http.post(endpointUrl,content_,options_)
      .pipe(map(res => {
        return res;
    }));
}


}
