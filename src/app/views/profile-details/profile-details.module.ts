import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfileDetailsPage } from "./profile-details.page";
import { RouterModule } from "@angular/router";
import { AngularTagInputModule } from "angular-tag-input";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";

@NgModule({
  imports: [
    AngularTagInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: ProfileDetailsPage }])
  ],
  declarations: [ProfileDetailsPage],
  providers: [ Geolocation,  NativeGeocoder, Camera ]
})
export class ProfileDetailsPageModule {}
