import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MessagingPage } from "./messaging.page";
import { RouterModule } from "@angular/router";
import { AutosizeModule } from "ngx-autosize";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    RouterModule.forChild([{ path: "", component: MessagingPage }])
  ],
  declarations: [MessagingPage]
})
export class MessagingPageModule {}
