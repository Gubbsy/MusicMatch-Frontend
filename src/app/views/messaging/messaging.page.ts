import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {

  messageRecipient: IReturnedUserResponse;

  constructor(private location: Location) { }

  ngOnInit() {
    this.messageRecipient = history.state.data;
    console.log("Message Recipent: ", this.messageRecipient);
  }

  routeBack() {
    this.location.back();
  }

}
