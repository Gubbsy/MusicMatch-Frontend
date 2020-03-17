import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.page.html",
  styleUrls: ["./account-page.page.scss"],
})
export class AccountPagePage implements OnInit {

  profileDetails: IReturnedUserResponse;

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    this.profileDetails = history.state.data;
    console.log("Sent data: ", this.profileDetails);
  }

  routeBack() {
    this.location.back();
  }
}
