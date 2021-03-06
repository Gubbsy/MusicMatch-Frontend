import { EventEmitter, Injectable } from "@angular/core";  
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr";  
import IMessage from "src/app/models/chat/IMessage";
import { environment } from "src/environments/environment";
  
@Injectable({
  providedIn: "root"
})

export class ChatService {  
  messageReceived = new EventEmitter<IMessage>();  
  connectionEstablished = new EventEmitter<boolean>();  
  private hubConnection: HubConnection;
  private apiEndPoint: string;
  
  private connectionIsEstablished = false;  
  
  constructor() {  
    this.apiEndPoint = environment.apiEndPoint;
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: IMessage) {  
    this.hubConnection.invoke("SendMessage", message).catch((err) => {
      console.error(err.toString());
    });
    console.log("Sent message: ", message);  
  }  
  
  private createConnection() {  
    this.hubConnection = new HubConnectionBuilder()  
      .withUrl(this.apiEndPoint + "/chatHub", {
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
        setTimeout(() => { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this.hubConnection.on("ReceiveMessage", (data: IMessage) => {  
      this.messageReceived.emit(data); 
    });  
  }  
}    
