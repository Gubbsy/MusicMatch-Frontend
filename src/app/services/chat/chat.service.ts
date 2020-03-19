import { EventEmitter, Injectable } from "@angular/core";  
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr";  
import IMessage from "src/app/models/chat/IMessage";
  
@Injectable({
  providedIn: "root"
})

export class ChatService {  
  messageReceived = new EventEmitter<IMessage>();  
  connectionEstablished = new EventEmitter<boolean>();  
  private hubConnection: HubConnection;
  
  private connectionIsEstablished = false;  
  
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: IMessage) {  
    this.hubConnection.invoke("NewMessage", message);  
  }  
  
  private createConnection() {  
    this.hubConnection = new HubConnectionBuilder()  
      .withUrl("https://c9ee2643.ngrok.io/api/v1/ChatHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })  
      .build();  
  }  
  
  private startConnection(): void {  
    this.hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log("Hub connection started");  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log("Error while establishing connection, retrying...");  
        // setTimeout(() => { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this.hubConnection.on("MessageReceived", (data: any) => {  
      this.messageReceived.emit(data);  
    });  
  }  
}    