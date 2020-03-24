import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { IonContent } from "@ionic/angular";
import IMessage from "src/app/models/chat/IMessage";
import { ChatService } from "src/app/services/chat/chat.service";
import { LocalStorageService } from "src/app/services/storage/local-storage.service";
import ILoggedInUserResponse from "src/app/models/response/account/ILoggedInUserResponse";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  messageRecipient: IReturnedUserResponse;
  userCredentials: ILoggedInUserResponse;

  messages: IMessage[] = [];

  currentUser = "Simon";

  newMsg: IMessage;
  newMsgText: string;

  constructor(private location: Location, private chatService: ChatService, private ngZone: NgZone, private localStorageService: LocalStorageService) {
    this.subscribeToEvents(); 
    this.userCredentials = localStorageService.retrieveUserCredentials();
  }

  ngOnInit() {
    this.messageRecipient = history.state.data;
  }

  routeBack() {
    this.location.back();
  }

  sendMessage() {
    this.newMsg = {
      sender: this.userCredentials.userId,
      recipient: this.messageRecipient.id,
      date: new Date().getTime(),
      msg: this.newMsgText,
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
        this.messages.push(message);  
        console.log("Received message", message);
      });  
    });  
  }  

}
