import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import OrderModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports:      [ BrowserModule, FormsModule, PdfViewerModule, NgbModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
