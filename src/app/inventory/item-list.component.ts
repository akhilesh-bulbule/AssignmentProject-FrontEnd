import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Table } from 'primeng/table';
import {ItemModule} from '../shared/models/data-model';
import { ItemService } from '../shared/item.service';
import { LazyLoadEvent } from 'primeng/api';
import { MatSort, Sort } from '@angular/material/sort';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemListComponent implements OnInit {
 
  itemList : ItemModule.IItemModel[] = [];
  tableColumns: string[] = ['ItemName', 'Description', 'Price', 'ItemIdForEdit','ItemIdForDelete'];
  resultsLength = 0;
  loading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _itemService : ItemService) { }

  ngOnInit(){
    this.getItemList();
  }

  getItemList(event?: LazyLoadEvent){
    this.getItems().then((result: ItemModule.IItemModel[]) =>{
      this.resultsLength = result.length;
      this.itemList = result;
      console.log(this.itemList);
    });
  }

  getItems() {
    let promise = new Promise((resolve, reject) => {
      this._itemService.getItemList().subscribe((result: ItemModule.IItemModel[]) => {
            resolve(result);
        });
    });
    return promise;
}

deleteItem(itemId : number){
  this._itemService.deleteItem(itemId).subscribe(res => {
    this.getItemList();
  });

}

}
