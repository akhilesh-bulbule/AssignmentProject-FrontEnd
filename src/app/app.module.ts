import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppBsModalModule } from '../app/shared/common/appBsModal/app-bs-modal.module';

import { AppComponent } from './app.component';
import { ItemListComponent } from './inventory/item-list.component';

import {ItemService} from 'src/app/shared/item.service';

import { AddEditItemComponent } from './inventory/add-edit-item/add-edit-item.component';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    AddEditItemComponent
  ],
  imports: [
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    AppBsModalModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
