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
  tableColumns: string[] = ['ItemName', 'Description', 'Price'];
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

deleteUser(itemId : number){
  this._itemService.deleteItem(itemId).subscribe(res => {
    this.getItems();
  });

}

}


// <p-table #dt [scrollable]="true" [rows]="10" scrollHeight="270px" [virtualRowHeight]="30" [loading]="loading"
//     [virtualScroll]="true" [value]="itemList"> <!--   [totalRecords]="totalRecords" -->
//   <ng-template pTemplate="caption">
//     </ng-template>
//     <ng-template pTemplate="header">
//         <tr class="text-center">
//             <th pSortableColumn="name">Item Name <p-sortIcon field="name"></p-sortIcon></th>
//             <th>Description</th>
//             <th>Price</th>
//             <th></th>
//             <th></th>
//         </tr>
//     </ng-template>
//     <ng-template pTemplate="body" let-userList>
//         <tr class="text-center">
//             <td>{{userList.UserName}}</td>
//             <td>{{userList.Email}}</td>
//             <td>{{userList.Designation}}</td>
//             <td><i class="far fa-edit" (click)="userModal.show(userList)"style="cursor:pointer;"></i></td>
//             <td><i class="far fa-trash" (click)="deleteUser (userList.UserId)" style="cursor:pointer;"></i></td>
//         </tr>
//     </ng-template>
// </p-table>