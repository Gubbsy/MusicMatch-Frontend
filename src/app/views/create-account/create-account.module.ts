import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateAccountPage } from "./create-account.page";
import { RouterModule } from "@angular/router";

import { AngularTagInputModule } from "angular-tag-input";


@NgModule({
  imports: [
    AngularTagInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: CreateAccountPage }])
  ],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
