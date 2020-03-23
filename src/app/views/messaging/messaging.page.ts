import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { IonContent } from "@ionic/angular";
import IMessage from "src/app/models/chat/IMessage";
import { ChatService } from "src/app/services/chat/chat.service";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  messageRecipient: IReturnedUserResponse;

  messages: IMessage[] = [];

  currentUser = "Simon";

  newMsg: IMessage;
  newMsgText: string;

  constructor(private location: Location, private chatService: ChatService, private ngZone: NgZone) {
    this.subscribeToEvents(); 
  }

  ngOnInit() {
    this.messageRecipient = history.state.data;
  }

  routeBack() {
    this.location.back();
  }

  sendMessage() {
    console.log("new message text :", this.newMsgText);
    this.newMsg = {
      userId: this.messageRecipient.id,
      date: new Date().getTime().toString(),
      msg: this.newMsgText,
      type: "sent"
    };

    this.chatService.sendMessage(this.newMsg);
    this.messages.push(this.newMsg);
    this.newMsgText = "";

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  private subscribeToEvents(): void {  
    this.chatService.messageReceived.subscribe((message: IMessage) => {  
      this.ngZone.run(() => {  
        if (message.userId === this.messageRecipient.id) {  
          message.type = "received";  
          this.messages.push(message);  
        }  
        console.log("Received message", message);
      });  
    });  
  }  

}
