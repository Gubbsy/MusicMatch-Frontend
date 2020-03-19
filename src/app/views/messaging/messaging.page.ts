import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { IonContent } from '@ionic/angular';

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  messageRecipient: IReturnedUserResponse;

  messages = [
    {
      user: "Boris",
      msg: "Lock yourselves in doors! Do not panic buy! Feed on the old lady next door if you must...",
      createdAt: 1554090856000  
    },
    {
      user: "Simon",
      msg: "Can we not just kill off the infected, go to the Winchester and wait for this whole thing to just blow over?",
      createdAt: 1554090956000  
    },
    {
      user: "Boris",
      msg: "no...",
      createdAt: 1554091056000  
    },
  ];

  currentUser = "Simon";

  newMsg: string;

  constructor(private location: Location) { }

  ngOnInit() {
    this.messageRecipient = history.state.data;
  }

  routeBack() {
    this.location.back();
  }

  sendMessage() {
    this.messages.push({
      user: "Simon",
      msg: this.newMsg,
      createdAt: new Date().getTime()
    });

    this.newMsg = "";

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

}
