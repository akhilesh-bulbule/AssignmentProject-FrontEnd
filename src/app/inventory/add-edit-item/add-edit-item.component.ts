import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ItemModule, Item } from 'src/app/shared/models/data-model';
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnInit {

  active = false;
  saving = false;
  isItemDataPresent = false;  
  
  @Output() itemDataTriggerEvent = new EventEmitter<string>();
  @ViewChild('userModal', { static: true }) modal: ModalDirective;
  currentItem : Item = new Item();
  currentUserId : number;
  constructor(private _itemService : ItemService) { }

  ngOnInit(): void {
  }

  show(itemData ? : ItemModule.IItemModel): void {
    this.active = true;
    if(itemData){
      this.isItemDataPresent = true;
      this.currentItem = itemData;
      this.currentUserId = itemData.ItemId;
    }
    this.modal.show();
}

onShown(): void {
        
}

close(): void {
  this.active = false;
  this.modal.hide();
}

save(): void {
  if (this.currentUserId){
    this._itemService.updateItem(this.currentItem).subscribe(res => {
      console.log("Item Updated Successfully!!");
      this.modal.hide();
      this.itemDataTriggerEvent.emit('Item Updated');
    });
  }
  else{
    this.currentItem.ItemId = 0;
    this._itemService.addItem(this.currentItem).subscribe(res=> {
      console.log("Item added Successfully!!");
      this.modal.hide();
      this.itemDataTriggerEvent.emit('Item Added');
    })
  }
}

}
