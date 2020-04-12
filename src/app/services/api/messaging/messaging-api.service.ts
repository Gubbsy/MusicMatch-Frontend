import HTTPAbstract from "../../http/http.abstract";
import { Inject, Injectable } from "@angular/core";
import APIService from "../api-service.abstarct";
import IMessage from "src/app/models/chat/IMessage";
import { IAPIResponse } from "src/app/models/response/api-response.interface";
import IPreviousMessageRequest from "src/app/models/request/messaging/IPreviouseMessageRequest";

@Injectable({
  providedIn: "root"
})

export default class MessagingAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "messages/");
  }

  async GetPreviousMessages(recipientId: string): Promise<IAPIResponse<IMessage[]>> {
    const payload: IPreviousMessageRequest = {
      recipientId: recipientId
    }
    return await this.post<IMessage[]>("getpreviousmessages", payload);
  }
}
