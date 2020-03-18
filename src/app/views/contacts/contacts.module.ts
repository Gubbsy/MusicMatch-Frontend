import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ContactsPage } from "./contacts.page";
import { PageHeaderModule } from "src/app/components/page-header/page-header.module";

@NgModule({
  imports: [
    PageHeaderModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: ContactsPage }])
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
