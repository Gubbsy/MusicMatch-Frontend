import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { IonContent } from "@ionic/angular";
import IMessage from "src/app/models/chat/IMessage";
import { ChatService } from "src/app/services/chat/chat.service";
import { LocalStorageService } from "src/app/services/storage/local-storage.service";
import ILoggedInUserResponse from "src/app/models/response/account/ILoggedInUserResponse";
import MessagingAPIService from "src/app/services/api/messaging/messaging-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.page.html",
  styleUrls: ["./messaging.page.scss"],
})
export class MessagingPage implements OnInit {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  loading: boolean = true;
  messageRecipient: IReturnedUserResponse;
  userCredentials: ILoggedInUserResponse;

  messages: IMessage[] = [];

  newMsg: IMessage;
  newMsgText: string;

  constructor(private location: Location, private chatService: ChatService, private ngZone: NgZone, 
      private localStorageService: LocalStorageService, private messagingAPIService: MessagingAPIService, private errorToastService: ErrorToastService) {
  }

  ngOnInit() {
    this.messageRecipient = history.state.data;
    this.userCredentials = this.localStorageService.retrieveUserCredentials();
    this.subscribeToEvents(); 
    this.getPreviousMessages();
  }

  routeBack() {
    this.location.back();
  }

  async getPreviousMessages() {
    try {
      const response = await this.messagingAPIService.GetPreviousMessages(this.messageRecipient.id);

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      } else {
         response.payload.forEach(m => {
          this.messages.push(m);
        });
      }
  
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
   
    this.scrollToBottom();
    this.loading = false;
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

    this.scrollToBottom();
    
  }

  private subscribeToEvents(): void {  
    this.chatService.messageReceived.subscribe((message: IMessage) => {  
      this.ngZone.run(() => {  
        this.messages.push(message);  
        this.scrollToBottom();
      });  
    });  
  }  

  private scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
}
